import React from "react";
import Image from "next/image";
import Search from "./Search";
import { Button } from "./ui/button";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  return (
    <header className="flex flex-col bg-gray-100 justify-center items-center gap-2 px-4 md:px-6">
      <div className="container flex items-center justify-between pt-4 mx-auto max-w-7xl gap-2 my-2 mb-4">
        <Image src="/retevis.svg" alt="Retevis Logo" width={160} height={80} />

        <Search />

        <Button className="flex items-center gap-2 bg-white">
          <Image
            src="/icons/store.svg"
            alt="Cart Icon"
            width={24}
            height={24}
          />
          <span>Сагс</span>
        </Button>
      </div>
      <div className="h-[0.5px] w-full bg-gray/20" />
      <Navigation />
      <div className="h-[0.5px] w-full bg-gray/20  mb-8" />
    </header>
  );
};

export default Header;
