"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Home,
  User,
  Package,
  ChevronDown,
  ChevronUp,
  Smartphone,
} from "lucide-react"; // Import Lucide icons
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
    { href: "/", label: "Нүүр", icon: <Home size={24} /> },
    {
      href: "/stations",
      label: "Станц",
      icon: <Smartphone size={24} />,
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
    {
      href: "/other",
      label: "Бусад бараа",
      icon: <Package size={24} />,
      disabled: false,
    },
    { href: "/contact", label: "Холбоо барих", icon: <User size={24} /> },
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
    <nav className="flex gap-8 text-sm justify-center items-center flex-wrap">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8">
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
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
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
      </div>

      {/* Mobile Navigation (Bottom Bar Style) */}
      <div className=" w-full flex md:hidden h-[60px] bg-white border-t border-gray-200 items-center justify-between px-12">
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
