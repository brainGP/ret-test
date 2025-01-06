"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");
const Navigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Нүүр" },
    {
      href: "/stations",
      label: "Станц",
      dropdown: [
        { href: "/stations", label: "Бүх", url: null },
        {
          href: "/stations?type=handstation",
          label: "Гар станц",
          url: "handstation",
        },
        {
          href: "/stations?type=basestation",
          label: "Суурь станц",
          url: "basestation",
        },
        {
          href: "/stations?type=equipments",
          label: "Дагалдах хэрэгслүүд",
          url: "equipments",
        },
      ],
    },
    { href: "/other", label: "Бусад бараа", disabled: false },
    { href: "/contact", label: "Холбоо барих" },
  ];

  const currentSearch = searchParams.get("type");

  const isActive = (
    href: string,
    dropdownItems?: { href: string; url: string | null }[]
  ) => {
    if (dropdownItems) {
      return dropdownItems.some(
        (item) =>
          pathname === item.href || (item.url && currentSearch === item.url)
      );
    }
    return pathname === href;
  };

  return (
    <nav className="flex gap-6 text-sm items-center">
      {navItems.map((item, index) => (
        <React.Fragment key={index}>
          {!item.dropdown ? (
            <div
              className={classNames(
                "flex items-center gap-1 group",
                item.disabled
                  ? "text-gray/500 cursor-not-allowed"
                  : isActive(item.href)
                  ? "text-yellow font-medium underline underline-offset-1"
                  : "text-gray hover:text-yellow cursor-pointer"
              )}
            >
              {!item.disabled ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </div>
          ) : (
            <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
              <DropdownMenuTrigger
                className={classNames(
                  "group flex items-center",
                  isActive(item.href, item.dropdown)
                    ? "text-yellow font-medium underline underline-offset-1"
                    : "text-gray hover:text-yellow"
                )}
              >
                {item.label}
                <div className="ml-1 transition-transform duration-200 group-hover:text-yellow flex items-center">
                  {isDropdownOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 15l-7.5-7.5L4.5 15"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 9l7.5 7.5 7.5-7.5"
                      />
                    </svg>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-lg rounded-md">
                {item.dropdown.map((subItem, subIndex) => (
                  <Link href={subItem.href} key={subIndex}>
                    <DropdownMenuItem
                      className={classNames(
                        "w-full cursor-pointer hover:bg-gray/100 rounded-md",
                        pathname === subItem.href ||
                          currentSearch === subItem.url
                          ? "text-yellow font-medium"
                          : "text-gray hover:text-yellow"
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
};

export default Navigation;
