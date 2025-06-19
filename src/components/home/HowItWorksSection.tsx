"use client";

import { SearchIcon, FileCheck, PhoneCall, BriefcaseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

export default function HowItWorksSection() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Найдите вакансию",
      description: "Используйте фильтры для поиска подходящих предложений в нужном регионе, по уровню оплаты и требованиям.",
      icon: <SearchIcon className="h-6 w-6" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      number: 2,
      title: "Оставьте заявку",
      description: "Заполните простую форму отклика, указав свои контактные данные для обратной связи.",
      icon: <FileCheck className="h-6 w-6" />,
      color: "from-accent to-primary"
    },
    {
      number: 3,
      title: "Получите звонок",
      description: "HR-менеджер свяжется с вами в течение рабочего дня для уточнения деталей и назначения встречи.",
      icon: <PhoneCall className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      number: 4,
      title: "Начните работать",
      description: "После успешного собеседования получите всю необходимую информацию и приступайте к работе.",
      icon: <BriefcaseIcon className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Как это работает
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Простой и понятный процесс трудоустройства в 4 шага
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative text-center group"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 z-0" />
              )}

              <div className="relative z-10 bg-white">
                <div className={cn(
                  "mx-auto w-24 h-24 rounded-full bg-gradient-to-br flex items-center justify-center text-white mb-6 shadow-lg",
                  step.color
                )}>
                  <div className="text-center">
                    <div className="text-sm font-bold mb-1">Шаг</div>
                    <div className="text-2xl font-bold">{step.number}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mx-auto mb-4",
                    step.color
                  )}>
                    {step.icon}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
