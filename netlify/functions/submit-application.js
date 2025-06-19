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
    console.log('=== SUBMIT APPLICATION FUNCTION STARTED ===');
    console.log('Function execution time:', new Date().toISOString());
    console.log('Event body received:', event.body);

    // Parse request body
    let requestData;
    try {
      requestData = JSON.parse(event.body || '{}');
      console.log('✅ Request body parsed successfully');
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    const { vacancyId, applicantName, applicantPhone, applicantEmail, message } = requestData;
    console.log('📋 Request data extracted:', {
      vacancyId,
      applicantName,
      applicantPhone,
      applicantEmail: applicantEmail || 'not provided',
      message: message || 'not provided'
    });

    // Validate required fields
    if (!vacancyId || !applicantName || !applicantPhone) {
      console.error('❌ Validation failed - missing required fields');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: vacancyId, applicantName, applicantPhone'
        })
      };
    }

    console.log('✅ Validation passed');

    // Generate application ID
    const applicationId = 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    console.log('🆔 Generated application ID:', applicationId);

    // === GET VACANCY DETAILS FOR TELEGRAM ===
    let vacancyTitle = 'Неизвестная вакансия';
    let vacancyCompany = 'Не указано';
    let vacancyLocation = 'Не указано';
    let vacancySalary = 'Не указано';
    let vacancyFetchSuccess = false;

    console.log('🔍 === FETCHING VACANCY DETAILS ===');
    console.log('🔍 Trying to fetch vacancy with ID:', vacancyId);

    try {
      // Упрощенный способ: используем API endpoint для получения данных о вакансии
      console.log('🔍 Fetching vacancy details via API endpoint...');

      const apiUrl = `https://${event.headers.host}/api/vacancies/${vacancyId}`;
      console.log('🔍 API URL:', apiUrl);

      const apiResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('🔍 API Response status:', apiResponse.status);

      if (apiResponse.ok) {
        const vacancyData = await apiResponse.json();
        console.log('📋 Vacancy data received from API:', JSON.stringify(vacancyData, null, 2));

        if (vacancyData && vacancyData.id) {
          // Успешно получили данные о вакансии
          vacancyTitle = vacancyData.title || vacancyData.name || vacancyData.position || 'Вакансия без названия';
          vacancyCompany = vacancyData.company || vacancyData.companyName || vacancyData.employer || 'Компания не указана';
          vacancyLocation = vacancyData.location || vacancyData.city || vacancyData.address || 'Локация не указана';

          // Обработка зарплаты
          if (vacancyData.salary) {
            if (typeof vacancyData.salary === 'object') {
              const min = vacancyData.salary.min || '';
              const max = vacancyData.salary.max || '';
              const currency = vacancyData.salary.currency || 'руб';
              if (min && max) {
                vacancySalary = `${min} - ${max} ${currency}`;
              } else if (min) {
                vacancySalary = `от ${min} ${currency}`;
              } else if (max) {
                vacancySalary = `до ${max} ${currency}`;
              }
            } else {
              vacancySalary = vacancyData.salary.toString();
            }
          }

          vacancyFetchSuccess = true;

          console.log('✅ Vacancy details fetched successfully via API:');
          console.log('  - Title:', vacancyTitle);
          console.log('  - Company:', vacancyCompany);
          console.log('  - Location:', vacancyLocation);
          console.log('  - Salary:', vacancySalary);
        } else {
          console.warn('⚠️ API returned empty or invalid vacancy data');
        }
      } else {
        console.warn('⚠️ API endpoint failed with status:', apiResponse.status);
        const errorText = await apiResponse.text();
        console.warn('⚠️ API error response:', errorText);
      }
    } catch (vacancyError) {
      console.error('❌ Error fetching vacancy details via API:');
      console.error('  - Error message:', vacancyError.message);
      console.error('  - Error stack:', vacancyError.stack);
    }

    // === FIREBASE SAVE OPERATION ===
    let firebaseSaved = false;
    let firebaseDocId = null;
    let firebaseError = null;

    console.log('🔥 === STARTING FIREBASE OPERATION ===');

    try {
      // Check Firebase environment variables
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      };

      console.log('🔧 Firebase config validation:');
      console.log('  - API Key:', firebaseConfig.apiKey ? '✅ SET' : '❌ NOT SET');
      console.log('  - Auth Domain:', firebaseConfig.authDomain ? '✅ SET' : '❌ NOT SET');
      console.log('  - Project ID:', firebaseConfig.projectId ? '✅ SET' : '❌ NOT SET');
      console.log('  - Storage Bucket:', firebaseConfig.storageBucket ? '✅ SET' : '❌ NOT SET');
      console.log('  - Messaging Sender ID:', firebaseConfig.messagingSenderId ? '✅ SET' : '❌ NOT SET');
      console.log('  - App ID:', firebaseConfig.appId ? '✅ SET' : '❌ NOT SET');

      // Check if all required config is present
      if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
        throw new Error('Missing critical Firebase configuration');
      }

      console.log('✅ Firebase config validation passed');

      // Import Firebase modules
      console.log('📦 Importing Firebase modules...');
      const { initializeApp, getApps, getApp } = await import('firebase/app');
      const { getFirestore, collection, addDoc, Timestamp } = await import('firebase/firestore');
      console.log('✅ Firebase modules imported successfully');

      // Initialize Firebase app (reuse existing if available)
      let app;
      const existingApps = getApps();
      if (existingApps.length === 0) {
        console.log('🚀 Initializing new Firebase app...');
        app = initializeApp(firebaseConfig);
        console.log('✅ New Firebase app initialized');
      } else {
        console.log('🔄 Using existing Firebase app');
        app = getApp();
      }

      // Initialize Firestore
      console.log('🗄️ Initializing Firestore...');
      const db = getFirestore(app);
      console.log('✅ Firestore initialized successfully');

      // Prepare application data
      const applicationData = {
        vacancyId,
        applicantName,
        applicantPhone,
        applicantEmail: applicantEmail || '',
        message: message || '',
        createdAt: Timestamp.now(),
        status: 'new',
        // Добавляем информацию о вакансии для удобства
        vacancyTitle: vacancyTitle,
        vacancyCompany: vacancyCompany,
        vacancyLocation: vacancyLocation,
        vacancyFetchSuccess: vacancyFetchSuccess
      };

      console.log('📝 Application data prepared:', {
        vacancyId: applicationData.vacancyId,
        applicantName: applicationData.applicantName,
        applicantPhone: applicationData.applicantPhone,
        applicantEmail: applicationData.applicantEmail,
        message: applicationData.message,
        status: applicationData.status,
        vacancyTitle: applicationData.vacancyTitle,
        vacancyCompany: applicationData.vacancyCompany,
        vacancyLocation: applicationData.vacancyLocation,
        vacancyFetchSuccess: applicationData.vacancyFetchSuccess,
        createdAt: 'Timestamp object'
      });

      // Save to Firestore (NO TIMEOUT - let it complete naturally)
      console.log('💾 Saving to Firestore collection "applications"...');
      const docRef = await addDoc(collection(db, 'applications'), applicationData);
      firebaseDocId = docRef.id;
      firebaseSaved = true;

      console.log('✅ SUCCESS! Application saved to Firestore');
      console.log('  - Document ID:', firebaseDocId);
      console.log('  - Collection: applications');
      console.log('  - Save timestamp:', new Date().toISOString());

    } catch (error) {
      firebaseError = error;
      console.error('❌ FIREBASE SAVE FAILED:');
      console.error('  - Error message:', error.message);
      console.error('  - Error code:', error.code);
      console.error('  - Error stack:', error.stack);

      // Additional Firebase-specific error details
      if (error.code) {
        console.error('  - Firebase error code:', error.code);
      }
      if (error.customData) {
        console.error('  - Firebase custom data:', error.customData);
      }
    }

    console.log('🔥 === FIREBASE OPERATION COMPLETED ===');
    console.log('  - Status:', firebaseSaved ? '✅ SUCCESS' : '❌ FAILED');
    console.log('  - Document ID:', firebaseDocId || 'none');

    // === TELEGRAM NOTIFICATION ===
    let telegramSent = false;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    console.log('📱 === STARTING TELEGRAM NOTIFICATION ===');

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        console.log('📱 Telegram credentials found, sending notification...');

        // Добавляем статус получения данных о вакансии в сообщение
        const vacancyStatusEmoji = vacancyFetchSuccess ? '✅' : '⚠️';
        const vacancyStatusText = vacancyFetchSuccess ? '' : ' (не удалось получить полные данные)';

        const telegramMessage = `🔔 *Новая заявка на вакансию!*

📋 *Вакансия:* ${vacancyTitle}${vacancyStatusText}
🏢 *Компания:* ${vacancyCompany}
📍 *Локация:* ${vacancyLocation}
💰 *Зарплата:* ${vacancySalary}
🆔 *ID вакансии:* ${vacancyId}
${vacancyStatusEmoji} *Статус данных:* ${vacancyFetchSuccess ? 'Полные данные получены' : 'Данные по умолчанию'}

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

        console.log('📱 Sending message to Telegram...');
        const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown',
          })
        });

        const telegramResult = await telegramResponse.text();
        console.log('📱 Telegram response status:', telegramResponse.status);
        console.log('📱 Telegram response body:', telegramResult);

        if (telegramResponse.ok) {
          telegramSent = true;
          console.log('✅ Telegram notification sent successfully');
        } else {
          console.error('❌ Telegram API error:', telegramResult);
        }
      } catch (telegramError) {
        console.error('❌ Telegram error:', telegramError.message);
        console.error('❌ Telegram error stack:', telegramError.stack);
      }
    } else {
      console.warn('⚠️ Telegram credentials not configured:');
      console.warn('  - Bot token:', TELEGRAM_BOT_TOKEN ? '✅ SET' : '❌ NOT SET');
      console.warn('  - Chat ID:', TELEGRAM_CHAT_ID ? '✅ SET' : '❌ NOT SET');
    }

    console.log('📱 === TELEGRAM NOTIFICATION COMPLETED ===');

    // === FINAL RESULTS ===
    console.log('🎯 === FUNCTION EXECUTION SUMMARY ===');
    console.log('  - Application ID:', applicationId);
    console.log('  - Vacancy fetch success:', vacancyFetchSuccess ? '✅ YES' : '❌ NO');
    console.log('  - Vacancy title:', vacancyTitle);
    console.log('  - Vacancy company:', vacancyCompany);
    console.log('  - Vacancy location:', vacancyLocation);
    console.log('  - Firebase saved:', firebaseSaved ? '✅ YES' : '❌ NO');
    console.log('  - Firebase doc ID:', firebaseDocId || 'none');
    console.log('  - Telegram sent:', telegramSent ? '✅ YES' : '❌ NO');
    console.log('  - Execution time:', new Date().toISOString());
    console.log('=== FUNCTION COMPLETED SUCCESSFULLY ===');

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        applicationId: applicationId,
        firebaseDocId: firebaseDocId,
        message: `Application submitted successfully${firebaseSaved ? ' and saved to database' : ' (database save failed)'}${telegramSent ? ' and notification sent' : ' (notification failed)'}`,
        debug: {
          vacancyFetchSuccess,
          vacancyTitle,
          vacancyCompany,
          vacancyLocation,
          firebaseSaved,
          firebaseDocId,
          telegramSent,
          firebaseError: firebaseError ? firebaseError.message : null
        }
      })
    };

  } catch (error) {
    console.error('💥 === CRITICAL FUNCTION ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error code:', error.code);
    console.error('=== ERROR DETAILS END ===');

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
