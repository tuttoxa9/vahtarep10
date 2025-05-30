exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('🧪 Testing Firebase connection...');

    // Import Firebase modules
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, collection, addDoc, Timestamp } = await import('firebase/firestore');

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    console.log('🔧 Firebase Config Check:', {
      apiKey: firebaseConfig.apiKey ? '✅ SET' : '❌ NOT SET',
      projectId: firebaseConfig.projectId || '❌ NOT SET',
      authDomain: firebaseConfig.authDomain ? '✅ SET' : '❌ NOT SET'
    });

    // Initialize Firebase
    const app = initializeApp(firebaseConfig, `test-app-${Date.now()}`);
    console.log('🚀 Firebase app initialized');

    // Get Firestore
    const db = getFirestore(app);
    console.log('🗄️ Firestore connection established');

    // Create test document
    const testData = {
      testField: 'test-value',
      createdAt: Timestamp.now(),
      source: 'test-function'
    };

    console.log('💾 Creating test document...');
    const docRef = await addDoc(collection(db, 'applications'), testData);
    console.log('✅ Test document created with ID:', docRef.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Firebase test successful',
        documentId: docRef.id,
        config: {
          projectId: firebaseConfig.projectId,
          hasApiKey: !!firebaseConfig.apiKey,
          hasAuthDomain: !!firebaseConfig.authDomain
        }
      })
    };

  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack
      })
    };
  }
};
