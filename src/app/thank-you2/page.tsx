"use client";

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Phone, ArrowLeft, Briefcase, Star, Users, Sparkles, Heart, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import { Suspense } from 'react';

function ThankYou2Content() {

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-sky-50 to-emerald-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-full blur-lg"
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl w-full"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md relative overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-emerald-500/5" />

              <CardContent className="relative p-8 md:p-16 text-center">
                {/* Floating icons */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                  className="absolute top-8 left-8 text-violet-400/60"
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [10, -10, 10],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-8 right-8 text-emerald-400/60"
                >
                  <Trophy className="w-6 h-6" />
                </motion.div>

                {/* Success Icon with enhanced animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  className="mb-8"
                >
                  <div className="relative w-24 h-24 mx-auto">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }}
                      className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle className="w-14 h-14 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    />
                  </div>
                </motion.div>

                {/* Main Message with enhanced typography */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    🎉 Заявка отправлена!
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-700 mb-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    Ваша заявка на вакансию успешно отправлена! Работодатель получит ваши данные и свяжется с вами в ближайшее время.
                  </motion.p>
                </motion.div>

                {/* Enhanced Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
                >
                  <motion.div
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100/50 shadow-lg"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    </motion.div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Время ответа</h3>
                    <p className="text-gray-600 font-medium">
                      1-3 рабочих дня
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100/50 shadow-lg"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    >
                      <Users className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                    </motion.div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Кто свяжется</h3>
                    <p className="text-gray-600 font-medium">
                      Представитель работодателя
                    </p>
                  </motion.div>
                </motion.div>

                {/* Enhanced Next Steps */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                  className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-8 mb-10 border border-gray-100 shadow-inner"
                >
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-3"
                    >
                      <Zap className="w-7 h-7 text-amber-500" />
                    </motion.div>
                    <h3 className="font-bold text-gray-900 text-xl">Что происходит дальше?</h3>
                  </div>

                  <div className="space-y-4 text-left max-w-md mx-auto">
                    {[
                      "Работодатель получает ваш отклик и изучает ваши данные",
                      "При заинтересованности с вами свяжутся для уточнения деталей",
                      "Проведут собеседование и обсудят условия работы"
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6 + index * 0.2, duration: 0.6 }}
                      >
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1 shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {index + 1}
                        </motion.div>
                        <p className="text-gray-700 font-medium leading-relaxed">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Tips Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-2xl p-8 mb-10 border border-amber-100/50 shadow-lg"
                >
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="mr-3"
                    >
                      <Star className="w-7 h-7 text-amber-500" />
                    </motion.div>
                    <h3 className="font-bold text-gray-900 text-xl">Полезные советы</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      className="text-center p-4 bg-white/60 rounded-xl border border-amber-100/50"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="font-bold text-amber-600 text-lg mb-1">📱 Держите телефон включенным</div>
                      <div className="text-gray-600">чтобы не пропустить звонок</div>
                    </motion.div>
                    <motion.div
                      className="text-center p-4 bg-white/60 rounded-xl border border-amber-100/50"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="font-bold text-blue-600 text-lg mb-1">❓ Подготовьте вопросы</div>
                      <div className="text-gray-600">об условиях работы</div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                >
                  <Link href="/vacancies">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg">
                        <Briefcase className="w-5 h-5 mr-2" />
                        Смотреть другие вакансии
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Button variant="outline" className="border-2 border-violet-300 text-violet-600 hover:bg-violet-50 px-8 py-3 rounded-xl font-semibold shadow-lg">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        На главную
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Enhanced Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4, duration: 0.8 }}
                  className="pt-8 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-3 rounded-full border border-emerald-100"
                  >
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-gray-600 mr-2">Есть вопросы? Звоните:</span>
                    <a
                      href="tel:+375291565232"
                      className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors duration-200"
                    >
                      +375 29 156 52 32
                    </a>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}

export default function ThankYou2Page() {
  return (
    <Suspense fallback={
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-violet-100 via-sky-50 to-emerald-50 flex items-center justify-center px-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full"
          />
        </div>
      </PageLayout>
    }>
      <ThankYou2Content />
    </Suspense>
  );
}
