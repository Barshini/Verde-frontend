import React from 'react';
import { cn } from '@/utils/utils';

interface SkeletonProps {
  className?: string;
}

/** Generic shimmer skeleton block */
export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={cn('animate-pulse bg-[rgba(201,168,76,0.08)] rounded-none', className)}
    aria-hidden="true"
  />
);

/** Skeleton for a watch product card */
export const WatchCardSkeleton: React.FC = () => (
  <div className="flex flex-col gap-4" aria-label="Loading watch" role="status">
    <Skeleton className="w-full aspect-square" />
    <Skeleton className="h-3 w-1/3" />
    <Skeleton className="h-5 w-2/3" />
    <Skeleton className="h-4 w-1/4" />
  </div>
);

/** Skeleton for a full page hero section */
export const PageHeroSkeleton: React.FC = () => (
  <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto space-y-6" role="status" aria-label="Loading page">
    <Skeleton className="h-3 w-24" />
    <Skeleton className="h-12 w-2/3" />
    <Skeleton className="h-12 w-1/2" />
    <Skeleton className="h-5 w-96 mt-4" />
  </div>
);

/** Skeleton for collections grid */
export const CollectionsGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="status" aria-label="Loading collection">
    {Array.from({ length: count }).map((_, i) => (
      <WatchCardSkeleton key={i} />
    ))}
  </div>
);
