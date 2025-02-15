'use client';

import { Chapter } from '@/types';

interface ChapterCardProps {
  chapter: Chapter;
  onClick: (slug: string) => void;
}

export default function ChapterCard({ chapter, onClick }: ChapterCardProps) {
  const isWriting = chapter.status === 'writing';

  return (
    <button
      onClick={() => !isWriting && onClick(chapter.slug)}
      className={`block group w-full text-left ${isWriting ? 'cursor-not-allowed' : ''}`}
    >
      <div className={`p-4 rounded-lg border ${
        isWriting 
          ? 'border-gray-200 dark:border-gray-700' 
          : 'border-primary-100 dark:border-primary-900 hover:border-primary-400 dark:hover:border-primary-600'
        } transition-colors`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${
            isWriting 
              ? 'text-gray-500 dark:text-gray-400' 
              : 'text-primary-600 dark:text-primary-400 group-hover:text-primary-500'
            }`}>
            {chapter.title}
          </h3>
          <div className="flex items-center gap-2">
            {isWriting && (
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full">
                Coming Soon
              </span>
            )}
            <span className="text-sm text-text-light dark:text-text-dark opacity-75">
              Chapter {chapter.order}
            </span>
          </div>
        </div>
        <p className={`mt-2 ${
          isWriting 
            ? 'text-gray-400 dark:text-gray-500' 
            : 'text-text-light dark:text-text-dark'
          }`}>
          {chapter.description}
        </p>
      </div>
    </button>
  );
} 