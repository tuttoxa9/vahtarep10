import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Benefit } from '@/types';
import { defaultBenefits } from './benefitsData';

/**
 * Функция для обновления преимуществ конкретной вакансии
 */
export async function updateVacancyBenefits(vacancyId: string, benefits: Benefit[]): Promise<void> {
  try {
    const vacancyRef = doc(db, 'vacancies', vacancyId);
    await updateDoc(vacancyRef, {
      benefits: benefits
    });
    console.log(`Преимущества вакансии ${vacancyId} успешно обновлены`);
  } catch (error) {
    console.error('Ошибка при обновлении преимуществ:', error);
    throw error;
  }
}

/**
 * Функция для получения текущих преимуществ вакансии
 */
export async function getVacancyBenefits(vacancyId: string): Promise<Benefit[]> {
  try {
    const vacancyRef = doc(db, 'vacancies', vacancyId);
    const vacancySnap = await getDoc(vacancyRef);
    
    if (vacancySnap.exists()) {
      const data = vacancySnap.data();
      return data.benefits || [];
    }
    
    return [];
  } catch (error) {
    console.error('Ошибка при получении преимуществ:', error);
    throw error;
  }
}

/**
 * Готовый набор преимуществ для вахтовых работ
 */
export const vahta_benefits: Benefit[] = [
  {
    id: 'housing',
    title: 'Бесплатное проживание',
    description: 'Комфортное общежитие или гостиница на время работы',
    category: 'comfort'
  },
  {
    id: 'transport',
    title: 'Компенсация проезда',
    description: 'Полная оплата билетов до места работы и обратно',
    category: 'financial'
  },
  {
    id: 'meals',
    title: 'Организованное питание',
    description: 'Трёхразовое питание в столовой предприятия',
    category: 'comfort'
  },
  {
    id: 'uniform',
    title: 'Предоставление спецодежды',
    description: 'Вся необходимая рабочая одежда и защитные средства',
    category: 'comfort'
  },
  {
    id: 'salary-stability',
    title: 'Стабильная зарплата без задержек',
    description: 'Выплаты строго по графику, никаких задержек',
    category: 'financial'
  },
  {
    id: 'official-employment',
    title: 'Официальное трудоустройство',
    description: 'Трудовой договор, все социальные гарантии',
    category: 'other'
  }
];