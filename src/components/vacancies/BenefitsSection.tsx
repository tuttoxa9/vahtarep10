'use client';

import { motion } from 'framer-motion';
import { 
  Gift, 
  DollarSign, 
  Heart, 
  GraduationCap, 
  Coffee, 
  Users, 
  Sparkles,
  Clock,
  Home,
  Car,
  Utensils,
  Shield
} from 'lucide-react';
import type { Benefit } from '@/types';

interface BenefitsSectionProps {
  benefits: (Benefit | string)[];
}

const categoryIcons = {
  financial: DollarSign,
  health: Heart,
  development: GraduationCap,
  comfort: Coffee,
  social: Users,
  other: Sparkles
};

const benefitIcons = {
  'Бесплатное проживание': Home,
  'Компенсация проезда': Car,
  'Организованное питание': Utensils,
  'Предоставление спецодежды': Shield,
  'Стабильная зарплата без задержек': DollarSign,
  'Официальное трудоустройство': Shield,
  'Гибкий график': Clock,
  'Корпоративные мероприятия': Users,
  'Обучение и развитие': GraduationCap,
  'Медицинское страхование': Heart
};

const categoryColors = {
  financial: 'bg-green-50 text-green-700 border-green-200',
  health: 'bg-red-50 text-red-700 border-red-200',
  development: 'bg-blue-50 text-blue-700 border-blue-200',
  comfort: 'bg-purple-50 text-purple-700 border-purple-200',
  social: 'bg-orange-50 text-orange-700 border-orange-200',
  other: 'bg-gray-50 text-gray-700 border-gray-200'
};

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="bg-blue-50 rounded-3xl p-6 shadow-xl border border-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Gift className="h-5 w-5 text-blue-500" />
        Преимущества
      </h3>
      
      <div className="space-y-3">
        {benefits.map((benefit, index) => {
          // Обработка как строк, так и объектов Benefit
          let benefitData: Benefit;
          
          if (typeof benefit === 'string') {
            benefitData = {
              id: `benefit-${Date.now()}-${index}`,
              title: benefit,
              category: 'other'
            };
          } else {
            benefitData = {
              ...benefit,
              id: benefit.id || `benefit-obj-${Date.now()}-${index}`
            };
          }
          
          const IconComponent = benefitIcons[benefitData.title as keyof typeof benefitIcons] || 
                                categoryIcons[benefitData.category || 'other'];
          const colorClass = categoryColors[benefitData.category || 'other'];
          
          return (
            <motion.div
              key={benefitData.id}
              className={`flex items-start gap-3 p-3 rounded-xl border ${colorClass} transition-all duration-200 hover:shadow-md`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm leading-tight">
                  {benefitData.title}
                </div>
                {benefitData.description && (
                  <div className="text-xs opacity-75 mt-1 leading-relaxed">
                    {benefitData.description}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}