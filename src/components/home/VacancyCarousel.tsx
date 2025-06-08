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
    <div className={`${className || ''} overflow-hidden bg-gray-50 rounded-xl`}>
      <div className="flex animate-scroll-fast py-3">
        {duplicatedVacancies.map((vacancy, index) => (
          <span
            key={`${vacancy.id}-${index}`}
            className="flex-shrink-0 text-sm font-medium text-gray-600 whitespace-nowrap mx-6"
          >
            {vacancy.title}
          </span>
        ))}
      </div>
    </div>
  );
}
