"use client";

import PageLayout from "@/components/layout/PageLayout";
import Footer from "@/components/layout/Footer";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import VacanciesClient from "./VacanciesClient";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useVacancies } from "@/hooks/useVacancies";

export default function ClientVacanciesPage() {
  const { vacancies, loading, error, refetch } = useVacancies();

  if (loading) {
    return (
      <PageLayout>
        <div className="container-custom py-16 md:py-20">
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        </div>
        <Footer />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="container-custom py-16 md:py-20">
          <div className="text-center p-12 bg-card rounded-xl border border-border shadow-medium">
            <h3 className="text-xl font-medium mb-2 text-red-600">Ошибка загрузки</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={refetch}
              className="btn-depth rounded-lg bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm font-medium transition-all shadow-lg shadow-primary/20"
            >
              Попробовать снова
            </button>
          </div>
        </div>
        <Footer />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container-custom py-16 md:py-20">
        <div className="w-full max-w-5xl mx-auto">
          <div className="mb-12">
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
                вакансию, откликнитесь и начните свою карьеру уже сегодня. Данные обновляются при каждой загрузке страницы.
              </p>
            </AnimatedSection>
          </div>

          <div className="mb-8 flex justify-between items-center">
            <AnimatedSection type="fade">
              <p className="text-muted-foreground">
                Найдено вакансий:{" "}
                <span className="font-medium text-foreground">{vacancies.length}</span>
              </p>
            </AnimatedSection>

            <button
              onClick={refetch}
              className="text-xs text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted px-2 py-1 rounded transition-colors"
            >
              🔄 Обновить
            </button>
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
