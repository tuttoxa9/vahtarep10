import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Footer from "@/components/layout/Footer";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты | Работа Вахтой: Новый Взгляд",
  description: "Свяжитесь с нами по вопросам вакансий вахтовым методом. Наши специалисты готовы ответить на все ваши вопросы и помочь найти подходящую работу.",
};

export default function ContactPage() {
  return (
    <PageLayout>
      {/* Основной контент */}
      <div className="container-custom py-16 md:py-24">
        <div className="w-full max-w-5xl mx-auto">
          <div className="mb-16">
            <AnimatedHeading
              as="h1"
              className="text-4xl md:text-5xl font-bold mb-6"
              highlightWords={["Контакты"]}
              highlightClass="text-accent"
            >
              Контакты
            </AnimatedHeading>

            <AnimatedSection type="fade" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Есть вопросы или предложения? Мы всегда рады общению!
                Свяжитесь с нами любым удобным способом, и мы
                ответим в самое ближайшее время.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Контактная информация */}
            <AnimatedSection type="slideRight" delay={0.2}>
              <h2 className="text-2xl font-bold mb-6">Наши контакты</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                    <p className="text-muted-foreground mb-1">Для общих вопросов:</p>
                    <p className="text-lg font-medium">+7 (495) 123-45-67</p>
                    <p className="text-muted-foreground mb-1 mt-2">Для соискателей:</p>
                    <p className="text-lg font-medium">+7 (495) 765-43-21</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground mb-1">Для общих вопросов:</p>
                    <p className="text-lg font-medium">info@rabotavahtoy.ru</p>
                    <p className="text-muted-foreground mb-1 mt-2">Для соискателей:</p>
                    <p className="text-lg font-medium">hr@rabotavahtoy.ru</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                    <p className="text-muted-foreground mb-1">Главный офис:</p>
                    <p className="text-lg">
                      ул. Примерная, 123, офис 45<br />
                      Москва, Россия, 123456
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Часы работы</h3>
                    <p className="text-lg mb-1">Понедельник - Пятница: 9:00 - 18:00</p>
                    <p className="text-lg">Суббота - Воскресенье: Выходной</p>
                  </div>
                </div>
              </div>


            </AnimatedSection>

            {/* Форма обратной связи */}
            <AnimatedSection type="slideLeft" delay={0.4}>
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Имя
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@mail.ru"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Тема
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Тема обращения"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Ваше сообщение..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white">
                    Отправить сообщение
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>


        </div>
      </div>

      <Footer />
    </PageLayout>
  );
}
