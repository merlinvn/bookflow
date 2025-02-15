import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Book, Chapter, ChapterFrontmatter, ContentError } from '@/types/content';
import 'server-only';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Get all books from the content directory
 */
export async function getBooks(): Promise<Book[]> {
  try {
    const bookDirs = await fs.readdir(CONTENT_DIR);
    const books = await Promise.all(bookDirs.map(async (dir) => {
      const bookPath = path.join(CONTENT_DIR, dir, 'book.json');
      try {
        const bookContent = await fs.readFile(bookPath, 'utf-8');
        return JSON.parse(bookContent) as Book;
      } catch {
        return null;
      }
    }));

    return books
      .filter((book): book is Book => book !== null)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
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
    const bookContent = await fs.readFile(bookPath, 'utf-8');
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
    // First, get the book metadata to get all chapters including upcoming ones
    const bookPath = path.join(CONTENT_DIR, bookId, 'book.json');
    const bookContent = await fs.readFile(bookPath, 'utf-8');
    const book = JSON.parse(bookContent) as Book;
    const chaptersFromMetadata = book.chapters || [];

    // Then, get the actual chapter files
    const chaptersDir = path.join(CONTENT_DIR, bookId, 'chapters');
    let publishedChapters: Chapter[] = [];
    
    try {
      const chapterFiles = await fs.readdir(chaptersDir);
      const mdxFiles = chapterFiles.filter(file => file.endsWith('.mdx'));

      publishedChapters = await Promise.all(mdxFiles.map(async (file) => {
        const chapterPath = path.join(chaptersDir, file);
        const content = await fs.readFile(chapterPath, 'utf-8');
        const { data, content: mdxContent } = matter(content);
        const frontmatter = data as ChapterFrontmatter;
        const chapterId = path.basename(file, '.mdx');

        return {
          id: chapterId,
          bookId,
          title: frontmatter.title,
          description: frontmatter.description,
          order: frontmatter.order,
          slug: chapterId,
          content: mdxContent,
          status: 'published'
        } as Chapter;
      }));
    } catch (error) {
      console.error(`Error reading chapter files for book ${bookId}:`, error);
    }

    // Merge published chapters with metadata chapters
    const mergedChapters = chaptersFromMetadata.map(metaChapter => {
      const publishedChapter = publishedChapters.find(ch => ch.id === metaChapter.id);
      if (publishedChapter) {
        return {
          ...publishedChapter,
          title: metaChapter.title || publishedChapter.title,
          description: metaChapter.description || publishedChapter.description,
          order: metaChapter.order || publishedChapter.order,
          status: 'published' as const
        };
      }
      return {
        ...metaChapter,
        bookId,
        content: '',
        status: 'writing' as const
      };
    });

    // Sort chapters by order and add previous/next links
    const sortedChapters = mergedChapters.sort((a, b) => a.order - b.order);
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
export async function validateContentStructure(): Promise<ContentError | null> {
  try {
    try {
      await fs.access(CONTENT_DIR);
    } catch {
      return {
        message: 'Content directory does not exist',
        code: 'NOT_FOUND',
      };
    }

    const bookDirs = await fs.readdir(CONTENT_DIR);
    for (const dir of bookDirs) {
      const bookPath = path.join(CONTENT_DIR, dir);
      const bookJsonPath = path.join(bookPath, 'book.json');
      const chaptersDir = path.join(bookPath, 'chapters');

      try {
        await fs.access(bookJsonPath);
      } catch {
        return {
          message: `Missing book.json in ${dir}`,
          code: 'INVALID_CONTENT',
        };
      }

      try {
        await fs.access(chaptersDir);
      } catch {
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