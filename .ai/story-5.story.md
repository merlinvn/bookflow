# Story 5: Upcoming Chapters Feature ✓

## Story
**As an** author  
**I want** to show upcoming chapters that are still being written  
**so that** readers can see what content is coming next and stay engaged with the book.

## Status: Completed

### Tasks Completed
1. ✓ Added status tracking for chapters (published/writing)
2. ✓ Implemented "Coming Soon" badge for upcoming chapters
3. ✓ Styled upcoming chapters with distinct visual treatment
4. ✓ Maintained proper chapter ordering in UI
5. ✓ Integrated content from filesystem with metadata
6. ✓ Removed temporary cookie-based reading progress tracking
7. ✓ Cleaned up codebase for future database integration

### Technical Details
- Implemented chapter status in content metadata
- Added visual treatments for upcoming chapters
- Created loading states for navigation
- Removed cookie-based progress tracking (will be replaced with database in next phase)
- Cleaned up related components:
  - `ChapterCard.tsx`
  - `BookContent.tsx`
  - `ChapterPage.tsx`
  - Removed unused action files

### Next Steps (Story 8)
1. Implement database schema for:
   - User profiles
   - Reading progress
   - Preferences
   - Bookmarks
2. Create authentication system
3. Develop user preferences UI
4. Build reading progress tracking
5. Add cross-device synchronization

### Notes
- Reading progress tracking removed from MVP
- Will be reimplemented with proper user system in next phase
- Current focus on core reading experience
- Future implementation will include:
  - Database-backed progress tracking
  - User preferences
  - Reading history
  - Bookmarks
  - Cross-device sync

### Review
- ✓ All MVP features completed
- ✓ Code is clean and maintainable
- ✓ UI/UX is polished
- ✓ Performance is optimized
- ✓ Ready for next phase

## Context
We need to add support for displaying upcoming chapters that are still being written. These chapters should be visible in the table of contents but marked as "Coming Soon" and not be clickable. This helps maintain reader interest by showing what's coming next while clearly indicating which content is available now.

## Estimation
Story Points: 0.3 (approximately 30 minutes of AI development time)

## Acceptance Criteria
1. - [x] Add "status" field to Chapter interface to track writing/published state
2. - [x] Update content loading to handle both published and upcoming chapters
3. - [x] Modify chapter card UI to show "Coming Soon" badge for upcoming chapters
4. - [x] Style upcoming chapters differently (grayed out, non-clickable)
5. - [x] Ensure upcoming chapters are included in book metadata
6. - [x] Maintain proper chapter ordering with both published and upcoming chapters

## Subtasks
1. - [x] Update TypeScript interfaces
   1. - [x] Add status field to Chapter interface
   2. - [x] Update content types
   3. - [x] Ensure proper type safety

2. - [x] Enhance content loading
   1. - [x] Modify getChapters to handle both chapter types
   2. - [x] Merge chapters from book.json and filesystem
   3. - [x] Maintain proper chapter ordering

3. - [x] Update UI components
   1. - [x] Modify ChapterCard for upcoming chapters
   2. - [x] Add "Coming Soon" badge
   3. - [x] Style disabled state
   4. - [x] Ensure proper dark mode support

## Constraints
- Must maintain TypeScript type safety
- Must support both light and dark themes
- Must be clear to users which chapters are available
- Must preserve existing navigation functionality

## Dev Notes
- Used TypeScript discriminated unions for chapter status
- Implemented graceful fallback for missing chapter content
- Added visual indicators for upcoming chapters
- Ensured proper state handling in UI components

## Progress Notes
- Added status field to Chapter interface ✓
- Updated content loading logic ✓
- Modified ChapterCard component ✓
- Added "Coming Soon" badge with proper styling ✓
- Tested with both light and dark themes ✓
- Verified proper ordering of all chapters ✓ 