'use client';

import { Chapter } from '@/types';

interface ChapterCardProps {
  chapter: Chapter;
  onClick: (slug: string) => void;
}

export default function ChapterCard({ chapter, onClick }: ChapterCardProps) {
  return (
    <button
      onClick={() => onClick(chapter.slug)}
      className="block group w-full text-left"
    >
      <div className="p-4 rounded-lg border border-primary-100 dark:border-primary-900 hover:border-primary-400 dark:hover:border-primary-600 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 group-hover:text-primary-500">
            {chapter.title}
          </h3>
          <span className="text-sm text-text-light dark:text-text-dark opacity-75">
            Chapter {chapter.order}
          </span>
        </div>
        <p className="mt-2 text-text-light dark:text-text-dark">
          {chapter.description}
        </p>
      </div>
    </button>
  );
} 