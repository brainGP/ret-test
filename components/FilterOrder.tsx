"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOrder = "lowtohigh" | "hightolow";

interface FilterOrderProps {
  onOrderChange: (order: SortOrder) => void;
}

const FilterOrder: React.FC<FilterOrderProps> = ({ onOrderChange }) => {
  const handleChange = (value: SortOrder) => {
    onOrderChange(value);
  };

  return (
    <div className="max-w-[200px] w-full text-sm">
      <Select onValueChange={handleChange}>
        <SelectTrigger id="sort-order w-full">
          <SelectValue placeholder="Үнээр эрэмбэлэх" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="hightolow">Ихээс бага руу</SelectItem>
          <SelectItem value="lowtohigh">Багаас их рүү</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterOrder;
