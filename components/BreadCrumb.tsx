"use client";

import React from "react";
import Link from "next/link";
import pathname, { usePathname } from "next/navigation";

// Define labels for your navigation items
const Nav_labels: Record<string, string> = {
  handstation: "Гар станц",
  otherstation: "Бусад бараа",
  neg: "neg",
  hoyor: "hoyor",
  gurav: "gurav",
  basestation: "Суурин станц",
  other: "Бусад Бараа",
  news: "Мэдээ",
  contact: "Холбоо барих",
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  return (
    <nav className="text-sm text-gray-600 mb-4 ml-6">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:underline text-gray-800">
            Нүүр
          </Link>
        </li>
        {paths.map((segment, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const label = Nav_labels[segment] || segment;

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
