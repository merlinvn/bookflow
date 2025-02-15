import { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import { CodeBlock } from '../CodeBlock';

// Convert heading text to ID
function toId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'error';
}

interface PreProps {
  children: React.ReactNode & {
    props?: {
      children?: string;
      className?: string;
      key?: string | number;
      style?: React.CSSProperties;
      [key: string]: string | number | React.CSSProperties | undefined;
    };
  };
}

export const components: MDXComponents = {
  // Override default elements with styled versions
  h1: ({ children }) => {
    const id = toId(children?.toString() || '');
    return (
      <h1
        id={id}
        className="text-3xl font-bold mt-8 mb-4 text-primary-600 dark:text-primary-400"
      >
        {children}
      </h1>
    );
  },
  h2: ({ children }) => {
    const id = toId(children?.toString() || '');
    return (
      <h2
        id={id}
        className="text-2xl font-bold mt-6 mb-4 text-primary-600 dark:text-primary-400"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = toId(children?.toString() || '');
    return (
      <h3
        id={id}
        className="text-xl font-semibold mt-4 mb-3 text-primary-600 dark:text-primary-400"
      >
        {children}
      </h3>
    );
  },
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
  pre: ({ children }: PreProps) => {
    if (!children?.props) {
      return null;
    }
    
    const code = children.props.children || '';
    const className = children.props.className || '';
    const language = className.replace(/language-/, '') || 'text';

    // Remove key from props before passing to CodeBlock
    const { key, ...otherProps } = children.props;

    return (
      <div key={key || undefined}>
        <CodeBlock 
          code={code} 
          language={language}
          {...otherProps}
        />
      </div>
    );
  },
  img: ({ src, alt, width, height }) => {
    if (!src) return null;

    // Handle remote images
    if (src.startsWith('http')) {
      return (
        <Image
          src={src}
          alt={alt || ''}
          width={Number(width) || 800}
          height={Number(height) || 400}
          className="rounded-lg my-4"
          unoptimized
        />
      );
    }

    // Handle local images
    return (
      <Image
        src={src}
        alt={alt || ''}
        width={Number(width) || 800}
        height={Number(height) || 400}
        className="rounded-lg my-4"
      />
    );
  },
  // Add custom components here
  Callout: ({ children, type = 'info' }: CalloutProps) => {
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