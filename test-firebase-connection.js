import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import dotenv from 'dotenv';

// Загружаем переменные из .env.local
dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function testFirebaseConnection() {
  try {
    console.log('🔥 Тестируем подключение к Firebase...');
    console.log('Project ID:', firebaseConfig.projectId);
    
    // Инициализируем Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Пробуем получить коллекцию вакансий
    console.log('📋 Получаем список вакансий...');
    const vacanciesSnapshot = await getDocs(collection(db, 'vacancies'));
    console.log(`✅ Найдено ${vacanciesSnapshot.size} вакансий`);
    
    vacanciesSnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`- ${data.title} (ID: ${doc.id})`);
    });
    
    console.log('✅ Firebase подключение работает!');
  } catch (error) {
    console.error('❌ Ошибка подключения к Firebase:', error);
  }
}

testFirebaseConnection();