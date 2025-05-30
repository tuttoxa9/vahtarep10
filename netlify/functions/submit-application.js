// Instructions: Создать максимально упрощённую функцию без Firebase для тестирования

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Function started');
    console.log('Event body:', event.body);

    // Parse request body
    let requestData;
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    const { vacancyId, applicantName, applicantPhone, applicantEmail, message } = requestData;

    // Validate required fields
    if (!vacancyId || !applicantName || !applicantPhone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: vacancyId, applicantName, applicantPhone'
        })
      };
    }

    console.log('Validation passed');

    // Generate mock application ID
    const applicationId = 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    console.log('Generated application ID:', applicationId);

    // Try to send Telegram notification (non-blocking)
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      console.log('Sending Telegram notification...');

      const telegramMessage = `🔔 *Новая заявка на вакансию!*

📋 *Вакансия ID:* ${vacancyId}

👤 *Соискатель:*
• Имя: ${applicantName}
• Телефон: ${applicantPhone}
• Email: ${applicantEmail || 'не указан'}
• Сообщение: ${message || 'не указано'}

🆔 ID заявки: ${applicationId}

⏰ Дата подачи: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

      // Send to Telegram without waiting
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      }).then(response => {
        console.log('Telegram response status:', response.status);
      }).catch(error => {
        console.error('Telegram error:', error.message);
      });
    } else {
      console.log('Telegram credentials not configured');
    }

    console.log('Returning success response');

    // Return immediate success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        applicationId: applicationId,
        message: 'Application submitted successfully (simplified mode)'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
