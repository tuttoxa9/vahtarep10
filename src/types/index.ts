export interface Vacancy {
  id: string;
  title: string;
  salaryText: string;
  city: string;
  fullDescription: string;
  shortDescription?: string;
  imageUrl?: string;
  viewCount: number;
  createdAt: Date | string;
  requirements?: string[];
  benefits?: string[];
  employmentType?: string;
  experienceRequired?: string;
  companyName?: string;
  detailsUrl?: string; // Ссылка для кнопки "Узнать подробнее"
  isFeatured?: boolean; // Особенная вакансия с выделением
}

export interface Application {
  id?: string;
  vacancyId: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail?: string;
  message?: string;
  createdAt: Date | string;
}

// Интерфейс для FirebaseFirestore.Timestamp
export interface FirebaseTimestamp {
  toDate: () => Date;
  seconds: number;
  nanoseconds: number;
}

export interface Benefit {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category?: 'financial' | 'health' | 'development' | 'comfort' | 'social' | 'other';
}

export interface FirestoreVacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | number | { min?: number; max?: number; currency?: string };
  experience: string;
  employment_type: string;
  description?: string;
  requirements?: string[];
  benefits?: (Benefit | string)[];
  imageUrl?: string;
  viewCount?: number;
  createdAt: FirebaseTimestamp;
  detailsUrl?: string; // Ссылка для кнопки "Узнать подробнее"
  isFeatured?: boolean; // Особенная вакансия с выделением
  paymentPeriodDays?: number; // Количество дней для периода оплаты
}

export interface Review {
  id: string;
  stars: number; // 1-5
  text: string;
  date: Date | string | FirebaseTimestamp;
  shiftType: string;
  approved: boolean;
  createdAt: Date | string | FirebaseTimestamp;
  updatedAt?: Date | string | FirebaseTimestamp;
}

export interface FirestoreReview {
  id: string;
  stars: number;
  text: string;
  date: FirebaseTimestamp;
  shiftType: string;
  approved: boolean;
  createdAt: FirebaseTimestamp;
  updatedAt?: FirebaseTimestamp;
}
