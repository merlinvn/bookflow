'use client';

import { useEffect, useState } from 'react';
import { ChevronUpIcon, MenuIcon } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
  index?: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  // Extract headings from the content
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((element) => {
        const text = element.textContent || '';
        const id = element.id || `heading-${text.toLowerCase().replace(/\s+/g, '-')}`;
        
        if (!element.id) {
          element.id = id;
        }

        return {
          id,
          text,
          level: Number(element.tagName[1]),
        };
      })
      .filter(item => item.text.trim() !== '');

    const uniqueHeadings = elements.reduce((acc: TOCItem[], current) => {
      const prev = acc[acc.length - 1];
      
      if (prev && prev.text === current.text && current.level <= prev.level) {
        return acc;
      }
      
      return [...acc, current];
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
      // Close the TOC on mobile after clicking a link
      if (window.innerWidth < 768) {
        setIsVisible(false);
      }
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="md:hidden fixed bottom-20 right-4 z-50 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors"
        aria-label={isVisible ? 'Close table of contents' : 'Open table of contents'}
      >
        <MenuIcon size={20} />
      </button>

      {/* Desktop View */}
      <nav
        className={`
          fixed z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-primary-100 dark:border-primary-900 shadow-lg
          ${className}
          hidden md:block right-4 top-24 w-64 rounded-lg overflow-hidden
        `}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-primary-600 dark:text-primary-400">
            Table of Contents
          </h2>
          <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
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
          </div>
        </div>
      </nav>

      {/* Mobile View */}
      <nav
        className={`
          md:hidden fixed z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-primary-100 dark:border-primary-900 shadow-lg
          transition-all duration-300 ease-in-out
          left-0 right-0 bottom-0 rounded-t-lg
          ${isVisible ? 'max-h-[70vh]' : 'max-h-0'}
        `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400">
              Table of Contents
            </h2>
            <button
              onClick={() => setIsVisible(false)}
              className="rounded-full p-1 hover:bg-primary-50 dark:hover:bg-primary-900/30"
              aria-label="Close table of contents"
            >
              <ChevronUpIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(70vh-5rem)]">
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
          </div>
        </div>
      </nav>
    </>
  );
} 