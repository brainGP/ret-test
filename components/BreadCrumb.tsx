"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define labels for your navigation items
const NAV_LABELS: Record<string, string> = {
  handstation: "Гар станц",
  neg: "neg",
  hoyor: "hoyor",
  gurav: "gurav",
  basestation: "Суурин станц",
  other: "Бусад Бараа",
  news: "Мэдээ",
  contact: "Холбоо барих",
  // Add more mappings if needed
};

const Breadcrumb = () => {
  const pathname = usePathname(); // Current path
  const paths = pathname.split("/").filter((path) => path); // Split into segments

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:underline text-gray-800">
            Нүүр
          </Link>
        </li>
        {paths.map((segment, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const label = NAV_LABELS[segment] || segment; // Use mapped label or default

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">{">"}</span>
              {index === paths.length - 1 ? (
                <span className="text-gray-500 capitalize">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="hover:underline text-gray-800 capitalize"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
