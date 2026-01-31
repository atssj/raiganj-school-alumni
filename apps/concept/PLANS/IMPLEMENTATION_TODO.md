# Performance Optimization Implementation Todo

This is the actionable implementation checklist derived from `PERFORMANCE_OPTIMIZATION_PLAN.md` and `VIDEO_OPTIMIZATION_GUIDE.md`.

**Ready for Code Mode implementation.**

---

## Phase 1: Quick Wins (High Impact, Low Effort)

### 1.1 HTML Optimizations (`index.html`)
- [ ] Add `preconnect` links for external domains (fonts, images)
- [ ] Add `preload` for hero image with `fetchpriority="high"`
- [ ] Add `preload` for critical CSS
- [ ] Change Google Fonts loading to use `display=swap`
- [ ] Add `async defer` to Razorpay script
- [ ] Add resource hints for common image domains

### 1.2 Hero Video Optimizations (NEW - See VIDEO_OPTIMIZATION_GUIDE.md)
- [ ] Create 480p WebM version for mobile (~1MB target)
- [ ] Create 720p WebM version for desktop (~3MB target)
- [ ] Create MP4 fallback versions
- [ ] Create high-quality poster image
- [ ] Build `HeroVideo` component with connection detection
- [ ] Implement poster-first loading strategy
- [ ] Add data saver mode support
- [ ] Add reduced motion support

### 1.2 Vite Configuration (`vite.config.ts`)
- [ ] Add `manualChunks` for vendor libraries (react, framer-motion, lucide-react)
- [ ] Add `manualChunks` for feature-specific code (AI assistant)
- [ ] Enable `terser` minification with console/debugger removal
- [ ] Set `chunkSizeWarningLimit` to 500kb
- [ ] Add `rollupOptions` for output optimization

### 1.3 Native Image Lazy Loading
Update ALL image tags in the following files to include `loading="lazy"` and `decoding="async"`:
- [ ] `src/features/landing/components/Hero.tsx` - Hero image (keep eager)
- [ ] `src/features/landing/components/HeroStats.tsx` - Avatar images
- [ ] `src/features/landing/components/SchoolHistory.tsx` - School building image
- [ ] `src/features/landing/components/NostalgiaSection.tsx` - Memory card images
- [ ] `src/features/landing/components/AlumniSuccess.tsx` - Alumni photos
- [ ] `src/features/landing/components/AlumniTestimonials.tsx` - Testimonial avatars
- [ ] `src/features/landing/components/Gallery.tsx` - Gallery photos
- [ ] `src/features/directory/components/AlumniCard.tsx` - Alumni avatars
- [ ] `src/features/gallery/Gallery.tsx` - Gallery and archive images

---

## Phase 2: Component Architecture

### 2.1 Create LazyImage Component
**New File:** `src/shared/components/LazyImage.tsx`
- [ ] Create component with Intersection Observer
- [ ] Add blur-up placeholder support
- [ ] Add error handling with fallback
- [ ] Support responsive `srcset` attribute
- [ ] Export from `src/shared/components/index.ts`

### 2.2 Create HeroVideo Component (NEW)
**New File:** `src/features/landing/components/HeroVideo.tsx`
- [ ] Build component with Network Information API
- [ ] Implement quality selection (480p/720p) based on connection
- [ ] Add poster-first loading with fade transition
- [ ] Support data saver mode detection
- [ ] Support prefers-reduced-motion
- [ ] Add GPU acceleration CSS
- [ ] Export from `src/features/landing/components/index.ts`

### 2.2 Create Skeleton Components
**New Directory:** `src/shared/components/skeletons/`
- [ ] `SectionSkeleton.tsx` - Generic section placeholder
- [ ] `CardSkeleton.tsx` - Card component placeholder
- [ ] `GallerySkeleton.tsx` - Gallery grid placeholder
- [ ] `DirectorySkeleton.tsx` - Directory list placeholder
- [ ] `DashboardSkeleton.tsx` - Dashboard layout placeholder
- [ ] Export all from `src/shared/components/skeletons/index.ts`

### 2.3 Landing Page Code Splitting
**File:** `src/features/landing/LandingPage.tsx`
- [ ] Convert imports to `React.lazy()` for all sections below Hero
- [ ] Wrap each lazy section with `<Suspense>`
- [ ] Add appropriate skeleton fallbacks
- [ ] Add `ErrorBoundary` wrapper for graceful failures

Sections to lazy load:
- [ ] `SchoolHistory`
- [ ] `NostalgiaSection`
- [ ] `AlumniSuccess`
- [ ] `AlumniTestimonials`
- [ ] `UpcomingEvents`
- [ ] `JoinCTA`
- [ ] `Footer`

### 2.4 Animation Performance
**Files with Framer Motion:**
- [ ] `src/features/landing/components/Hero.tsx` - Add `will-change: transform` and `transform-gpu`
- [ ] `src/features/landing/components/Hero.tsx` - Integrate HeroVideo component (if using video)
- [ ] `src/features/landing/components/NostalgiaSection.tsx` - Optimize scroll animations
- [ ] `src/features/landing/components/AlumniTestimonials.tsx` - Add reduced motion support
- [ ] `src/shared/components/Reveal.tsx` - Add `will-change` and GPU hints

