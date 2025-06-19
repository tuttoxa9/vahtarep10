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
    imageUrl,
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
      className="bg-white rounded-lg p-3 sm:p-4 border border-border/30 shadow-[0_2px_8px_rgba(60,60,120,0.08)] hover:shadow-[0_8px_25px_rgba(60,60,120,0.15)] transition-all duration-300 cursor-pointer w-full"
      onClick={() => onClick(vacancy)}
    >
      <div className={`flex ${imageUrl ? 'flex-col sm:flex-row gap-3 sm:gap-4' : 'flex-col'}`}>
        {/* Место для картинки слева - только если есть изображение */}
        {imageUrl && (
          <div className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mx-auto sm:mx-0 border-2 border-red-200/50">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-lg" onError={(e) => {
              // Если изображение не загружается, показываем иконку
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = '<svg class="w-6 h-6 sm:w-10 sm:h-10 text-red-600/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 8v10l5-5 5 5V8"></path></svg>';
            }} />
          </div>
        )}

        {/* Основная информация */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3 text-left">
            <div className="flex-1 min-w-0 sm:pr-4 mb-2 sm:mb-0">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 leading-tight">
                {title}
              </h3>
              <p className="text-muted-foreground font-medium text-xs sm:text-sm">
                {company}
              </p>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="text-sm sm:text-lg font-bold text-primary mb-1">
                {formatSalary(salary)}
              </div>
              {paymentPeriodDays && (
                <div className="text-xs text-muted-foreground mb-1">
                  За {paymentPeriodDays} {paymentPeriodDays === 1 ? 'день' : paymentPeriodDays <= 4 ? 'дня' : 'дней'}
                </div>
              )}
              <div className={`inline-block rounded-full px-2 py-1 sm:px-3 text-xs font-semibold ${
                employment_type && (employment_type.toLowerCase().includes('вахтовым методом') || employment_type.toLowerCase().includes('вахтовый метод'))
                  ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                  : 'bg-accent/10 text-accent border border-accent/20'
              }`}>
                {employment_type}
              </div>
            </div>
          </div>

          {/* Детали вакансии */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1 sm:gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Опыт: {experience}</span>
            </div>
          </div>

          {/* Краткое описание */}
          {cleanDescription && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3 sm:mb-4">
              {cleanDescription.substring(0, 150)}...
            </p>
          )}

          {/* Кнопка "Подробнее" */}
          <div className="flex justify-end">
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors shadow-sm">
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
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
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
            className="space-y-3 sm:space-y-4"
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
