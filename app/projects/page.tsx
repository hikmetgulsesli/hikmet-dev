import { Suspense } from 'react';
import { ProjectsContent } from './ProjectsContent';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>

        {/* Filters Skeleton */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-10 w-64" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
