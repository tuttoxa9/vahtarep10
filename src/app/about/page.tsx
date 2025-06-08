import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import Footer from "@/components/layout/Footer";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "О нас | Работа Вахтой: Новый Взгляд",
  description: "Мы создали инновационную платформу для поиска работы вахтовым методом. Узнайте, как мы помогаем соискателям найти достойную работу.",
};

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Основной контент */}
      <div className="container-custom py-16 md:py-24">
        <div className="w-full max-w-5xl mx-auto">
          <div className="mb-16">
            <AnimatedHeading
              as="h1"
              className="text-4xl md:text-5xl font-bold mb-6"
              highlightWords={["О нас"]}
              highlightClass="text-accent"
            >
              О нас
            </AnimatedHeading>

            <AnimatedSection type="fade" delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Мы переосмыслили подход к поиску работы вахтовым методом, создав современное
                и интуитивно понятное пространство, где соискатели и работодатели
                находят друг друга.
              </p>
            </AnimatedSection>
          </div>

          {/* Миссия */}
          <div className="mb-24">
            <AnimatedSection type="slideRight" delay={0.2}>
              <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
              <p className="text-muted-foreground mb-6">
                Мы убеждены, что вахтовая работа — это не просто способ заработка, а полноценный карьерный
                путь, который должен быть комфортным и доступным для каждого соискателя.
              </p>
              <p className="text-muted-foreground mb-6">
                Наша миссия — сделать процесс поиска и трудоустройства максимально прозрачным,
                эффективным и взаимовыгодным для всех участников.
              </p>
              <p className="text-muted-foreground">
                Мы соединяем надежных работодателей с мотивированными специалистами,
                создавая прочный фундамент для долгосрочного сотрудничества.
              </p>
            </AnimatedSection>
          </div>

          {/* Чем мы отличаемся */}
          <div className="mb-24">
            <AnimatedSection type="slideLeft" delay={0.2}>
              <h2 className="text-3xl font-bold mb-6">Чем мы отличаемся</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent flex items-center justify-center text-white font-bold">1</span>
                  <div>
                    <h3 className="font-semibold mb-1">Индивидуальный подход</h3>
                    <p className="text-muted-foreground">
                      Мы изучаем потребности каждого соискателя и предлагаем оптимальные варианты трудоустройства.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent flex items-center justify-center text-white font-bold">2</span>
                  <div>
                    <h3 className="font-semibold mb-1">Проверенные работодатели</h3>
                    <p className="text-muted-foreground">
                      Мы сотрудничаем только с надежными компаниями, которые соблюдают трудовое законодательство.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent flex items-center justify-center text-white font-bold">3</span>
                  <div>
                    <h3 className="font-semibold mb-1">Поддержка на всех этапах</h3>
                    <p className="text-muted-foreground">
                      Наши специалисты сопровождают кандидатов от подачи заявки до начала работы.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent flex items-center justify-center text-white font-bold">4</span>
                  <div>
                    <h3 className="font-semibold mb-1">Прозрачные условия</h3>
                    <p className="text-muted-foreground">
                      Мы предоставляем исчерпывающую информацию о каждой вакансии, включая условия проживания и оплаты.
                    </p>
                  </div>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <Footer />
    </PageLayout>
  );
}
