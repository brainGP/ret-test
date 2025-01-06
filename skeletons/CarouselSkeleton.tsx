import React from "react";

const CarouselSkeleton = () => {
  const arr = ["", "", "", "", ""];
  return (
    <div className="relative w-full h-full flex flex-col gap-4 z-0">
      <div className="bg-muted border relative w-full h-[30vh] sm:h-[40vh] md:h-[60vh] rounded p-4 animate-pulse" />
    </div>
  );
};

export default CarouselSkeleton;
