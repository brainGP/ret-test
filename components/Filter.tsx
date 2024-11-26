import React from "react";
import { Slider } from "./ui/slider";

const Filter: React.FC = () => {
  return (
    <div className="flexf lex-col gap-4 ">
      <h3 className=" font-semibold mb-4">Шүүлтүүр</h3>

      <div className="flex flex-row items-center justify-start md:justify-between  gap-4">
        <h1 className="block text-sm ">Үнэ</h1>
        <Slider defaultValue={[0]} max={80} step={1} className="w-64" />
      </div>
      <div className="flex flex-row items-center justify-start md:justify-between gap-4">
        <h1 className="block text-sm ">Брэндүүд</h1>
        <Slider defaultValue={[0]} max={80} step={1} className="w-64" />
      </div>
      {}
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Хадгалах
      </button>
    </div>
  );
};

export default Filter;
