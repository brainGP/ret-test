"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Nav_labels: Record<string, string> = {
  stations: "Станц",
  handstation: "Гар станц",
  otherstation: "Бусад бараа",
  basestation: "Суурин станц",
  other: "Бусад Бараа",
  contact: "Холбоо барих",
  admin: "Админ",
  users: "Хэрэглэгчид",
  cart: "Хадгалсан бүтээгдэхүүнүүд",
};

const Breadcrumb = () => {
  const pathname = usePathname() || "";
  const paths = pathname.split("/").filter((path) => path);

  return (
    <nav className="text-md">
      <ul className="flex flex-row space-x-2 items-center">
        <li>
          <Link href="/" className="hover:underline">
            Нүүр
          </Link>
        </li>
        {paths.map((segment, index) => {
          const decodedSegment = decodeURIComponent(segment);
          const href = "/" + paths.slice(0, index + 1).join("/");
          const label = Nav_labels[decodedSegment] || decodedSegment;

          return (
            <li key={index} className="flex flex-row items-center">
              <div className="text-gray mr-2">
                <Image
                  src="/icons/breadcrumb.svg"
                  alt="logo"
                  width={16}
                  height={16}
                  priority={true}
                />
              </div>
              {index === paths.length - 1 ? (
                <span className="font-semibold">{label}</span>
              ) : (
                <Link href={href} className="hover:underline capitalize">
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
