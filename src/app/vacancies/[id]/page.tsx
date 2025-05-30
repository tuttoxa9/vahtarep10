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
    };
  }

  return {
    title: `${vacancy.title} | Работа Вахтой: для граждан РФ и РБ`,
    description: vacancy.description
      ? vacancy.description.slice(0, 150) + "..."
      : "Подробная информация о вакансии",
  };
}

export default async function VacancyPage({ params }: VacancyPageProps) {
  // Получаем вакансию по ID (асинхронно)
  const resolvedParams = await params;
  const vacancy = await getVacancyById(resolvedParams.id);

  if (!vacancy) {
    notFound();
  }

  return <VacancyDetailNew vacancy={vacancy} />;
}
