"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Search from "./Search";
import { Button } from "./ui/button";
import Navigation from "./Navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header: React.FC = () => {
  const [visibleHeader, setVisibleHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setVisibleHeader(currentScrollPosition < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "flex flex-col bg-gray-100 justify-center items-center w-full sticky top-0 border-b px-4 md:px-6 mb-8 py-4 transition-transform duration-300 ease-in-out",
        visibleHeader
          ? "translate-y-0"
          : "-translate-y-40 md:-translate-y-[104px]",
        "bg-white z-10"
      )}
    >
      <div className="container flex flex-col sm:flex-row items-center justify-between py-4 mx-auto max-w-7xl gap-4 ">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/retevis.png"
            alt="Retevis Logo"
            width={160}
            height={80}
            className="object-contain"
            priority={true}
          />
        </Link>

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
            priority={true}
          />
          <span className="text-sm md:text-base">Сагс</span>
        </Button>
      </div>
      <div className="w-full h-[1px] bg-neutral-200 my-4" />

      <Navigation />
    </header>
  );
};

export default Header;
