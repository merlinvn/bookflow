'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function setLastReadChapter(formData: FormData) {
  const bookId = formData.get('bookId') as string;
  const chapterId = formData.get('chapterId') as string;

  if (!bookId || !chapterId) {
    throw new Error('Missing required parameters');
  }

  const cookieStore = await cookies();
  cookieStore.set(`lastRead_${bookId}`, chapterId, {
    maxAge: 31536000, // 1 year
    path: '/',
  });

  revalidatePath(`/books/${bookId}`);
} 