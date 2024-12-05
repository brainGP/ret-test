"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Search from "./Search";
import Navigation from "./Navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Profile } from "./SkeletonDemo";

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
        <div className="hidden md:flex">
          <Profile />
        </div>
      </div>
      <div className="w-full h-[1px] bg-neutral-200 my-4" />

      <Navigation />
    </header>
  );
};

export default Header;
