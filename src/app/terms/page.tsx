import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Условия использования | Вахта',
  description: 'Условия использования сервиса и пользовательское соглашение'
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Условия использования</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
          <p className="mb-4">
            Настоящие Условия использования (далее — "Условия") регулируют порядок доступа и использования
            сайта vahta1.ru (далее — "Сайт", "Сервис") всеми пользователями.
          </p>
          <p className="mb-4">
            Используя Сайт, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо
            положениями, пожалуйста, не используйте Сайт.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Описание сервиса</h2>
          <p className="mb-4">
            Сайт предоставляет информационные услуги по поиску работы, включая:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Размещение и просмотр вакансий</li>
            <li>Подачу заявок на вакансии</li>
            <li>Связь между соискателями и работодателями</li>
            <li>Информационную поддержку в области трудоустройства</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibond mb-4">3. Регистрация и аккаунт</h2>
          <p className="mb-4">
            Для использования некоторых функций Сайта может потребоваться предоставление персональных данных.
            Пользователь гарантирует достоверность предоставляемой информации.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Использование аналитических инструментов</h2>
          <p className="mb-4">
            Для улучшения качества сервиса и анализа пользовательского опыта мы используем:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Яндекс.Метрика</strong> — для сбора статистики посещений и анализа поведения пользователей</li>
            <li><strong>Яндекс.Вебмастер</strong> — для технического мониторинга сайта и улучшения его индексации</li>
            <li>Другие инструменты веб-аналитики</li>
          </ul>
          <p className="mb-4">
            Используя Сайт, вы соглашаетесь на сбор и обработку анонимных данных этими сервисами
            в соответствии с их политиками конфиденциальности.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Правила поведения</h2>
          <p className="mb-4">При использовании Сайта запрещается:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Размещать недостоверную информацию</li>
            <li>Нарушать права третьих лиц</li>
            <li>Использовать сайт в незаконных целях</li>
            <li>Создавать технические помехи в работе сервиса</li>
            <li>Копировать и распространять контент без разрешения</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Интеллектуальная собственность</h2>
          <p className="mb-4">
            Все материалы Сайта, включая тексты, изображения, дизайн, программное обеспечение,
            защищены авторским правом и являются собственностью администрации Сайта.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Ответственность</h2>
          <p className="mb-4">
            Администрация Сайта не несет ответственности за:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Качество и достоверность размещаемых вакансий</li>
            <li>Результаты трудоустройства</li>
            <li>Действия работодателей и соискателей</li>
            <li>Технические сбои и перерывы в работе</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Изменение условий</h2>
          <p className="mb-4">
            Администрация оставляет за собой право изменять настоящие Условия.
            Новые условия вступают в силу с момента их размещения на Сайте.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Применимое право</h2>
          <p className="mb-4">
            Настоящие Условия регулируются и толкуются в соответствии с законодательством
            Российской Федерации.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Контакты</h2>
          <p className="mb-4">
            По всем вопросам, связанным с использованием Сайта, обращайтесь через
            форму обратной связи или по электронной почте.
          </p>
          <p className="text-sm text-gray-600">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </section>
      </div>
    </div>
  )
}
