# Product Requirements Document (PRD)

## Goal

Build a self-publishing platform using **Next.js** and **MDX** that allows a single (primary) author to host multiple books, each with multiple chapters, stored and managed via a Git repository. Upon each commit, a **GitHub Actions** workflow will automatically build and deploy the updated site. The platform will feature a collapsible sidebar table of contents, next/previous navigation links, and dark/light mode switching with **TailwindCSS**.

---

## Tasks

Below is a breakdown of the major development "stories" or tasks, following a structure similar to the example PRD.

---

### Story 1: Next.js and TailwindCSS Setup

- **Objective**  
  Initialize a Next.js project and set up TailwindCSS for theming and layout.

- **Requirements**

  1. Create a new Next.js project (using `create-next-app` or manual setup).
  2. Install and configure TailwindCSS for styling.
  3. Verify a development server runs locally without errors.
  4. Ensure Dark/Light mode switching is supported in the Tailwind configuration.

- **Acceptance Criteria**
  - A basic Next.js starter with TailwindCSS up and running.
  - Can toggle between dark and light themes via a simple UI component or placeholder toggle.

---

### Story 2: Multiple Books & Chapter File Structure

- **Objective**  
  Establish a folder and file structure to handle multiple books and multiple chapters per book, using Markdown or MDX files.

- **Requirements**

  1. Create a directory for each book (e.g., `content/book-title/`).
  2. Store each chapter as a separate `.md` or `.mdx` file.
  3. Maintain optional frontmatter or metadata (e.g., title, chapter number, etc.) for each file.
  4. Load this content dynamically in Next.js (e.g., getStaticPaths/getStaticProps for static site generation).

- **Acceptance Criteria**
  - Clear folder structure in the repository.
  - Successfully build dynamic routes in Next.js for each book (`/books/[bookName]/[chapterName]`).

---

### Story 3: Collapsible Sidebar & Table of Contents

- **Objective**  
  Implement a collapsible sidebar that displays a table of contents for each book, listing chapters in order.

- **Requirements**

  1. Create a sidebar component that reads metadata from the content folder (books/chapters).
  2. Display an expandable/collapsible hierarchy of chapters.
  3. Ensure the sidebar is responsive (mobile-friendly).
  4. Highlight the current chapter in the sidebar.

- **Acceptance Criteria**
  - Users can see a list of chapters in a sidebar.
  - Sidebar can collapse/expand for easier navigation.
  - Current chapter is clearly indicated.

---

### Story 4: Chapter Navigation & Progress

- **Objective**  
  Add comprehensive chapter navigation and reading progress features.

- **Requirements**

  1. Implement next/previous chapter navigation.
  2. Add reading progress indicator.
  3. Create chapter progress bar.
  4. Add keyboard shortcuts for navigation.
  5. Implement loading states for navigation.

- **Acceptance Criteria**
  - Smooth navigation between chapters.
  - Clear visual indication of reading progress.
  - Keyboard shortcuts work as expected.
  - Loading states provide good UX during transitions.

---

### Story 5: Upcoming Chapters Feature

- **Objective**  
  Show upcoming chapters that are still being written to maintain reader engagement.

- **Requirements**

  1. Add status tracking for chapters (published/writing).
  2. Display "Coming Soon" badge for upcoming chapters.
  3. Style upcoming chapters differently.
  4. Maintain proper chapter ordering.
  5. Merge content from filesystem and metadata.

- **Acceptance Criteria**
  - Upcoming chapters are clearly marked.
  - Non-clickable chapters in writing state.
  - Clear visual distinction between available and upcoming content.
  - Proper integration with existing navigation.

---

### Story 6: Automated Deployment with GitHub Actions

- **Objective**  
  Configure a CI/CD pipeline to build and deploy the Next.js site automatically upon commits to the main branch.

- **Requirements**

  1. Add a GitHub Actions workflow file (e.g., `.github/workflows/deploy.yml`).
  2. On push/merge to `main`, run `npm install`, `npm run build`, and deploy to a chosen platform (GitHub Pages, Vercel, Netlify, etc.).
  3. Verify logs and build artifacts for successful deployments.

- **Acceptance Criteria**
  - A push to `main` triggers an automated build and deployment.
  - The site is updated live with new content whenever new commits land in `main`.

---

### Story 7: Dark/Light Mode Toggle

- **Objective**  
  Provide a user-facing toggle to switch between dark mode and light mode, leveraging Tailwind's theme configuration.

- **Requirements**

  1. Place a visual toggle (button or switch) in a global header or navigation component.
  2. Persist the user's theme preference (e.g., localStorage or cookie).
  3. Support Tailwind's dark variant styling (e.g., `.dark` class on `<html>` or `<body>`).

- **Acceptance Criteria**
  - Users can switch themes at any time, and the UI updates instantly.
  - Revisiting the site retains the last chosen theme (persistence).

---

### Story 8 (Future): Search & Comments Integration

- **Objective**  
  Plan for future features such as search functionality and a comments section for readers.

- **Requirements (not in MVP)**

  1. **Search**: Add a search box to locate chapters or keywords across books.
  2. **Comments**: Integrate a comment system (Disqus, Gitalk, or a custom solution).
  3. Ensure the codebase architecture allows for smooth integration without major refactoring.

