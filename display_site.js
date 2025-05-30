const http = require('http');
const fs = require('fs');
const path = require('path');

// Создаем простой HTTP сервер для отображения сайта
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // Основная страница сайта
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    const html = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Работа Вахтой: для граждан РФ и РБ - Вакансии вахтовым методом</title>
        <style>
          body {
            font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
            color: #111827;
          }
          header {
            background-color: #1a56db;
            color: white;
            padding: 2rem;
            text-align: center;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          p {
            margin-bottom: 1rem;
            line-height: 1.5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .hero {
            text-align: center;
            margin: 3rem 0;
          }
          .hero h1 {
            font-weight: 800;
            font-size: 3rem;
            margin-bottom: 1.5rem;
          }
          .hero p {
            font-size: 1.25rem;
            color: #4b5563;
            max-width: 800px;
            margin: 0 auto 2rem;
          }
          .cta-button {
            display: inline-block;
            background-color: #1a56db;
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            font-weight: 600;
            transition: background-color 0.2s;
          }
          .cta-button:hover {
            background-color: #1e429f;
          }
          .section {
            margin: 4rem 0;
          }
          .section-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
            text-align: center;
          }
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }
          .feature {
            background-color: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .feature h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #1a56db;
          }
          .vacancies {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }
          .vacancy {
            background-color: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .vacancy h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
          }
          .vacancy-salary {
            font-weight: 700;
            color: #047857;
            margin-bottom: 0.5rem;
          }
          .vacancy-location {
            color: #4b5563;
            margin-bottom: 1rem;
          }
          .steps {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 2rem;
            text-align: center;
          }
          .step {
            position: relative;
          }
          .step-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            background-color: #1a56db;
            color: white;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 1.5rem;
            margin: 0 auto 1rem;
          }
          .cta {
            background-color: #1a56db;
            color: white;
            text-align: center;
            padding: 4rem 2rem;
            border-radius: 0.5rem;
            margin: 4rem 0;
          }
          .cta h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
          }
          .cta p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          .footer {
            background-color: #111827;
            color: white;
            padding: 3rem 2rem;
          }
          .footer-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
          }
          .footer-column {
            flex: 1;
            min-width: 200px;
            margin-bottom: 2rem;
          }
          .footer-column h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }
          .footer-column ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .footer-column li {
            margin-bottom: 0.5rem;
          }
          .footer-column a {
            color: #9ca3af;
            text-decoration: none;
          }
          .footer-column a:hover {
            color: white;
          }
          .copyright {
            text-align: center;
            color: #9ca3af;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #374151;
          }
          @media (max-width: 768px) {
            .features, .vacancies, .steps {
              grid-template-columns: 1fr;
            }
            .hero h1 {
              font-size: 2rem;
            }
            .section-title {
              font-size: 1.5rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="hero">
          <div class="container">
            <h1>Работа вахтой для граждан РФ и РБ</h1>
            <p>Мы создали инновационное пространство для поиска работы вахтовым методом. Современный подход, лучшие предложения, надежные работодатели.</p>
            <a href="#vacancies" class="cta-button">Найти вахту</a>
          </div>
        </div>
        
        <div class="container">
          <div id="vacancies" class="section">
            <h2 class="section-title">Популярные вакансии</h2>
            <div class="vacancies">
              <div class="vacancy">
                <h3>Комплектовщик на склад</h3>
                <div class="vacancy-salary">от 90 000 ₽ до 110 000 ₽</div>
                <div class="vacancy-location">Москва</div>
                <p>Требуется комплектовщик на современный склад класса А. Работа в теплом помещении, официальное трудоустройство.</p>
                <a href="#" class="cta-button">Подробнее</a>
              </div>
              <div class="vacancy">
                <h3>Упаковщик на производство</h3>
                <div class="vacancy-salary">от 85 000 ₽ до 100 000 ₽</div>
                <div class="vacancy-location">Санкт-Петербург</div>
                <p>Вахта на пищевом производстве. Бесплатное проживание и питание, еженедельные авансы.</p>
                <a href="#" class="cta-button">Подробнее</a>
              </div>
              <div class="vacancy">
                <h3>Грузчик-разнорабочий</h3>
                <div class="vacancy-salary">от 80 000 ₽ до 95 000 ₽</div>
                <div class="vacancy-location">Московская область</div>
                <p>Требуются сотрудники на производственную линию. Вахта 30/15. Проживание в общежитии.</p>
                <a href="#" class="cta-button">Подробнее</a>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Наши преимущества</h2>
            <div class="features">
              <div class="feature">
                <h3>Надежные работодатели</h3>
                <p>Мы сотрудничаем только с проверенными компаниями, которые гарантируют своевременную оплату и хорошие условия труда.</p>
              </div>
              <div class="feature">
                <h3>Бесплатное проживание</h3>
                <p>Для большинства вакансий предоставляется бесплатное проживание в общежитии или квартире недалеко от места работы.</p>
              </div>
              <div class="feature">
                <h3>Официальное трудоустройство</h3>
                <p>Все наши партнеры оформляют трудовые отношения в соответствии с ТК РФ, что гарантирует социальную защищенность.</p>
              </div>
              <div class="feature">
                <h3>Быстрый отклик</h3>
                <p>Мы оперативно обрабатываем заявки и помогаем с трудоустройством в кратчайшие сроки.</p>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Как это работает</h2>
            <div class="steps">
              <div class="step">
                <div class="step-number">1</div>
                <h3>Оставьте заявку</h3>
                <p>Заполните простую форму на сайте, указав желаемую должность и опыт работы.</p>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <h3>Получите предложения</h3>
                <p>Наши специалисты подберут подходящие вакансии и свяжутся с вами.</p>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <h3>Пройдите собеседование</h3>
                <p>Мы организуем собеседование с работодателем онлайн или по телефону.</p>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <h3>Приступите к работе</h3>
                <p>Оформите необходимые документы и начните работу на выбранной вакансии.</p>
              </div>
            </div>
          </div>
          
          <div class="cta">
            <h2>Готовы найти работу вахтовым методом?</h2>
            <p>Оставьте заявку прямо сейчас и получите предложения по вакансиям уже сегодня!</p>
            <a href="#" class="cta-button">Оставить заявку</a>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-content">
            <div class="footer-column">
              <h3>О нас</h3>
              <ul>
                <li><a href="#">Наша миссия</a></li>
                <li><a href="#">Как мы работаем</a></li>
                <li><a href="#">Отзывы</a></li>
                <li><a href="#">Контакты</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Соискателям</h3>
              <ul>
                <li><a href="#">Найти вакансию</a></li>
                <li><a href="#">Подать резюме</a></li>
                <li><a href="#">Частые вопросы</a></li>
                <li><a href="#">Советы по трудоустройству</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Работодателям</h3>
              <ul>
                <li><a href="#">Разместить вакансию</a></li>
                <li><a href="#">Найти сотрудников</a></li>
                <li><a href="#">Услуги подбора</a></li>
                <li><a href="#">Стать партнером</a></li>
              </ul>
            </div>
            <div class="footer-column">
              <h3>Контакты</h3>
              <p>Телефон: +7 (495) 123-45-67</p>
              <p>Email: info@vahta.ru</p>
              <p>Адрес: г. Москва, ул. Примерная, д. 123</p>
            </div>
          </div>
          <div class="copyright">
            © 2025 Работа вахтой. Все права защищены.
          </div>
        </div>
      </body>
      </html>
    `;
    
    res.end(html);
  } else {
    // Для всех остальных запросов
    res.writeHead(404);
    res.end('Страница не найдена');
  }
});

// Запускаем сервер на порту 5000
const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Откройте http://localhost:${PORT} для просмотра сайта`);
});