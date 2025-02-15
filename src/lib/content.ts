import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Book, Chapter, ChapterFrontmatter, ContentError } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Get all books from the content directory
 */
export async function getBooks(): Promise<Book[]> {
  try {
    const bookDirs = fs.readdirSync(CONTENT_DIR);
    const books = bookDirs.map((dir) => {
      const bookPath = path.join(CONTENT_DIR, dir, 'book.json');
      if (fs.existsSync(bookPath)) {
        const bookContent = fs.readFileSync(bookPath, 'utf-8');
        return JSON.parse(bookContent) as Book;
      }
      return null;
    }).filter((book): book is Book => book !== null);

    return books.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error('Error getting books:', error);
    return [];
  }
}

/**
 * Get a specific book by its ID
 */
export async function getBook(bookId: string): Promise<Book | null> {
  try {
    const bookPath = path.join(CONTENT_DIR, bookId, 'book.json');
    if (!fs.existsSync(bookPath)) {
      return null;
    }

    const bookContent = fs.readFileSync(bookPath, 'utf-8');
    const book = JSON.parse(bookContent) as Book;
    book.chapters = await getChapters(bookId);

    return book;
  } catch (error) {
    console.error(`Error getting book ${bookId}:`, error);
    return null;
  }
}

/**
 * Get all chapters for a specific book
 */
export async function getChapters(bookId: string): Promise<Chapter[]> {
  try {
    const chaptersDir = path.join(CONTENT_DIR, bookId, 'chapters');
    if (!fs.existsSync(chaptersDir)) {
      return [];
    }

    const chapterFiles = fs.readdirSync(chaptersDir)
      .filter(file => file.endsWith('.mdx'));

    const chapters = chapterFiles.map((file) => {
      const chapterPath = path.join(chaptersDir, file);
      const content = fs.readFileSync(chapterPath, 'utf-8');
      const { data, content: mdxContent } = matter(content);
      const frontmatter = data as ChapterFrontmatter;

      return {
        id: path.basename(file, '.mdx'),
        bookId,
        title: frontmatter.title,
        description: frontmatter.description,
        order: frontmatter.order,
        slug: path.basename(file, '.mdx'),
        content: mdxContent,
      } as Chapter;
    });

    // Sort chapters by order and add previous/next links
    const sortedChapters = chapters.sort((a, b) => a.order - b.order);
    return sortedChapters.map((chapter, index) => ({
      ...chapter,
      previousChapter: index > 0 ? {
        id: sortedChapters[index - 1].id,
        title: sortedChapters[index - 1].title,
        slug: sortedChapters[index - 1].slug,
      } : undefined,
      nextChapter: index < sortedChapters.length - 1 ? {
        id: sortedChapters[index + 1].id,
        title: sortedChapters[index + 1].title,
        slug: sortedChapters[index + 1].slug,
      } : undefined,
    }));
  } catch (error) {
    console.error(`Error getting chapters for book ${bookId}:`, error);
    return [];
  }
}

/**
 * Get a specific chapter from a book
 */
export async function getChapter(bookId: string, chapterId: string): Promise<Chapter | null> {
  try {
    const chapters = await getChapters(bookId);
    return chapters.find(chapter => chapter.id === chapterId) || null;
  } catch (error) {
    console.error(`Error getting chapter ${chapterId} from book ${bookId}:`, error);
    return null;
  }
}

/**
 * Validate the content directory structure
 */
export function validateContentStructure(): ContentError | null {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return {
        message: 'Content directory does not exist',
        code: 'NOT_FOUND',
      };
    }

    const bookDirs = fs.readdirSync(CONTENT_DIR);
    for (const dir of bookDirs) {
      const bookPath = path.join(CONTENT_DIR, dir);
      const bookJsonPath = path.join(bookPath, 'book.json');
      const chaptersDir = path.join(bookPath, 'chapters');

      if (!fs.existsSync(bookJsonPath)) {
        return {
          message: `Missing book.json in ${dir}`,
          code: 'INVALID_CONTENT',
        };
      }

      if (!fs.existsSync(chaptersDir)) {
        return {
          message: `Missing chapters directory in ${dir}`,
          code: 'INVALID_CONTENT',
        };
      }
    }

    return null;
  } catch (error) {
    return {
      message: 'Error validating content structure',
      code: 'PARSE_ERROR',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 