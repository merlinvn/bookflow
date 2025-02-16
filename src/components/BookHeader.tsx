'use client';

import { Book } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';

interface BookHeaderProps {
  book: Book;
}

export default function BookHeader({ book }: BookHeaderProps) {
  return (
    <>
      {/* Navigation */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 mb-4"
        >
          <Home size={20} />
          <span>Back to Books</span>
        </Link>
      </div>

      {/* Book Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="relative w-full md:w-1/3 aspect-square">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-primary-600 dark:text-primary-400">
            {book.title}
          </h1>
          <p className="text-lg mb-4 text-text-light dark:text-text-dark">
            {book.description}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary-600 dark:text-primary-400">
              By {book.author}
            </span>
            <span className="text-text-light dark:text-text-dark opacity-75">
              Published {new Date(book.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {book.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 