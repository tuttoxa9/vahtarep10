"use client";

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Phone, ArrowLeft, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ThankYouVacancyContent() {
  const searchParams = useSearchParams();
  const vacancyTitle = searchParams.get('vacancy') || 'выбранную вакансию';

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl w-full"
        >
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12 text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="mb-8"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
              </motion.div>

              {/* Main Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Отклик отправлен!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Ваш отклик на вакансию <span className="font-semibold text-emerald-600">"{vacancyTitle}"</span> успешно отправлен. Работодатель получит ваши данные и свяжется с вами в ближайшее время.
                </p>
              </motion.div>

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                <div className="bg-emerald-50 rounded-lg p-4">
                  <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Время ответа</h3>
                  <p className="text-sm text-gray-600">1-3 рабочих дня</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <Briefcase className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Способ связи</h3>
                  <p className="text-sm text-gray-600">Звонок работодателя</p>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-gray-50 rounded-lg p-6 mb-8"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Что происходит дальше?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                    <p className="text-gray-600">Работодатель получает ваш отклик и изучает ваши данные</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                    <p className="text-gray-600">При заинтересованности с вами свяжутся для уточнения деталей</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                    <p className="text-gray-600">Проведут собеседование и обсудят условия работы</p>
                  </div>
                </div>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-6 mb-8"
              >
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-emerald-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Полезные советы</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-emerald-600">Держите телефон включенным</div>
                    <div className="text-gray-600">чтобы не пропустить звонок</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-600">Подготовьте вопросы</div>
                    <div className="text-gray-600">об условиях работы</div>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/vacancies">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Смотреть другие вакансии
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    На главную
                  </Button>
                </Link>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <p className="text-sm text-gray-500">
                  Вопросы по вакансии? Звоните:{" "}
                  <a href="tel:+375291565232" className="text-emerald-600 hover:underline font-medium">
                    +375 29 156 52 32
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
}

export default function ThankYouVacancyPage() {
  return (
    <Suspense fallback={
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
        </div>
      </PageLayout>
    }>
      <ThankYouVacancyContent />
    </Suspense>
  );
}
