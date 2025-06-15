// Тестовый скрипт для отладки Telegram уведомлений
require('dotenv').config();

async function testTelegramNotification() {
  console.log('🔍 === DEBUGGING TELEGRAM NOTIFICATION ISSUE ===');

  // Test data - используем реальный ID вакансии
  const testData = {
    vacancyId: 'test-vacancy-id',
    applicantName: 'Тестовый Соискатель',
    applicantPhone: '+79001234567',
    applicantEmail: 'test@example.com',
    message: 'Тестовое сообщение'
  };

  console.log('📋 Test data:', testData);

  try {
    // Проверяем переменные окружения
    console.log('\n🔧 Environment variables check:');
    console.log('  - TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? '✅ SET' : '❌ NOT SET');
    console.log('  - TELEGRAM_CHAT_ID:', process.env.TELEGRAM_CHAT_ID ? '✅ SET' : '❌ NOT SET');
    console.log('  - Firebase API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ SET' : '❌ NOT SET');
    console.log('  - Firebase Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ SET' : '❌ NOT SET');

    // === FIREBASE TEST ===
    console.log('\n🔥 === TESTING FIREBASE CONNECTION ===');

    let vacancyTitle = 'Неизвестная вакансия';
    let vacancyCompany = 'Не указано';
    let vacancyLocation = 'Не указано';

    try {
      // Проверим Firebase конфигурацию
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
      };

      if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
        console.log('✅ Firebase config is complete');

        // Импортируем Firebase модули
        const { initializeApp } = await import('firebase/app');
        const { getFirestore, collection, getDocs, doc, getDoc, limit, query } = await import('firebase/firestore');

        // Инициализируем Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        console.log('✅ Firebase initialized successfully');

        // Получаем список всех вакансий для отладки
        console.log('\n📋 Fetching all vacancies for debugging...');
        const vacanciesQuery = query(collection(db, 'vacancies'), limit(10));
        const querySnapshot = await getDocs(vacanciesQuery);

        console.log(`📋 Found ${querySnapshot.size} vacancies in collection:`);

        let firstVacancyId = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(`  - ID: ${doc.id}`);
          console.log(`    Title: ${data.title || 'No title'}`);
          console.log(`    Company: ${data.company || 'No company'}`);
          console.log(`    Location: ${data.location || 'No location'}`);
          console.log('    ---');

          if (!firstVacancyId) {
            firstVacancyId = doc.id;
          }
        });

        // Если есть вакансии, попробуем получить первую
        if (firstVacancyId) {
          console.log(`\n🔍 Testing vacancy fetch with real ID: ${firstVacancyId}`);
          testData.vacancyId = firstVacancyId;

          const vacancyRef = doc(db, 'vacancies', firstVacancyId);
          const vacancySnap = await getDoc(vacancyRef);

          if (vacancySnap.exists()) {
            const vacancyData = vacancySnap.data();
            vacancyTitle = vacancyData.title || 'Неизвестная вакансия';
            vacancyCompany = vacancyData.company || 'Не указано';
            vacancyLocation = vacancyData.location || 'Не указано';

            console.log('✅ Successfully fetched vacancy:');
            console.log(`  - Title: ${vacancyTitle}`);
            console.log(`  - Company: ${vacancyCompany}`);
            console.log(`  - Location: ${vacancyLocation}`);
          } else {
            console.log('❌ Vacancy document not found');
          }
        } else {
          console.log('⚠️ No vacancies found in the collection');
        }

      } else {
        console.log('❌ Firebase config incomplete, using default values');
      }
    } catch (firebaseError) {
      console.error('❌ Firebase error:', firebaseError.message);
    }

    // === TELEGRAM TEST ===
    console.log('\n📱 === TESTING TELEGRAM NOTIFICATION ===');

    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const applicationId = 'test_' + Date.now();

      const telegramMessage = `🔔 *ТЕСТОВОЕ уведомление - Новая заявка на вакансию!*

📋 *Вакансия:* ${vacancyTitle}
🏢 *Компания:* ${vacancyCompany}
📍 *Локация:* ${vacancyLocation}
🆔 *ID вакансии:* ${testData.vacancyId}

👤 *Соискатель:*
• Имя: ${testData.applicantName}
• Телефон: ${testData.applicantPhone}
• Email: ${testData.applicantEmail || 'не указан'}
• Сообщение: ${testData.message || 'не указано'}

🆔 ID заявки: ${applicationId}
⏰ Дата подачи: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}

*Это тестовое сообщение для отладки*`;

      console.log('📱 Sending test message to Telegram...');
      console.log('📱 Message content:');
      console.log(telegramMessage);

      const telegramResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        })
      });

      const telegramResult = await telegramResponse.text();
      console.log('📱 Telegram response status:', telegramResponse.status);
      console.log('📱 Telegram response body:', telegramResult);

      if (telegramResponse.ok) {
        console.log('✅ Test Telegram notification sent successfully!');
      } else {
        console.error('❌ Telegram API error:', telegramResult);
      }
    } else {
      console.log('❌ Telegram credentials not configured');
    }

  } catch (error) {
    console.error('💥 Error in test:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Запускаем тест
testTelegramNotification();
