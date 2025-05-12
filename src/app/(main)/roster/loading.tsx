export default function LoadingRoster() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">MMA Fighter Roster</h1>
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4" />
        <p className="text-xl text-gray-600 dark:text-gray-400">Loading Fighters...</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">Please wait a moment.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {[...Array(10)].map((_, i) => (
          <div key={`loading-fighter-${i}`} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-1/3" />
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/4" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-1 w-full" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-1 w-5/6" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
