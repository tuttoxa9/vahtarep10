"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VacancyCard from "./VacancyCard";
import type { FirestoreVacancy } from "@/types";
import { cn } from "@/lib/utils";
import { useVacancyOverlay } from "@/contexts/VacancyOverlayContext";

interface VacancyGridProps {
  vacancies: FirestoreVacancy[];
  className?: string;
}

export default function VacancyGrid({ vacancies, className }: VacancyGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
        className
      )}
    >
      {vacancies.map((vacancy, index) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} index={index} />
      ))}
    </div>
  );
}
