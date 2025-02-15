'use client';

import { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

interface TOCItem {
  id: string;
  text: string;
  level: number;
  index?: number;  // Make it optional since we remove it in the final output
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);

  // Extract headings from the content
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((element, index) => {
        const text = element.textContent || '';
        const id = element.id || `heading-${index}-${text.toLowerCase().replace(/\s+/g, '-')}`;
        
        if (!element.id) {
          element.id = id;
        }

        return {
          id,
          text,
          level: Number(element.tagName[1]),
          index,
        };
      })
      .filter(item => item.text.trim() !== ''); // Filter out empty headings

    // Remove duplicate consecutive headings with the same text
    const uniqueHeadings = elements.reduce((acc: TOCItem[], current, idx) => {
      const prev = acc[acc.length - 1];
      
      // Skip if this heading has the same text as the previous one
      // and either they're consecutive or the current one is a higher level (smaller number)
      if (prev && prev.text === current.text && 
          ((prev.index !== undefined && current.index === prev.index + 1) || 
           current.level <= prev.level)) {
        return acc;
      }
      
      // Remove the index property before adding to the final array
      const { index, ...heading } = current;
      return [...acc, heading];
    }, []);

    setHeadings(uniqueHeadings);
  }, []);

  // Set up intersection observers for each heading
  useEffect(() => {
    const observers = headings.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        { rootMargin: '-20% 0px -80% 0px' }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [headings]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      className={`fixed right-4 top-4 z-50 max-h-[calc(100vh-2rem)] w-64 overflow-auto rounded-lg border border-primary-100 bg-white/80 p-4 backdrop-blur-sm dark:border-primary-900 dark:bg-black/80 ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400">
          Table of Contents
        </h2>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="rounded-full p-1 hover:bg-primary-50 dark:hover:bg-primary-900/30"
          aria-label={isVisible ? 'Collapse table of contents' : 'Expand table of contents'}
        >
          <ChevronUpIcon
            className={`h-5 w-5 transform text-primary-600 transition-transform dark:text-primary-400 ${
              isVisible ? '' : 'rotate-180'
            }`}
          />
        </button>
      </div>

      {isVisible && headings.length > 0 && (
        <ul className="space-y-2">
          {headings.map((heading, index) => (
            <li
              key={`toc-${heading.id}-${index}`}
              style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              className="transition-colors"
            >
              <button
                onClick={() => scrollToSection(heading.id)}
                className={`text-left text-sm hover:text-primary-600 dark:hover:text-primary-400 ${
                  activeId === heading.id
                    ? 'font-medium text-primary-600 dark:text-primary-400'
                    : 'text-text-light dark:text-text-dark'
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
} 