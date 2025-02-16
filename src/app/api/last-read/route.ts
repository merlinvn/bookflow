import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { bookId, chapterId } = await request.json();

  if (!bookId || !chapterId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(`lastRead_${bookId}`, chapterId, {
    maxAge: 31536000, // 1 year
    path: '/',
  });

  return response;
} 