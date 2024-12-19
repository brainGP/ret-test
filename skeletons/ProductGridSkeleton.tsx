import React from "react";

const ProductGridSkeleton = () => {
  const arr = ["", "", "", "", ""];
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full">
        <div className="border bg-muted rounded p-4 w-12"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
        {arr.map((row, index) => {
          return (
            <div
              key={index}
              className="bg-muted h-20 w-20 animate-pulse rounded border flex flex-col"
            >
              <div className="aspect-square w-full"></div>
              <div className="w-full p-2 flex flex-col gap-2">
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
