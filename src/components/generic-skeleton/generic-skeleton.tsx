import { Skeleton } from '@/components/ui/skeleton'

export const GenericSkeleton = () => (
  <div className="flex flex-col gap-2 p-4" data-testid="generic-skeleton">
    <Skeleton className="h-4 w-[90%]" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-4 w-[95%]" />
    <Skeleton className="h-4 w-[60%]" />
  </div>
)
