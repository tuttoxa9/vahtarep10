import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  Vacancy,
  Application,
  FirestoreVacancy,
  FirebaseTimestamp
} from "@/types";

// Коллекции Firestore
const COLLECTIONS = {
  VACANCIES: 'vacancies',
  APPLICATIONS: 'applications',
  COMPANIES: 'companies',
  ADMIN_USERS: 'adminUsers'
} as const;

// Функция для преобразования FirebaseTimestamp в строку ISO
function processVacancyForClient(vacancy: any): FirestoreVacancy {
  try {
    console.log('🔄 Processing vacancy for client:', vacancy);
    const processedVacancy = { ...vacancy };

  // Обработка createdAt
  if (vacancy.createdAt && typeof vacancy.createdAt.toDate === 'function') {
    processedVacancy.createdAt = vacancy.createdAt.toDate().toISOString();
  } else if (vacancy.createdAt && vacancy.createdAt.seconds) {
    processedVacancy.createdAt = new Date(vacancy.createdAt.seconds * 1000).toISOString();
  }

  // Обработка updatedAt
  if (vacancy.updatedAt && typeof vacancy.updatedAt.toDate === 'function') {
    processedVacancy.updatedAt = vacancy.updatedAt.toDate().toISOString();
  } else if (vacancy.updatedAt && vacancy.updatedAt.seconds) {
    processedVacancy.updatedAt = new Date(vacancy.updatedAt.seconds * 1000).toISOString();
  }

    console.log('✅ Processed vacancy result:', processedVacancy);
    return processedVacancy as FirestoreVacancy;
  } catch (error) {
    console.error('❌ Error processing vacancy for client:', error);
    return vacancy as FirestoreVacancy;
  }
}

// ==================== ОСНОВНЫЕ ФУНКЦИИ ДЛЯ САЙТА ====================

// Получение преимуществ из базы данных
export async function getFeatures(): Promise<any[]> {
  try {
    const snapshot = await getDocs(collection(db, 'features'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Ошибка при получении преимуществ:', error);
    return [];
  }
}

// Получение всех вакансий
export async function getAllVacancies(): Promise<FirestoreVacancy[]> {
  try {
    // Простой запрос без сортировки для избежания требований индексов
    const snapshot = await getDocs(collection(db, COLLECTIONS.VACANCIES));
    const vacancies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).filter((vacancy: any) => vacancy.status === 'active' || !vacancy.status);

    return vacancies.map(processVacancyForClient);
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return [];
  }
}

// Получение вакансии по ID
export async function getVacancyById(vacancyId: string): Promise<FirestoreVacancy | null> {
  try {
    console.log('🔍 Firestore: Fetching vacancy with ID:', vacancyId);
    const docRef = doc(db, COLLECTIONS.VACANCIES, vacancyId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn('⚠️ Firestore: Document does not exist for ID:', vacancyId);
      return null;
    }

    console.log('📄 Firestore: Document exists, data:', docSnap.data());

    // Увеличиваем счетчик просмотров
    try {
      await updateDoc(docRef, {
        viewCount: increment(1)
      });
      console.log('✅ Firestore: View count incremented');
    } catch (updateError) {
      console.warn('⚠️ Firestore: Could not increment view count:', updateError);
    }

    const vacancy = {
      id: docSnap.id,
      ...docSnap.data()
    };

    console.log('📋 Firestore: Raw vacancy object:', vacancy);
    const processedVacancy = processVacancyForClient(vacancy);
    console.log('✅ Firestore: Processed vacancy:', processedVacancy);

    return processedVacancy;
  } catch (error) {
    console.error('❌ Firestore: Error fetching vacancy by ID:', error);
    console.error('❌ Firestore: Error details:', error.message);
    console.error('❌ Firestore: Error stack:', error.stack);
    return null;
  }
}

// Получение вакансии по ID для уведомлений (без увеличения счетчика просмотров)
export async function getVacancyForNotification(vacancyId: string): Promise<FirestoreVacancy | null> {
  try {
    console.log('🔔 Notification: Fetching vacancy with ID:', vacancyId);

    // Проверяем, что ID не пустой
    if (!vacancyId || vacancyId.trim() === '') {
      console.error('❌ Notification: Invalid vacancy ID provided:', vacancyId);
      return null;
    }

    const docRef = doc(db, COLLECTIONS.VACANCIES, vacancyId);
    console.log('🔔 Notification: Document reference created for path:', `${COLLECTIONS.VACANCIES}/${vacancyId}`);

    const docSnap = await getDoc(docRef);
    console.log('🔔 Notification: Document snapshot received, exists:', docSnap.exists());

    if (!docSnap.exists()) {
      console.warn('⚠️ Notification: Document does not exist for ID:', vacancyId);

      // Попытка найти вакансию среди всех вакансий
      try {
        console.log('🔄 Notification: Attempting fallback search...');
        const allVacancies = await getAllVacancies();
        const foundVacancy = allVacancies.find(v => v.id === vacancyId);
        if (foundVacancy) {
          console.log('✅ Notification: Found vacancy via fallback:', foundVacancy);
          return foundVacancy;
        }
        console.warn('⚠️ Notification: Vacancy not found in fallback search either');
      } catch (fallbackError) {
        console.error('❌ Notification: Fallback search failed:', fallbackError);
      }

      return null;
    }

    const rawData = docSnap.data();
    console.log('📄 Notification: Raw document data:', rawData);

    const vacancy = {
      id: docSnap.id,
      ...rawData
    };

    console.log('📋 Notification: Raw vacancy object:', vacancy);

    // Простая проверка наличия основных полей
    if (!vacancy.title && !vacancy.company && !vacancy.location) {
      console.warn('⚠️ Notification: Vacancy missing all main fields');
    }

    const processedVacancy = processVacancyForClient(vacancy);
    console.log('✅ Notification: Processed vacancy:', processedVacancy);

    return processedVacancy;
  } catch (error) {
    console.error('❌ Notification: Error fetching vacancy by ID:', error);
    console.error('❌ Notification: Error details:', error.message);
    console.error('❌ Notification: Error stack:', error.stack);
    return null;
  }
}

// Фильтрация вакансий по городу
export async function getVacanciesByCity(city: string): Promise<FirestoreVacancy[]> {
  try {
    const vacanciesQuery = query(
      collection(db, COLLECTIONS.VACANCIES),
      where('status', '==', 'active'),
      where('location', '==', city),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(vacanciesQuery);
    const vacancies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return vacancies.map(processVacancyForClient);
  } catch (error) {
    console.error('Error fetching vacancies by city:', error);
    return [];
  }
}

// Получение популярных вакансий
export async function getPopularVacancies(count = 5): Promise<FirestoreVacancy[]> {
  try {
    // Простой запрос без сложной сортировки
    const snapshot = await getDocs(collection(db, COLLECTIONS.VACANCIES));
    const vacancies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter((vacancy: any) => vacancy.status === 'active' || !vacancy.status)
    .sort((a: any, b: any) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, count);

    return vacancies.map(processVacancyForClient);
  } catch (error) {
    console.error('Error fetching popular vacancies:', error);
    return [];
  }
}

// Отправка заявки на вакансию
export async function submitApplication(application: Omit<Application, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), {
      ...application,
      createdAt: Timestamp.now(),
      status: 'new'
    });

    return docRef.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw new Error('Failed to submit application');
  }
}
