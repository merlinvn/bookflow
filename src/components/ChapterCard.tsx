'use client';

import { Chapter } from '@/types';
import Image from 'next/image';
import { BookOpen, Clock, Lock } from 'lucide-react';

interface ChapterCardProps {
  chapter: Chapter;
  onClick: (slug: string) => void;
  estimatedReadingTime?: number;
}

export default function ChapterCard({ 
  chapter, 
  onClick, 
  estimatedReadingTime = Math.ceil((chapter.content?.length || 0) / 1000) // Rough estimate: 1000 chars per minute
}: ChapterCardProps) {
  const isWriting = chapter.status === 'writing';

  return (
    <button
      onClick={() => !isWriting && onClick(chapter.slug)}
      className={`block group w-full text-left ${isWriting ? 'cursor-not-allowed' : ''}`}
    >
      <div className={`rounded-lg border overflow-hidden ${
        isWriting 
          ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50' 
          : 'border-primary-100 dark:border-primary-900 hover:border-primary-400 dark:hover:border-primary-600 bg-white dark:bg-gray-900'
        } transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary-900/30`}>
        
        {/* Cover Image */}
        {chapter.coverImage && (
          <div className="relative w-full aspect-[5/2] sm:aspect-[4/2] bg-primary-50 dark:bg-primary-900/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src={chapter.coverImage}
              alt={`Cover image for chapter: ${chapter.title}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                isWriting ? 'opacity-50' : ''
              }`}
            />
            {isWriting && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-black/60 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm">
                  <Lock size={16} className="text-yellow-200" />
                  <span className="text-sm font-medium text-yellow-200">Coming Soon</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                isWriting 
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                  : 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
              }`}>
                Chapter {chapter.order}
              </span>
            </div>
            {!isWriting && (
              <div className="flex items-center gap-1 text-sm text-text-light dark:text-text-dark opacity-75">
                <Clock size={14} />
                <span>{estimatedReadingTime}m</span>
              </div>
            )}
          </div>

          <h3 className={`text-lg font-semibold mb-2 ${
            isWriting 
              ? 'text-gray-500 dark:text-gray-400' 
              : 'text-primary-600 dark:text-primary-400 group-hover:text-primary-500'
            }`}>
            {chapter.title}
          </h3>

          <p className={`text-sm ${
            isWriting 
              ? 'text-gray-400 dark:text-gray-500' 
              : 'text-text-light dark:text-text-dark'
            }`}>
            {chapter.description}
          </p>

          {/* Action Hint */}
          <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${
            isWriting
              ? 'text-gray-400 dark:text-gray-500'
              : 'text-primary-600 dark:text-primary-400 group-hover:text-primary-500'
          }`}>
            <BookOpen size={16} className={`transition-transform duration-300 ${
              !isWriting && 'group-hover:translate-x-1'
            }`} />
            <span>{isWriting ? 'Coming Soon' : 'Read Chapter'}</span>
          </div>
        </div>
      </div>
    </button>
  );
} 