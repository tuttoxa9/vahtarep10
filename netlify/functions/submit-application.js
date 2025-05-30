let firebaseApp;
let firebaseDb;

exports.handler = async (event, context) => {
  // Быстрая проверка метода
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Инициализация Firebase только при необходимости
    if (!firebaseDb) {
      const { initializeApp, getApps } = await import('firebase/app');
      const { getFirestore, collection, addDoc, doc, getDoc, Timestamp } = await import('firebase/firestore');

      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      };

      try {
        const apps = getApps();
        if (apps.length > 0) {
          firebaseApp = apps[0];
        } else {
          firebaseApp = initializeApp(firebaseConfig);
        }
        firebaseDb = getFirestore(firebaseApp);
      } catch (initError) {
        console.error('Firebase initialization error:', initError);
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            error: 'Database not initialized',
            details: initError.message
          }),
        };
      }
    }

    const { collection, addDoc, doc, getDoc, Timestamp } = await import('firebase/firestore');
    const { vacancyId, applicantName, applicantPhone, applicantEmail, message } = JSON.parse(event.body);

    // Быстрая валидация
    if (!vacancyId || !applicantName || !applicantPhone) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required fields: vacancyId, applicantName, applicantPhone'
        }),
      };
    }

    // Подготовка данных для сохранения
    const applicationData = {
      vacancyId: vacancyId,
      applicantName: applicantName,
      applicantPhone: applicantPhone,
      applicantEmail: applicantEmail || '',
      message: message || '',
      createdAt: Timestamp.now(),
      status: 'new'
    };

    console.log('Saving application to Firestore...');

    // Сохранение в Firestore с коротким timeout
    const docRef = await addDoc(collection(firebaseDb, 'applications'), applicationData);
    const applicationId = docRef.id;

    console.log('Application saved with ID:', applicationId);

    // Асинхронная отправка в Telegram без блокировки ответа
    setImmediate(() => {
      sendTelegramNotification(applicationId, vacancyId, applicationData, firebaseDb)
        .catch(error => console.error('Telegram notification failed:', error));
    });

    // Возвращаем успешный ответ немедленно
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        applicationId: applicationId,
        message: 'Application submitted successfully'
      }),
    };

  } catch (error) {
    console.error('Error processing application:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to process application',
        details: error.message
      }),
    };
  }
};

// Отдельная функция для отправки в Telegram (асинхронная)
async function sendTelegramNotification(applicationId, vacancyId, applicationData, db) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured');
    return;
  }

  try {
    const { doc, getDoc } = await import('firebase/firestore');

    // Быстрое получение данных вакансии с timeout
    let vacancy = null;
    try {
      const vacancyDoc = await getDoc(doc(db, 'vacancies', vacancyId));
      if (vacancyDoc.exists()) {
        vacancy = {
          id: vacancyDoc.id,
          ...vacancyDoc.data()
        };
      }
    } catch (vacancyError) {
      console.error('Error fetching vacancy:', vacancyError);
    }

    // Форматирование сообщения
    const formatSalary = (salary) => {
      if (!salary) return 'не указана';
      if (typeof salary === 'string') return salary;
      if (typeof salary === 'object') {
        const { min, max, currency = 'руб' } = salary;
        if (!min && !max) return 'по договоренности';
        if (!min) return `до ${max} ${currency}`;
        if (!max) return `от ${min} ${currency}`;
        return `${min} - ${max} ${currency}`;
      }
      return String(salary);
    };

    const telegramMessage = `🔔 *Новая заявка на вакансию!*

📋 *Вакансия:* ${vacancy ? vacancy.title : 'ID: ' + vacancyId}
${vacancy ? `🏢 *Компания:* ${vacancy.company || 'не указана'}` : ''}
${vacancy ? `📍 *Локация:* ${vacancy.location || 'не указана'}` : ''}
${vacancy ? `💰 *Зарплата:* ${formatSalary(vacancy.salary)}` : ''}

👤 *Соискатель:*
• Имя: ${applicationData.applicantName}
• Телефон: ${applicationData.applicantPhone}
• Email: ${applicationData.applicantEmail || 'не указан'}
• Сообщение: ${applicationData.message || 'не указано'}

🆔 ID заявки: ${applicationId}
🆔 ID вакансии: ${vacancyId}

⏰ Дата подачи: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    // Отправка в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error('Telegram API error:', errorData);
    }
  } catch (telegramError) {
    console.error('Error sending Telegram notification:', telegramError);
  }
}
