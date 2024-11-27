"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

// Utility function to handle conditional classes
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Нүүр", icon: "icons/home.svg" },
    {
      label: "Станц",
      href: "/handstation",
      dropdown: [
        { href: "/handstation", label: "Гар станц" },
        { href: "/handstation/hoyor", label: "Суурь станц" },
        { href: "/handstation/gurav", label: "Дагалдах хэрэгслүүд" },
      ],
    },
    {
      label: "Бусад бараа",
      href: "/otherstation",
    },
    { href: "/contact", label: "Холбоо барих" },
  ];

  const isActive = (href: string, dropdown?: { href: string }[]) =>
    pathname === href ||
    (dropdown && dropdown.some((item) => pathname === item.href));

  return (
    <nav className="flex gap-6 text-sm items-center">
      {navItems.map((item, index) => (
        <React.Fragment key={index}>
          {!item.dropdown ? (
            <Link href={item.href}>
              <div
                className={classNames(
                  "flex items-center gap-1 cursor-pointer",
                  isActive(item.href)
                    ? "text-yellow font-medium"
                    : "text-gray hover:text-yellow"
                )}
              >
                {item.icon && (
                  <Image
                    src={`/${item.icon}`}
                    alt={item.label}
                    height={16}
                    width={16}
                    className={classNames(
                      "inline",
                      isActive(item.href) ? "filter-yellow" : "filter-gray"
                    )}
                  />
                )}
                {item.label}
              </div>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={classNames(
                  "flex items-center gap-1 cursor-pointer",
                  isActive("", item.dropdown)
                    ? "text-yellow font-medium"
                    : "text-gray hover:text-yellow"
                )}
              >
                {item.label}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md">
                {item.dropdown.map((subItem, subIndex) => (
                  <Link href={subItem.href} key={subIndex}>
                    <DropdownMenuItem
                      className={classNames(
                        "w-full cursor-pointer hover:bg-gray-100 rounded-md",
                        pathname === subItem.href
                          ? "text-yellow font-medium"
                          : ""
                      )}
                    >
                      {subItem.label}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default Navigation;
