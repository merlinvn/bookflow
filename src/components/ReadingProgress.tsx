'use client';

import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  bookId: string;
  chapterId: string;
  className?: string;
}

export function ReadingProgress({
  bookId,
  chapterId,
  className = '',
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  // Calculate and update reading progress
  useEffect(() => {
    const updateProgress = () => {
      const element = document.documentElement;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const scrolled = element.scrollTop;
      const progress = (scrolled / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));

      // Save progress if we're near the end
      if (progress > 90) {
        const savedProgress = JSON.parse(
          localStorage.getItem('readingProgress') || '{}'
        );
        savedProgress[`${bookId}/${chapterId}`] = true;
        localStorage.setItem('readingProgress', JSON.stringify(savedProgress));
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, [bookId, chapterId]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-1 w-full bg-primary-100 dark:bg-primary-900 ${className}`}
    >
      <div
        className="h-full bg-primary-600 dark:bg-primary-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 