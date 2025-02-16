# Content Organization

This project follows a dual-directory structure for content and assets:

## Content Structure (in `content/`)
```
content/
├── book-id/                # Unique identifier for each book
│   ├── book.json          # Book metadata
│   └── chapters/          # MDX chapter files
│       ├── 01-chapter.mdx
│       └── 02-chapter.mdx
```

## Assets Structure (in `public/books/`)
```
public/
└── books/
    └── book-id/
        ├── cover.jpg      # Book cover (800×1200px)
        └── assets/
            ├── chapter-1/ # Chapter-specific images
            ├── chapter-2/
            └── shared/    # Shared images across chapters
```

## Image Specifications

### Book Covers
- Dimensions: 800×1200px
- Aspect Ratio: 2:3
- Format: JPEG or WebP
- File size: < 200KB
- Resolution: 72 DPI
- Color space: sRGB
- Path: `/books/[book-id]/cover.jpg`

### Chapter Images
- Maximum width: 1600px
- Format: WebP (preferred) or JPEG
- File size: < 500KB per image
- Resolution: 72 DPI
- Color space: sRGB
- Path: `/books/[book-id]/assets/chapter-[n]/[image-name].webp`

## Usage in MDX

```mdx
{/* Book cover */}
<Image
  src="/books/sao-mai/cover.jpg"
  alt="Book Title"
  width={800}
  height={1200}
  priority
/>

{/* Chapter image */}
<Image
  src="/books/sao-mai/assets/chapter-1/scene-1.webp"
  alt="Scene description"
  width={1600}
  height={900}
/>

{/* Shared image */}
<Image
  src="/books/sao-mai/assets/shared/character.webp"
  alt="Character name"
  width={800}
  height={800}
/>
```

## Next.js Image Optimization

This structure takes advantage of Next.js built-in image optimization:
- Automatic WebP conversion
- Responsive image sizes
- Lazy loading (except for priority images)
- Proper caching headers

## Best Practices

1. **Content Organization**
   - Keep MDX content in `content/` directory
   - Store all static assets in `public/books/`
   - Use consistent naming conventions

2. **Image Handling**
   - Always use `next/image` component
   - Specify proper `width` and `height`
   - Use `priority` for above-the-fold images
   - Optimize images before adding to the project

3. **Performance**
   - Use WebP format when possible
   - Keep image sizes within specifications
   - Lazy load non-critical images
   - Use shared assets to reduce duplication

## Resources
- Place downloadable resources in the `assets/resources` directory
- Use clear, descriptive filenames
- Include file type in the name (e.g., `chapter-1-exercises.pdf`) 