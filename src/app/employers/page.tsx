import type { Metadata } from 'next';
import EmployersPageClient from './EmployersPageClient';

export const metadata: Metadata = {
  title: 'Работодателям - Выгодные условия найма вахтовых работников',
  description: 'Специальные условия для работодателей по найму вахтовых работников. Быстрый подбор персонала, проверенные кандидаты, выгодные тарифы.',
  keywords: 'найм вахтовых работников, работодателям, подбор персонала, выгодные условия',
  alternates: {
    canonical: 'https://vahta1.ru/employers',
  },
  openGraph: {
    title: 'Работодателям - Выгодные условия найма вахтовых работников',
    description: 'Специальные условия для работодателей по найму вахтовых работников. Быстрый подбор персонала, проверенные кандидаты, выгодные тарифы.',
    url: 'https://vahta1.ru/employers',
  },
};

export default function EmployersPage() {
  return <EmployersPageClient />;
}
