import { type NextRequest, NextResponse } from 'next/server';
import {
  getApprovedReviews,
  getAllReviews,
  addReview,
  getReviewsStats
} from '@/lib/reviews';
import type { Review } from '@/types';

// Получить отзывы
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const showAll = searchParams.get('all') === 'true';
    const stats = searchParams.get('stats') === 'true';
    const limit = Number.parseInt(searchParams.get('limit') || '10');

    if (stats) {
      const statsData = await getReviewsStats();
      return NextResponse.json(statsData);
    }

    const reviews = showAll
      ? await getAllReviews()
      : await getApprovedReviews(limit);

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// Добавить новый отзыв
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация данных
    const { stars, text, shiftType, date } = body;

    if (!stars || !text || !shiftType) {
      return NextResponse.json(
        { error: 'Missing required fields: stars, text, shiftType' },
        { status: 400 }
      );
    }

    if (stars < 1 || stars > 5) {
      return NextResponse.json(
        { error: 'Stars must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (text.length < 10) {
      return NextResponse.json(
        { error: 'Review text must be at least 10 characters' },
        { status: 400 }
      );
    }

    const reviewData = {
      stars: Number.parseInt(stars),
      text: text.trim(),
      shiftType: shiftType.trim(),
      date: date ? new Date(date) : new Date(),
      approved: true, // Для демонстрации сразу одобряем
    };

    const reviewId = await addReview(reviewData);

    return NextResponse.json(
      {
        success: true,
        reviewId,
        message: 'Review submitted for moderation'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/reviews:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
