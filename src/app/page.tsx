import { getBooks } from '@/lib/content';
import { BookCard } from '@/components/BookCard';
import { Suspense } from 'react';
import { BookCardSkeleton } from '@/components/BookCardSkeleton';

export default async function Home() {
  const books = await getBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
        Welcome to BookFlow
      </h1>
      
      <Suspense fallback={<BookListSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}

function BookListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      {Array.from({ length: 6 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
}
