'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Book, Chapter } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface ChapterNavigationProps {
  book: Book;
  currentChapter: Chapter;
  showTitles?: boolean;
  showPreviews?: boolean;
}

export function ChapterNavigation({ 
  book, 
  currentChapter,
  showTitles = true,
  showPreviews = false,
}: ChapterNavigationProps) {
  const router = useRouter();

  // Navigation handlers
  const handlePrevious = () => {
    if (currentChapter.previousChapter) {
      router.push(`/books/${book.id}/${currentChapter.previousChapter.slug}`);
    }
  };

  const handleNext = () => {
    if (currentChapter.nextChapter) {
      router.push(`/books/${book.id}/${currentChapter.nextChapter.slug}`);
    }
  };

  const handleHome = () => {
    router.push(`/books/${book.id}`);
  };

  // Set up keyboard navigation
  useKeyboardNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
    onHome: handleHome,
  });

  return (
    <footer className="border-t border-primary-100 dark:border-primary-900 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {/* Previous Chapter */}
          {currentChapter.previousChapter ? (
            <Link
              href={`/books/${book.id}/${currentChapter.previousChapter.slug}`}
              className="group flex flex-col items-start"
            >
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline">
                <ChevronLeft className="transition-transform group-hover:-translate-x-1" />
                <span>Previous Chapter</span>
              </div>
              {showTitles && (
                <span className="text-sm text-text-light dark:text-text-dark opacity-60 mt-1">
                  {currentChapter.previousChapter.title}
                </span>
              )}
              {showPreviews && (
                <div className="hidden group-hover:block mt-2 p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg max-w-sm">
                  <p className="text-sm text-text-light dark:text-text-dark line-clamp-2">
                    Preview content here...
                  </p>
                </div>
              )}
            </Link>
          ) : (
            <div aria-hidden="true" />
          )}

          {/* Next Chapter */}
          {currentChapter.nextChapter ? (
            <Link
              href={`/books/${book.id}/${currentChapter.nextChapter.slug}`}
              className="group flex flex-col items-end text-right"
            >
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline">
                <span>Next Chapter</span>
                <ChevronRight className="transition-transform group-hover:translate-x-1" />
              </div>
              {showTitles && (
                <span className="text-sm text-text-light dark:text-text-dark opacity-60 mt-1">
                  {currentChapter.nextChapter.title}
                </span>
              )}
              {showPreviews && (
                <div className="hidden group-hover:block mt-2 p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg max-w-sm">
                  <p className="text-sm text-text-light dark:text-text-dark line-clamp-2">
                    Preview content here...
                  </p>
                </div>
              )}
            </Link>
          ) : (
            <div aria-hidden="true" />
          )}
        </div>
      </div>
    </footer>
  );
} 