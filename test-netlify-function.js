import dotenv from 'dotenv';

// Загружаем переменные из .env.local
dotenv.config({ path: '.env.local' });

async function testNetlifyFunction() {
  try {
    console.log('🧪 Тестируем Netlify функцию submit-application...');
    
    const testData = {
      vacancyId: '7tjzADoTOHd5545TdRt3', // ID существующей вакансии
      applicantName: 'Тестовый Пользователь',
      applicantPhone: '+79123456789',
      applicantEmail: 'test@example.com',
      message: 'Тестовая заявка для проверки функциональности'
    };
    
    // Для локального тестирования импортируем функцию напрямую
    const submitApplicationModule = await import('./netlify/functions/submit-application.js');
    
    // Симулируем Netlify event
    const mockEvent = {
      httpMethod: 'POST',
      body: JSON.stringify(testData),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const mockContext = {};
    
    console.log('📤 Отправляем тестовые данные:', testData);
    
    const result = await submitApplicationModule.handler(mockEvent, mockContext);
    
    console.log('📥 Ответ функции:', {
      statusCode: result.statusCode,
      body: JSON.parse(result.body)
    });
    
    if (result.statusCode === 200) {
      console.log('✅ Функция работает корректно!');
    } else {
      console.log('❌ Функция вернула ошибку');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании функции:', error);
  }
}

testNetlifyFunction();