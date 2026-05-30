export function CollegeCardSkeleton() {
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 flex gap-4">
      <div className="w-20 h-20 rounded-lg bg-[#2A2A2A] animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-[#2A2A2A] animate-pulse rounded w-3/4" />
        <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-1/2" />
        <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-1/3" />
        <div className="flex gap-4 mt-2">
          <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-16" />
          <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-16" />
          <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-16" />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <div className="h-9 w-28 bg-[#2A2A2A] animate-pulse rounded-lg" />
        <div className="h-9 w-9 bg-[#2A2A2A] animate-pulse rounded-lg" />
      </div>
    </div>
  )
}

export function CollegeCardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 space-y-3">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#2A2A2A] animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#2A2A2A] animate-pulse rounded w-3/4" />
              <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-1/2" />
            </div>
          </div>
          <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-1/3" />
          <div className="flex gap-3 mt-2">
            <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-16" />
            <div className="h-3 bg-[#2A2A2A] animate-pulse rounded w-16" />
          </div>
          <div className="h-9 bg-[#2A2A2A] animate-pulse rounded-lg mt-2" />
        </div>
      ))}
    </div>
  )
}
