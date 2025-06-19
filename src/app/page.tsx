import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PopularVacanciesSection from "@/components/home/PopularVacanciesSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/layout/Footer";
import { getPopularVacancies } from "@/lib/firestore";
import type { FirestoreVacancy } from "@/types";

// Принудительно делаем главную страницу динамической
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Работа Вахтой: для граждан РФ и РБ - Вакансии вахтовым методом",
  description: "Высокооплачиваемая вахтовая работа для граждан России и Беларуси. Зарплата от 100,000₽, бесплатное жилье, питание. Подай заявку сегодня!",
};

export default async function HomePage() {
  // Получаем популярные вакансии для отображения на главной странице
  let popularVacancies: FirestoreVacancy[] = [];

  try {
    popularVacancies = await getPopularVacancies(6);
  } catch (error) {
    console.error('Error loading popular vacancies:', error);
    popularVacancies = [];
  }

  return (
    <PageLayout>
      <HeroSection />
      <PopularVacanciesSection vacancies={popularVacancies} />
      <FeaturesSection />
      <ReviewsSection />
      <CtaSection />
      <Footer />
    </PageLayout>
  );
}
