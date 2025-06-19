import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Footer from "@/components/layout/Footer";
import { getAllVacancies } from "@/lib/firestore";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import VacanciesClient from "./VacanciesClient";
import type { FirestoreVacancy } from "@/types";

// Принудительно делаем страницу вакансий динамической
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Вакансии вахтовым методом | Работа Вахтой: для граждан РФ и РБ",
  description:
    "🔥 Лучшие вакансии вахтой с зарплатой от 100,000₽! Бесплатное жилье, питание, авиабилеты. Работа для граждан РФ и Беларуси. Подай заявку прямо сейчас!",
  keywords: [
    'вакансии вахтовым методом',
    'работа вахтой',
    'вахта',
    'работа с проживанием',
    'высокооплачиваемая работа',
    'работа для граждан РФ и РБ',
    'высокая зарплата вахта',
    'работа вахтой 100000 рублей',
    'вахта с проживанием россия беларусь',
    'заработок на вахте',
  ],
  alternates: {
    canonical: "https://vahta1.ru/vacancies",
  },
  openGraph: {
    title: "Вакансии вахтовым методом | Работа Вахтой: для граждан РФ и РБ",
    description: "🔥 Лучшие вакансии вахтой с зарплатой от 100,000₽! Бесплатное жилье, питание, авиабилеты. Работа для граждан РФ и Беларуси. Подай заявку прямо сейчас!",
    url: "https://vahta1.ru/vacancies",
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Убрано автообновление - обычная статическая генерация

export default async function VacanciesPage() {
  // Для статического экспорта получаем все вакансии без фильтров
  const vacancies: FirestoreVacancy[] = await getAllVacancies();

  return (
    <PageLayout>
      <div className="container-custom py-16 md:py-20">
        <div className="w-full max-w-7xl mr-auto ml-4 lg:ml-8">
          <div className="mb-12 text-over-background">
            <AnimatedHeading
              as="h1"
              className="text-4xl md:text-5xl font-bold mb-6 text-shadow-sm"
              highlightWords={["вахтовым методом"]}
              highlightClass="text-red-600"
            >
              Вакансии вахтовым методом
            </AnimatedHeading>

            <AnimatedSection type="fade" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Мы собрали лучшие предложения для работы вахтовым методом. Выберите подходящую
                вакансию, откликнитесь и начните свою карьеру уже сегодня.
              </p>
            </AnimatedSection>
          </div>



          {vacancies.length > 0 ? (
            <VacanciesClient vacancies={vacancies} />
          ) : (
            <AnimatedSection
              type="fade"
              className="text-center p-12 bg-card rounded-xl border border-border shadow-medium"
            >
              <h3 className="text-xl font-medium mb-2">Вакансии не найдены</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить параметры поиска или вернитесь позже.
              </p>
            </AnimatedSection>
          )}
        </div>
      </div>

      <Footer />
    </PageLayout>
  );
}
