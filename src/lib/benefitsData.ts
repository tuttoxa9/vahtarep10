import type { Benefit } from '@/types';

// Предустановленные преимущества для выбора
export const defaultBenefits: Benefit[] = [
  {
    id: 'housing',
    title: 'Бесплатное проживание',
    description: 'Предоставляется комфортное жилье на время работы',
    category: 'comfort',
    icon: 'home'
  },
  {
    id: 'transport',
    title: 'Компенсация проезда',
    description: 'Полная компенсация транспортных расходов',
    category: 'financial',
    icon: 'car'
  },
  {
    id: 'meals',
    title: 'Организованное питание',
    description: 'Трехразовое питание на рабочем месте',
    category: 'comfort',
    icon: 'utensils'
  },
  {
    id: 'uniform',
    title: 'Предоставление спецодежды',
    description: 'Качественная рабочая одежда и защитные средства',
    category: 'comfort',
    icon: 'shield'
  },
  {
    id: 'salary-stability',
    title: 'Стабильная зарплата без задержек',
    description: 'Своевременная выплата заработной платы',
    category: 'financial',
    icon: 'dollar-sign'
  },
  {
    id: 'official-employment',
    title: 'Официальное трудоустройство',
    description: 'Трудовой договор согласно ТК РФ',
    category: 'other',
    icon: 'shield'
  },
  {
    id: 'flexible-schedule',
    title: 'Гибкий график',
    description: 'Возможность выбора удобного графика работы',
    category: 'comfort',
    icon: 'clock'
  },
  {
    id: 'corporate-events',
    title: 'Корпоративные мероприятия',
    description: 'Командные мероприятия и праздники',
    category: 'social',
    icon: 'users'
  },
  {
    id: 'training',
    title: 'Обучение и развитие',
    description: 'Профессиональное развитие и повышение квалификации',
    category: 'development',
    icon: 'graduation-cap'
  },
  {
    id: 'medical-insurance',
    title: 'Медицинское страхование',
    description: 'Полная медицинская страховка',
    category: 'health',
    icon: 'heart'
  }
];

// Функция для получения преимуществ по ID
export function getBenefitsByIds(ids: string[]): Benefit[] {
  return ids.map(id => {
    const benefit = defaultBenefits.find(b => b.id === id);
    return benefit || {
      id,
      title: id,
      description: '',
      category: 'other' as const
    };
  }).filter(Boolean);
}

// Функция для создания нового преимущества
export function createCustomBenefit(title: string, description?: string, category: Benefit['category'] = 'other'): Benefit {
  return {
    id: title.toLowerCase().replace(/\s+/g, '-'),
    title,
    description,
    category
  };
}