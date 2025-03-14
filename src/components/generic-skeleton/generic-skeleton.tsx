import Skeleton from 'react-loading-skeleton'

export const GenericSkeleton = () => (
  <div className="p-4">
    <div className="w-[90%]">
      <Skeleton containerTestId="generic-skeleton" />
    </div>
    <span className="text-3xl">
      <Skeleton />
    </span>
    <div className="w-[95%]">
      <Skeleton />
    </div>
    <div className="w-[60%]">
      <Skeleton />
    </div>
  </div>
)
