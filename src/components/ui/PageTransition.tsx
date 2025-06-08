"use client";

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prevPathRef = useRef<string>(pathname);

  // Запоминаем предыдущий путь для определения направления анимации
  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  // Отключаем анимацию для детальных страниц вакансий и при переходе на главную
  const isVacancyDetailPage = pathname.includes('/vacancies/') && pathname !== '/vacancies';
  const isHomePage = pathname === '/';
  
  if (isVacancyDetailPage || isHomePage) {
    return <>{children}</>;
  }

  const pageVariants = {
    initial: {
      x: '70%', // Меньшее расстояние для движения, чтобы было быстрее
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400, // Увеличиваем жесткость для более быстрого движения
        damping: 35,    // Увеличиваем демпфирование для более плавной остановки
        mass: 0.8,      // Уменьшаем массу для более легкого и быстрого движения
        duration: 0.25  // Общая длительность короче
      },
    },
    exit: {
      x: '-40%', // Меньшее расстояние для движения, чтобы было быстрее
      opacity: 0,
      transition: {
        duration: 0.2,  // Сокращаем время выхода
        ease: [0.32, 0.72, 0.35, 1.0], // Более плавная кривая с мягким началом и окончанием
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="page-transition-container"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
