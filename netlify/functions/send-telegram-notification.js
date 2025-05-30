exports.handler = async (event, context) => {
  // Проверяем метод запроса
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { vacancy, applicant } = JSON.parse(event.body);

    // Получаем переменные окружения для Telegram
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram credentials');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing Telegram configuration' }),
      };
    }

    // Форматируем сообщение для Telegram
    const message = `🔔 *Новая заявка на вакансию!*

📋 *Вакансия:* ${vacancy.title}
🏢 *Компания:* ${vacancy.company}
📍 *Локация:* ${vacancy.location}
💰 *Зарплата:* ${typeof vacancy.salary === 'object' ? 
  `${vacancy.salary.min || 'от'} - ${vacancy.salary.max || 'до'} ${vacancy.salary.currency || 'руб'}` : 
  vacancy.salary}

👤 *Соискатель:*
• Имя: ${applicant.name}
• Телефон: ${applicant.phone}
• Email: ${applicant.email || 'не указан'}
• Сообщение: ${applicant.message || 'не указано'}

🆔 ID вакансии: ${vacancy.id}`;

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error('Telegram API error:', errorData);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send Telegram notification' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Notification sent successfully' 
      }),
    };

  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};