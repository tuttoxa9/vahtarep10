"use client";

import { useEffect, useState } from "react";
import { getAllVacancies } from "@/lib/firestore";
import type { FirestoreVacancy } from "@/types";

interface VacancyCarouselProps {
  className?: string;
}

export default function VacancyCarousel({ className }: VacancyCarouselProps) {
  const [vacancies, setVacancies] = useState<FirestoreVacancy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await getAllVacancies();
        setVacancies(data);
      } catch (error) {
        console.error('Error fetching vacancies for carousel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  if (loading || vacancies.length === 0) {
    return (
      <div className={`${className || ''} h-12 bg-gray-100 rounded-lg animate-pulse`} />
    );
  }

  // Создаем дублированный массив для бесконечной прокрутки
  const duplicatedVacancies = [...vacancies, ...vacancies, ...vacancies];

  return (
    <div className={`${className || ''} overflow-hidden bg-gradient-to-r from-red-50 to-gray-50 rounded-xl border border-red-100`}>
      <div className="flex animate-scroll py-2">
        {duplicatedVacancies.map((vacancy, index) => (
          <div
            key={`${vacancy.id}-${index}`}
            className="flex-shrink-0 px-3 py-1 mx-1 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-red-100 hover:bg-white transition-colors duration-300"
          >
            <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
              {vacancy.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
