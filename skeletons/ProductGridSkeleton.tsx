import React from "react";

const ProductGridSkeleton = () => {
  const arr = ["", "", "", "", ""];
  return (
    <div className="relative w-full h-full flex flex-col gap-4 z-0">
      <div className="h-12 flex w-full justify-between">
        <div className="bg-muted border rounded p-4 w-12 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
        {arr.map((row, index) => {
          return (
            <div
              key={index}
              className="bg-muted h-20 w-20 animate-pulse rounded border flex flex-col"
            >
              <div className="aspect-square w-full p-4">
                <div className="w-full h-full bg-white" />
              </div>
              <div className="w-full p-4 flex flex-col gap-2">
                <div className="w-full h-8 bg-white rounded"></div>
                <div className="w-2/3 h-4 bg-white rounded"></div>
                <div className="w-3/4 h-4 bg-white rounded"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
