'use client';

import { useRouter } from 'next/navigation';
import { Book, Chapter } from '@/types';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface ChapterProgressProps {
  book: Book;
  currentChapter: Chapter;
}

export function ChapterProgress({ book, currentChapter }: ChapterProgressProps) {
  const router = useRouter();

  // Calculate chapter position
  const chapterIndex = book.chapters?.findIndex(ch => ch.id === currentChapter.id) ?? -1;
  const totalChapters = book.chapters?.length ?? 0;
  const currentPosition = chapterIndex + 1;

  // Estimate reading time (rough estimate: 200 words per minute)
  const wordCount = currentChapter.content.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / 200);

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-4 flex items-center gap-6">
      {/* Chapter Position */}
      <div className="text-sm text-text-light dark:text-text-dark">
        <span className="font-medium">Chapter {currentPosition}</span>
        <span className="opacity-60"> of {totalChapters}</span>
      </div>

      {/* Reading Time */}
      <div className="text-sm text-text-light dark:text-text-dark">
        <span className="opacity-60">~</span>
        <span className="font-medium"> {readingTimeMinutes} min</span>
        <span className="opacity-60"> read</span>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="flex items-center gap-4 border-l border-primary-200 dark:border-primary-800 pl-4">
        <button
          onClick={handlePrevious}
          disabled={!currentChapter.previousChapter}
          className="flex items-center gap-1 text-sm text-text-light dark:text-text-dark opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <kbd className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded">
            <ArrowLeft size={14} />
          </kbd>
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!currentChapter.nextChapter}
          className="flex items-center gap-1 text-sm text-text-light dark:text-text-dark opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <kbd className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded">
            <ArrowRight size={14} />
          </kbd>
          <span>Next</span>
        </button>

        <button
          onClick={handleHome}
          className="flex items-center gap-1 text-sm text-text-light dark:text-text-dark opacity-60 hover:opacity-100"
        >
          <kbd className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded">
            <Home size={14} />
          </kbd>
          <span>Book Menu</span>
        </button>
      </div>
    </div>
  );
} 