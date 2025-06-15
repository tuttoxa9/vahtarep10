"use client";

import { useState } from 'react';
import { Star, User, Calendar, Briefcase, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Review } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AllReviewsModalProps {
  reviews: Review[];
  trigger?: React.ReactNode;
}

export default function AllReviewsModal({ reviews, trigger }: AllReviewsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(1)
    : '0.0';

  const defaultTrigger = (
    <Button
      variant="outline"
      className="bg-primary text-white hover:bg-primary/90 border-primary hover:border-primary/90"
    >
      Прочитать все отзывы ({reviews.length})
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-center">
            Все отзывы о работе вахтовым методом
          </DialogTitle>
          <div className="flex items-center justify-center space-x-6 mt-4 bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{averageRating}</div>
              <div className="text-sm text-gray-600">Средняя оценка</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{reviews.length}</div>
              <div className="text-sm text-gray-600">Отзывов</div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-2">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={cn(
                  "bg-white rounded-xl p-4 shadow-md border border-gray-100",
                  "hover:shadow-lg transition-shadow duration-200"
                )}
              >
                {/* Рейтинг */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.stars)}
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {review.stars}.0
                  </div>
                </div>

                {/* Текст отзыва */}
                <blockquote className="text-gray-700 mb-4 leading-relaxed text-sm">
                  "{review.text}"
                </blockquote>

                {/* Информация о работе */}
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="truncate">{review.shiftType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3 text-primary flex-shrink-0" />
                    <span>{formatDate(review.date)}</span>
                  </div>
                </div>

                {/* Декоративный элемент */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <User className="w-3 h-3" />
                    <span className="text-xs">Проверенный отзыв</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
