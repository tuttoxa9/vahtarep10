// Тест функции submit-application
const fetch = require('node-fetch');

async function testSubmitApplication() {
  const testData = {
    vacancyId: '0rUlJ5PAJUi44RwOqFyu', // Реальный ID из Firebase
    applicantName: 'Тестовый пользователь',
    applicantPhone: '+7 999 123 45 67',
    applicantEmail: 'test@example.com',
    message: 'Тестовое сообщение'
  };

  try {
    console.log('🧪 Тестирование submit-application функции...');
    console.log('📋 Данные для отправки:', testData);

    const response = await fetch('http://localhost:3000/api/submit-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    console.log('📤 Ответ сервера:');
    console.log('Status:', response.status);
    console.log('Body:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  }
}

testSubmitApplication();
