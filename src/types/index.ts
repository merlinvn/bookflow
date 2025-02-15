export interface Chapter {
  id: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  order: number;
  status?: 'writing' | 'published';
  previousChapter?: {
    slug: string;
    title: string;
  };
  nextChapter?: {
    slug: string;
    title: string;
  };
}

export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  chapters?: Chapter[];
} 