- **Acceptance Criteria**
  - Not immediately implemented—document how it will fit into the system once prioritized.

---

## Testing Strategy

1. **Unit Tests**

   - Test small, isolated pieces of functionality (e.g., metadata parsing, dynamic route generation).
   - Use a testing framework like **Jest** or **Vitest** to validate data structures and utility functions.

2. **Integration Tests**

   - Validate the interaction between the content loading (Markdown/MDX) and Next.js routing.
   - Example: testing if the correct paths are generated and the correct data is rendered in the UI.
   - May use mocks for file systems or external data if needed.

3. **End-to-End (e2e) Tests**
   - Use a tool such as **Cypress** or **Playwright** to test the user flow:
     - Visit homepage, see list of books.
     - Navigate to a specific book/chapter.
     - Toggle dark/light mode.
     - Check next/previous chapter navigation.
   - Confirm that production builds/deployments successfully serve the correct content.

---

## Tech Stack

- **Frontend & Framework:**

  - **Next.js** (React-based) for static site generation and dynamic routing.
  - **MDX/Markdown** for chapter content with future possibility of interactive MDX components.

- **Styling:**

  - **TailwindCSS** for rapid UI development and theming (dark/light mode).

- **Deployment & CI/CD:**

  - **GitHub** for version control and repository storage.
  - **GitHub Actions** for automated building and deployment.
  - **Hosting**: Any supported platform (e.g., GitHub Pages, Vercel, Netlify).

- **Potential Future Integrations:**
  - **Search**: Could use an API-based approach (e.g., Algolia) or local indexing.
  - **Comments**: Third-party comment systems (e.g., Disqus), or custom solution with a backend.

---

### Summary

With these stories and tasks, we will deliver a minimal viable platform for publishing multiple books and chapters with a user-friendly, modern interface. All critical tasks are divided into discrete steps that ensure both reliability (through testing) and a seamless publishing workflow (via GitHub Actions).

Once the MVP is complete, we can expand to additional features (search, comments, multi-author flows) without major rework, thanks to the flexible and scalable architecture provided by **Next.js**, **TailwindCSS**, and **GitHub Actions** for automated deployments.

## Component Architecture

### Core Components
1. **Navigation Components**
   - `ChapterNavigation`: Handles chapter-to-chapter navigation
   - `ChapterProgress`: Shows reading progress and navigation controls
   - `TableOfContents`: Provides section navigation within chapters

2. **UI Components**
   - `LoadingOverlay`: Reusable loading state indicator
   - `ChapterCard`: Displays chapter information in lists, including "Coming Soon" status for upcoming chapters
   - `BookHeader`: Shows book metadata and navigation
   - `ThemeToggle`: Manages dark/light mode switching
   - `CodeBlock`: Syntax highlighting for code snippets

3. **Layout Components**
   - `ChapterContent`: Main chapter content container
   - `BookContent`: Book details and chapter list container

4. **Content Management**
   - Chapter status tracking (published/writing)
   - Upcoming chapters display
   - Content merging from filesystem and metadata

### Component Organization
- Components follow single responsibility principle
- Shared components are extracted for reusability
- Client/server components are properly separated
- State management is lifted to appropriate levels
- Content status is managed through TypeScript discriminated unions

### Best Practices
- ESLint rules are enforced for code quality
- TypeScript types are properly defined
- Components use default exports
- Unused code is removed
- Props are properly typed
- Loading states are consistent
- Content status is clearly indicated to users

### Content Features
1. **Chapter Management**
   - Published chapters with full content
   - Upcoming chapters marked as "Coming Soon"
   - Clear visual distinction between available and upcoming content
   - Proper ordering maintained across all chapter types

2. **User Experience**
   - Non-clickable upcoming chapters
   - Visual feedback for content status
   - Consistent styling in both light and dark modes
   - Clear indication of writing progress

3. **Content Organization**
   - Metadata-driven chapter structure
   - Filesystem content integration
   - Flexible content status handling
   - Type-safe content management

### Future Stories

1. **Search & Discovery**
   - **Objective**: Implement comprehensive search functionality
   - **Features**:
     - Full-text search across all books and chapters
     - Search result highlighting and previews
     - Search suggestions and filters
     - Tag-based content discovery
   - **Benefits**: Improved content discoverability and user experience

2. **Reader Engagement**
   - **Objective**: Add interactive features for readers
   - **Features**:
     - Comment system integration
     - Reader highlights and bookmarks
     - Reading progress tracking
     - Social sharing capabilities
   - **Benefits**: Increased reader engagement and community building

3. **Multi-author Support**
   - **Objective**: Enable collaborative book creation
   - **Features**:
     - Author profiles and dashboards
     - Contribution tracking
     - Collaborative editing workflow
     - Author-specific analytics
   - **Benefits**: Support for team-written content and educational platforms

4. **Enhanced Content Features**
   - **Objective**: Add rich content capabilities
   - **Features**:
     - Interactive code examples
     - Embedded media support
     - Dynamic content updates
     - Custom MDX components
   - **Benefits**: More engaging and interactive content presentation
