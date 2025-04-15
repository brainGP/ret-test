"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Smartphone, Contact } from "lucide-react";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Нүүр", icon: <Home size={24} /> },
    { href: "/stations", label: "Станц", icon: <Smartphone size={24} /> },
    { href: "/other", label: "Бусад бараа", icon: <Package size={24} /> },
    { href: "/contact", label: "Холбоо барих", icon: <Contact size={24} /> },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="flex gap-8 text-sm justify-center items-center flex-wrap">
      <div className="hidden md:flex gap-8">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={classNames(
              "flex items-center gap-1 group",
              isActive(item.href)
                ? "text-yellow font-medium underline underline-offset-1"
                : "text-gray hover:text-yellow cursor-pointer"
            )}
          >
            <Link href={item.href}>{item.label}</Link>
          </div>
        ))}
      </div>

      <div className="w-full flex md:hidden h-[60px] bg-white border-t items-center justify-between px-8">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={classNames(
              "flex items-center justify-between gap-2 p-4",
              isActive(item.href)
                ? "text-yellow"
                : "text-gray hover:text-yellow"
            )}
          >
            <Link href={item.href} className="flex items-center gap-1">
              {item.icon}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
