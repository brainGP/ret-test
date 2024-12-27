"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Search from "./Search";
import Navigation from "./Navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Profile } from "./SkeletonDemo";
import ShopCard from "./ShopCart";
import Container from "./Container";

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
    <div
      className={cn(
        "flex flex-col justify-center items-center w-full sticky top-0 border-b px-4 md:px-6 mb-8 py-4 transition-transform duration-300 ease-in-out",
        visibleHeader
          ? "translate-y-0"
          : "-translate-y-[208px] md:-translate-y-[104px]",
        "bg-white z-10"
      )}
    >
      <Container>
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Retevis/retevis.png"
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
        <div className="flex items-center justify-between gap-16">
          <ShopCard />
          <div>
            <Profile />
          </div>
        </div>
      </Container>
      <div className="w-full h-[1px] bg-neutral-200 my-4" />

      <Navigation />
    </div>
  );
};

export default Header;
