import React from "react";
import Image from "next/image";
import Search from "./Search";
import { Button } from "./ui/button";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  return (
    <header className="flex flex-col bg-gray-100 justify-center items-center gap-2 px-4 md:px-6">
      <div className="container flex flex-col sm:flex-row items-center justify-between py-4 mx-auto max-w-7xl gap-4">
        <div className="flex-shrink-0">
          <Image
            src="/retevis.png"
            alt="Retevis Logo"
            width={160}
            height={80}
            className="w-[120px] md:w-[160px] object-contain"
          />
        </div>

        <div className="w-full flex-1 max-w-md md:max-w-lg">
          <Search />
        </div>

        <Button className="items-center gap-2 bg-white hidden md:visible">
          <Image
            src="/icons/store.svg"
            alt="Cart Icon"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="text-sm md:text-base">Сагс</span>
        </Button>
      </div>

      {/* Divider */}
      <div className="h-[0.5px] w-full bg-gray-300/50" />

      {/* Navigation */}
      <Navigation />

      {/* Divider */}
      <div className="h-[0.5px] w-full bg-gray-300/50 mb-6" />
    </header>
  );
};

export default Header;
