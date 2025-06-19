import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VacancyDetailNew from "@/components/vacancies/VacancyDetailNew";
import { getVacancyById } from "@/lib/firestore";
import type { FirestoreVacancy } from "@/types";

// Принудительно делаем страницу динамической
export const dynamic = 'force-dynamic';

interface VacancyPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Убираем generateStaticParams чтобы страницы генерировались динамически

export async function generateMetadata({ params }: VacancyPageProps): Promise<Metadata> {
  // Используем getVacancyById для получения данных вакансии
  const resolvedParams = await params;
  const vacancy = await getVacancyById(resolvedParams.id);

  if (!vacancy) {
    return {
      title: "Вакансия не найдена | Работа Вахтой: для граждан РФ и РБ",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = vacancy.description
    ? vacancy.description.slice(0, 150) + "..."
    : `Вакансия ${vacancy.title} в ${vacancy.location}. Зарплата: ${vacancy.salary}`;

  return {
    title: `${vacancy.title} в ${vacancy.location} | Работа Вахтой: для граждан РФ и РБ`,
    description,
    keywords: [
      vacancy.title,
      vacancy.location,
      'вахта',
      'работа вахтой',
      'вакансии',
      vacancy.company,
      vacancy.salary,
    ].filter(Boolean).join(', '),
    openGraph: {
      title: `${vacancy.title} - ${vacancy.location}`,
      description,
      url: `https://vahta1.ru/vacancies/${vacancy.id}`,
      type: 'article',
      publishedTime: vacancy.createdAt,
      modifiedTime: vacancy.updatedAt || vacancy.createdAt,
    },
    alternates: {
      canonical: `https://vahta1.ru/vacancies/${vacancy.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function VacancyPage({ params }: VacancyPageProps) {
  // Получаем вакансию по ID (асинхронно)
  const resolvedParams = await params;
  const vacancy = await getVacancyById(resolvedParams.id);

  if (!vacancy) {
    notFound();
  }

  // JSON-LD структурированные данные для вакансии
  const jobPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": vacancy.title,
    "description": vacancy.description || `Вакансия ${vacancy.title} в ${vacancy.location}`,
    "datePosted": vacancy.createdAt,
    "validThrough": vacancy.updatedAt || vacancy.createdAt,
    "employmentType": "CONTRACTOR",
    "hiringOrganization": {
      "@type": "Organization",
      "name": vacancy.company,
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": vacancy.location,
        "addressCountry": "RU"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "RUB",
      "value": {
        "@type": "QuantitativeValue",
        "value": vacancy.salary,
        "unitText": "MONTH"
      }
    },
    "workHours": "Вахтовый метод",
    "url": `https://vahta1.ru/vacancies/${vacancy.id}`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Работа Вахтой: для граждан РФ и РБ",
      "value": vacancy.id
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingJsonLd),
        }}
      />
      <VacancyDetailNew vacancy={vacancy} />
    </>
  );
}
