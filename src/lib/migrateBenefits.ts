import { defaultBenefits } from './benefitsData';
import type { Benefit } from '@/types';

/**
 * Функция для конвертации строковых преимуществ в объекты Benefit
 */
export function convertStringsToBenefits(benefits: (string | Benefit)[]): Benefit[] {
  return benefits.map((benefit, index) => {
    if (typeof benefit === 'string') {
      // Ищем соответствие в defaultBenefits
      const defaultBenefit = defaultBenefits.find(db => db.title === benefit);
      
      if (defaultBenefit) {
        return defaultBenefit;
      }
      
      // Если не нашли, создаем новый объект
      return {
        id: `custom-${benefit.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: benefit,
        category: 'other' as const
      };
    }
    
    return benefit;
  });
}

/**
 * Образец данных для демонстрации работы с преимуществами
 */
export const sampleVacancyBenefits: Benefit[] = [
  defaultBenefits.find(b => b.id === 'housing')!,
  defaultBenefits.find(b => b.id === 'transport')!,
  defaultBenefits.find(b => b.id === 'meals')!,
  defaultBenefits.find(b => b.id === 'salary-stability')!,
  defaultBenefits.find(b => b.id === 'official-employment')!
];

/**
 * Функция для добавления преимуществ к тестовой вакансии
 */
export function addBenefitsToVacancy(vacancyData: any): any {
  return {
    ...vacancyData,
    benefits: sampleVacancyBenefits
  };
}