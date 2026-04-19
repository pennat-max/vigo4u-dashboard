// app/(dashboard)/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="space-y-5 animate-pulse pb-4">
      {/* Header skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-1" />
        <div className="h-4 w-48 bg-gray-100 rounded" />
      </div>

      {/* KPI skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 border-l-4 border-l-gray-200 px-4 py-3">
            <div className="h-3 w-16 bg-gray-100 rounded mb-2" />
            <div className="h-8 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 h-56">
            <div className="h-4 w-24 bg-gray-100 rounded mb-3" />
            <div className="h-40 bg-gray-50 rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-4 py-3 border-b border-gray-50 flex gap-4">
            <div className="h-4 w-32 bg-gray-100 rounded" />
            <div className="h-4 w-20 bg-gray-100 rounded" />
            <div className="h-4 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
