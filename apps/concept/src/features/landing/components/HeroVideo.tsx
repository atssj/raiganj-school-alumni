import React, { useEffect, useRef, useState } from 'react';

// Network Information API types
interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

interface HeroVideoProps {
  className?: string;
  /**
   * Cloudinary public ID for the video
   * Example: 'raiganj-school/hero-video'
   */
  cloudName: string;
  videoPublicId: string;
  /**
   * Cloudinary public ID for the poster image
   * If not provided, will use video frame at 2 seconds
   */
  posterPublicId?: string;
}

/**
 * HeroVideo Component with Cloudinary Integration
 *
 * Features:
 * - Automatic format selection (WebM/MP4) via Cloudinary
 * - Connection-aware quality selection (480p/720p)
 * - Data saver mode support
 * - Reduced motion support
 * - Poster-first loading with fade transition
 * - GPU acceleration
 *
 * Cloudinary URL Format:
 * https://res.cloudinary.com/{cloudName}/video/upload/{transformations}/{videoPublicId}
 *
 * Required Cloudinary Setup:
 * 1. Upload your video to Cloudinary
 * 2. Note the cloud name and public ID
 * 3. Pass them as props to this component
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({
  className = '',
  cloudName,
  videoPublicId,
  posterPublicId,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [posterSrc, setPosterSrc] = useState<string>('');

  // Generate Cloudinary URLs
  useEffect(() => {
    const baseUrl = `https://res.cloudinary.com/${cloudName}`;

    // Generate poster URL
    // If posterPublicId provided, use it; otherwise extract frame from video
    const posterUrl = posterPublicId
      ? `${baseUrl}/image/upload/q_auto:good,f_auto/${posterPublicId}`
      : `${baseUrl}/video/upload/so_2,q_auto:good,f_auto/${videoPublicId}.jpg`;

    setPosterSrc(posterUrl);

    // Check connection and preferences before setting video source
    const connection = (navigator as NavigatorWithConnection).connection;

    // Check data saver mode
    if (connection?.saveData) {
      setShouldLoadVideo(false);
      return;
    }

    // Check for slow connection
    if (
      connection?.effectiveType === '2g' ||
      connection?.effectiveType === 'slow-2g'
    ) {
      setShouldLoadVideo(false);
      return;
    }

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      setShouldLoadVideo(false);
      return;
    }

    // Select quality based on connection
    // Cloudinary transformations:
    // - f_auto: automatic format (WebM for Chrome/Firefox, MP4 for Safari)
    // - q_auto:good: good quality with automatic optimization
    // - w_1280/w_854: width constraints for 720p/480p
    const isFastConnection = connection?.effectiveType === '4g';
    const width = isFastConnection ? 1280 : 854;
    const quality = isFastConnection ? 'q_auto:good' : 'q_auto:eco';

    // Generate video URL with transformations
    // f_auto will automatically serve WebM or MP4 based on browser support
    const videoUrl = `${baseUrl}/video/upload/${quality},w_${width},f_auto/${videoPublicId}`;

    setVideoSrc(videoUrl);
  }, [cloudName, videoPublicId, posterPublicId]);

  // Handle video loading
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    const video = videoRef.current;

    // Set preload based on connection
    const connection = (navigator as NavigatorWithConnection).connection;
    video.preload = connection?.effectiveType === '4g' ? 'auto' : 'metadata';
  }, [shouldLoadVideo]);

  // If we shouldn't load video (data saver, slow connection, reduced motion)
  // just show the poster image
  if (!shouldLoadVideo) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={posterSrc}
          alt="Raiganj School"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Poster image shown while video loads */}
      <img
        src={posterSrc}
        alt="Loading video..."
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
        decoding="async"
      />

      {/* Video element */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 hero-video-gpu ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

/**
 * Alternative: HeroVideo with multiple source elements
 * Use this if you want explicit control over format fallback
 */
export const HeroVideoWithFallback: React.FC<HeroVideoProps> = ({
  className = '',
  cloudName,
  videoPublicId,
  posterPublicId,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
  const [webmSrc, setWebmSrc] = useState<string>('');
  const [mp4Src, setMp4Src] = useState<string>('');
  const [posterSrc, setPosterSrc] = useState<string>('');

  useEffect(() => {
    const baseUrl = `https://res.cloudinary.com/${cloudName}`;

    // Generate poster URL
    const posterUrl = posterPublicId
      ? `${baseUrl}/image/upload/q_auto:good,f_auto/${posterPublicId}`
      : `${baseUrl}/video/upload/so_2,q_auto:good,f_auto/${videoPublicId}.jpg`;

    setPosterSrc(posterUrl);

    // Check connection and preferences
    const connection = (navigator as NavigatorWithConnection).connection;

    if (connection?.saveData) {
      setShouldLoadVideo(false);
      return;
    }

    if (
      connection?.effectiveType === '2g' ||
      connection?.effectiveType === 'slow-2g'
    ) {
      setShouldLoadVideo(false);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      setShouldLoadVideo(false);
      return;
    }

    // Select quality
    const isFastConnection = connection?.effectiveType === '4g';
    const width = isFastConnection ? 1280 : 854;
    const quality = isFastConnection ? 'q_auto:good' : 'q_auto:eco';

    // Generate explicit format URLs
    // WebM for Chrome/Firefox (better compression)
    setWebmSrc(
      `${baseUrl}/video/upload/${quality},w_${width},f_webm/${videoPublicId}`
    );
    // MP4 for Safari/older browsers
    setMp4Src(
      `${baseUrl}/video/upload/${quality},w_${width},f_mp4/${videoPublicId}`
    );
  }, [cloudName, videoPublicId, posterPublicId]);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    const connection = (navigator as NavigatorWithConnection).connection;
    videoRef.current.preload =
      connection?.effectiveType === '4g' ? 'auto' : 'metadata';
  }, [shouldLoadVideo]);

  if (!shouldLoadVideo) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={posterSrc}
          alt="Raiganj School"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={posterSrc}
        alt="Loading video..."
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
        decoding="async"
      />

      {(webmSrc || mp4Src) && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 hero-video-gpu ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
        </video>
      )}
    </div>
  );
};

export default HeroVideo;
