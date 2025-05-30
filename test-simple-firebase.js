const { initializeApp, getApps } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAvdGVXFzqU-DrAi3Sw223qyscDuYjKbG0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "vahta1-76378.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "vahta1-76378",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "vahta1-76378.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1037943763154",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1037943763154:web:0e2a2dffc1de4d7279bd0b"
};

async function testFirebaseConnection() {
  try {
    console.log('🔥 Testing Firebase connection...');
    console.log('Config:', firebaseConfig);
    
    // Initialize Firebase
    const apps = getApps();
    let app;
    if (apps.length > 0) {
      app = apps[0];
    } else {
      app = initializeApp(firebaseConfig);
    }
    
    const db = getFirestore(app);
    console.log('✅ Firebase initialized successfully');
    
    // Try to add a simple document
    const testData = {
      name: 'Test User',
      phone: '+1234567890',
      email: 'test@example.com',
      createdAt: Timestamp.now(),
      status: 'test'
    };
    
    console.log('📝 Attempting to save test data:', testData);
    
    const docRef = await addDoc(collection(db, 'applications'), testData);
    console.log('✅ Document successfully written with ID: ', docRef.id);
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
  }
}

testFirebaseConnection();