"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Нүүр" },
    {
      label: "Станц",
      href: "/handstation",
      dropdown: [
        { href: "/stations", label: "Бүх" },
        { href: "/stations/handstation", label: "Гар станц" },
        { href: "/stations/basestation", label: "Суурь станц" },
        { href: "/stations/equipments", label: "Дагалдах хэрэгслүүд" },
      ],
    },
    {
      label: "Бусад бараа",
      href: "/other",
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
                  "flex items-center gap-1 cursor-pointer group ",
                  isActive(item.href)
                    ? "text-yellow font-medium underline underline-offset-1 "
                    : "text-gray hover:text-yellow"
                )}
              >
                {item.label}
              </div>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={classNames(
                  "group flex items-center gap-1 cursor-pointer",
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
