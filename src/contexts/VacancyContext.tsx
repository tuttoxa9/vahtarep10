"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { FirestoreVacancy } from "@/types";

interface VacancyContextType {
  selectedVacancyId: string | null;
  showVacancyDetail: boolean;
  selectVacancy: (id: string) => void;
  closeVacancyDetail: () => void;
  currentVacancy: FirestoreVacancy | null;
  setCurrentVacancy: (vacancy: FirestoreVacancy | null) => void;
}

const VacancyContext = createContext<VacancyContextType | undefined>(undefined);

export function VacancyProvider({ children }: { children: ReactNode }) {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);
  const [showVacancyDetail, setShowVacancyDetail] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState<FirestoreVacancy | null>(null);

  const selectVacancy = (id: string) => {
    setSelectedVacancyId(id);
    setShowVacancyDetail(true);
    // Обновляем URL без перезагрузки страницы
    window.history.pushState({}, "", `/vacancies/${id}`);
  };

  const closeVacancyDetail = () => {
    setShowVacancyDetail(false);
    // Возвращаем обратно URL
    window.history.pushState({}, "", "/vacancies");
  };

  return (
    <VacancyContext.Provider
      value={{
        selectedVacancyId,
        showVacancyDetail,
        selectVacancy,
        closeVacancyDetail,
        currentVacancy,
        setCurrentVacancy,
      }}
    >
      {children}
    </VacancyContext.Provider>
  );
}

export function useVacancy() {
  const context = useContext(VacancyContext);
  if (context === undefined) {
    throw new Error("useVacancy must be used within a VacancyProvider");
  }
  return context;
}