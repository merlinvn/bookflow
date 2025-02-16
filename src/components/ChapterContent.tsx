'use client';

import { useState } from 'react';
import { Book, Chapter } from '@/types';
import { TableOfContents } from './TableOfContents';
import { ReadingProgress } from './ReadingProgress';
import { ChapterProgress } from './ChapterProgress';
import { ChapterNavigation } from './ChapterNavigation';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';

interface ChapterContentProps {
  book: Book;
  chapter: Chapter;
  content: React.ReactNode;
}

export function ChapterContent({ book, chapter, content }: ChapterContentProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingDirection, setNavigatingDirection] = useState<'prev' | 'next' | 'menu' | null>(null);

  // Cookie is now handled by the server action in page.tsx

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
        {/* Chapter Cover Image */}
        {chapter.coverImage && (
          <div className="max-w-2xl mx-auto mb-12 -mt-8">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background-light/10 dark:from-background-dark/10 to-transparent" />
              <Image
                src={chapter.coverImage}
                alt={`Cover image for chapter: ${chapter.title}`}
                fill
                priority
                sizes="(min-width: 1024px) 672px, (min-width: 768px) 100vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Chapter Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
              Chapter {chapter.order}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
            {chapter.title}
          </h1>
          <p className="text-lg text-text-light dark:text-text-dark opacity-80">
            {chapter.description}
          </p>
        </div>

        {/* Chapter Content */}
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