"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Send } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-secondary pt-16 pb-8 border-t border-border">
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Колонка 1: О нас */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Работа Вахтой</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Мы создаем новый подход к трудоустройству вахтовым методом, соединяя работодателей
              с квалифицированными специалистами по всей России.
            </p>

          </motion.div>

          {/* Остальной код остается без изменений */}
          {/* Колонка 2: Быстрые ссылки */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">Главная</Link>
              </li>
              <li>
                <Link href="/vacancies" className="text-muted-foreground hover:text-accent transition-colors">Вакансии</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">О нас</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">Контакты</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors">Политика конфиденциальности</Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors">Условия использования</Link>
              </li>
            </ul>
          </motion.div>

          {/* Колонка 3: Популярные города */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Популярные города</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/vacancies?city=Москва"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Москва
                </Link>
              </li>
              <li>
                <Link
                  href="/vacancies?city=Санкт-Петербург"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Санкт-Петербург
                </Link>
              </li>
              <li>
                <Link
                  href="/vacancies?city=Екатеринбург"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Екатеринбург
                </Link>
              </li>
              <li>
                <Link
                  href="/vacancies?city=Новосибирск"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Новосибирск
                </Link>
              </li>
              <li>
                <Link
                  href="/vacancies?city=Нижний Новгород"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Нижний Новгород
                </Link>
              </li>
              <li>
                <Link
                  href="/vacancies?city=Краснодар"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Краснодар
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Колонка 4: Контакты */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Контакты</h3>
            <ul className="space-y-4">

              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <Link href="tel:+74951234567" className="text-muted-foreground hover:text-accent transition-colors">
                  +7 (495) 123-45-67
                </Link>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <Link href="mailto:info@rabotavahtoy.ru" className="text-muted-foreground hover:text-accent transition-colors">
                  info@rabotavahtoy.ru
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Копирайт */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Работа Вахтой: Новый Взгляд. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
