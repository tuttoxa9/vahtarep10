exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('=== DEBUG SUBMIT APPLICATION ===');
    console.log('Timestamp:', new Date().toISOString());

    // Проверяем Firebase переменные окружения
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    const firebaseStatus = {
      apiKey: firebaseConfig.apiKey ? '✅ SET' : '❌ NOT SET',
      authDomain: firebaseConfig.authDomain ? '✅ SET' : '❌ NOT SET',
      projectId: firebaseConfig.projectId ? '✅ SET' : '❌ NOT SET',
      storageBucket: firebaseConfig.storageBucket ? '✅ SET' : '❌ NOT SET',
      messagingSenderId: firebaseConfig.messagingSenderId ? '✅ SET' : '❌ NOT SET',
      appId: firebaseConfig.appId ? '✅ SET' : '❌ NOT SET'
    };

    // Проверяем Telegram переменные
    const telegramStatus = {
      botToken: process.env.TELEGRAM_BOT_TOKEN ? '✅ SET' : '❌ NOT SET',
      chatId: process.env.TELEGRAM_CHAT_ID ? '✅ SET' : '❌ NOT SET'
    };

    // Тестируем API endpoint с тестовой вакансией
    let apiTestResult = 'Не тестировался';
    const testVacancyId = '3E8wUnKh7dWsYwFMUcNu'; // ID из последнего уведомления

    try {
      console.log('Testing API endpoint...');
      const apiUrl = `https://${event.headers.host}/api/vacancies/${testVacancyId}`;
      console.log('API URL:', apiUrl);

      const apiResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        timeout: 5000
      });

      console.log('API Response status:', apiResponse.status);

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        apiTestResult = `✅ SUCCESS - Vacancy: ${data.title || 'No title'}, Company: ${data.company || 'No company'}`;
      } else {
        const errorText = await apiResponse.text();
        apiTestResult = `❌ FAILED - Status: ${apiResponse.status}, Error: ${errorText}`;
      }
    } catch (apiError) {
      apiTestResult = `❌ ERROR - ${apiError.message}`;
    }

    // Результат диагностики
    const diagnostics = {
      timestamp: new Date().toISOString(),
      firebaseConfiguration: firebaseStatus,
      telegramConfiguration: telegramStatus,
      apiEndpointTest: apiTestResult,
      environment: {
        nodeVersion: process.version,
        host: event.headers.host,
        userAgent: event.headers['user-agent'] || 'Unknown'
      }
    };

    console.log('Diagnostics result:', JSON.stringify(diagnostics, null, 2));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        diagnostics,
        message: 'Debug information collected successfully'
      }, null, 2)
    };

  } catch (error) {
    console.error('Debug function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Debug function failed',
        details: error.message,
        stack: error.stack
      })
    };
  }
};
