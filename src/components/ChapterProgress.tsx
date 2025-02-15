'use client';

import { useRouter } from 'next/navigation';
import { Book, Chapter } from '@/types';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useState, useEffect } from 'react';

interface ChapterProgressProps {
  book: Book;
  currentChapter: Chapter;
  onNavigationStateChange?: (isNavigating: boolean) => void;
}

export function ChapterProgress({ book, currentChapter, onNavigationStateChange }: ChapterProgressProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingDirection, setNavigatingDirection] = useState<'prev' | 'next' | 'menu' | null>(null);

  // Notify parent of navigation state changes
  useEffect(() => {
    onNavigationStateChange?.(isNavigating);
  }, [isNavigating, onNavigationStateChange]);

  // Prevent scroll during navigation
  useEffect(() => {
    if (isNavigating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavigating]);

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

  const handleBookMenu = () => {
    setIsNavigating(true);
    setNavigatingDirection('menu');
    router.push(`/books/${book.id}`);
  };

  // Set up keyboard navigation
  useKeyboardNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
    onHome: handleBookMenu,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
      {/* Loading Indicator */}
      {isNavigating && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary-100 dark:bg-primary-900">
          <div className={`h-full bg-primary-600 dark:bg-primary-400 transition-all duration-300 ${
            navigatingDirection === 'next' ? 'animate-progress-right' : 
            navigatingDirection === 'prev' ? 'animate-progress-left' :
            'animate-progress-fade'
          }`} />
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between gap-6 h-16">
            <div className="flex items-center gap-6 flex-1">
              {/* Book Navigation */}
              <button
                onClick={handleBookMenu}
                className={`flex items-center gap-2 text-sm text-text-light dark:text-text-dark 
                  ${isNavigating && navigatingDirection === 'menu' 
                    ? 'opacity-100 animate-pulse' 
                    : 'opacity-60 hover:opacity-100'}`}
                title="Return to Book Menu"
                disabled={isNavigating}
              >
                <BookOpen size={16} className={isNavigating && navigatingDirection === 'menu' ? 'animate-bounce' : ''} />
                <span>{book.title}</span>
              </button>

              {/* Chapter Position */}
              <div className="text-sm text-text-light dark:text-text-dark border-l border-primary-200 dark:border-primary-800 pl-4">
                <span className="font-medium">Chapter {currentPosition}</span>
                <span className="opacity-60"> of {totalChapters}</span>
              </div>

              {/* Reading Time */}
              <div className="text-sm text-text-light dark:text-text-dark">
                <span className="opacity-60">~</span>
                <span className="font-medium"> {readingTimeMinutes} min</span>
                <span className="opacity-60"> read</span>
              </div>
            </div>

            {/* Chapter Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={!currentChapter.previousChapter || isNavigating}
                className={`flex items-center gap-1 text-sm text-text-light dark:text-text-dark 
                  ${isNavigating && navigatingDirection === 'prev' 
                    ? 'opacity-100 animate-pulse' 
                    : 'opacity-60 hover:opacity-100'} 
                  disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
                title="Previous Chapter"
              >
                <kbd className={`px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded ${
                  isNavigating && navigatingDirection === 'prev' ? 'animate-bounce' : ''
                }`}>
                  <ArrowLeft size={14} />
                </kbd>
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!currentChapter.nextChapter || isNavigating}
                className={`flex items-center gap-1 text-sm text-text-light dark:text-text-dark 
                  ${isNavigating && navigatingDirection === 'next' 
                    ? 'opacity-100 animate-pulse' 
                    : 'opacity-60 hover:opacity-100'} 
                  disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
                title="Next Chapter"
              >
                <kbd className={`px-2 py-1 bg-primary-50 dark:bg-primary-900/30 rounded ${
                  isNavigating && navigatingDirection === 'next' ? 'animate-bounce' : ''
                }`}>
                  <ArrowRight size={14} />
                </kbd>
                <span>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-3 border-b border-primary-100 dark:border-primary-900">
          <button
            onClick={handleBookMenu}
            className={`flex items-center gap-2 text-sm text-text-light dark:text-text-dark
              ${isNavigating && navigatingDirection === 'menu' 
                ? 'opacity-100 animate-pulse' 
                : 'opacity-60 hover:opacity-100'}`}
            title="Return to Book Menu"
            disabled={isNavigating}
          >
            <BookOpen size={16} className={isNavigating && navigatingDirection === 'menu' ? 'animate-bounce' : ''} />
            <span className="font-medium truncate max-w-[150px]">{book.title}</span>
          </button>

          <div className="flex items-center gap-2 text-sm text-text-light dark:text-text-dark">
            <Clock size={14} className="opacity-60" />
            <span className="font-medium">{readingTimeMinutes}m</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between p-2">
          <button
            onClick={handlePrevious}
            disabled={!currentChapter.previousChapter || isNavigating}
            className={`flex items-center gap-1 px-3 py-2 text-sm text-text-light dark:text-text-dark 
              ${isNavigating && navigatingDirection === 'prev' 
                ? 'opacity-100 animate-pulse' 
                : 'opacity-60 hover:opacity-100'} 
              disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
          >
            <ArrowLeft size={16} className={isNavigating && navigatingDirection === 'prev' ? 'animate-bounce' : ''} />
            <span className="font-medium">Prev</span>
          </button>

          <div className="text-sm text-text-light dark:text-text-dark">
            <span className="font-medium">{currentPosition}</span>
            <span className="opacity-60">/{totalChapters}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={!currentChapter.nextChapter || isNavigating}
            className={`flex items-center gap-1 px-3 py-2 text-sm text-text-light dark:text-text-dark 
              ${isNavigating && navigatingDirection === 'next' 
                ? 'opacity-100 animate-pulse' 
                : 'opacity-60 hover:opacity-100'} 
              disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
          >
            <span className="font-medium">Next</span>
            <ArrowRight size={16} className={isNavigating && navigatingDirection === 'next' ? 'animate-bounce' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
} 