function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
          <div className="p-6">
            {/* Platform Badge Skeleton */}
            <div className="bg-gray-300 h-6 w-24 rounded-full mb-4"></div>

            {/* Image Skeleton */}
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>

            {/* Product Name Skeleton */}
            <div className="space-y-2 mb-3">
              <div className="bg-gray-300 h-4 w-full rounded"></div>
              <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
            </div>

            {/* Price Skeleton */}
            <div className="bg-gray-300 h-8 w-32 rounded mb-4"></div>

            {/* Button Skeleton */}
            <div className="bg-gray-300 h-12 w-full rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
