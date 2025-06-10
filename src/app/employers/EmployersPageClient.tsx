"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Phone,
  Mail,
  Calculator,
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

export default function EmployersPageClient() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    try {
      // Здесь будет API запрос
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение 2 часов для обсуждения условий сотрудничества.",
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
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "База проверенных работников",
      description: "Более 10 000 квалифицированных специалистов готовых к работе"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Быстрый подбор персонала",
      description: "Подбираем кандидатов за 24-48 часов"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Гарантия качества",
      description: "100% возврат средств при несоответствии кандидата требованиям"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      title: "Выгодные тарифы",
      description: "Специальные цены для крупных работодателей и постоянных клиентов"
    }
  ];

  const tariffs = [
    {
      name: "Стартовый",
      price: "от 15 000 ₽",
      period: "за подбор 1-10 человек",
      features: [
        "Подбор квалифицированных кандидатов",
        "Проверка документов",
        "Первичное собеседование",
        "Техподдержка 5/2"
      ],
      popular: false
    },
    {
      name: "Бизнес",
      price: "от 12 000 ₽",
      period: "за подбор 11-50 человек",
      features: [
        "Все возможности тарифа Стартовый",
        "Скидка 20% при постоянном сотрудничестве",
        "Персональный менеджер",
        "Техподдержка 24/7",
        "Дополнительные проверки кандидатов"
      ],
      popular: true
    },
    {
      name: "Корпоративный",
      price: "Индивидуально",
      period: "для крупных проектов",
      features: [
        "Все возможности тарифа Бизнес",
        "Максимальные скидки до 35%",
        "Выделенная команда специалистов",
        "SLA гарантии",
        "Эксклюзивные условия"
      ],
      popular: false
    }
  ];

  const stats = [
    { number: "10 000+", label: "Проверенных работников" },
    { number: "500+", label: "Довольных работодателей" },
    { number: "24 часа", label: "Среднее время подбора" },
    { number: "98%", label: "Успешных трудоустройств" }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
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
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Найдите{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  идеальных
                </span>{" "}
                вахтовых работников
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                Быстрый подбор квалифицированного персонала для ваших проектов.
                Выгодные условия, гарантии качества и полное сопровождение.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  <Phone className="h-5 w-5 mr-2" />
                  Получить консультацию
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4">
                  <Calculator className="h-5 w-5 mr-2" />
                  Рассчитать стоимость
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Почему выбирают нас
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Мы предлагаем комплексные решения для поиска и найма вахтовых работников
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Tariffs Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Выгодные тарифы
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Выберите подходящий тариф для вашего бизнеса
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tariffs.map((tariff, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {tariff.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Популярный
                      </div>
                    </div>
                  )}
                  <Card className={`h-full ${tariff.popular ? 'ring-2 ring-blue-600 shadow-xl' : 'shadow-lg'} hover:shadow-xl transition-shadow duration-300`}>
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {tariff.name}
                      </CardTitle>
                      <div className="mt-4">
                        <div className="text-4xl font-bold text-blue-600">{tariff.price}</div>
                        <div className="text-gray-600 mt-1">{tariff.period}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {tariff.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${tariff.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                      >
                        {tariff.name === 'Корпоративный' ? 'Связаться с нами' : 'Выбрать тариф'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-white">
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
                            placeholder="+7 (999) 123-45-67"
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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
                Присоединяйтесь к сотням довольных работодателей, которые нашли у нас надежных партнеров
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Phone className="h-5 w-5 mr-2" />
                  Позвонить сейчас
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Узнать больше
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
