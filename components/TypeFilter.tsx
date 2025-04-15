"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";

const types = [
  { value: "all", label: "Бүх", type: "all" },
  { value: "handstation", label: "Гар станц", type: "handstation" },
  { value: "basestation", label: "Суурь станц", type: "basestation" },
  { value: "equipments", label: "Дагалдах хэрэгслүүд", type: "equipments" },
];

const TypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  const selectedType = searchParams.get("type") || "all";

  return (
    <div className="w-full">
      <div className="block lg:hidden max-w-[200px] w-full">
        <Select onValueChange={handleTypeChange} defaultValue={selectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Төрлөөр шүүх" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden lg:flex flex-wrap gap-2">
        {types.map((type) => {
          const isActive =
            selectedType === type.value ||
            (!selectedType && type.value === "all");
          const query = type.value === "all" ? "" : `?type=${type.type}`;
          return (
            <Link
              key={type.value}
              href={`/stations${query}`}
              className={`px-4 py-1 border rounded-md text-sm transition-all ${
                isActive ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              {type.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TypeFilter;
