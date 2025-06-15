import type { FirestoreVacancy } from "@/types";
import type { FilterState } from "@/components/vacancies/VacancyFilters";

// Функция для извлечения числового значения зарплаты
function extractSalaryValue(salary: unknown): { min: number; max: number } {
  if (typeof salary === "number") {
    return { min: salary, max: salary };
  }

  if (typeof salary === "object" && salary !== null) {
    return {
      min: salary.min || 0,
      max: salary.max || salary.min || 0,
    };
  }

  if (typeof salary === "string") {
    // Попытка извлечь числа из строки
    const numbers = salary.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const nums = numbers.map(n => Number.parseInt(n, 10));
      return {
        min: Math.min(...nums),
        max: Math.max(...nums),
      };
    }
  }

  return { min: 0, max: 0 };
}

// Функция для нормализации текста для поиска
function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^а-я\s\w]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Функция для фильтрации вакансий
export function filterVacancies(
  vacancies: FirestoreVacancy[],
  filters: FilterState
): FirestoreVacancy[] {
  let filtered = [...vacancies];

  // Поиск по тексту
  if (filters.search.trim()) {
    const searchTerms = normalizeSearchText(filters.search).split(' ');
    filtered = filtered.filter(vacancy => {
      const searchableText = normalizeSearchText([
        vacancy.title,
        vacancy.company,
        vacancy.description || '',
        vacancy.location,
        vacancy.experience || '',
        vacancy.employment_type || ''
      ].join(' '));

      // Проверяем, что все слова поиска присутствуют в тексте
      return searchTerms.every(term =>
        term.length > 0 && searchableText.includes(term)
      );
    });
  }

  // Фильтр по минимальной зарплате
  if (filters.salaryMin) {
    const minSalary = Number.parseInt(filters.salaryMin, 10);
    if (!Number.isNaN(minSalary)) {
      filtered = filtered.filter(vacancy => {
        const { max } = extractSalaryValue(vacancy.salary);
        return max >= minSalary;
      });
    }
  }

  // Фильтр по максимальной зарплате
  if (filters.salaryMax) {
    const maxSalary = Number.parseInt(filters.salaryMax, 10);
    if (!Number.isNaN(maxSalary)) {
      filtered = filtered.filter(vacancy => {
        const { min } = extractSalaryValue(vacancy.salary);
        return min <= maxSalary;
      });
    }
  }

  // Фильтр по локации
  if (filters.location.trim()) {
    const locationTerm = filters.location.toLowerCase().trim();
    filtered = filtered.filter(vacancy =>
      vacancy.location.toLowerCase().includes(locationTerm)
    );
  }

  // Фильтр по типу занятости
  if (filters.employmentType && filters.employmentType !== "all") {
    filtered = filtered.filter(vacancy => {
      const vacancyType = vacancy.employment_type?.toLowerCase() || '';
      const filterType = filters.employmentType.toLowerCase();

      // Точное соответствие или включение
      return vacancyType === filterType || vacancyType.includes(filterType);
    });
  }

  // Фильтр по опыту
  if (filters.experience && filters.experience !== "all") {
    const beforeCount = filtered.length;
    filtered = filtered.filter(vacancy => {
      const vacancyExperience = vacancy.experience?.toLowerCase() || '';
      const filterExperience = filters.experience.toLowerCase();

      console.log(`🎯 Checking experience: "${vacancyExperience}" vs filter "${filterExperience}"`);

      // Специальная логика для фильтра "без опыта"
      if (filterExperience === "без опыта") {
        const result = (
          vacancyExperience.includes("без опыта") ||
          vacancyExperience.includes("опыт не требуется") ||
          vacancyExperience.includes("не требуется опыт") ||
          vacancyExperience.includes("подойдет без опыта") ||
          vacancyExperience.includes("опыт не нужен") ||
          vacancyExperience.includes("новичкам") ||
          vacancyExperience.includes("0 лет") ||
          vacancyExperience === "" ||
          vacancyExperience === "нет" ||
          vacancyExperience === "не требуется"
        );
        console.log(`   ✓ No experience check result: ${result}`);
        return result;
      }

      // Логика для фильтра "от X лет"
      if (filterExperience.includes("от")) {
        // Извлекаем число лет из фильтра
        const filterYears = filterExperience.match(/\d+/);
        if (filterYears) {
          const requiredYears = Number.parseInt(filterYears[0], 10);

          // Проверяем включает ли текст похожие требования
          const result = (
            vacancyExperience.includes(filterExperience) ||
            vacancyExperience.includes(`от ${requiredYears}`) ||
            vacancyExperience.includes(`${requiredYears} лет`) ||
            vacancyExperience.includes(`${requiredYears} года`) ||
            vacancyExperience.includes(`${requiredYears}+`) ||
            // Проверяем числа в тексте опыта
            (() => {
              const experienceNumbers = vacancyExperience.match(/\d+/g);
              if (experienceNumbers) {
                return experienceNumbers.some(num => Number.parseInt(num, 10) >= requiredYears);
              }
              return false;
            })()
          );
          console.log(`   ✓ Experience years check result: ${result}`);
          return result;
        }
      }

      // Общая логика для остальных случаев
      const result = vacancyExperience.includes(filterExperience);
      console.log(`   ✓ General experience check result: ${result}`);
      return result;
    });
    console.log(`🎯 Experience filter: ${beforeCount} → ${filtered.length}`);
  }

  console.log('✅ Final filtered count:', filtered.length);
  return filtered;
}

// Функция для сортировки вакансий
export function sortVacancies(
  vacancies: FirestoreVacancy[],
  sortBy: string
): FirestoreVacancy[] {
  const sorted = [...vacancies];

  switch (sortBy) {
    case "date":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Новые первыми
      });

    case "salary":
      return sorted.sort((a, b) => {
        const salaryA = extractSalaryValue(a.salary);
        const salaryB = extractSalaryValue(b.salary);
        const avgA = (salaryA.min + salaryA.max) / 2;
        const avgB = (salaryB.min + salaryB.max) / 2;
        return avgB - avgA; // Высокие зарплаты первыми
      });

    case "views":
      return sorted.sort((a, b) => {
        const viewsA = a.viewCount || 0;
        const viewsB = b.viewCount || 0;
        return viewsB - viewsA; // Популярные первыми
      });

    default:
      return sorted;
  }
}

// Объединенная функция для фильтрации и сортировки
export function filterAndSortVacancies(
  vacancies: FirestoreVacancy[],
  filters: FilterState
): FirestoreVacancy[] {
  const filtered = filterVacancies(vacancies, filters);
  return sortVacancies(filtered, filters.sortBy);
}
