"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOrderProps {
  onOrderChange: (order: string) => void;
}

const FilterOrder: React.FC<FilterOrderProps> = ({ onOrderChange }) => {
  const handleChange = (value: string) => {
    onOrderChange(value);
  };

  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger id="sort-order">
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
