import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onHome?: () => void;
  isEnabled?: boolean;
}

export function useKeyboardNavigation({
  onPrevious,
  onNext,
  onHome,
  isEnabled = true,
}: KeyboardNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isEnabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      // Ignore if user is typing in an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'arrowleft':
          event.preventDefault();
          if (onPrevious) {
            onPrevious();
          }
          break;

        case 'arrowright':
          event.preventDefault();
          if (onNext) {
            onNext();
          }
          break;

        case 'h':
          event.preventDefault();
          if (onHome) {
            onHome();
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled, onPrevious, onNext, onHome, router]);
} 