'use client';

import { useState } from 'react';
import { Book, Chapter } from '@/types';
import { TableOfContents } from './TableOfContents';
import { ReadingProgress } from './ReadingProgress';
import { ChapterProgress } from './ChapterProgress';
import { ChapterNavigation } from './ChapterNavigation';
import { ThemeToggle } from './ThemeToggle';

interface ChapterContentProps {
  book: Book;
  chapter: Chapter;
  content: React.ReactNode;
}

export function ChapterContent({ book, chapter, content }: ChapterContentProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingDirection, setNavigatingDirection] = useState<'prev' | 'next' | 'menu' | null>(null);

  return (
    <div className="relative min-h-screen">
      {/* Navigation Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center animate-pulse">
            <p className="text-lg font-medium text-text-light dark:text-text-dark">
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Reading Progress */}
      <ReadingProgress bookId={book.id} chapterId={chapter.id} />

      {/* Chapter Progress and Keyboard Shortcuts */}
      <ChapterProgress 
        book={book} 
        currentChapter={chapter}
        onNavigationStateChange={setIsNavigating}
      />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Table of Contents */}
      <TableOfContents />

      {/* Chapter Content */}
      <article className={`prose dark:prose-invert max-w-4xl mx-auto px-4 py-24 md:py-32 ${
        isNavigating ? 'pointer-events-none select-none' : ''
      }`}>
        {content}
      </article>

      {/* Chapter Navigation */}
      <ChapterNavigation 
        book={book} 
        currentChapter={chapter}
        isNavigating={isNavigating}
        setIsNavigating={setIsNavigating}
        navigatingDirection={navigatingDirection}
        setNavigatingDirection={setNavigatingDirection}
      />
    </div>
  );
} 