"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ApplicationForm from "./ApplicationForm";
import SideNav from "@/components/layout/SideNav";
import BenefitsSection from "./BenefitsSection";
import { formatSalary, formatDate } from "@/lib/utils";
import type { FirestoreVacancy } from "@/types";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Star,
  Eye,
  Calendar,
  DollarSign,
  User,
  Clock,
  CheckCircle,
  Gift,
} from "lucide-react";

interface VacancyDetailNewProps {
  vacancy: FirestoreVacancy;
}

export default function VacancyDetailNew({ vacancy }: VacancyDetailNewProps) {
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

  const pageVariants = {
    initial: {
      y: "-100%",
      zIndex: 50,
    },
    animate: {
      y: 0,
      zIndex: 50,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.4,
      },
    },
    exit: {
      y: "-100%",
      zIndex: 50,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      },
    },
  };

  // Все элементы будут анимироваться вместе с родительским элементом
  const contentVariants = {
    initial: {
      opacity: 1, // Сразу видимый, чтобы не было отдельной анимации
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0, // Мгновенно
      },
    },
  };

  const cardVariants = {
    initial: {
      opacity: 1, // Сразу видимый, чтобы не было отдельной анимации
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0, // Мгновенно
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 md:left-20 bg-gray-50/95 backdrop-blur-sm overflow-y-auto"
      style={{
        zIndex: 9999
      }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Красный градиентный хедер */}
      <div className="relative h-60 bg-gradient-to-br from-red-500 via-red-600 to-red-700 overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-red-900/40" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/10 rounded-full blur-lg" />

        {/* Контент хедера */}
        <div className="relative z-10 h-full flex flex-col p-6 text-white">
          {/* Навигация */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/vacancies">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к вакансиям
              </Button>
            </Link>

            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">{vacancy.viewCount || 0} просмотров</span>
            </div>
          </div>

          {/* Заголовок */}
          <div className="mt-6">
            <motion.div
              className="space-y-4"
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={cardVariants}>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
                  Работа вахтой в РФ
                </h1>
                <p className="text-xl font-medium opacity-95 mb-2 max-w-3xl leading-relaxed">
                  Найдите идеальную вакансию для работы вахтовым методом
                </p>
                <h2 className="text-3xl font-bold mt-3">
                  {vacancy.title}
                </h2>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <motion.div
        className="relative z-20 px-6 pb-12 bg-white -mt-6 rounded-t-3xl pt-10"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Левая колонка - Описание вакансии */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              variants={cardVariants}
            >
              <div className="space-y-6">
                <div>
                  <p className="text-lg text-gray-600 font-medium mb-1">{vacancy.company}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{vacancy.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                    <span className="font-medium">{formatSalary(vacancy.salary)}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                    <Briefcase className="h-5 w-5" />
                    <span className="font-medium">{vacancy.employment_type}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{vacancy.experience}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-500" />
                    Описание вакансии
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-4">
                      Мы приглашаем вас присоединиться к нашей команде в качестве вахтового рабочего.
                    </p>
                    <p className="mb-4">
                      Это отличная возможность для тех, кто ищет стабильную работу с достойной оплатой и комфортными условиями.
                    </p>
                    {vacancy.description && (
                      <div className="whitespace-pre-wrap">
                        {vacancy.description}
                      </div>
                    )}
                  </div>
                </div>

                {/* Требования */}
                {vacancy.requirements && vacancy.requirements.length > 0 && (
                  <div className="prose prose-lg max-w-none mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Требования
                    </h3>
                    <ul className="space-y-3">
                      {vacancy.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Правая колонка - Форма отклика */}
            <motion.div
              className="space-y-6"
              variants={cardVariants}
            >
              {/* Карточка с кнопкой отклика или форма */}
              {showApplicationForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 sticky top-6"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Отклик на вакансию
                      </h3>
                      <Button
                        onClick={toggleApplicationForm}
                        variant="outline"
                        size="sm"
                      >
                        Назад
                      </Button>
                    </div>
                    <ApplicationForm vacancyId={vacancy.id} className="" />
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Откликнуться на вакансию
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Заполните форму и мы свяжемся с вами в ближайшее время
                      </p>
                    </div>

                    <Button
                      onClick={toggleApplicationForm}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Откликнуться
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                      <Calendar className="h-4 w-4" />
                      <span>Опубликовано: {formatCreatedDate(vacancy.createdAt)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Преимущества */}
              {!showApplicationForm && vacancy.benefits && vacancy.benefits.length > 0 && (
                <div className="sticky top-[calc(1.5rem+320px)]">
                  <BenefitsSection benefits={vacancy.benefits} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
