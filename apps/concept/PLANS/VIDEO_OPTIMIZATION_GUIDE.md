# Hero Video Optimization Guide for 4G Mobile

## Overview

Video in the hero section is the highest-impact visual element but also the heaviest resource. This guide covers strategies to deliver fast, smooth video experiences on 4G mobile connections.

---

## 1. Video Format Strategy

### 1.1 Multi-Format Delivery

Serve different formats based on browser support:

```html
<video 
  autoplay 
  muted 
  loop 
  playsInline
  poster="/images/hero-video-poster.jpg"
  class="hero-video"
>
  <source src="/videos/hero-720p.webm" type="video/webm" />
  <source src="/videos/hero-720p.mp4" type="video/mp4" />
  <!-- Fallback to image -->
  <img src="/images/hero-video-poster.jpg" alt="Raiganj School" />
</video>
```

**Format Priority:**
1. **WebM (VP9)** - 30-50% smaller than MP4, best compression
2. **MP4 (H.264)** - Universal support, fallback format
3. **Poster Image** - Always show while video loads

### 1.2 Resolution Ladder

Create multiple resolutions and serve based on connection:

| Resolution | Bitrate | File Size (10s) | Use Case |
|------------|---------|-----------------|----------|
| 480p | 800 kbps | ~1MB | Mobile 4G |
| 720p | 2.5 Mbps | ~3MB | Desktop/WiFi |
| 1080p | 5 Mbps | ~6MB | High-end desktop |

```tsx
// React component with connection-aware loading
const HeroVideo: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState('/videos/hero-480p.webm');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Check connection speed
    const connection = (navigator as any).connection;
    
    if (connection) {
      const effectiveType = connection.effectiveType; // '4g', '3g', '2g'
      
      switch (effectiveType) {
        case '4g':
          setVideoSrc('/videos/hero-720p.webm');
          break;
        case '3g':
        default:
          setVideoSrc('/videos/hero-480p.webm');
          break;
      }
    }
  }, []);
  
  return (
    <video
      src={videoSrc}
      autoPlay
      muted
      loop
      playsInline
      poster="/images/hero-video-poster.jpg"
      onLoadedData={() => setIsLoaded(true)}
      className={`hero-video transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};
```

---

## 2. Loading Strategies

### 2.1 Lazy Load Below-Fold Video

If video is not immediately visible (below the fold):

```tsx
import { useInView } from 'react-intersection-observer';

const LazyHeroVideo: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px', // Start loading 100px before visible
  });
  
  return (
    <div ref={ref} className="video-container">
      {inView ? (
        <HeroVideo />
      ) : (
        <img 
          src="/images/hero-video-poster.jpg" 
          alt="Loading..."
          className="poster-image"
        />
      )}
    </div>
  );
};
```

### 2.2 Progressive Enhancement

Start with poster image, upgrade to video when ready:

```tsx
const ProgressiveVideo: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useEffect(() => {
    // Delay video loading to prioritize critical content
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000); // Load video after 2 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="hero-media">
      <img 
        src="/images/hero-video-poster.jpg"
        alt="Raiganj School"
        className={`poster ${videoLoaded ? 'hidden' : 'visible'}`}
      />
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`video ${videoLoaded ? 'visible' : 'hidden'}`}
        >
          <source src="/videos/hero-720p.webm" type="video/webm" />
          <source src="/videos/hero-720p.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};
```

### 2.3 Data Saver Mode

Respect user's data saver preferences:

```tsx
const HeroVideo: React.FC = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
  
  useEffect(() => {
    const connection = (navigator as any).connection;
    
    // Check if data saver is enabled
    if (connection?.saveData) {
      setShouldLoadVideo(false);
      return;
    }
    
    // Check for slow connection
    if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
      setShouldLoadVideo(false);
    }
  }, []);
  
  if (!shouldLoadVideo) {
    return (
      <img 
        src="/images/hero-video-poster.jpg" 
        alt="Raiganj School"
        className="hero-image"
      />
    );
  }
  
  return <VideoComponent />;
};
```

---

## 3. Video Compression Best Practices

### 3.1 Compression Settings

**FFmpeg command for WebM (VP9):**
```bash
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -b:v 2.5M \
  -minrate 1M \
  -maxrate 3M \
  -crf 30 \
  -vf "scale=-1:720" \
  -deadline good \
  -cpu-used 2 \
  -c:a libopus \
  -b:a 128k \
  output-720p.webm
```

**FFmpeg command for MP4 (H.264):**
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -vf "scale=-1:720" \
  -movflags +faststart \
  -c:a aac \
  -b:a 128k \
  output-720p.mp4
```

### 3.2 Mobile-Optimized Versions

**480p for mobile (under 1MB for 10 seconds):**
```bash
# WebM for mobile
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -b:v 800k \
  -vf "scale=-1:480" \
  -deadline good \
  -an \
  output-480p.webm

# MP4 for mobile
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -vf "scale=-1:480" \
  -movflags +faststart \
  -an \
  output-480p.mp4
```

**Key compression tips:**
- Remove audio track (`-an`) if video has no sound
- Use `-movflags +faststart` for MP4 (enables progressive download)
- Target 800kbps-2.5Mbps bitrate for web
- Keep duration under 15 seconds for hero videos
- Loop seamlessly for continuous playback

---

## 4. CSS Optimization

### 4.1 Prevent Layout Shift

