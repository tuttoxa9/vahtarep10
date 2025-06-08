"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import VacancyOverlay from "@/components/vacancies/VacancyOverlay";
import { formatSalary } from "@/lib/utils";
import type { FirestoreVacancy } from "@/types";

interface PopularVacanciesSectionProps {
  vacancies: FirestoreVacancy[];
}

// Компонент карточки вакансии с модальным окном
function PopularVacancyCard({
  vacancy,
  onClick
}: {
  vacancy: FirestoreVacancy;
  onClick: (vacancy: FirestoreVacancy) => void;
}) {
  const {
    title,
    company,
    location,
    salary,
    experience,
    employment_type,
  } = vacancy;

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(vacancy)}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-600 mb-4">
            {company}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Локация:</span>
              <span className="ml-2">{location}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Опыт:</span>
              <span className="ml-2">{experience}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Тип:</span>
              <span className="ml-2">{employment_type}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-red-600 font-bold text-lg">
            {formatSalary(salary)}
          </div>

          <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
}

export default function PopularVacanciesSection({ vacancies }: PopularVacanciesSectionProps) {
  const [selectedVacancy, setSelectedVacancy] = useState<FirestoreVacancy | null>(null);

  const handleVacancyClick = (vacancy: FirestoreVacancy) => {
    setSelectedVacancy(vacancy);
  };

  const closeOverlay = () => {
    setSelectedVacancy(null);
  };

  if (!vacancies || vacancies.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-24 bg-gray-50 rounded-t-3xl relative -mt-6 z-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Популярные вакансии
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Актуальные предложения от проверенных работодателей с лучшими условиями труда
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {vacancies.slice(0, 6).map((vacancy) => (
            <PopularVacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              onClick={handleVacancyClick}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/vacancies">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
            >
              Посмотреть все вакансии
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Модальное окно для детального просмотра вакансии */}
      {selectedVacancy && (
        <VacancyOverlay
          vacancy={selectedVacancy}
          isOpen={!!selectedVacancy}
          onClose={closeOverlay}
        />
      )}
    </section>
  );
}
