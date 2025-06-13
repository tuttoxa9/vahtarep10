"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Phone, User, Send } from "lucide-react";
import VacancyCarousel from "./VacancyCarousel";

interface FormValues {
  name: string;
  phone: string;
}

interface HeroApplicationFormProps {
  className?: string;
}

// Валидация телефона для России и Беларуси
const validatePhone = (phone: string) => {
  // Убираем все символы кроме цифр
  const cleanPhone = phone.replace(/\D/g, '');

  // Проверяем российские номера (+7 или 8)
  if (cleanPhone.match(/^[78]\d{10}$/)) {
    return true;
  }

  // Проверяем белорусские номера (+375)
  if (cleanPhone.match(/^375\d{9}$/)) {
    return true;
  }

  return false;
};

// Форматирование телефона
const formatPhone = (value: string) => {
  // Если начинается с + оставляем как есть для цифр
  if (value.startsWith('+')) {
    const cleanValue = value.slice(1).replace(/\D/g, '');

    if (cleanValue.startsWith('375')) {
      // Белорусский номер
      if (cleanValue.length <= 3) return '+375';
      if (cleanValue.length <= 5) return `+375 (${cleanValue.slice(3)}`;
      if (cleanValue.length <= 8) return `+375 (${cleanValue.slice(3, 5)}) ${cleanValue.slice(5)}`;
      if (cleanValue.length <= 10) return `+375 (${cleanValue.slice(3, 5)}) ${cleanValue.slice(5, 8)}-${cleanValue.slice(8)}`;
      return `+375 (${cleanValue.slice(3, 5)}) ${cleanValue.slice(5, 8)}-${cleanValue.slice(8, 10)}-${cleanValue.slice(10, 12)}`;
    }

    if (cleanValue.startsWith('7')) {
      // Российский номер
      if (cleanValue.length <= 1) return '+7';
      if (cleanValue.length <= 4) return `+7 (${cleanValue.slice(1)}`;
      if (cleanValue.length <= 7) return `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4)}`;
      if (cleanValue.length <= 9) return `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4, 7)}-${cleanValue.slice(7)}`;
      return `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4, 7)}-${cleanValue.slice(7, 9)}-${cleanValue.slice(9, 11)}`;
    }

    return '+' + cleanValue;
  }

  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.startsWith('8')) {
    // 8 -> +7
    const phone = '7' + cleanValue.slice(1);
    if (phone.length <= 1) return '+7';
    if (phone.length <= 4) return `+7 (${phone.slice(1)}`;
    if (phone.length <= 7) return `+7 (${phone.slice(1, 4)}) ${phone.slice(4)}`;
    if (phone.length <= 9) return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
    return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
  }

  return value;
};

export default function HeroApplicationForm({ className }: HeroApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!validatePhone(data.phone)) {
      toast.error("Введите корректный номер телефона");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vacancyId: 'hero-application',
          applicantName: data.name,
          applicantPhone: data.phone,
          applicantEmail: '',
          message: 'Заявка с главной страницы - подбор вакансии',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Заявка отправлена! Перенаправляем...");
        form.reset({ name: "", phone: "" });

        // Перенаправление на единую страницу благодарности
        setTimeout(() => {
          router.push("/thank-you2");
        }, 1000);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Произошла ошибка при отправке заявки");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20",
        "max-w-md w-full",
        className
      )}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Подберём вакансию для вас
        </h3>
        <p className="text-gray-600 text-sm">
          Оставьте заявку и наш HR-менеджер свяжется с вами в течение часа
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            rules={{
              required: "Укажите ваше имя",
              minLength: {
                value: 2,
                message: "Имя должно содержать минимум 2 символа"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">ФИО</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Иванов Иван Иванович"
                      className="pl-10 h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-xl"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            rules={{
              required: "Укажите номер телефона",
              validate: {
                valid: (value) => validatePhone(value) || "Введите корректный номер телефона РФ или РБ"
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Номер телефона
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Номер телефона"
                      className="pl-10 h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-xl"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Разрешаем только цифры, +, (, ), -, пробелы
                        const allowedChars = /[0-9+\-\(\)\s]/g;
                        const filteredValue = value.match(allowedChars)?.join('') || '';
                        const formatted = formatPhone(filteredValue);
                        field.onChange(formatted);
                      }}
                      onKeyPress={(e) => {
                        // Блокируем ввод букв
                        if (!/[0-9+\-\(\)\s]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Отправляем...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Отправить заявку</span>
              </div>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Нажимая "Отправить заявку", вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </Form>

      {/* Карусель вакансий */}
      <div className="mt-6">
        <VacancyCarousel className="h-12" />
      </div>
    </div>
  );
}
