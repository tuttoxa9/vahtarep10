const http = require('http');

const baseUrl = 'http://localhost:3000';

// Функция для получения всех вакансий
async function getAllVacancies() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/vacancies',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Функция для получения конкретной вакансии
async function getVacancyById(id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/vacancies/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Функция для тестирования отправки заявки
async function testSubmitApplication(vacancyId) {
  return new Promise((resolve, reject) => {
    const testData = {
      vacancyId: vacancyId,
      applicantName: 'Тестовый пользователь',
      applicantPhone: '+79001234567',
      applicantEmail: 'test@example.com',
      message: 'Тестовое сообщение для отладки'
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

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
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
    console.log('🔍 Получаем список всех вакансий...');
    const vacancies = await getAllVacancies();

    console.log(`📋 Найдено вакансий: ${vacancies.length}`);

    if (vacancies.length > 0) {
      const firstVacancy = vacancies[0];
      console.log('\n🎯 Первая вакансия:');
      console.log('ID:', firstVacancy.id);
      console.log('Title:', firstVacancy.title);
      console.log('Company:', firstVacancy.company);
      console.log('Location:', firstVacancy.location);
      console.log('Full data:', JSON.stringify(firstVacancy, null, 2));

      console.log('\n🔍 Получаем эту же вакансию по ID...');
      const vacancyById = await getVacancyById(firstVacancy.id);
      console.log('📋 Вакансия по ID:');
      console.log('Title:', vacancyById.title);
      console.log('Company:', vacancyById.company);
      console.log('Location:', vacancyById.location);

      console.log('\n📧 Тестируем отправку заявки...');
      const applicationResult = await testSubmitApplication(firstVacancy.id);
      console.log('✅ Результат отправки заявки:');
      console.log(JSON.stringify(applicationResult, null, 2));

    } else {
      console.log('❌ Вакансии не найдены!');
    }

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
}

main();
