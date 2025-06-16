import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Вахта',
  description: 'Политика конфиденциальности и защиты персональных данных'
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Политика конфиденциальности</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
          <p className="mb-4">
            Настоящая Политика конфиденциальности регулирует порядок обработки и использования персональных
            данных пользователей сайта vahtarep10 (далее — "Сайт").
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Сбор и использование данных</h2>
          <p className="mb-4">
            Мы собираем и обрабатываем следующие категории персональных данных:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Контактная информация (имя, телефон, email)</li>
            <li>Профессиональная информация (опыт работы, навыки)</li>
            <li>Технические данные (IP-адрес, тип браузера, время посещения)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Аналитика и метрики</h2>
          <p className="mb-4">
            Для улучшения качества предоставляемых услуг и анализа использования Сайта мы применяем:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Яндекс.Метрика</strong> — для анализа поведения пользователей и статистики посещений</li>
            <li><strong>Яндекс.Вебмастер</strong> — для мониторинга технического состояния сайта и оптимизации поисковой выдачи</li>
            <li>Другие аналитические инструменты для улучшения пользовательского опыта</li>
          </ul>
          <p className="mb-4">
            Данные инструменты могут собирать анонимную информацию о ваших действиях на сайте,
            включая просмотренные страницы, время пребывания и источники перехода.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Цели обработки данных</h2>
          <p className="mb-4">Персональные данные обрабатываются в следующих целях:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Предоставление услуг по поиску работы</li>
            <li>Связь с соискателями и работодателями</li>
            <li>Улучшение функциональности сайта</li>
            <li>Анализ эффективности и популярности контента</li>
            <li>Техническая поддержка пользователей</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Передача данных третьим лицам</h2>
          <p className="mb-4">
            Мы не передаем персональные данные третьим лицам, за исключением случаев:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Получения согласия пользователя</li>
            <li>Требований законодательства</li>
            <li>Использования сервисов аналитики (Яндекс.Метрика, Яндекс.Вебмастер)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Защита данных</h2>
          <p className="mb-4">
            Мы применяем технические и организационные меры для защиты персональных данных
            от несанкционированного доступа, изменения, раскрытия или уничтожения.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Права пользователей</h2>
          <p className="mb-4">Пользователи имеют право:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Получать информацию об обработке персональных данных</li>
            <li>Требовать уточнения, блокирования или удаления данных</li>
            <li>Отзывать согласие на обработку данных</li>
            <li>Обращаться в надзорные органы</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Контактная информация</h2>
          <p className="mb-4">
            По вопросам обработки персональных данных обращайтесь по электронной почте
            или через форму обратной связи на сайте.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Изменения политики</h2>
          <p className="mb-4">
            Мы оставляем за собой право вносить изменения в данную Политику конфиденциальности.
            Актуальная версия всегда доступна на данной странице.
          </p>
          <p className="text-sm text-gray-600">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </section>
      </div>
    </div>
  )
}
