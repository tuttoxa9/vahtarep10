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
  
  return processedVacancy as FirestoreVacancy;
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
    const docRef = doc(db, COLLECTIONS.VACANCIES, vacancyId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    // Увеличиваем счетчик просмотров
    await updateDoc(docRef, {
      viewCount: increment(1)
    });
    
    const vacancy = {
      id: docSnap.id,
      ...docSnap.data()
    };
    
    return processVacancyForClient(vacancy);
  } catch (error) {
    console.error('Error fetching vacancy by ID:', error);
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


