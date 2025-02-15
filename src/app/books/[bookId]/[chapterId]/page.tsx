import { getBook, getBooks, getChapter } from '@/lib/content';
import { components } from '@/components/mdx';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { TableOfContents } from '@/components/TableOfContents';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ReadingTools } from '@/components/ReadingTools';

interface Props {
  params: Promise<{
    bookId: string;
    chapterId: string;
  }>;
}

export async function generateStaticParams() {
  const books = await getBooks();
  const params = [];

  for (const book of books) {
    const bookData = await getBook(book.id);
    if (bookData?.chapters) {
      for (const chapter of bookData.chapters) {
        params.push({
          bookId: book.id,
          chapterId: chapter.id,
        });
      }
    }
  }

  return params;
}

export default async function ChapterPage({ params }: Props) {
  const { bookId, chapterId } = await params;
  
  const [chapter, book] = await Promise.all([
    getChapter(bookId, chapterId),
    getBook(bookId)
  ]);

  if (!chapter || !book) {
    notFound();
  }

  const { content } = await compileMDX({
    source: chapter.content,
    components: {
      ...components,
      Image,
    },
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development'
      }
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Reading Progress */}
      <ReadingProgress bookId={bookId} chapterId={chapterId} />

      {/* Navigation Header */}
      <header className="border-b border-primary-100 dark:border-primary-900 py-4">
        <div className="container mx-auto px-4">
          <Link
            href={`/books/${book.id}`}
            className="text-primary-600 dark:text-primary-400 hover:underline mb-2 inline-block"
          >
            ← Back to {book.title}
          </Link>
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {chapter.title}
          </h1>
        </div>
      </header>

      {/* Table of Contents */}
      <TableOfContents />

      {/* Reading Tools */}
      <ReadingTools 
        book={book} 
        currentChapter={chapter}
      />

      {/* Chapter Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <article className="prose prose-primary dark:prose-invert max-w-4xl mx-auto">
          {content}
        </article>
      </main>

      {/* Chapter Navigation */}
      <footer className="border-t border-primary-100 dark:border-primary-900 py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {chapter.previousChapter ? (
              <Link
                key="prev-chapter"
                href={`/books/${book.id}/${chapter.previousChapter.slug}`}
                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
              >
                ← {chapter.previousChapter.title}
              </Link>
            ) : (
              <div key="prev-placeholder" aria-hidden="true" />
            )}
            {chapter.nextChapter ? (
              <Link
                key="next-chapter"
                href={`/books/${book.id}/${chapter.nextChapter.slug}`}
                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
              >
                {chapter.nextChapter.title} →
              </Link>
            ) : (
              <div key="next-placeholder" aria-hidden="true" />
            )}
          </div>
        </div>
      </footer>
    </div>
  );
} 