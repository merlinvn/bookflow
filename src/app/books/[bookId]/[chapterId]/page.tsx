import { getBook, getBooks, getChapter } from '@/lib/content';
import { components } from '@/components/mdx';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { TableOfContents } from '@/components/TableOfContents';
import { ReadingProgress } from '@/components/ReadingProgress';
import { ChapterProgress } from '@/components/ChapterProgress';
import { ChapterNavigation } from '@/components/ChapterNavigation';
import { ThemeToggle } from '@/components/ThemeToggle';

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

      {/* Chapter Progress and Keyboard Shortcuts */}
      <ChapterProgress 
        book={book} 
        currentChapter={chapter}
      />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Table of Contents */}
      <TableOfContents />

      {/* Chapter Content */}
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <article className="prose prose-primary dark:prose-invert max-w-4xl mx-auto">
          {content}
        </article>
      </main>

      {/* Chapter Navigation */}
      <ChapterNavigation
        book={book}
        currentChapter={chapter}
        showTitles={true}
        showPreviews={true}
      />
    </div>
  );
} 