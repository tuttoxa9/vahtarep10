import { type NextRequest, NextResponse } from 'next/server';
import {
  updateReview,
  deleteReview,
  approveReview,
  rejectReview
} from '@/lib/reviews';

// Обновить отзыв
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, ...updateData } = body;

    if (action === 'approve') {
      await approveReview(id);
      return NextResponse.json({
        success: true,
        message: 'Review approved'
      });
    }

    if (action === 'reject') {
      await rejectReview(id);
      return NextResponse.json({
        success: true,
        message: 'Review rejected'
      });
    }

    // Валидация обновляемых данных
    if (updateData.stars && (updateData.stars < 1 || updateData.stars > 5)) {
      return NextResponse.json(
        { error: 'Stars must be between 1 and 5' },
        { status: 400 }
      );
    }

    if (updateData.text && updateData.text.length < 10) {
      return NextResponse.json(
        { error: 'Review text must be at least 10 characters' },
        { status: 400 }
      );
    }

    await updateReview(id, updateData);

    return NextResponse.json({
      success: true,
      message: 'Review updated successfully'
    });
  } catch (error) {
    console.error('Error in PATCH /api/reviews/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// Удалить отзыв
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await deleteReview(id);

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /api/reviews/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
