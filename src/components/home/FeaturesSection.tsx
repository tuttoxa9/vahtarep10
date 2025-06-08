"use client";

import { Shield, Clock, Compass, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Надежность и гарантии",
      description: "Мы тщательно отбираем каждую вакансию и работаем только с проверенными работодателями.",
      color: "from-blue-500/20 to-purple-600/20 text-blue-600"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Удобный график",
      description: "Предлагаем вакансии с разными вахтовыми графиками, подбирая оптимальный режим работы.",
      color: "from-pink-500/20 to-orange-400/20 text-pink-600"
    },
    {
      icon: <Compass className="h-8 w-8" />,
      title: "Работа по всей России",
      description: "Вакансии в различных регионах страны с возможностью выбора желаемого направления.",
      color: "from-green-400/20 to-teal-500/20 text-green-600"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Достойная оплата",
      description: "Высокий уровень заработной платы с прозрачными условиями и своевременными выплатами.",
      color: "from-accent/20 to-blue-600/20 text-accent"
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Наш подход полон преимуществ
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создали платформу, которая объединяет лучшие вакансии и надежных работодателей для вашего успешного трудоустройства
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={cn(
                "mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center",
                feature.color
              )}>
                {feature.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
