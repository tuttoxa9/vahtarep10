exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('=== SUBMIT APPLICATION FIXED VERSION ===');
    console.log('Function execution time:', new Date().toISOString());

    // Parse request body
    const requestData = JSON.parse(event.body || '{}');
    const { vacancyId, applicantName, applicantPhone, applicantEmail, message } = requestData;

    console.log('Request data:', { vacancyId, applicantName, applicantPhone });

    // Validate required fields
    if (!vacancyId || !applicantName || !applicantPhone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Generate application ID
    const applicationId = 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // === GET VACANCY DETAILS ===
    let vacancyTitle = 'Неизвестная вакансия';
    let vacancyCompany = 'Не указано';
    let vacancyLocation = 'Не указано';
    let vacancySalary = 'Не указано';
    let vacancyFetchSuccess = false;

    console.log('🔍 Fetching vacancy details for ID:', vacancyId);

    // Attempt 1: Use API endpoint
    try {
      const apiUrl = `https://${event.headers.host}/api/vacancies/${vacancyId}`;
      console.log('Trying API URL:', apiUrl);

      const apiResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        console.log('✅ API success, data:', data);

        if (data && data.id) {
          vacancyTitle = data.title || data.name || 'Вакансия без названия';
          vacancyCompany = data.company || 'Компания не указана';
          vacancyLocation = data.location || 'Локация не указана';
          if (data.salary) {
            if (typeof data.salary === 'object') {
              const min = data.salary.min || '';
              const max = data.salary.max || '';
              const currency = data.salary.currency || 'руб';
              if (min && max) {
                vacancySalary = `${min} - ${max} ${currency}`;
              } else if (min) {
                vacancySalary = `от ${min} ${currency}`;
              }
            } else {
              vacancySalary = data.salary.toString();
            }
          }
          vacancyFetchSuccess = true;
        }
      } else {
        console.warn('API failed with status:', apiResponse.status);
      }
    } catch (apiError) {
      console.warn('API error:', apiError.message);
    }

    // Attempt 2: Direct Firebase access with hardcoded config
    if (!vacancyFetchSuccess) {
      console.log('🔄 Trying direct Firebase access...');
      try {
        // Hardcoded Firebase config from netlify.toml as fallback
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAvdGVXFzqU-DrAi3Sw223qyscDuYjKbG0",
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "vahta1-76378.firebaseapp.com",
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "vahta1-76378",
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "vahta1-76378.firebasestorage.app",
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1037943763154",
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1037943763154:web:0e2a2dffc1de4d7279bd0b"
        };

        console.log('Firebase config status:', {
          apiKey: firebaseConfig.apiKey ? 'SET' : 'NOT SET',
          projectId: firebaseConfig.projectId,
          authDomain: firebaseConfig.authDomain
        });

        const { initializeApp, getApps, getApp } = await import('firebase/app');
        const { getFirestore, doc, getDoc } = await import('firebase/firestore');

        let app;
        const existingApps = getApps();
        if (existingApps.length === 0) {
          app = initializeApp(firebaseConfig);
        } else {
          app = getApp();
        }

        const db = getFirestore(app);
        const vacancyRef = doc(db, 'vacancies', vacancyId);
        const vacancySnap = await getDoc(vacancyRef);

        if (vacancySnap.exists()) {
          const data = vacancySnap.data();
          console.log('✅ Firebase success, data:', data);

          vacancyTitle = data.title || data.name || 'Вакансия без названия';
          vacancyCompany = data.company || 'Компания не указана';
          vacancyLocation = data.location || 'Локация не указана';
          if (data.salary) {
            if (typeof data.salary === 'object') {
              const min = data.salary.min || '';
              const max = data.salary.max || '';
              const currency = data.salary.currency || 'руб';
              if (min && max) {
                vacancySalary = `${min} - ${max} ${currency}`;
              } else if (min) {
                vacancySalary = `от ${min} ${currency}`;
              }
            } else {
              vacancySalary = data.salary.toString();
            }
          }
          vacancyFetchSuccess = true;
        } else {
          console.warn('Vacancy document not found in Firebase');
        }
      } catch (firebaseError) {
        console.error('Firebase access failed:', firebaseError.message);
      }
    }

    console.log('Final vacancy data:', {
      title: vacancyTitle,
      company: vacancyCompany,
      location: vacancyLocation,
      salary: vacancySalary,
      fetchSuccess: vacancyFetchSuccess
    });

    // === FIREBASE SAVE ===
    let firebaseSaved = false;
    let firebaseDocId = null;
    let firebaseError = null;

    try {
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAvdGVXFzqU-DrAi3Sw223qyscDuYjKbG0",
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "vahta1-76378.firebaseapp.com",
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "vahta1-76378",
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "vahta1-76378.firebasestorage.app",
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1037943763154",
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1037943763154:web:0e2a2dffc1de4d7279bd0b"
      };

      const { initializeApp, getApps, getApp } = await import('firebase/app');
      const { getFirestore, collection, addDoc, Timestamp } = await import('firebase/firestore');

      let app;
      const existingApps = getApps();
      if (existingApps.length === 0) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApp();
      }

      const db = getFirestore(app);
      const applicationData = {
        vacancyId,
        applicantName,
        applicantPhone,
        applicantEmail: applicantEmail || '',
        message: message || '',
        createdAt: Timestamp.now(),
        status: 'new',
        vacancyTitle,
        vacancyCompany,
        vacancyLocation,
        vacancyFetchSuccess
      };

      const docRef = await addDoc(collection(db, 'applications'), applicationData);
      firebaseDocId = docRef.id;
      firebaseSaved = true;
      console.log('✅ Application saved to Firebase:', firebaseDocId);

    } catch (error) {
      firebaseError = error;
      console.error('❌ Firebase save failed:', error.message);
    }

    // === TELEGRAM NOTIFICATION ===
    let telegramSent = false;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const statusEmoji = vacancyFetchSuccess ? '✅' : '⚠️';
        const statusText = vacancyFetchSuccess ? '' : ' (не удалось получить полные данные)';

        const telegramMessage = `🔔 *Новая заявка на вакансию!*

📋 *Вакансия:* ${vacancyTitle}${statusText}
🏢 *Компания:* ${vacancyCompany}
📍 *Локация:* ${vacancyLocation}
💰 *Зарплата:* ${vacancySalary}
🆔 *ID вакансии:* ${vacancyId}
${statusEmoji} *Статус данных:* ${vacancyFetchSuccess ? 'Полные данные получены' : 'Данные по умолчанию'}

👤 *Соискатель:*
• Имя: ${applicantName}
• Телефон: ${applicantPhone}
• Email: ${applicantEmail || 'не указан'}
• Сообщение: ${message || 'не указано'}

🆔 ID заявки: ${applicationId}
📄 Firebase Doc ID: ${firebaseDocId || 'не создан'}
💾 Статус БД: ${firebaseSaved ? '✅ Сохранено' : '❌ Не сохранено'}
${firebaseError ? `❌ Ошибка БД: ${firebaseError.message}` : ''}

⏰ Дата подачи: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

        const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown',
          })
        });

        if (telegramResponse.ok) {
          telegramSent = true;
          console.log('✅ Telegram notification sent');
        } else {
          console.error('❌ Telegram error:', await telegramResponse.text());
        }
      } catch (telegramError) {
        console.error('❌ Telegram error:', telegramError.message);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        applicationId,
        firebaseDocId,
        message: `Application submitted successfully${firebaseSaved ? ' and saved' : ' (save failed)'}${telegramSent ? ' and notification sent' : ' (notification failed)'}`,
        debug: {
          vacancyFetchSuccess,
          vacancyTitle,
          vacancyCompany,
          vacancyLocation,
          firebaseSaved,
          telegramSent
        }
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
