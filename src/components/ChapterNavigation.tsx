'use client';

import Link from 'next/link';
import { Book, Chapter } from '@/types';
import { Menu, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface ChapterNavigationProps {
  book: Book;
  currentChapter: Chapter;
}

export function ChapterNavigation({ book, currentChapter }: ChapterNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 dark:bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <Menu size={24} />
      </button>

      {/* Navigation Menu */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 min-w-[200px] flex flex-col gap-3">
          {/* Book Menu Link */}
          <Link
            href={`/books/${book.id}`}
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50"
          >
            <BookOpen size={20} />
            <span>Book Menu</span>
          </Link>

          {/* Chapter Navigation */}
          <div className="flex flex-col gap-2 border-t border-primary-100 dark:border-primary-800 pt-2">
            {currentChapter.previousChapter && (
              <Link
                href={`/books/${book.id}/${currentChapter.previousChapter.slug}`}
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50"
              >
                <ChevronLeft size={20} />
                <span>Previous Chapter</span>
              </Link>
            )}
            
            {currentChapter.nextChapter && (
              <Link
                href={`/books/${book.id}/${currentChapter.nextChapter.slug}`}
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50"
              >
                <ChevronRight size={20} />
                <span>Next Chapter</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 