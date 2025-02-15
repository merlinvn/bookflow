import { getBook, getBooks } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    bookId: string;
  }>;
}

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((book) => ({
    bookId: book.id,
  }));
}

export default async function BookPage({ params }: Props) {
  const { bookId } = await params;
  const book = await getBook(bookId);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Book Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="relative w-full md:w-1/3 h-64 md:h-auto">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-primary-600 dark:text-primary-400">
            {book.title}
          </h1>
          <p className="text-lg mb-4 text-text-light dark:text-text-dark">
            {book.description}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary-600 dark:text-primary-400">
              By {book.author}
            </span>
            <span className="text-text-light dark:text-text-dark opacity-75">
              Published {new Date(book.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">
          Chapters
        </h2>
        <div className="space-y-4">
          {book.chapters?.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/books/${book.id}/${chapter.slug}`}
              className="block group"
            >
              <div className="p-4 rounded-lg border border-primary-100 dark:border-primary-900 hover:border-primary-400 dark:hover:border-primary-600 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 group-hover:text-primary-500">
                    {chapter.title}
                  </h3>
                  <span className="text-sm text-text-light dark:text-text-dark opacity-75">
                    Chapter {chapter.order}
                  </span>
                </div>
                <p className="mt-2 text-text-light dark:text-text-dark">
                  {chapter.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 