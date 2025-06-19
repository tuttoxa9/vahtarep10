import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (Number.isNaN(dateObj.getTime())) {
    return '';
  }

  // Форматирование даты в российском формате
  return dateObj.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

// Функция для форматирования зарплаты
export function formatSalary(salary: string | number | { min?: number; max?: number; currency?: string }): string {
  if (!salary) return 'По договоренности';

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  if (typeof salary === 'string') {
    return salary;
  }

  if (typeof salary === 'number') {
    return `${formatNumber(salary)}\u00A0₽`;
  }

  const { min, max, currency = '₽' } = salary;

  if (!min && !max) return 'По договоренности';
  if (!min) return `до ${formatNumber(max!)}\u00A0${currency}`;
  if (!max) return `от ${formatNumber(min)}\u00A0${currency}`;

  // Для карточек вакансий в списке - компактный формат
  if (min && max && max - min < 20000) {
    return `${formatNumber(max)}\u00A0${currency}`;
  }

  return `${formatNumber(min)}-${formatNumber(max)}\u00A0${currency}`;
}

// Функция для создания градиентных фонов
export function getGradientByIndex(index: number): string {
  const gradients = [
    "from-blue-500 to-purple-600",
    "from-pink-500 to-orange-400",
    "from-green-400 to-teal-500",
    "from-accent to-blue-600",
    "from-primary to-indigo-500"
  ];

  return gradients[index % gradients.length];
}

// Функция для получения инициалов из имени
export function getInitials(name: string): string {
  if (!name) return '';

  const parts = name.split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (parts[0][0] + parts[1][0]).toUpperCase();
}