---

## Phase 3: Advanced Optimizations

### 3.1 React Performance Hooks
**Files to update:**
- [ ] `src/features/directory/Directory.tsx` - Add `useTransition` for search filtering
- [ ] `src/features/directory/hooks/useAlumniFilter.ts` - Add `useDeferredValue` for search term
- [ ] `src/features/landing/components/Header.tsx` - Memoize navigation callbacks
- [ ] `src/features/landing/components/AlumniSuccess.tsx` - Memoize alumni data mapping

### 3.2 Memoization
**Components to wrap with `React.memo`:**
- [ ] `src/features/directory/components/AlumniCard.tsx`
- [ ] `src/features/events/components/EventCard.tsx`
- [ ] `src/features/landing/components/Gallery.tsx` - `GalleryPhotoCard`
- [ ] `src/shared/components/Button.tsx`
- [ ] `src/shared/components/Logo.tsx`

### 3.3 Dashboard Suspense Improvements
**File:** `src/features/dashboard/Dashboard.tsx`
- [ ] Replace simple loading div with `DashboardSkeleton` component
- [ ] Add granular Suspense boundaries for heavy admin views

---

## Phase 4: Build & Deployment

### 4.1 Bundle Analysis
- [ ] Add `rollup-plugin-visualizer` to analyze bundle size
- [ ] Run build and identify largest chunks
- [ ] Optimize imports to reduce chunk sizes

### 4.2 Web Vitals Monitoring
**New File:** `src/shared/lib/webVitals.ts`
- [ ] Install `web-vitals` package
- [ ] Create utility to track CLS, FID, FCP, LCP, TTFB
- [ ] Integrate with analytics (optional)

**File:** `src/main.tsx`
- [ ] Import and initialize web vitals tracking

### 4.3 Service Worker (Optional but Recommended)
**New File:** `src/sw.ts`
- [ ] Install `workbox` packages
- [ ] Create service worker with precaching
- [ ] Add runtime caching for images and API calls
- [ ] Register in `src/main.tsx`

---

## Phase 5: Testing & Validation

### 5.1 Performance Testing Checklist
- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Verify all images have lazy loading
- [ ] Check Network tab for proper chunk loading
- [ ] Verify Suspense boundaries show skeletons
- [ ] Test on slow 3G network simulation
- [ ] Verify reduced motion preferences work

### 5.2 Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile Chrome (via DevTools)

---

## File Modification Summary

### New Files to Create (9)
1. `src/shared/components/LazyImage.tsx`
2. `src/shared/components/skeletons/SectionSkeleton.tsx`
3. `src/shared/components/skeletons/CardSkeleton.tsx`
4. `src/shared/components/skeletons/GallerySkeleton.tsx`
5. `src/shared/components/skeletons/DirectorySkeleton.tsx`
6. `src/shared/components/skeletons/DashboardSkeleton.tsx`
7. `src/shared/components/skeletons/index.ts`
8. `src/shared/lib/webVitals.ts` (optional)
9. `src/features/landing/components/HeroVideo.tsx` (if using video hero)

### Files to Modify (15+)
1. `index.html`
2. `vite.config.ts`
3. `src/main.tsx`
4. `src/features/landing/LandingPage.tsx`
5. `src/features/landing/components/Hero.tsx`
6. `src/features/landing/components/HeroStats.tsx`
7. `src/features/landing/components/SchoolHistory.tsx`
8. `src/features/landing/components/NostalgiaSection.tsx`
9. `src/features/landing/components/AlumniSuccess.tsx`
10. `src/features/landing/components/AlumniTestimonials.tsx`
11. `src/features/landing/components/Gallery.tsx`
12. `src/features/directory/Directory.tsx`
13. `src/features/directory/components/AlumniCard.tsx`
14. `src/features/dashboard/Dashboard.tsx`
15. `src/shared/components/Reveal.tsx`
16. `src/shared/components/index.ts`

---

## Dependencies to Add

```json
{
  "dependencies": {
    "web-vitals": "^3.5.0"
  },
  "devDependencies": {
    "rollup-plugin-visualizer": "^5.12.0",
    "workbox-build": "^7.0.0" // optional
  }
}
```

---

## Implementation Order Recommendation

1. **Start with Phase 1** - Quick wins provide immediate value
2. **Phase 2.1 and 2.2** - Create reusable components first
3. **Phase 2.3** - Implement code splitting
4. **Phase 2.4** - Optimize animations
5. **Phase 3** - Add performance hooks and memoization
6. **Phase 4** - Build optimizations
7. **Phase 5** - Testing and validation

---

## Success Criteria

- [ ] Lighthouse Performance score >= 90
- [ ] All images below fold use lazy loading
- [ ] Landing page sections load on-demand
- [ ] Skeleton states visible during loading
- [ ] Bundle size reduced by 30%+
- [ ] No console errors
- [ ] Smooth 60fps animations
