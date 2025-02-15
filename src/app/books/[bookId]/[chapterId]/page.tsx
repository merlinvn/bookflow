import { getBook, getBooks, getChapter } from '@/lib/content';
import { components } from '@/components/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    bookId: string;
    chapterId: string;
  };
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
  const chapter = await getChapter(params.bookId, params.chapterId);
  const book = await getBook(params.bookId);

  if (!chapter || !book) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
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

      {/* Chapter Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <article className="prose prose-primary dark:prose-invert max-w-4xl mx-auto">
          <MDXRemote source={chapter.content} components={components} />
        </article>
      </main>

      {/* Chapter Navigation */}
      <footer className="border-t border-primary-100 dark:border-primary-900 py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {chapter.previousChapter ? (
              <Link
                href={`/books/${book.id}/${chapter.previousChapter.slug}`}
                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
              >
                ← {chapter.previousChapter.title}
              </Link>
            ) : (
              <div />
            )}
            {chapter.nextChapter ? (
              <Link
                href={`/books/${book.id}/${chapter.nextChapter.slug}`}
                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
              >
                {chapter.nextChapter.title} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </footer>
    </div>
  );
} 