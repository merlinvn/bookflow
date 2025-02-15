import { getBooks } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-600 dark:text-primary-400">
        Available Books
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="group hover:no-underline"
          >
            <div className="border border-primary-100 dark:border-primary-900 rounded-lg overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-48 bg-primary-50 dark:bg-primary-900/30">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-primary-600 dark:text-primary-400 group-hover:text-primary-500">
                  {book.title}
                </h2>
                <p className="text-sm text-text-light dark:text-text-dark mb-4">
                  {book.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-600 dark:text-primary-400">
                    By {book.author}
                  </span>
                  <span className="text-text-light dark:text-text-dark opacity-75">
                    {new Date(book.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 