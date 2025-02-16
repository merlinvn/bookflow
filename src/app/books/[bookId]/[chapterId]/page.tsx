import { getBook, getBooks, getChapter } from '@/lib/content';
import { components } from '@/components/mdx';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ChapterContent } from '@/components/ChapterContent';

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
    const fullBook = await getBook(book.id);
    if (fullBook?.chapters) {
      for (const chapter of fullBook.chapters) {
        if (chapter.status !== 'writing') {
          params.push({
            bookId: book.id,
            chapterId: chapter.id,
          });
        }
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

  return <ChapterContent book={book} chapter={chapter} content={content} />;
} 