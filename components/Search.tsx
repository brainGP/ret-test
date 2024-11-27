import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Search() {
  return (
    <div className="flex w-full max-w-2xl min-w-sm items-center bg-blue rounded-full gap-4">
      <Input type="search" placeholder="Хайлт хийх..." className="px-4" />
      <Button type="submit" className="rounded-full bg-yellow hover:bg-yellow">
        <Image src="/icons/search.svg" alt="icon" width={24} height={24} />
      </Button>
    </div>
  );
}

export default Search;
