export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  bookId: string;
  title: string;
  description: string;
  order: number;
  slug: string;
  content: string;
  previousChapter?: {
    id: string;
    title: string;
    slug: string;
  };
  nextChapter?: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface ChapterFrontmatter {
  title: string;
  description: string;
  order: number;
}

export interface ContentError {
  message: string;
  code: 'NOT_FOUND' | 'INVALID_CONTENT' | 'PARSE_ERROR';
} 