'use client';

import { useState, useRef, useEffect } from 'react';
import { Book, Chapter } from '@/types';
import { Menu, ChevronLeft, ChevronRight, BookOpen, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

interface ReadingToolsProps {
  book: Book;
  currentChapter: Chapter;
}

export function ReadingTools({ book, currentChapter }: ReadingToolsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      {/* Navigation Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary-600 dark:bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>

        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 min-w-[200px] flex flex-col gap-3">
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

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="bg-primary-600 dark:bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon size={24} />
        ) : (
          <Sun size={24} />
        )}
      </button>
    </div>
  );
} 