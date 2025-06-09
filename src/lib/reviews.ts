import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { Review, FirestoreReview } from '@/types';

const REVIEWS_COLLECTION = 'reviews';

// Конвертация Firestore документа в Review
export function convertFirestoreReview(doc: any): Review {
  const data = doc.data();
  return {
    id: doc.id,
    stars: data.stars,
    text: data.text,
    date: data.date?.toDate?.() || new Date(data.date),
    shiftType: data.shiftType,
    approved: data.approved,
    createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
    updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
  };
}

// Получить все одобренные отзывы
export async function getApprovedReviews(limitCount = 10): Promise<Review[]> {
  try {
    const reviewsRef = collection(db, REVIEWS_COLLECTION);
    const q = query(
      reviewsRef,
      where('approved', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertFirestoreReview);
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }
}

// Получить все отзывы (для админки)
export async function getAllReviews(): Promise<Review[]> {
  try {
    const reviewsRef = collection(db, REVIEWS_COLLECTION);
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertFirestoreReview);
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    return [];
  }
}

// Добавить новый отзыв
export async function addReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const reviewsRef = collection(db, REVIEWS_COLLECTION);
    const docRef = await addDoc(reviewsRef, {
      ...reviewData,
      date: reviewData.date instanceof Date ? Timestamp.fromDate(reviewData.date) : new Date(reviewData.date),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}

// Обновить отзыв
export async function updateReview(reviewId: string, updates: Partial<Review>): Promise<void> {
  try {
    const reviewRef = doc(db, REVIEWS_COLLECTION, reviewId);
    const updateData: any = {
      ...updates,
      updatedAt: serverTimestamp(),
    };

    if (updates.date) {
      updateData.date = updates.date instanceof Date ? Timestamp.fromDate(updates.date) : new Date(updates.date);
    }

    await updateDoc(reviewRef, updateData);
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
}

// Одобрить отзыв
export async function approveReview(reviewId: string): Promise<void> {
  return updateReview(reviewId, { approved: true });
}

// Отклонить отзыв
export async function rejectReview(reviewId: string): Promise<void> {
  return updateReview(reviewId, { approved: false });
}

// Удалить отзыв
export async function deleteReview(reviewId: string): Promise<void> {
  try {
    const reviewRef = doc(db, REVIEWS_COLLECTION, reviewId);
    await deleteDoc(reviewRef);
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}

// Получить статистику отзывов
export async function getReviewsStats(): Promise<{
  total: number;
  approved: number;
  pending: number;
  averageRating: number;
}> {
  try {
    const reviews = await getAllReviews();
    const approved = reviews.filter(r => r.approved);
    const pending = reviews.filter(r => !r.approved);

    const averageRating = approved.length > 0
      ? approved.reduce((sum, review) => sum + review.stars, 0) / approved.length
      : 0;

    return {
      total: reviews.length,
      approved: approved.length,
      pending: pending.length,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  } catch (error) {
    console.error('Error getting reviews stats:', error);
    return {
      total: 0,
      approved: 0,
      pending: 0,
      averageRating: 0,
    };
  }
}
