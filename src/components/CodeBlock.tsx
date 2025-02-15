'use client';

import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import copy from 'copy-to-clipboard';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = () => {
    copy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 
                   text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 
                   transition-opacity hover:bg-primary-100 dark:hover:bg-primary-800/30"
        aria-label="Copy code"
      >
        {copied ? (
          <CheckIcon className="w-5 h-5" />
        ) : (
          <ClipboardIcon className="w-5 h-5" />
        )}
      </button>

      <Highlight
        theme={theme === 'dark' ? themes.nightOwl : themes.github}
        code={code.trim()}
        language={language}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${highlightClassName} overflow-x-auto p-4 rounded-lg text-sm`}
            style={style}
          >
            {tokens.map((line, i) => {
              // Skip empty lines at the end
              if (i === tokens.length - 1 && line.length === 1 && line[0].empty) {
                return null;
              }

              const lineProps = getLineProps({ line, key: `line-${i}` });

              return (
                <div
                  key={`line-${i}`}
                  className={lineProps.className}
                  style={lineProps.style}
                >
                  <span className="inline-block w-8 select-none opacity-50 pr-4">
                    {i + 1}
                  </span>
                  {line.map((token, j) => {
                    const tokenProps = getTokenProps({ token, key: `token-${i}-${j}` });
                    
                    return (
                      <span
                        key={`token-${i}-${j}`}
                        className={tokenProps.className}
                        style={tokenProps.style}
                      >
                        {tokenProps.children}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
} 