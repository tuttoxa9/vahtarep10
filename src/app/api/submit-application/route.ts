import { type NextRequest, NextResponse } from 'next/server';
import { submitApplication } from '@/lib/firestore';

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vacancyId, applicantName, applicantPhone, applicantEmail, message } = body;

    // Validate required fields
    if (!vacancyId || !applicantName || !applicantPhone) {
      return NextResponse.json(
        { error: 'Missing required fields: vacancyId, applicantName, applicantPhone' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

    // Check if Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'dummy-api-key') {
      console.warn('Firebase not configured, returning mock success');
      return NextResponse.json({
        success: true,
        applicationId: 'mock-id-' + Date.now(),
        message: 'Application submitted successfully (demo mode)'
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Save application to Firestore
    try {
      const applicationId = await submitApplication({
        vacancyId,
        applicantName,
        applicantPhone,
        applicantEmail,
        message
      });

      // Get vacancy details for Telegram notification
      let vacancyTitle = 'Неизвестная вакансия';
      let vacancyCompany = 'Не указано';
      let vacancyLocation = 'Не указано';

      console.log('🔍 Attempting to fetch vacancy details for ID:', vacancyId);

      // Проверяем, инициализирован ли Firebase
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
          !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
          process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'dummy-api-key') {
        console.warn('⚠️ Firebase not configured for vacancy details fetch');
      } else {
        try {
          const { getVacancyForNotification } = await import('@/lib/firestore');
          const vacancy = await getVacancyForNotification(vacancyId);
          console.log('📋 Vacancy data received:', vacancy);

        if (vacancy) {
          console.log('📊 Raw vacancy fields check:', {
            hasTitle: !!vacancy.title,
            hasCompany: !!vacancy.company,
            hasLocation: !!vacancy.location,
            title: vacancy.title,
            company: vacancy.company,
            location: vacancy.location
          });

          vacancyTitle = vacancy.title || 'Неизвестная вакансия';
          vacancyCompany = vacancy.company || 'Не указано';
          vacancyLocation = vacancy.location || 'Не указано';
          console.log('✅ Vacancy details extracted:', { vacancyTitle, vacancyCompany, vacancyLocation });
        } else {
          console.warn('⚠️ Vacancy not found for ID:', vacancyId);
        }
        } catch (vacancyError) {
          console.error('❌ Error fetching vacancy details:', vacancyError);
          console.error('❌ Error message:', vacancyError.message);
          console.error('❌ Error stack:', vacancyError.stack);
        }
      }

      // Send Telegram notification
      let telegramSent = false;
      const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        try {
          const telegramMessage = `🔔 *Новая заявка на вакансию!*

📋 *Вакансия:* ${vacancyTitle}
🏢 *Компания:* ${vacancyCompany}
📍 *Локация:* ${vacancyLocation}
🆔 *ID вакансии:* ${vacancyId}

👤 *Соискатель:*
• Имя: ${applicantName}
• Телефон: ${applicantPhone}
• Email: ${applicantEmail || 'не указан'}
• Сообщение: ${message || 'не указано'}

🆔 ID заявки: ${applicationId}
⏰ Дата подачи: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

          const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: telegramMessage,
              parse_mode: 'Markdown',
            })
          });

          if (telegramResponse.ok) {
            telegramSent = true;
            console.log('✅ Telegram notification sent successfully');
          } else {
            console.error('❌ Telegram API error:', await telegramResponse.text());
          }
        } catch (telegramError) {
          console.error('❌ Telegram error:', telegramError);
        }
      } else {
        console.warn('⚠️ Telegram credentials not configured');
      }

      return NextResponse.json({
        success: true,
        applicationId,
        telegramSent,
        vacancyDetails: { vacancyTitle, vacancyCompany, vacancyLocation },
        message: `Application submitted successfully${telegramSent ? ' and notification sent' : ' (notification not sent)'}`
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError);
      return NextResponse.json(
        {
          error: 'Failed to save application to database',
          details: firestoreError instanceof Error ? firestoreError.message : 'Unknown database error'
        },
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }
        }
      );
    }

  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      {
        error: 'Failed to process application',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}
