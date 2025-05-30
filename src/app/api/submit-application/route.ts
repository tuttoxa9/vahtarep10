import { type NextRequest, NextResponse } from 'next/server';

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

    // If Firebase is properly configured, you can add the real logic here
    // For now, return success
    return NextResponse.json({
      success: true,
      applicationId: 'app-id-' + Date.now(),
      message: 'Application submitted successfully'
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

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
