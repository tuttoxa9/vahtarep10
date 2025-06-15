exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Динамический импорт Firebase
    const { initializeApp, getApps } = await import('firebase/app');
    const { getFirestore, collection, addDoc, Timestamp } = await import('firebase/firestore');

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    // Инициализация Firebase
    const apps = getApps();
    const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const { vacancyId, applicantName, applicantPhone, applicantEmail, message } = JSON.parse(event.body || '{}');

    if (!vacancyId || !applicantName || !applicantPhone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Сохранение в Firestore
    const applicationData = {
      vacancyId,
      applicantName,
      applicantPhone,
      applicantEmail: applicantEmail || '',
      message: message || '',
      createdAt: Timestamp.now(),
      status: 'new'
    };

    const docRef = await addDoc(collection(db, 'applications'), applicationData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        applicationId: docRef.id,
        message: 'Application submitted successfully'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
