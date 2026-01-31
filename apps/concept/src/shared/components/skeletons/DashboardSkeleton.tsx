import React from 'react';
import { cn } from '../../lib/utils';

export interface DashboardSkeletonProps {
  className?: string;
  showSidebar?: boolean;
  showHeader?: boolean;
}

export const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({
  className,
  showSidebar = true,
  showHeader = true,
}) => {
  return (
    <div className={cn('flex min-h-screen bg-gray-50', className)}>
      {/* Sidebar skeleton */}
      {showSidebar && (
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 animate-pulse">
          <div className="p-4 border-b border-gray-200">
            <div className="h-10 bg-gray-200 rounded-lg" />
          </div>
          <div className="p-4 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-10 bg-gray-200 rounded-lg"
                style={{ animationDelay: `${i * 20}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1">
        {/* Header skeleton */}
        {showHeader && (
          <div className="h-16 bg-white/80 border-b border-gray-200 px-4 md:px-8 flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-5 w-48 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        )}

        {/* Content skeleton */}
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm animate-pulse"
              >
                <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-8 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Main content blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm animate-pulse space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm animate-pulse space-y-4">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