Always specify video dimensions to prevent CLS:

```css
.hero-video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* or your video ratio */
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Poster image same dimensions */
.hero-poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 4.2 GPU Acceleration

Force GPU rendering for smooth playback:

```css
.hero-video {
  transform: translateZ(0); /* Force GPU layer */
  will-change: transform; /* Hint for browser optimization */
  backface-visibility: hidden;
}
```

### 4.3 Reduced Motion Support

Respect user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-video {
    display: none;
  }
  
  .hero-poster {
    display: block;
  }
}
```

---

## 5. Advanced Techniques

### 5.1 Video Preloading Strategy

```tsx
const HeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Only preload metadata initially
    video.preload = 'metadata';
    
    // Start actual loading when connection is good
    const connection = (navigator as any).connection;
    if (!connection || connection.effectiveType === '4g') {
      video.preload = 'auto';
    }
  }, []);
  
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster="/images/hero-video-poster.jpg"
    >
      <source src="/videos/hero-720p.webm" type="video/webm" />
      <source src="/videos/hero-720p.mp4" type="video/mp4" />
    </video>
  );
};
```

### 5.2 Streaming with HLS/DASH (For longer videos)

For videos longer than 30 seconds, use adaptive streaming:

```tsx
import Hls from 'hls.js';

const StreamingVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 10, // Limit buffer for faster start
        maxMaxBufferLength: 20,
      });
      hls.loadSource('/videos/hero/master.m3u8');
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = '/videos/hero/master.m3u8';
    }
  }, []);
  
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster="/images/hero-video-poster.jpg"
    />
  );
};
```

### 5.3 CDN Delivery

Serve videos from a CDN with proper caching headers:

```html
<!-- CloudFront/S3 example -->
<video>
  <source src="https://cdn.yoursite.com/videos/hero-720p.webm" type="video/webm" />
</video>
```

**Cache headers:**
```
Cache-Control: public, max-age=31536000, immutable
```

---

## 6. Performance Monitoring

### 6.1 Track Video Metrics

```tsx
const HeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Track load time
    const startTime = performance.now();
    
    video.addEventListener('loadeddata', () => {
      const loadTime = performance.now() - startTime;
      console.log(`Video loaded in ${loadTime}ms`);
      
      // Send to analytics
      gtag('event', 'video_load_time', {
        value: Math.round(loadTime),
      });
    });
    
    // Track stalls
    video.addEventListener('waiting', () => {
      console.log('Video buffering...');
    });
  }, []);
  
  return <video ref={videoRef} ... />;
};
```

### 6.2 Lighthouse Video Audits

Ensure these pass in Lighthouse:
- [ ] Video format is WebM or MP4 (not GIF)
- [ ] Video is compressed appropriately
- [ ] Poster image is provided
- [ ] Video dimensions are specified
- [ ] No layout shift from video loading

---

## 7. Implementation Checklist

### Video Production:
- [ ] Create 480p version for mobile (target <1MB)
- [ ] Create 720p version for desktop (target <3MB)
- [ ] Export in WebM (VP9) format
- [ ] Export in MP4 (H.264) format as fallback
- [ ] Create high-quality poster image (JPG/AVIF)
- [ ] Ensure video loops seamlessly
- [ ] Remove audio track if not needed

### React Implementation:
- [ ] Create `HeroVideo` component with connection detection
- [ ] Implement poster-first loading strategy
- [ ] Add data saver mode support
- [ ] Add reduced motion support
- [ ] Implement lazy loading if below fold
- [ ] Add loading state transitions

### HTML/CSS:
- [ ] Add `playsInline` attribute (required for iOS)
- [ ] Add `muted` attribute (required for autoplay)
- [ ] Specify video dimensions in CSS
- [ ] Use `object-fit: cover` for full-bleed
- [ ] Add GPU acceleration CSS

### Build & Deployment:
- [ ] Upload videos to CDN
- [ ] Configure proper cache headers
- [ ] Enable gzip/brotli compression on server
- [ ] Test on actual 4G connection

---

## 8. React Component Example

```tsx
// src/features/landing/components/HeroVideo.tsx
import React, { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  className?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
  const [videoSrc, setVideoSrc] = useState('/videos/hero-480p.webm');
  
  useEffect(() => {
    const connection = (navigator as any).connection;
    
    // Check data saver and connection
    if (connection) {
      if (connection.saveData) {
        setShouldLoadVideo(false);
        return;
      }
      
      // Select quality based on connection
      if (connection.effectiveType === '4g') {
        setVideoSrc('/videos/hero-720p.webm');
      }
    }
    
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    if (prefersReducedMotion) {
      setShouldLoadVideo(false);
    }
  }, []);
  
  if (!shouldLoadVideo) {
    return (
      <img
        src="/images/hero-video-poster.jpg"
        alt="Raiganj School"
        className={className}
      />
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <img
        src="/images/hero-video-poster.jpg"
        alt="Loading..."
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
    </div>
  );
};
```

---

## Summary

For 4G mobile optimization:
1. **Serve 480p WebM** (~800kbps, ~1MB for 10s)
2. **Always show poster first** while video loads
3. **Respect data saver mode** - skip video if enabled
4. **Remove audio** if not needed (saves 30-50% size)
5. **Use CDN** with aggressive caching
6. **Monitor load times** and adjust quality accordingly

Expected load time on 4G: **2-4 seconds** for video to start playing (with poster visible immediately).