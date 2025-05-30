"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Начните свой карьерный путь <span className="text-red-600">сегодня</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-10 mx-auto max-w-2xl">
            Присоединяйтесь к тысячам специалистов, которые уже нашли
            работу вахтовым методом на нашей платформе. Мы помогаем соединять
            талантливых сотрудников с ведущими работодателями по всей России.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vacancies">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Найти вакансию
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Связаться с нами
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
