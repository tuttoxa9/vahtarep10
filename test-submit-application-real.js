// Тест отправки заявки через локальный API
async function testApplicationSubmission() {
  const testData = {
    vacancyId: '0rUlJ5PAJUi44RwOqFyu', // Реальный ID из Firebase
    applicantName: 'Тестовый Пользователь',
    applicantPhone: '+7 900 123-45-67',
    applicantEmail: 'test@example.com',
    message: 'Тестовая заявка для диагностики'
  };

  console.log('🧪 Отправляем тестовую заявку...');
  console.log('📋 Данные заявки:', testData);

  try {
    const response = await fetch('http://localhost:3000/api/submit-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('📨 Статус ответа:', response.status);

    const result = await response.json();
    console.log('📝 Ответ сервера:', JSON.stringify(result, null, 2));

    if (result.vacancyDetails) {
      console.log('✅ Детали вакансии получены:');
      console.log('  - Название:', result.vacancyDetails.vacancyTitle);
      console.log('  - Компания:', result.vacancyDetails.vacancyCompany);
      console.log('  - Локация:', result.vacancyDetails.vacancyLocation);
    }

    if (result.telegramSent) {
      console.log('✅ Telegram уведомление отправлено');
    } else {
      console.log('❌ Telegram уведомление НЕ отправлено');
    }

  } catch (error) {
    console.error('❌ Ошибка при отправке заявки:', error.message);
  }
}

testApplicationSubmission();
