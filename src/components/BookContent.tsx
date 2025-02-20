'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@/types';
import LoadingOverlay from './LoadingOverlay';
import BookHeader from './BookHeader';
import ChapterCard from './ChapterCard';

interface BookContentProps {
  book: Book;
}

export default function BookContent({ book }: BookContentProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleChapterClick = (chapterId: string) => {
    setIsNavigating(true);
    router.push(`/books/${book.id}/${chapterId}`);
  };

  // Group chapters by status
  const publishedChapters = book.chapters?.filter(ch => ch.status !== 'writing') || [];
  const upcomingChapters = book.chapters?.filter(ch => ch.status === 'writing') || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <LoadingOverlay isVisible={isNavigating} />
      <BookHeader book={book} />

      {/* Published Chapters */}
      {publishedChapters.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
            Available Chapters
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {publishedChapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                onClick={handleChapterClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Chapters */}
      {upcomingChapters.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
            Upcoming Chapters
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-90">
            {upcomingChapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                onClick={handleChapterClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 