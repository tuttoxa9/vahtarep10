"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeftIcon, MapPinIcon, BriefcaseIcon, StarIcon, EyeIcon, CalendarIcon } from "lucide-react";
import type { FirestoreVacancy } from "@/types";
import { Button } from "@/components/ui/button";
import ApplicationForm from "./ApplicationForm";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatSalary } from "@/lib/utils";

interface VacancyDetailProps {
  vacancy: FirestoreVacancy;
}

export default function VacancyDetail({ vacancy }: VacancyDetailProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleApplicationForm = () => {
    setShowApplicationForm(!showApplicationForm);
  };

  // Функция для обработки даты в разных форматах
  const formatCreatedDate = (date: any) => {
    if (typeof date === 'string') {
      return formatDate(new Date(date));
    } else if (date instanceof Date) {
      return formatDate(date);
    } else if (date && typeof date === 'object' && 'toDate' in date && typeof date.toDate === 'function') {
      return formatDate(date.toDate());
    }
    return 'Дата не указана';
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Верхняя секция с изображением */}
      <div className="relative w-full h-60 sm:h-80 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-strong">
        {vacancy.imageUrl ? (
          <Image
            src={vacancy.imageUrl}
            alt={vacancy.title}
            className="object-cover w-full h-full"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/90 to-primary-foreground/90" />
        )}

        {/* Затемнение фона с градиентом */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.5), rgba(0,0,0,0.3))",
          }}
        />

        {/* Кнопка возврата и счётчик просмотров */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/vacancies">
            <Button
              variant="outline"
              size="sm"
              className="btn-depth bg-white/90 backdrop-blur-sm hover:bg-white/70"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Назад к вакансиям
            </Button>
          </Link>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2 text-sm bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full shadow-md">
            <EyeIcon className="h-4 w-4 text-accent/80" />
            <span>{vacancy.viewCount || 0} просмотров</span>
          </div>
        </div>

        {/* Заголовок и основная информация */}
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 z-10">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {vacancy.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap gap-2 sm:gap-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <MapPinIcon className="h-4 w-4" />
              <span>{vacancy.location}</span>
            </div>

            {vacancy.employment_type && (
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                <BriefcaseIcon className="h-4 w-4" />
                <span>{vacancy.employment_type}</span>
              </div>
            )}

            {vacancy.company && (
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                <StarIcon className="h-4 w-4" />
                <span>{vacancy.company}</span>
              </div>
            )}

            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <CalendarIcon className="h-4 w-4" />
              <span>{formatCreatedDate(vacancy.createdAt)}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Основной контент и сайдбар */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6">
        {/* Основная информация */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatedSection type="slideUp" delay={0.1}>
            <div className="card-depth bg-white/90 backdrop-blur-sm border border-border/30 rounded-xl p-6 mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2 text-shadow-xs">
                {formatSalary(vacancy.salary)}
              </h2>

              {vacancy.experience && (
                <p className="text-foreground/70 mb-4">
                  Требуемый опыт: {vacancy.experience}
                </p>
              )}

              <Button
                size="lg"
                onClick={toggleApplicationForm}
                className="btn-depth bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/20 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/30"
              >
                Откликнуться на вакансию
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection type="slideUp" delay={0.2}>
            <div className="card-depth bg-white/90 backdrop-blur-sm border border-border/30 rounded-xl p-6 space-y-6">
              <h3 className="text-2xl font-bold text-foreground text-shadow-xs">Описание вакансии</h3>
              <div className="prose prose-blue max-w-none">
                {vacancy.description?.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-foreground/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {vacancy.requirements && vacancy.requirements.length > 0 && (
            <AnimatedSection type="slideUp" delay={0.3}>
              <div className="card-depth bg-white/90 backdrop-blur-sm border border-border/30 rounded-xl p-6 space-y-6">
                <h3 className="text-2xl font-bold text-foreground text-shadow-xs">Требования</h3>
                <ul className="space-y-3">
                  {vacancy.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
                      <span className="text-foreground/80">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}

          {vacancy.benefits && vacancy.benefits.length > 0 && (
            <AnimatedSection type="slideUp" delay={0.4}>
              <div className="card-depth bg-white/90 backdrop-blur-sm border border-border/30 rounded-xl p-6 space-y-6">
                <h3 className="text-2xl font-bold text-foreground text-shadow-xs">Преимущества</h3>
                <div className="flex flex-wrap gap-2">
                  {vacancy.benefits.map((benefit, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1.5 text-sm bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    >
                      {typeof benefit === 'string' ? benefit : benefit.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>

        {/* Сайдбар с формой отклика - улучшенный фиксированный блок */}
        <div className="lg:col-span-1 relative">
          <div
            style={{
              position: 'sticky',
              top: '120px',
              zIndex: 10
            }}
            className="sticky-sidebar relative"
          >
            {showApplicationForm ? (
              <AnimatedSection type="slideUp">
                <ApplicationForm vacancyId={vacancy.id} />
              </AnimatedSection>
            ) : (
              <AnimatedSection type="slideUp" delay={0.3}>
                <div 
                  className="card-depth bg-white/90 backdrop-blur-sm border border-border/30 rounded-xl p-6 space-y-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <h3 className="text-xl font-bold text-foreground text-shadow-xs">Интересует эта вакансия?</h3>
                  <p className="text-foreground/70">
                    Заполните форму отклика, и наши специалисты свяжутся с вами для обсуждения деталей.
                  </p>
                  <Button
                    onClick={toggleApplicationForm}
                    className="w-full btn-depth bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
                  >
                    Откликнуться
                  </Button>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}