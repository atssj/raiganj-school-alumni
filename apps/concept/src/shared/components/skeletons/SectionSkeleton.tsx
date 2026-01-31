import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionSkeletonProps {
  height?: string;
  className?: string;
  showHeader?: boolean;
  showContent?: boolean;
  contentLines?: number;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({
  height = '400px',
  className,
  showHeader = true,
  showContent = true,
  contentLines = 2,
}) => {
  return (
    <div
      className={cn('animate-pulse bg-gray-100', className)}
      style={{ height }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        {showHeader && (
          <>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
          </>
        )}
        {showContent && (
          <div className="space-y-3">
            {Array.from({ length: contentLines }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded"
                style={{ width: `${100 - (i % 2) * 20}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionSkeleton;
