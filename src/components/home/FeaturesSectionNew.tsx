"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  HomeIcon,
  TruckIcon
} from "@heroicons/react/24/outline";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { getFeatures } from "@/lib/firestore";

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  order?: number;
}

// Маппинг иконок
const iconMap: { [key: string]: JSX.Element } = {
  'CurrencyDollarIcon': <CurrencyDollarIcon className="h-8 w-8" />,
  'HomeIcon': <HomeIcon className="h-8 w-8" />,
  'TruckIcon': <TruckIcon className="h-8 w-8" />,
  'ShieldCheckIcon': <ShieldCheckIcon className="h-8 w-8" />,
  'ClockIcon': <ClockIcon className="h-8 w-8" />,
  'CheckCircleIcon': <CheckCircleIcon className="h-8 w-8" />
};

export default function FeaturesSection() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeatures() {
      try {
        const featuresData = await getFeatures();
        // Сортируем по order или по умолчанию
        const sortedFeatures = featuresData.sort((a, b) => (a.order || 999) - (b.order || 999));
        setFeatures(sortedFeatures);
      } catch (error) {
        console.error('Ошибка загрузки преимуществ:', error);
        setFeatures([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeatures();
  }, []);

  // Не показываем секцию если нет преимуществ или идет загрузка
  if (isLoading || features.length === 0) {
    return null;
  }

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedHeading
            as="h2"
            className="text-4xl font-bold text-slate-800 mb-6"
            highlightWords={["преимущества"]}
            highlightClass="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Наши преимущества
          </AnimatedHeading>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Мы предлагаем лучшие условия работы для специалистов, которые готовы к новым вызовам
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-slate-200 overflow-hidden">
                {/* Фоновый градиент */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Иконка */}
                <div className={`relative mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {iconMap[feature.icon] || <CheckCircleIcon className="h-8 w-8" />}
                </div>

                {/* Контент */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Декоративный элемент */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
