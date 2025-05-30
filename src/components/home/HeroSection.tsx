"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const backgroundImages = [
  {
    src: "/images/warehouse-bg.webp",
    alt: "Работа на складе",
  },
  {
    src: "/images/workers-bg.webp",
    alt: "Строительные работы",
  },
  {
    src: "/images/site-bg.webp",
    alt: "Транспортные перевозки",
  },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Создаем интервал для смены фоновых изображений каждые 2.5 секунды
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <section className="relative h-screen lg:h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gray-900" />
      </section>
    );
  }

  return (
    <section className="relative h-[35vh] md:h-screen overflow-visible">
      {/* Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Enhanced Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto md:mx-0">
            <div className="text-center md:text-left py-3 md:py-12 px-2">

              {/* Main Headline */}
              <div className="mb-2 md:mb-6">
                <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-white leading-tight md:leading-[1.1] tracking-tight">
                  <span className="block">Найди свою</span>
                  <span className="block text-red-500">идеальную работу</span>
                  <span className="block">вахтовым методом</span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="mb-3 md:mb-8 max-w-2xl mx-auto md:mx-0">
                <p className="text-sm md:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium">
                  Стабильная работа с высокой зарплатой и полным социальным пакетом
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-1 md:mt-4">
                <div className="flex justify-center md:justify-start">
                  <Link
                    href="/vacancies"
                    className="group inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-xl transition-all duration-300 shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 hover:-translate-y-1"
                  >
                    Посмотреть вакансии
                    <ArrowRight className="ml-2 md:ml-3 h-4 w-4 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
