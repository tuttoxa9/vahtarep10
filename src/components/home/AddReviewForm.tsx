"use client";

import { useState } from 'react';
import { Star, Send, MessageSquare } from 'lucide-react';

export default function AddReviewForm() {
  const [formData, setFormData] = useState({
    stars: 0,
    text: '',
    shiftType: '',
  });

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, stars: rating }));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const rating = index + 1;
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleStarClick(rating)}
          className={`transition-colors duration-200 hover:scale-110 transform ${
            rating <= formData.stars
              ? "text-yellow-400"
              : "text-gray-300 hover:text-yellow-200"
          }`}
        >
          <Star
            className={`w-8 h-8 ${
              rating <= formData.stars ? "fill-yellow-400" : ""
            }`}
          />
        </button>
      );
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold text-gray-900">
          Оставить отзыв
        </h3>
      </div>

      <form className="space-y-6">
        <div>
          <label className="text-base font-medium text-gray-700 mb-3 block">
            Ваша оценка *
          </label>
          <div className="flex items-center space-x-1">
            {renderStars()}
          </div>
        </div>

        <div>
          <label className="text-base font-medium text-gray-700 mb-3 block">
            Тип вахты *
          </label>
          <input
            type="text"
            placeholder="Например: Стройка в Москве, Нефтяная вахта в Сибири..."
            value={formData.shiftType}
            onChange={(e) => setFormData(prev => ({ ...prev, shiftType: e.target.value }))}
            className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-base font-medium text-gray-700 mb-3 block">
            Ваш отзыв *
          </label>
          <textarea
            placeholder="Расскажите о своем опыте работы вахтовым методом..."
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Отправить отзыв</span>
        </button>
      </form>
    </div>
  );
}
