async function testAPIRoute() {
  try {
    console.log('🧪 Тестируем API route /api/submit-application...');
    
    const testData = {
      vacancyId: '7tjzADoTOHd5545TdRt3',
      applicantName: 'Тестовый API User',
      applicantPhone: '+79123456789',
      applicantEmail: 'test-api@example.com',
      message: 'Тестовая заявка через API route'
    };
    
    console.log('📤 Отправляем данные:', testData);
    
    const response = await fetch('http://localhost:3000/api/submit-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    console.log('📥 Ответ API:', {
      status: response.status,
      ok: response.ok,
      result: result
    });
    
    if (response.ok && result.success) {
      console.log('✅ API route работает корректно!');
      console.log('Application ID:', result.applicationId);
    } else {
      console.log('❌ API route вернул ошибку');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании API route:', error);
  }
}

testAPIRoute();