"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ApplicationFormProps {
  vacancyId: string;
  vacancyTitle?: string;
  className?: string;
}

interface FormValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ApplicationForm({ vacancyId, vacancyTitle, className }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Определяем URL в зависимости от окружения
    const getApiUrl = () => {
      // Для production всегда используем Netlify функции
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        // Если это Netlify деплой или любой домен кроме localhost
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
          return '/.netlify/functions/submit-application-fixed';
        }
      }
      // Для локальной разработки используем API route
      return '/api/submit-application';
    };

    // Fallback функция для упрощенной версии
    const getFallbackUrl = () => {
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
          return '/.netlify/functions/submit-application-simple';
        }
      }
      return null;
    };

    const apiUrl = getApiUrl();
    const fallbackUrl = getFallbackUrl();

    try {

      console.log('Submitting to:', apiUrl);

      // Отправляем заявку
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vacancyId,
          applicantName: data.name,
          applicantPhone: data.phone,
          applicantEmail: data.email,
          message: data.message,
        }),
      });

      // Если основная функция не работает, попробуем fallback
      if (!response.ok && fallbackUrl) {
        console.log('Primary function failed, trying fallback:', fallbackUrl);
        response = await fetch(fallbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vacancyId,
            applicantName: data.name,
            applicantPhone: data.phone,
            applicantEmail: data.email,
            message: data.message,
          }),
        });
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok && result.success) {
        setSubmitted(true);

        // Показываем статус операции
        let successMessage = "Заявка успешно отправлена!";
        if (result.debug) {
          if (result.debug.firebaseSaved && result.debug.telegramSent) {
            successMessage += " Данные сохранены в базе и уведомление отправлено.";
          } else if (result.debug.firebaseSaved) {
            successMessage += " Данные сохранены в базе.";
          } else if (result.debug.telegramSent) {
            successMessage += " Уведомление отправлено.";
          } else {
            successMessage += " Мы обработаем вашу заявку в ближайшее время.";
          }
        }

        toast.success("Заявка отправлена! Перенаправляем...");

        // Сбрасываем форму
        form.reset();

        // Перенаправление на единую страницу благодарности
        setTimeout(() => {
          const params = new URLSearchParams();
          if (vacancyTitle) {
            params.set('vacancy', vacancyTitle);
          }
          router.push(`/thank-you2?${params.toString()}`);
        }, 1000);
      } else {
        console.error("Server error:", result);
        const errorMessage = result.error || `Ошибка сервера (${response.status}). Пожалуйста, попробуйте еще раз.`;
        toast.error(errorMessage);

        // Логируем дополнительную информацию для отладки
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        console.log('Response body:', result);
      }
    } catch (error) {
      console.error("Error submitting application:", error);

      // Более детальная обработка ошибок
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast.error("Ошибка сети. Проверьте подключение к интернету и попробуйте снова.");
      } else {
        toast.error("Произошла неожиданная ошибка. Пожалуйста, попробуйте еще раз или обратитесь в поддержку.");
      }

      // Логируем для отладки
      console.log('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        type: typeof error,
        currentUrl: window.location.href,
        apiUrl
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  if (submitted) {
    return (
      <motion.div
        className={cn(
          "card-depth bg-primary/5 border border-primary/20 p-8 rounded-xl text-center space-y-4 shadow-xl shadow-primary/5",
          className
        )}
        variants={successVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary h-8 w-8 drop-shadow-sm"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-shadow-xs">Спасибо за вашу заявку!</h3>
        <p className="text-muted-foreground">
          Мы получили вашу заявку и свяжемся с вами в ближайшее время.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-4 btn-depth"
        >
          Отправить еще одну заявку
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        "card-depth bg-white/90 backdrop-blur-sm border border-border/30 p-6 rounded-xl",
        className
      )}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-shadow-xs">Откликнуться на вакансию</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Имя обязательно для заполнения" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше имя" className="shadow-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            rules={{
              required: "Телефон обязателен для заполнения",
              pattern: {
                value: /^(\+?\d{1,3}[- ]?)?\d{10,}$/,
                message: "Укажите корректный номер телефона"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <Input placeholder="+7 (___) ___-__-__" className="shadow-sm" {...field} />
                </FormControl>
                <FormDescription>
                  Мы свяжемся с вами по указанному номеру
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Укажите корректный email"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (необязательно)</FormLabel>
                <FormControl>
                  <Input placeholder="vahta1.ru@gmail.com" className="shadow-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сообщение (необязательно)</FormLabel>
                <FormControl>
                  <textarea
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none h-24 shadow-sm"
                    placeholder="Дополнительная информация..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full btn-depth bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
