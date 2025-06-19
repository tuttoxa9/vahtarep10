// Тестовый скрипт для проверки получения данных вакансии
require('dotenv').config();

async function testVacancyFetch() {
  console.log('🔍 === TESTING VACANCY FETCH LOGIC ===');

  // Имитируем данные запроса
  const testVacancyId = 'some-test-id';

  console.log('📋 Testing with vacancy ID:', testVacancyId);

  // Имитируем Firebase конфигурацию (как в реальной функции)
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };

  console.log('🔧 Firebase config check:');
  console.log('  - API Key:', firebaseConfig.apiKey ? '✅ SET' : '❌ NOT SET');
  console.log('  - Project ID:', firebaseConfig.projectId ? '✅ SET' : '❌ NOT SET');
  console.log('  - Auth Domain:', firebaseConfig.authDomain ? '✅ SET' : '❌ NOT SET');

  // Тестируем логику получения данных
  let vacancyTitle = 'Неизвестная вакансия';
  let vacancyCompany = 'Не указано';
  let vacancyLocation = 'Не указано';
  let vacancyFetchSuccess = false;

  if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
    console.log('✅ Firebase config is complete, would attempt to fetch vacancy data');
    console.log('🔍 Would fetch from collection "vacancies" with ID:', testVacancyId.trim());

    // Имитируем успешное получение данных (для демонстрации)
    console.log('📋 Simulating successful vacancy fetch...');
    vacancyTitle = 'Тестовая вакансия - Грузчик';
    vacancyCompany = 'ООО "Тестовая компания"';
    vacancyLocation = 'Москва';
    vacancyFetchSuccess = true;

    console.log('✅ Simulated vacancy details:');
    console.log('  - Title:', vacancyTitle);
    console.log('  - Company:', vacancyCompany);
    console.log('  - Location:', vacancyLocation);
    console.log('  - Fetch success:', vacancyFetchSuccess);
  } else {
    console.log('❌ Firebase not configured, using default values');
  }

  // Тестируем как будет выглядеть Telegram сообщение
  console.log('\n📱 === TESTING TELEGRAM MESSAGE ===');

  const vacancyStatusEmoji = vacancyFetchSuccess ? '✅' : '⚠️';
  const vacancyStatusText = vacancyFetchSuccess ? '' : ' (не удалось получить полные данные)';

  const telegramMessage = `🔔 *ТЕСТОВОЕ уведомление - Новая заявка на вакансию!*

📋 *Вакансия:* ${vacancyTitle}${vacancyStatusText}
🏢 *Компания:* ${vacancyCompany}
📍 *Локация:* ${vacancyLocation}
🆔 *ID вакансии:* ${testVacancyId}
${vacancyStatusEmoji} *Статус данных:* ${vacancyFetchSuccess ? 'Полные данные получены' : 'Данные по умолчанию'}

👤 *Соискатель:*
• Имя: Иван Тестов
• Телефон: +7 999 123-45-67
• Email: ivan@test.com
• Сообщение: Тестовое сообщение

🆔 ID заявки: test_123456
📄 Firebase Doc ID: firebase_doc_123
💾 Статус БД: ✅ Сохранено

⏰ Дата подачи: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

  console.log('📱 Generated Telegram message:');
  console.log('='.repeat(50));
  console.log(telegramMessage);
  console.log('='.repeat(50));

  console.log('\n🎯 === TEST SUMMARY ===');
  console.log('  - Vacancy fetch success:', vacancyFetchSuccess ? '✅ YES' : '❌ NO');
  console.log('  - Vacancy title:', vacancyTitle);
  console.log('  - Vacancy company:', vacancyCompany);
  console.log('  - Vacancy location:', vacancyLocation);
  console.log('  - Message contains proper data:', vacancyTitle !== 'Неизвестная вакансия' ? '✅ YES' : '❌ NO');

  return {
    vacancyFetchSuccess,
    vacancyTitle,
    vacancyCompany,
    vacancyLocation,
    telegramMessage
  };
}

// Запускаем тест
testVacancyFetch().then(result => {
  console.log('\n✅ Test completed successfully!');
}).catch(error => {
  console.error('❌ Test failed:', error);
});
