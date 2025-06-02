import React from "react";

const LenderCardSkeleton = () => {
  return (
    <div className="border rounded-lg shadow p-4 w-full animate-pulse">
      <div className="flex justify-between items-start">
        <div className="flex flex-row gap-3">
        <div className="bg-gray-300 rounded w-10 h-10" />
        <div className="flex flex-col">
        <div className="h-4 bg-gray-300 rounded  w-32" />
      <div className="flex space-x-1 mt-2">
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
      </div>
      </div>
        </div>
        <div className="bg-green-200 text-green-600 text-xs font-semibold px-2 py-1 rounded-full w-14 h-6" />
      </div>

      

      <div className="flex justify-between gap-6 mt-5">
        <div className="w-full h-12 bg-gray-200 rounded-md flex flex-col items-center justify-center">
          <div className="w-16 h-4 bg-gray-300 rounded" />
          <div className="w-10 h-3 bg-gray-200 mt-1 rounded" />
        </div>
        <div className="w-full h-12 bg-gray-200 rounded-md flex flex-col items-center justify-center">
          <div className="w-16 h-4 bg-gray-300 rounded" />
          <div className="w-10 h-3 bg-gray-200 mt-1 rounded" />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="bg-gray-200 h-4 w-24 rounded" />
          <span className="bg-gray-300 h-4 w-20 rounded" />
        </div>
        <div className="flex justify-between">
          <span className="bg-gray-200 h-4 w-24 rounded" />
          <span className="bg-gray-300 h-4 w-32 rounded" />
        </div>
        <div className="flex justify-between">
          <span className="bg-gray-200 h-4 w-24 rounded" />
          <span className="bg-gray-300 h-4 w-24 rounded" />
        </div>
        <div className="flex justify-between items-center">
          <span className="bg-gray-200 h-4 w-24 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <span className="bg-gray-300 h-4 w-20 rounded" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-10 bg-gray-300 rounded w-full" />
      </div>

      <div className="mx-4 mt-2">
        <div className="w-[100%] h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
};


export default LenderCardSkeleton;
