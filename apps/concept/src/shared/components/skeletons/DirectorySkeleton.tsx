import React from 'react';
import { cn } from '../../lib/utils';

export interface DirectorySkeletonProps {
  className?: string;
  itemCount?: number;
  columns?: number;
}

export const DirectorySkeleton: React.FC<DirectorySkeletonProps> = ({
  className,
  itemCount = 8,
  columns = 4,
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Filter bar skeleton */}
      <div className="flex flex-col md:flex-row gap-2 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-xl flex-1" />
        <div className="flex gap-2">
          <div className="h-12 w-32 bg-gray-200 rounded-xl" />
          <div className="h-12 w-32 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div
        className={cn(
          'grid gap-4',
          columns === 1 && 'grid-cols-1',
          columns === 2 && 'grid-cols-1 md:grid-cols-2',
          columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        )}
      >
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm animate-pulse"
            style={{
              animationDelay: `${i * 30}ms`,
            }}
          >
            {/* Avatar and info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-gray-200 rounded-md" />
                  <div className="h-5 w-20 bg-gray-200 rounded-md" />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <div className="h-9 flex-1 bg-gray-200 rounded-lg" />
              <div className="h-9 w-10 bg-gray-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectorySkeleton;
