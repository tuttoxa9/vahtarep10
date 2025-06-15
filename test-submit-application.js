const { handler } = require('./netlify/functions/submit-application.js');

// Симуляция события Netlify Function
const testEvent = {
  httpMethod: 'POST',
  body: JSON.stringify({
    vacancyId: 'test-vacancy-123',
    applicantName: 'Тест Пользователь',
    applicantPhone: '+7999123456',
    applicantEmail: 'test@example.com',
    message: 'Тестовое сообщение для проверки функции'
  }),
  headers: {
    'content-type': 'application/json'
  }
};

const testContext = {};

async function testFunction() {
  try {
    console.log('🧪 Тестирование функции submit-application...');
    console.log('📤 Отправляемые данные:', JSON.parse(testEvent.body));
    
    const result = await handler(testEvent, testContext);
    
    console.log('✅ Результат функции:');
    console.log('Status Code:', result.statusCode);
    console.log('Headers:', result.headers);
    console.log('Body:', JSON.parse(result.body));
    
    if (result.statusCode === 200) {
      console.log('🎉 Функция работает корректно!');
    } else {
      console.log('❌ Функция вернула ошибку');
    }
  } catch (error) {
    console.error('💥 Ошибка при тестировании:', error);
  }
}

testFunction();