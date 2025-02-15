'use client';

import { useRouter } from 'next/navigation';
import { Book, Chapter } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface ChapterNavigationProps {
  book: Book;
  currentChapter: Chapter;
  isNavigating: boolean;
  setIsNavigating: (isNavigating: boolean) => void;
  navigatingDirection: 'prev' | 'next' | 'menu' | null;
  setNavigatingDirection: (direction: 'prev' | 'next' | 'menu' | null) => void;
}

export function ChapterNavigation({ 
  book, 
  currentChapter,
  isNavigating,
  setIsNavigating,
  navigatingDirection,
  setNavigatingDirection
}: ChapterNavigationProps) {
  const router = useRouter();

  // Navigation handlers
  const handlePrevious = () => {
    if (currentChapter.previousChapter) {
      setIsNavigating(true);
      setNavigatingDirection('prev');
      router.push(`/books/${book.id}/${currentChapter.previousChapter.slug}`);
    }
  };

  const handleNext = () => {
    if (currentChapter.nextChapter) {
      setIsNavigating(true);
      setNavigatingDirection('next');
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
      {/* Loading Indicator */}
      {isNavigating && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-100 dark:bg-primary-900">
          <div className={`h-full bg-primary-600 dark:bg-primary-400 transition-all duration-300 ${
            navigatingDirection === 'next' ? 'animate-progress-right' : 'animate-progress-left'
          }`} />
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {/* Previous Chapter */}
          {currentChapter.previousChapter ? (
            <button
              onClick={handlePrevious}
              disabled={isNavigating}
              className={`group flex flex-col items-start ${
                isNavigating && navigatingDirection === 'prev' 
                  ? 'opacity-100 animate-pulse' 
                  : 'opacity-60 hover:opacity-100'
              } disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
            >
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                <ChevronLeft className={`transition-transform ${
                  isNavigating && navigatingDirection === 'prev' ? 'animate-bounce' : 'group-hover:-translate-x-1'
                }`} />
                <span>Previous Chapter</span>
              </div>
              <span className="text-sm text-text-light dark:text-text-dark opacity-60 mt-1">
                {currentChapter.previousChapter.title}
              </span>
            </button>
          ) : (
            <div aria-hidden="true" />
          )}

          {/* Next Chapter */}
          {currentChapter.nextChapter ? (
            <button
              onClick={handleNext}
              disabled={isNavigating}
              className={`group flex flex-col items-end text-right ${
                isNavigating && navigatingDirection === 'next' 
                  ? 'opacity-100 animate-pulse' 
                  : 'opacity-60 hover:opacity-100'
              } disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
            >
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                <span>Next Chapter</span>
                <ChevronRight className={`transition-transform ${
                  isNavigating && navigatingDirection === 'next' ? 'animate-bounce' : 'group-hover:translate-x-1'
                }`} />
              </div>
              <span className="text-sm text-text-light dark:text-text-dark opacity-60 mt-1">
                {currentChapter.nextChapter.title}
              </span>
            </button>
          ) : (
            <div aria-hidden="true" />
          )}
        </div>
      </div>
    </footer>
  );
} 