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
    console.log('=== Function started ===');
    console.log('Event body:', event.body);
    console.log('Environment check:');
    console.log('- TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? 'SET' : 'NOT SET');
    console.log('- TELEGRAM_CHAT_ID:', process.env.TELEGRAM_CHAT_ID ? 'SET' : 'NOT SET');
    console.log('- FIREBASE_API_KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'SET' : 'NOT SET');

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
    console.log('Request data:', { vacancyId, applicantName, applicantPhone, applicantEmail, message });

    // Validate required fields
    if (!vacancyId || !applicantName || !applicantPhone) {
      console.error('Validation failed - missing required fields');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: vacancyId, applicantName, applicantPhone'
        })
      };
    }

    console.log('Validation passed');

    // Generate application ID
    const applicationId = 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    console.log('Generated application ID:', applicationId);

    // Try to save to Firebase first
    let firebaseSaved = false;
    try {
      console.log('Attempting Firebase save...');
      const { initializeApp, getApps } = await import('firebase/app');
      const { getFirestore, collection, addDoc, Timestamp } = await import('firebase/firestore');

      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      };

      console.log('Firebase config:', {
        apiKey: firebaseConfig.apiKey ? 'SET' : 'NOT SET',
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain
      });

      const apps = getApps();
      const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const applicationData = {
        vacancyId,
        applicantName,
        applicantPhone,
        applicantEmail: applicantEmail || '',
        message: message || '',
        createdAt: Timestamp.now(),
        status: 'new'
      };

      console.log('Saving to Firestore...');
      const docRef = await addDoc(collection(db, 'applications'), applicationData);
      console.log('Firebase save successful! Doc ID:', docRef.id);
      firebaseSaved = true;

      // Update application ID to actual Firebase ID
      applicationId = docRef.id;
    } catch (firebaseError) {
      console.error('Firebase save failed:', firebaseError.message);
      console.error('Firebase error details:', firebaseError);
    }

    // Send Telegram notification
    let telegramSent = false;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        console.log('Sending Telegram notification...');

        const telegramMessage = `🔔 *Новая заявка на вакансию!*

📋 *Вакансия ID:* ${vacancyId}

👤 *Соискатель:*
• Имя: ${applicantName}
• Телефон: ${applicantPhone}
• Email: ${applicantEmail || 'не указан'}
• Сообщение: ${message || 'не указано'}

🆔 ID заявки: ${applicationId}
💾 Статус БД: ${firebaseSaved ? '✅ Сохранено' : '❌ Не сохранено'}

⏰ Дата подачи: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

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

        const telegramResult = await telegramResponse.text();
        console.log('Telegram response status:', telegramResponse.status);
        console.log('Telegram response:', telegramResult);

        if (telegramResponse.ok) {
          telegramSent = true;
          console.log('Telegram notification sent successfully');
        } else {
          console.error('Telegram API error:', telegramResult);
        }
      } catch (telegramError) {
        console.error('Telegram error:', telegramError.message);
      }
    } else {
      console.warn('Telegram credentials not configured');
      console.warn('Bot token:', TELEGRAM_BOT_TOKEN ? 'SET' : 'NOT SET');
      console.warn('Chat ID:', TELEGRAM_CHAT_ID ? 'SET' : 'NOT SET');
    }

    console.log('=== Function completed ===');
    console.log('Results:', { firebaseSaved, telegramSent, applicationId });

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        applicationId: applicationId,
        message: `Application submitted successfully${firebaseSaved ? ' and saved to database' : ' (database save failed)'}${telegramSent ? ' and notification sent' : ' (notification failed)'}`,
        debug: {
          firebaseSaved,
          telegramSent
        }
      })
    };

  } catch (error) {
    console.error('=== Function error ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
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
