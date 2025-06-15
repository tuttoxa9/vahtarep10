"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md mx-auto">
          {/* Анимированная иллюстрация 404 */}
          <div className="mb-8 relative">
            <motion.div
              className="text-[150px] font-bold text-accent/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              404
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-accent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              404
            </motion.div>

            {/* Декоративные элементы */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-accent/5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.div
              className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-primary/5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Страница не найдена
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            К сожалению, страница, которую вы искали, не существует или была перемещена.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/">
              <Button className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4" />
                На главную
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Вернуться назад
            </Button>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
