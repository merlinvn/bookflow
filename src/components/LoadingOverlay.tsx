'use client';

interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <p className="text-lg font-medium text-text-light dark:text-text-dark">
          Loading...
        </p>
      </div>
    </div>
  );
} 