"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Users,
  TrendingUp,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Phone,
  Mail,
  Building,
  HandHeart,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import PageLayout from '@/components/layout/PageLayout';
import SplitText from '@/components/ui/SplitText';
import CountUp from '@/components/ui/CountUp';
import { WavyBackground } from '@/components/ui/WavyBackground';

export default function EmployersPageClient() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    workersNeeded: '',
    workType: '',
    location: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    try {
      console.log('Отправка заявки работодателя:', formData);

      const response = await fetch('/.netlify/functions/submit-employer-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Ответ от функции:', result);

      if (response.ok && result.success) {
        toast({
          title: "Заявка отправлена!",
          description: "Перенаправляем на страницу подтверждения...",
        });

        setFormData({
          companyName: '',
          contactPerson: '',
          phone: '',
          email: '',
          workersNeeded: '',
          workType: '',
          location: '',
          message: ''
        });

        // Перенаправление на страницу благодарности для работодателей
        setTimeout(() => {
          router.push("/thank-you-employer");
        }, 1000);
      } else {
        throw new Error(result.error || 'Не удалось отправить заявку');
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Размещение - бесплатно",
      description: "Публикуйте ваши вакансии без оплаты. Начните поиск сотрудников прямо сейчас без первоначальных вложений"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Реклама и продвижение - наша забота",
      description: "Мы берем на себя всю работу по привлечению кандидатов к вашим вакансиям и обеспечиваем максимальную видимость"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Быстрые отклики в первые сутки",
      description: "Получайте заинтересованные отклики от соискателей уже в течение первых 24 часов после публикации вакансии"
    }
  ];



  const stats = [
    { number: 750, label: "Проверенных работников", suffix: "+" },
    { number: 30, label: "Довольных работодателей", suffix: "+" },
    { text: "24 часа", label: "Время подбора" }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen">
        {/* Hero Section with Wavy Background */}
        <WavyBackground
          className="relative z-10"
          containerClassName="relative overflow-hidden"
          colors={[
            "#3b82f6",
            "#6366f1",
            "#8b5cf6",
            "#a855f7",
            "#06b6d4",
          ]}
          waveWidth={70}
          backgroundFill="#f8fafc"
          blur={15}
          speed="slow"
          waveOpacity={0.3}
        >
          <section className="pt-20 pb-16 px-4 md:px-6 lg:px-8">
            <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building className="h-4 w-4 mr-2" />
                Специальные условия для работодателей
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                <div>
                  <SplitText
                    text="Быстрый поиск"
                    className="text-4xl md:text-6xl font-bold"
                    splitType="words"
                    delay={50}
                    duration={0.8}
                  />
                </div>
                <div className="text-blue-600">
                  <SplitText
                    text="ваших работников"
                    className="text-4xl md:text-6xl font-bold"
                    splitType="words"
                    delay={80}
                    duration={0.8}
                  />
                </div>
              </h1>
              <div className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-8">
                <SplitText
                  text="Быстрый подбор квалифицированного персонала для ваших проектов. Выгодные условия, гарантии качества и полное сопровождение."
                  className="text-xl md:text-2xl text-gray-800"
                  splitType="words"
                  delay={30}
                  duration={0.6}
                  threshold={0.2}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                  onClick={scrollToForm}
                >
                  Получить консультацию
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number ? (
                      <>
                        <CountUp to={stat.number} duration={2} delay={0.5} />
                        {stat.suffix}
                      </>
                    ) : (
                      stat.text
                    )}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
            </div>
          </section>
        </WavyBackground>

        {/* Benefits Section */}
        <section className="py-20 bg-white relative z-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Ваши выгоды от сотрудничества
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Мы предлагаем комплексные решения для поиска и найма вахтовых работников
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 bg-white relative z-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Готовы обсудить сотрудничество?
                </h2>
                <p className="text-xl text-gray-600">
                  Оставьте заявку, и мы свяжемся с вами в течение 2 часов
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center flex items-center justify-center">
                      <HandHeart className="h-6 w-6 mr-2 text-blue-600" />
                      Оставить заявку
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="companyName">Название компании *</Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                            placeholder="ООО Ваша компания"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactPerson">Контактное лицо *</Label>
                          <Input
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            required
                            placeholder="Иван Иванов"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="company@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="workersNeeded">Количество работников</Label>
                          <Input
                            id="workersNeeded"
                            name="workersNeeded"
                            value={formData.workersNeeded}
                            onChange={handleInputChange}
                            placeholder="10"
                          />
                        </div>
                        <div>
                          <Label htmlFor="workType">Тип работ</Label>
                          <Input
                            id="workType"
                            name="workType"
                            value={formData.workType}
                            onChange={handleInputChange}
                            placeholder="Строительство, производство..."
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="location">Место работы</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Москва, Санкт-Петербург, регион..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Дополнительная информация</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Расскажите подробнее о ваших потребностях..."
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isFormSubmitting}
                      >
                        {isFormSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="mr-2"
                            >
                              <Zap className="h-5 w-5" />
                            </motion.div>
                            Отправляем...
                          </>
                        ) : (
                          <>
                            <Mail className="h-5 w-5 mr-2" />
                            Отправить заявку
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative z-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Начните экономить уже сегодня
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Присоединяйтесь к довольным работодателям, которые нашли у нас надежных партнеров
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={scrollToForm}
                >
                  Получить консультацию
                </Button>
                <div className="text-white text-xl font-semibold">
                  +375291565232
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
