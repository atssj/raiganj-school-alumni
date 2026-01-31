import React from 'react';
import { cn } from '../../lib/utils';

export interface GallerySkeletonProps {
  className?: string;
  columns?: number;
  itemCount?: number;
}

export const GallerySkeleton: React.FC<GallerySkeletonProps> = ({
  className,
  columns = 3,
  itemCount = 6,
}) => {
  return (
    <div
      className={cn(
        'grid gap-4 md:gap-6',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {Array.from({ length: itemCount }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-200 rounded-2xl aspect-[4/3]"
          style={{
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default GallerySkeleton;
