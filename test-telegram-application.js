const http = require('http');

// Тестируем с реальной вакансией
const testVacancyId = '0rUlJ5PAJUi44RwOqFyu'; // ID первой вакансии из списка

async function testSubmitApplication() {
  return new Promise((resolve, reject) => {
    const testData = {
      vacancyId: testVacancyId,
      applicantName: 'Тестовый пользователь Иван',
      applicantPhone: '+79001234567',
      applicantEmail: 'ivan.test@example.com',
      message: 'Тестовое сообщение для проверки Telegram уведомлений. Должны отображаться корректные данные вакансии.'
    };

    const postData = JSON.stringify(testData);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/submit-application',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log('📧 Отправляем тестовую заявку...');
    console.log('🎯 Vacancy ID:', testVacancyId);
    console.log('👤 Applicant:', testData.applicantName);
    console.log('');

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  try {
    console.log('🔍 Тестируем отправку заявки и получение данных о вакансии...\n');

    const result = await testSubmitApplication();

    console.log('✅ Результат отправки заявки:');
    console.log('Success:', result.success);
    console.log('Application ID:', result.applicationId);
    console.log('Telegram sent:', result.telegramSent);

    if (result.vacancyDetails) {
      console.log('\n📋 Данные вакансии, полученные для Telegram:');
      console.log('Title:', result.vacancyDetails.vacancyTitle);
      console.log('Company:', result.vacancyDetails.vacancyCompany);
      console.log('Location:', result.vacancyDetails.vacancyLocation);

      // Проверяем, что данные не являются значениями по умолчанию
      if (result.vacancyDetails.vacancyTitle === 'Неизвестная вакансия' ||
          result.vacancyDetails.vacancyCompany === 'Не указано' ||
          result.vacancyDetails.vacancyLocation === 'Не указано') {
        console.log('\n❌ ПРОБЛЕМА: Обнаружены значения по умолчанию!');
        console.log('Это означает, что данные о вакансии не были получены корректно.');
      } else {
        console.log('\n✅ УСПЕХ: Все данные о вакансии получены корректно!');
      }
    } else {
      console.log('\n❌ Данные о вакансии отсутствуют в ответе');
    }

    console.log('\n📝 Полный ответ:');
    console.log(JSON.stringify(result, null, 2));

    console.log('\n📊 Проверьте логи сервера выше для подробной информации о процессе получения данных вакансии.');

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.error('Stack:', error.stack);
  }
}

main();
