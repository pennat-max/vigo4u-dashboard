// app/(dashboard)/cars/loading.tsx
export default function CarsLoading() {
  return (
    <div className="space-y-4 animate-pulse pb-4">
      <div>
        <div className="h-6 w-28 bg-gray-200 rounded mb-1" />
        <div className="h-4 w-32 bg-gray-100 rounded" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-2.5">
        <div className="h-9 bg-gray-100 rounded-lg" />
        <div className="flex gap-2">
          {[0,1,2,3].map((i) => <div key={i} className="flex-1 h-8 bg-gray-100 rounded-lg" />)}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-10 bg-gray-50 border-b border-gray-100" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="px-4 py-3 border-b border-gray-50 flex gap-4">
            <div className="h-4 w-36 bg-gray-100 rounded" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
            <div className="h-4 w-20 bg-gray-100 rounded" />
            <div className="h-4 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
