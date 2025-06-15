import { NextResponse } from "next/server";
import { getVacancyById } from "@/lib/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Vacancy ID is required" },
        { status: 400 }
      );
    }

    // Проверяем наличие Firebase конфигурации
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.warn("Firebase not configured, returning 404");
      return NextResponse.json(
        { error: "Vacancy not found" },
        { status: 404 }
      );
    }

    const vacancy = await getVacancyById(id);

    if (!vacancy) {
      return NextResponse.json(
        { error: "Vacancy not found" },
        { status: 404 }
      );
    }

    // Сериализуем данные для клиента
    const serializedVacancy = JSON.parse(JSON.stringify(vacancy));

    // Простой ответ без сложного кэширования
    return NextResponse.json(serializedVacancy);
  } catch (error) {
    console.error("Error fetching vacancy:", error);
    return NextResponse.json(
      { error: "Failed to fetch vacancy" },
      { status: 500 }
    );
  }
}

// Добавляем runtime для serverless функций
export const runtime = 'nodejs';

// Не кэшируем этот route статически
export const dynamic = 'force-dynamic';
