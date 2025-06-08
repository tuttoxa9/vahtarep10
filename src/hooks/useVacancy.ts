import { useState, useEffect } from 'react';
import type { FirestoreVacancy } from '@/types';

interface UseVacancyReturn {
  vacancy: FirestoreVacancy | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useVacancy(id: string): UseVacancyReturn {
  const [vacancy, setVacancy] = useState<FirestoreVacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancy = async () => {
    if (!id) return;

    try {
      setError(null);
      const response = await fetch(`/api/vacancies/${id}`, {
        cache: 'no-store', // Всегда получать свежие данные
      });

      if (response.status === 404) {
        setVacancy(null);
        setError('Вакансия не найдена');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVacancy(data);
    } catch (err) {
      console.error('Error fetching vacancy:', err);
      setError('Не удалось загрузить вакансию. Попробуйте обновить страницу.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadVacancy = async () => {
      if (!id) return;

      try {
        setError(null);
        setLoading(true);
        const response = await fetch(`/api/vacancies/${id}`, {
          cache: 'no-store',
        });

        if (response.status === 404) {
          setVacancy(null);
          setError('Вакансия не найдена');
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVacancy(data);
      } catch (err) {
        console.error('Error fetching vacancy:', err);
        setError('Не удалось загрузить вакансию. Попробуйте обновить страницу.');
      } finally {
        setLoading(false);
      }
    };

    loadVacancy();
  }, [id]);

  return {
    vacancy,
    loading,
    error,
    refetch: fetchVacancy,
  };
}
