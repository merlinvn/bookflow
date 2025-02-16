'use client';

export function BookCardSkeleton() {
  return (
    <div className="h-full border border-primary-100 dark:border-primary-900 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="relative aspect-square bg-primary-50 dark:bg-primary-900/30 animate-pulse" />
      <div className="p-4 space-y-4">
        {/* Title skeleton */}
        <div className="h-7 bg-primary-100 dark:bg-primary-900/50 rounded-md w-3/4 animate-pulse" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-primary-100 dark:bg-primary-900/50 rounded w-full animate-pulse" />
          <div className="h-4 bg-primary-100 dark:bg-primary-900/50 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-primary-100 dark:bg-primary-900/50 rounded w-4/6 animate-pulse" />
        </div>

        {/* Meta info skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-5 bg-primary-100 dark:bg-primary-900/50 rounded w-24 animate-pulse" />
          <div className="h-5 bg-primary-100 dark:bg-primary-900/50 rounded w-32 animate-pulse" />
        </div>
      </div>
    </div>
  );
} 