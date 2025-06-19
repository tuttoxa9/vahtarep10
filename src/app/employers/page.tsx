import type { Metadata } from 'next';
import EmployersPageClient from './EmployersPageClient';

export const metadata: Metadata = {
  title: 'Подбор персонала на вахту - профессиональные кадры для вашего бизнеса',
  description: 'Качественный подбор вахтовых работников для строительства, промышленности, логистики. Опытные специалисты готовые к трудовой деятельности по всей России.',
  keywords: 'подбор персонала вахта, кадровые услуги, вахтовые работники, строительные специалисты, промышленный персонал',
  alternates: {
    canonical: 'https://vahta1.ru/employers',
  },
  openGraph: {
    title: 'Подбор персонала на вахту - профессиональные кадры для вашего бизнеса',
    description: 'Качественный подбор вахтовых работников для строительства, промышленности, логистики. Опытные специалисты готовые к трудовой деятельности по всей России.',
    url: 'https://vahta1.ru/employers',
  },
};

export default function EmployersPage() {
  return <EmployersPageClient />;
}
