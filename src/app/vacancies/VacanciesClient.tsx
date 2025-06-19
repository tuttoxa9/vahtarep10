"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import VacancyOverlay from "@/components/vacancies/VacancyOverlay";
import VacancyFilters, { type FilterState } from "@/components/vacancies/VacancyFilters";
import FeaturedVacancyCard from "@/components/vacancies/FeaturedVacancyCard";
import { cn, formatSalary } from "@/lib/utils";
import { filterAndSortVacancies } from "@/lib/vacancyFilters";
import type { FirestoreVacancy } from "@/types";
import { MapPin, Briefcase, Clock, DollarSign } from "lucide-react";

// Компонент карточки вакансии в виде списка
function VacancyListItem({
  vacancy,
  onClick,
  index
}: {
  vacancy: FirestoreVacancy;
  onClick: (vacancy: FirestoreVacancy) => void;
  index: number;
}) {
  const {
    title,
    company,
    location,
    salary,
    experience,
    employment_type,
    description,
    paymentPeriodDays,
  } = vacancy;

  // Очищаем описание от стандартного текста
  const cleanDescription = description?.replace(
    /Присоединяйтесь к нашей профессиональной команде и получите стабильную работу с отличными условиями и достойной оплатой труда\.\s*/g,
    ""
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: index * 0.05
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-xl p-6 border border-border/30 shadow-[0_2px_8px_rgba(60,60,120,0.08)] hover:shadow-[0_8px_25px_rgba(60,60,120,0.15)] transition-all duration-300 cursor-pointer w-full"
      onClick={() => onClick(vacancy)}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Место для картинки слева - увеличенное квадратное место */}
        <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mx-auto sm:mx-0 border-2 border-red-200/50">
          <Briefcase className="w-12 h-12 sm:w-14 sm:h-14 text-red-600/70" />
        </div>

        {/* Основная информация */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 text-center sm:text-left">
            <div className="flex-1 min-w-0 sm:pr-6 mb-3 sm:mb-0">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-tight">
                {title}
              </h3>
              <p className="text-muted-foreground font-medium text-base">
                {company}
              </p>
            </div>

            <div className="flex-shrink-0 text-center sm:text-right">
              <div className="text-xl sm:text-2xl font-bold text-primary mb-2">
                {formatSalary(salary)}
              </div>
              {paymentPeriodDays && (
                <div className="text-sm text-muted-foreground mb-2">
                  За {paymentPeriodDays} {paymentPeriodDays === 1 ? 'день' : paymentPeriodDays <= 4 ? 'дня' : 'дней'}
                </div>
              )}
              <div className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                employment_type && (employment_type.toLowerCase().includes('вахтовым методом') || employment_type.toLowerCase().includes('вахтовый метод'))
                  ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                  : 'bg-accent/10 text-accent border border-accent/20'
              }`}>
                {employment_type}
              </div>
            </div>
          </div>

          {/* Детали вакансии */}
          <div className="flex flex-wrap gap-6 mb-4 text-lg text-muted-foreground">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6" />
              <span>Опыт: {experience}</span>
            </div>
          </div>

          {/* Краткое описание */}
          {cleanDescription && (
            <p className="text-lg text-muted-foreground line-clamp-2 leading-relaxed mb-6">
              {cleanDescription.substring(0, 300)}...
            </p>
          )}

          {/* Кнопка "Подробнее" */}
          <div className="flex justify-end">
            <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium text-lg rounded-lg transition-colors shadow-sm">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VacanciesClient({ vacancies }: { vacancies: FirestoreVacancy[] }) {
  const [selectedVacancy, setSelectedVacancy] = useState<FirestoreVacancy | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    salaryMin: "",
    salaryMax: "",
    location: "",
    employmentType: "all",
    experience: "all",
    sortBy: "date",
  });

  // Мемоизированная фильтрация и сортировка вакансий
  const filteredVacancies = useMemo(() => {
    return filterAndSortVacancies(vacancies, filters);
  }, [vacancies, filters]);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const openVacancyOverlay = (vacancy: FirestoreVacancy) => {
    setSelectedVacancy(vacancy);
    setIsOverlayOpen(true);
  };

  const closeVacancyOverlay = () => {
    setIsOverlayOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Фильтры слева (на мобильных сверху) */}
        <div className="w-full lg:w-80 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <VacancyFilters
              onFiltersChange={handleFiltersChange}
              resultsCount={filteredVacancies.length}
            />
          </div>
        </div>

        {/* Список вакансий справа - максимально используем оставшееся место */}
        <div className="flex-1 min-w-0">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredVacancies.map((vacancy, index) => (
              vacancy.isFeatured ? (
                <FeaturedVacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  onClick={openVacancyOverlay}
                  index={index}
                />
              ) : (
                <VacancyListItem
                  key={vacancy.id}
                  vacancy={vacancy}
                  onClick={openVacancyOverlay}
                  index={index}
                />
              )
            ))}
          </motion.div>

          {filteredVacancies.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Вакансии не найдены</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedVacancy && (
        <VacancyOverlay
          vacancy={selectedVacancy}
          isOpen={isOverlayOpen}
          onClose={closeVacancyOverlay}
        />
      )}
    </>
  );
}
