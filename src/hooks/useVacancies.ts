import { useState, useEffect } from 'react';
import type { FirestoreVacancy } from '@/types';

interface UseVacanciesReturn {
  vacancies: FirestoreVacancy[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useVacancies(): UseVacanciesReturn {
  const [vacancies, setVacancies] = useState<FirestoreVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = async () => {
    try {
      setError(null);
      const response = await fetch('/api/vacancies', {
        cache: 'no-store', // Всегда получать свежие данные
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVacancies(data);
    } catch (err) {
      console.error('Error fetching vacancies:', err);
      setError('Не удалось загрузить вакансии. Попробуйте обновить страницу.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
    // Убрано автообновление - данные загружаются только при инициализации
  }, []);

  return {
    vacancies,
    loading,
    error,
    refetch: fetchVacancies,
  };
}
