"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FirestoreVacancy } from "@/types";

interface ApplicationModalProps {
  vacancy: FirestoreVacancy;
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  phone: string;
  message: string;
}

export default function ApplicationModal({ vacancy, isOpen, onClose }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Отправляем заявку через новую Netlify функцию
      const response = await fetch('/.netlify/functions/submit-application-fixed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vacancyId: vacancy.id,
          applicantName: data.name,
          applicantPhone: data.phone,
          applicantEmail: '',
          message: data.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        toast.success("Заявка отправлена! Перенаправляем...");

        // Сбрасываем форму
        form.reset();

        // Закрываем модальное окно и перенаправляем на единую страницу благодарности
        setTimeout(() => {
          onClose();
          router.push('/thank-you2');
        }, 1000);
      } else {
        console.error("Server error:", result);
        toast.error(result.error || "Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Произошла ошибка сети. Пожалуйста, проверьте подключение к интернету и попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-border/10">
            <DialogTitle className="text-xl font-bold text-left">
              Откликнуться на вакансию
            </DialogTitle>
            <DialogDescription className="text-left">
              <span className="font-medium text-primary">{vacancy.title}</span>
              <br />
              <span className="text-sm text-muted-foreground">{vacancy.company} • {vacancy.location}</span>
            </DialogDescription>
          </DialogHeader>

          {/* Content */}
          <div className="p-6">
            {submitted ? (
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
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
                    className="text-green-600 h-8 w-8"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Спасибо за вашу заявку!</h3>
                <p className="text-muted-foreground">
                  Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                </p>
                <Button
                  onClick={handleClose}
                  className="w-full mt-4"
                >
                  Закрыть
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Имя обязательно для заполнения" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ФИО *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ваше полное имя" {...field} />
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
                          <FormLabel>Телефон *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ваш номер телефона" {...field} />
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
                          <FormLabel>Сообщение</FormLabel>
                          <FormControl>
                            <textarea
                              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none h-20"
                              placeholder="Дополнительная информация..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        className="flex-1"
                      >
                        Отмена
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Отправка..." : "Отправить"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
