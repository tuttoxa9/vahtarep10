// Тест Firebase конфигурации
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAvdGVXFzqU-DrAi3Sw223qyscDuYjKbG0",
  authDomain: "vahta1-76378.firebaseapp.com",
  projectId: "vahta1-76378",
  storageBucket: "vahta1-76378.firebasestorage.app",
  messagingSenderId: "1037943763154",
  appId: "1:1037943763154:web:0e2a2dffc1de4d7279bd0b"
};

async function testFirebase() {
  try {
    console.log('🔥 Инициализация Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('📋 Получение вакансий...');
    const snapshot = await getDocs(collection(db, 'vacancies'));

    console.log(`✅ Найдено ${snapshot.size} вакансий:`);
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`  - ${doc.id}: ${data.title || 'Без названия'} (${data.company || 'Без компании'})`);
    });

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.error('Stack:', error.stack);
  }
}

testFirebase();
