// Тестирование Netlify функции submit-application
require('dotenv').config({ path: '.env.local' });

// Имитируем Netlify environment
const event = {
  httpMethod: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    vacancyId: 'Zax86E3K0xQeb4Zsigps',
    applicantName: 'Test User',
    applicantPhone: '+1234567890',
    applicantEmail: 'test@example.com',
    message: 'Test application message'
  })
};

const context = {};

// Импортируем функцию
const { handler } = require('./netlify/functions/submit-application.js');

// Тестируем функцию
async function testFunction() {
  console.log('🔧 Тестирование функции submit-application...');
  console.log('📧 Environment variables:');
  console.log('FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? '✅ Установлен' : '❌ Не установлен');
  console.log('TELEGRAM_CHAT_ID:', process.env.TELEGRAM_CHAT_ID ? '✅ Установлен' : '❌ Не установлен');
  
  try {
    const result = await handler(event, context);
    console.log('✅ Результат функции:');
    console.log('Status Code:', result.statusCode);
    console.log('Body:', result.body);
  } catch (error) {
    console.error('❌ Ошибка при выполнении функции:', error);
  }
}

testFunction();