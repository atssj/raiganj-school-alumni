import React from 'react';
import { cn } from '../../lib/utils';

export interface CardSkeletonProps {
  className?: string;
  showImage?: boolean;
  imageHeight?: string;
  contentLines?: number;
  showFooter?: boolean;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  showImage = true,
  imageHeight = 'h-48',
  contentLines = 3,
  showFooter = true,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-100 p-4 shadow-sm animate-pulse',
        className
      )}
    >
      {showImage && (
        <div className={cn('bg-gray-200 rounded-lg mb-4', imageHeight)} />
      )}

      <div className="space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4" />

        {/* Content lines */}
        {Array.from({ length: contentLines }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gray-200 rounded"
            style={{ width: `${100 - (i % 2) * 30}%` }}
          />
        ))}
      </div>

      {showFooter && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-8 bg-gray-200 rounded w-24" />
        </div>
      )}
    </div>
  );
};

export default CardSkeleton;
