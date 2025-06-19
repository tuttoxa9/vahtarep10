import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function testVacancyDetails() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Тестируем получение данных для конкретной вакансии
    const vacancyId = '0rUlJ5PAJUi44RwOqFyu';
    console.log('🔍 Тестируем получение вакансии ID:', vacancyId);

    const vacancyRef = doc(db, 'vacancies', vacancyId);
    const vacancySnap = await getDoc(vacancyRef);

    if (vacancySnap.exists()) {
      const data = vacancySnap.data();
      console.log('✅ Данные вакансии получены:');
      console.log('- Title:', data.title);
      console.log('- Company:', data.company);
      console.log('- Location:', data.location);
      console.log('- Все поля:', Object.keys(data));
      console.log('- Полные данные:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Вакансия не найдена');
    }
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
}

testVacancyDetails();
