"use client";

import { useState, useEffect } from 'react';
import { Star, User, Calendar, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Review } from '@/types';
import AddReviewModal from './AddReviewModal';
import AllReviewsModal from './AllReviewsModal';
import { reviewsData } from '@/lib/reviewsData';

interface ReviewsSectionProps {
  reviews?: Review[];
  showAddForm?: boolean;
}

export default function ReviewsSection({ reviews: initialReviews, showAddForm = false }: ReviewsSectionProps) {
  // Используем первые 6 отзывов для отображения на главной странице
  const allReviews = initialReviews || reviewsData;
  const displayedReviews = allReviews.slice(0, 6);

  const [reviews, setReviews] = useState<Review[]>(displayedReviews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialReviews) {
      // Используем статичные данные вместо API запроса
      setReviews(displayedReviews);
    }
  }, [initialReviews]);

  const fetchReviews = async () => {
    // Для совместимости с AddReviewModal - обновляем отзывы
    setReviews(reviewsData.slice(0, 6));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={cn(
          "w-4 h-4",
          index < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        )}
      />
    ));
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-12 md:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Отзывы наших работников
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Честные отзывы о работе вахтовым методом от реальных людей
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Отзывы наших работников
            </h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-12 md:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Отзывы наших работников
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Скоро здесь появятся первые отзывы
            </p>
            <AddReviewModal onSuccess={fetchReviews} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Отзывы наших работников
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Честные отзывы о работе вахтовым методом от реальных людей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={cn(
                "bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
                "border border-gray-100"
              )}
            >
              {/* Рейтинг */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(review.stars)}
                </div>
                <div className="text-2xl font-bold text-primary">
                  {review.stars}.0
                </div>
              </div>

              {/* Текст отзыва */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{review.text}"
              </blockquote>

              {/* Информация о работе */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>{review.shiftType}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{formatDate(review.date)}</span>
                </div>
              </div>

              {/* Декоративный элемент */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-gray-500">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Проверенный отзыв</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Статистика и кнопки */}
        <div className="mt-12 text-center space-y-6">
          {reviews.length > 0 && (
            <div className="inline-flex items-center space-x-6 bg-white rounded-full px-8 py-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {(allReviews.reduce((sum, review) => sum + review.stars, 0) / allReviews.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Средняя оценка</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{allReviews.length}</div>
                <div className="text-sm text-gray-600">Отзывов</div>
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AllReviewsModal reviews={allReviews} />
            <AddReviewModal onSuccess={fetchReviews} />
          </div>
        </div>
      </div>
    </section>
  );
}
