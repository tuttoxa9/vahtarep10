"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Send, MessageSquare, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddReviewModalProps {
  onSuccess?: () => void;
}

export default function AddReviewModal({ onSuccess }: AddReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    stars: 0,
    text: '',
    shiftType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, stars: rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.stars === 0) {
      alert('Пожалуйста, поставьте оценку');
      return;
    }

    if (formData.text.length < 10) {
      alert('Отзыв должен содержать минимум 10 символов');
      return;
    }

    if (!formData.shiftType.trim()) {
      alert('Укажите тип вахты');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Не удалось отправить отзыв');
      }

      alert('Спасибо за отзыв! Он будет опубликован после модерации.');

      // Сброс формы
      setFormData({
        stars: 0,
        text: '',
        shiftType: '',
      });

      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error instanceof Error ? error.message : "Не удалось отправить отзыв");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const rating = index + 1;
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleStarClick(rating)}
          className={cn(
            "transition-colors duration-200 hover:scale-110 transform",
            rating <= formData.stars
              ? "text-yellow-400"
              : "text-gray-300 hover:text-yellow-200"
          )}
        >
          <Star
            className={cn(
              "w-8 h-8",
              rating <= formData.stars && "fill-yellow-400"
            )}
          />
        </button>
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-5 h-5 mr-2" />
          Оставить отзыв
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl">
            <MessageSquare className="w-6 h-6 text-primary" />
            <span>Оставить отзыв</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Рейтинг */}
          <div>
            <Label className="text-base font-medium text-gray-700 mb-3 block">
              Ваша оценка *
            </Label>
            <div className="flex items-center space-x-1">
              {renderStars()}
            </div>
            {formData.stars > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Оценка: {formData.stars} из 5 звезд
              </p>
            )}
          </div>

          {/* Тип вахты */}
          <div>
            <Label htmlFor="shiftType" className="text-base font-medium text-gray-700 mb-3 block">
              Тип вахты *
            </Label>
            <Input
              id="shiftType"
              type="text"
              placeholder="Например: Стройка в Москве, Нефтяная вахта в Сибири..."
              value={formData.shiftType}
              onChange={(e) => setFormData(prev => ({ ...prev, shiftType: e.target.value }))}
              className="h-12"
              required
            />
          </div>

          {/* Текст отзыва */}
          <div>
            <Label htmlFor="reviewText" className="text-base font-medium text-gray-700 mb-3 block">
              Ваш отзыв *
            </Label>
            <Textarea
              id="reviewText"
              placeholder="Расскажите о своем опыте работы вахтовым методом: условия, зарплата, проживание, команда..."
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              className="min-h-[120px] resize-none"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Минимум 10 символов. Осталось: {Math.max(0, 10 - formData.text.length)}
            </p>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 text-base font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Отправка...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Отправить отзыв</span>
                </div>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-12 text-base font-medium"
            >
              Отмена
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            📝 <strong>Важно:</strong> Все отзывы проходят модерацию. Мы публикуем только честные и информативные отзывы о работе.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
