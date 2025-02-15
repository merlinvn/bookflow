'use client';

import { Book } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  return (
    <div className="container mx-auto px-4 py-8">
      <LoadingOverlay isVisible={isNavigating} />
      <BookHeader book={book} />

      {/* Chapters List */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
          Chapters
        </h2>
        <div className="space-y-4">
          {book.chapters?.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              onClick={handleChapterClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 