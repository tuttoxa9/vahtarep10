"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import VacancyOverlay from "@/components/vacancies/VacancyOverlay";
import VacancyFilters, { type FilterState } from "@/components/vacancies/VacancyFilters";
import { cn, formatSalary } from "@/lib/utils";
import { filterAndSortVacancies } from "@/lib/vacancyFilters";
import type { FirestoreVacancy } from "@/types";

// Простая карточка вакансии
function SimpleVacancyCard({
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
  } = vacancy;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: index * 0.08
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.12)" }}
      className="card-depth rounded-xl p-5 border border-border/30 bg-white/90 backdrop-blur-md shadow-[0_2px_8px_rgba(60,60,120,0.10),0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer"
      onClick={() => onClick(vacancy)}
    >
      <div className="flex flex-col h-full hover:no-underline">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-foreground line-clamp-2 mb-1 drop-shadow-sm">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm font-medium mb-2">
              {company}
            </p>
          </div>
          <div className={`rounded-full px-3 py-1 font-semibold text-sm shrink-0 ml-2 shadow-sm border ${
            employment_type && (employment_type.toLowerCase().includes('вахтовым методом') || employment_type.toLowerCase().includes('вахтовый метод'))
              ? 'bg-red-500/10 text-red-600 border-red-500/20'
              : 'bg-accent/10 text-accent border-accent/20'
          }`}>
            {employment_type}
          </div>
        </div>

        <div className="space-y-3 flex-1 mb-4">
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2 font-medium">Локация:</span>
            <span className="text-foreground/80">{location}</span>
          </div>

          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2 font-medium">Опыт:</span>
            <span className="text-foreground/80">{experience}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-3 border-t border-border/30">
          <div className="text-lg font-bold text-primary drop-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0 pr-3">
            {formatSalary(salary)}
          </div>
          <div className="btn-depth rounded-lg bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm font-medium transition-all shadow-lg shadow-primary/20 flex-shrink-0">
            Подробнее
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
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <>
      <VacancyFilters
        onFiltersChange={handleFiltersChange}
        resultsCount={filteredVacancies.length}
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredVacancies.map((vacancy, index) => (
          <SimpleVacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            onClick={openVacancyOverlay}
            index={index}
          />
        ))}
      </motion.div>

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
