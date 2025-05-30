"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ApplicationForm from "./ApplicationForm";
import ApplicationModal from "./ApplicationModal";
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
  X,
  ExternalLink,
} from "lucide-react";

interface VacancyOverlayProps {
  vacancy: FirestoreVacancy;
  isOpen: boolean;
  onClose: () => void;
}

export default function VacancyOverlay({
  vacancy,
  isOpen,
  onClose
}: VacancyOverlayProps) {
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Блокируем прокрутку основной страницы
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Восстанавливаем прокрутку
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const openApplicationModal = () => {
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
  };

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

  const overlayVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <div
        key={`vacancy-overlay-${vacancy.id}`}
        className="fixed z-[10000]"
        style={{
          overflowY: 'auto',
          height: '100vh',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'fixed',
          width: '100vw',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Затемненный фон */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[10001]"
          onClick={onClose}
        />

        {/* Контент модального окна */}
        <motion.div
          key={`vacancy-content-${vacancy.id}`}
          className="relative bg-white min-h-screen w-full z-[10002]"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Красный градиентный хедер */}
          <div className="relative h-60 bg-gradient-to-br from-red-500 via-red-600 to-red-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-red-900/40" />
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/10 rounded-full blur-lg" />

            <div className="relative z-10 h-full flex flex-col text-white">
              <div className="flex items-center justify-between mb-6 px-6 pt-6 md:px-28">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-300"
                  onClick={onClose}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Закрыть
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white transition-all duration-300"
                  onClick={openApplicationModal}
                >
                  <User className="h-4 w-4 mr-2" />
                  Откликнуться
                </Button>
              </div>

              <div className="flex-grow flex flex-col justify-center px-6 md:px-28">
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold break-words">
                    {vacancy.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Основной контент */}
          <div className="relative z-20 px-6 pb-24 md:pb-12 bg-white -mt-6 rounded-t-3xl pt-10 md:px-28">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Левая колонка */}
                <div className="lg:col-span-2 space-y-6">
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
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">{vacancy.experience}</span>
                      </div>
                    </div>

                    <div className="prose max-w-none">
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">Описание вакансии</h3>
                      <div className="text-gray-700 leading-relaxed space-y-4">
                        <p className="text-base md:text-lg">
                          Присоединяйтесь к нашей профессиональной команде и получите стабильную работу с отличными условиями и достойной оплатой труда.
                        </p>
                        {vacancy.description && (
                          <div className="whitespace-pre-wrap text-base md:text-lg">
                            {vacancy.description}
                          </div>
                        )}

                        {/* Кнопка "Узнать подробнее" в конце описания */}
                        {vacancy.detailsUrl && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <Button
                              asChild
                              variant="outline"
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 font-medium px-6 py-3 rounded-lg"
                            >
                              <a
                                href={vacancy.detailsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2"
                              >
                                <ExternalLink className="h-5 w-5" />
                                Узнать подробнее
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {vacancy.requirements && (
                      <div className="prose max-w-none">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Требования</h3>
                        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {vacancy.requirements}
                        </div>
                      </div>
                    )}


                  </div>
                </div>

                {/* Правая колонка */}
                <div className="space-y-6">
                  {vacancy.benefits && (
                    <BenefitsSection benefits={vacancy.benefits} />
                  )}

                  {/* Блок отклика - скрыт на мобильных устройствах */}
                  <div className="hidden md:block bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h3 className="text-lg font-semibold mb-4 text-red-900">Откликнуться на вакансию</h3>
                    <p className="text-red-700 mb-4 text-sm">
                      Заинтересованы в этой позиции? Заполните форму и мы свяжемся с вами в ближайшее время.
                    </p>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
                      onClick={openApplicationModal}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Откликнуться на вакансию
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Дополнительное пустое пространство для удлинения страницы */}
            <div className="h-48 md:h-0"></div>

            {/* Кнопка отклика в самом низу для мобильной версии */}
            <div className="md:hidden fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
                onClick={openApplicationModal}
              >
                Откликнуться
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно для формы отклика */}
      <ApplicationModal
        vacancy={vacancy}
        isOpen={showApplicationModal}
        onClose={closeApplicationModal}
      />
    </AnimatePresence>
  );
}
