'use client';

import { Book } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group block h-full hover:no-underline"
    >
      <div className="h-full border border-primary-100 dark:border-primary-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary-900/30 hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700 bg-white dark:bg-gray-900">
        <div className="relative aspect-square bg-primary-50 dark:bg-primary-900/30">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="flex flex-wrap gap-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-white/90 dark:bg-gray-900/90 text-primary-600 dark:text-primary-400 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 text-primary-600 dark:text-primary-400 group-hover:text-primary-500 line-clamp-2">
            {book.title}
          </h2>
          <p className="text-sm text-text-light dark:text-text-dark mb-4 line-clamp-3">
            {book.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-text-light dark:text-text-dark">
            <div className="flex items-center gap-1.5">
              <User size={16} className="text-primary-500" />
              <span>{book.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="text-primary-500" />
              <span>{new Date(book.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 