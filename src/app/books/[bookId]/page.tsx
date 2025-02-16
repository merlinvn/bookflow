import { getBook, getBooks } from '@/lib/content';
import { notFound } from 'next/navigation';
import BookContent from '@/components/BookContent';

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

  return <BookContent book={book} />;
} 