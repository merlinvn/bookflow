import { getBook, getBooks } from '@/lib/content';
import { notFound } from 'next/navigation';
import BookContent from '@/components/BookContent';
import { cookies } from 'next/headers';

interface Props {
  params: Promise<{
    bookId: string;
  }>;
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    bookId: book.id,
  }));
}

export default async function BookPage({ params }: Props) {
  const { bookId } = await params;
  const book = await getBook(bookId);

  if (!book) {
    notFound();
  }

  // Get the last read chapter from cookies
  const cookieStore = await cookies();
  const lastReadChapter = cookieStore.get(`lastRead_${bookId}`)?.value;

  return (
    <BookContent 
      book={book} 
      lastReadChapter={lastReadChapter}
    />
  );
} 