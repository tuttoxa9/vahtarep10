"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { FirestoreVacancy } from "@/types";

interface VacancyOverlayContextType {
  selectedVacancy: FirestoreVacancy | null;
  isOverlayOpen: boolean;
  openVacancyOverlay: (vacancy: FirestoreVacancy) => void;
  closeVacancyOverlay: () => void;
}

const VacancyOverlayContext = createContext<VacancyOverlayContextType | undefined>(undefined);

export function VacancyOverlayProvider({ children }: { children: ReactNode }) {
  const [selectedVacancy, setSelectedVacancy] = useState<FirestoreVacancy | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openVacancyOverlay = (vacancy: FirestoreVacancy) => {
    setSelectedVacancy(vacancy);
    setIsOverlayOpen(true);
  };

  const closeVacancyOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <VacancyOverlayContext.Provider
      value={{
        selectedVacancy,
        isOverlayOpen,
        openVacancyOverlay,
        closeVacancyOverlay,
      }}
    >
      {children}
    </VacancyOverlayContext.Provider>
  );
}

export function useVacancyOverlay() {
  const context = useContext(VacancyOverlayContext);
  if (context === undefined) {
    throw new Error("useVacancyOverlay must be used within a VacancyOverlayProvider");
  }
  return context;
}