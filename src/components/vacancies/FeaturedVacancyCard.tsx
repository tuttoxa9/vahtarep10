"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock, Star, Zap } from "lucide-react";
import { cn, formatSalary } from "@/lib/utils";
import type { FirestoreVacancy } from "@/types";

interface FeaturedVacancyCardProps {
  vacancy: FirestoreVacancy;
  onClick: (vacancy: FirestoreVacancy) => void;
  index: number;
}

export default function FeaturedVacancyCard({
  vacancy,
  onClick,
  index
}: FeaturedVacancyCardProps) {
  const {
    title,
    company,
    location,
    salary,
    experience,
    employment_type,
    description,
  } = vacancy;

  // Очищаем описание от стандартного текста
  const cleanDescription = description?.replace(
    /Присоединяйтесь к нашей профессиональной команде и получите стабильную работу с отличными условиями и достойной оплатой труда\.\s*/g,
    ""
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: index * 0.05
      }
    }
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 3,
        ease: "linear",
        repeatDelay: 2
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(239, 68, 68, 0.25), 0 0 30px rgba(239, 68, 68, 0.3)"
      }}
      className="relative overflow-hidden cursor-pointer w-full"
      onClick={() => onClick(vacancy)}
    >
      {/* Анимированный градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />

      {/* Мерцающая анимация */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />

      {/* Светящаяся рамка */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 p-[2px]">
        <div className="h-full w-full rounded-xl bg-white" />
      </div>

      {/* Основное содержимое */}
      <div className="relative bg-white rounded-xl p-10 border-0 shadow-[0_8px_32px_rgba(239,68,68,0.15)] transition-all duration-300">

        {/* Бейдж особенной вакансии */}
        <motion.div
          className="absolute -top-1 -right-1 flex items-center gap-1 bg-gradient-to-r from-red-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <Star className="w-3 h-3 fill-current" />
          ОСОБЕННАЯ
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-8">
          {/* Анимированная иконка компании */}
          <motion.div
            className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-red-100 via-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto sm:mx-0 border-2 border-gradient-to-r from-red-300 to-purple-300 relative overflow-hidden"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Пульсирующий фон */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-200/50 to-purple-200/50 rounded-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut"
              }}
            />

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 4,
                ease: "easeInOut"
              }}
            >
              <Briefcase className="w-16 h-16 text-red-600/80 relative z-10" />
            </motion.div>

            {/* Мерцающие частицы */}
            <motion.div
              className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute bottom-3 left-3 w-1 h-1 bg-blue-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                delay: 1
              }}
            />
          </motion.div>

          {/* Основная информация */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 text-center sm:text-left">
              <div className="flex-1 min-w-0 sm:pr-8 mb-4 sm:mb-0">
                <motion.h3
                  className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  {title}
                </motion.h3>
                <p className="text-muted-foreground font-medium text-lg">
                  {company}
                </p>
              </div>

              <div className="flex-shrink-0 text-center sm:text-right">
                <motion.div
                  className="text-2xl sm:text-3xl font-bold text-red-600 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {formatSalary(salary)}
                </motion.div>
                <div className="inline-block rounded-full px-6 py-2 text-sm font-semibold bg-gradient-to-r from-red-500/10 to-purple-500/10 text-red-600 border-2 border-red-500/20 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "linear"
                    }}
                  />
                  <span className="relative z-10">{employment_type}</span>
                </div>
              </div>
            </div>

            {/* Детали вакансии с анимированными иконками */}
            <div className="flex flex-wrap gap-8 mb-6 text-lg text-muted-foreground">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05, color: "#dc2626" }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                >
                  <MapPin className="w-6 h-6" />
                </motion.div>
                <span>{location}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05, color: "#dc2626" }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "linear"
                  }}
                >
                  <Clock className="w-6 h-6" />
                </motion.div>
                <span>Опыт: {experience}</span>
              </motion.div>
            </div>

            {/* Краткое описание */}
            {cleanDescription && (
              <p className="text-lg text-muted-foreground line-clamp-2 leading-relaxed mb-8">
                {cleanDescription.substring(0, 300)}...
              </p>
            )}

            {/* Анимированная кнопка */}
            <div className="flex justify-end">
              <motion.button
                className="relative px-10 py-4 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Подробнее
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
