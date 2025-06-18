export default function ChatLoadingSkeleton() {
  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header Skeleton */}
      <div className="border-b border-slate-200 p-5">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-start space-x-5 ml-3">
            <div className="shrink-0">
              <div className="relative bg-gray-300 rounded-full w-16 h-16" />
            </div>
            <div className="pt-1.5">
              <div className="bg-gray-300 h-6 w-32 rounded-md mb-2" />
              <div className="bg-gray-300 h-4 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Chat History Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="shrink-0 bg-gray-300 rounded-full w-8 h-8" />
                <div className="flex flex-col space-y-2">
                  <div className="bg-gray-300 h-4 w-48 rounded-md" />
                  <div className="bg-gray-300 h-3 w-32 rounded-md" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Input Skeleton */}
      <div className="border-t border-slate-200 p-4">
        <div className="bg-gray-300 h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
