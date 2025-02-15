import { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

export const components: MDXComponents = {
  // Override default elements with styled versions
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-primary-600 dark:text-primary-400">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-6 mb-4 text-primary-600 dark:text-primary-400">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-4 mb-3 text-primary-600 dark:text-primary-400">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-text-light dark:text-text-dark">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href || '#'}
      className="text-primary-600 dark:text-primary-400 hover:underline"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-text-light dark:text-text-dark">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-text-light dark:text-text-dark">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary-400 pl-4 my-4 italic text-text-light dark:text-text-dark">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-primary-50 dark:bg-primary-900/30 rounded px-1.5 py-0.5 text-sm font-mono text-primary-700 dark:text-primary-300">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg overflow-x-auto my-4 text-sm">
      {children}
    </pre>
  ),
  img: ({ src, alt, width, height }) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={Number(width) || 800}
      height={Number(height) || 400}
      className="rounded-lg my-4"
    />
  ),
  // Add custom components here
  Callout: ({ children, type = 'info' }) => {
    const styles = {
      info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-500',
      warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500',
      error: 'bg-red-50 dark:bg-red-900/30 border-red-500',
    }[type];

    return (
      <div className={`p-4 my-4 border-l-4 rounded-r-lg ${styles}`}>
        {children}
      </div>
    );
  },
}; 