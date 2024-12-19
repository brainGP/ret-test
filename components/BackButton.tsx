"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="flex bg-gray text-white max-w-[64px] border relative hover:bg-gray/80 px-4 py-2 rounded-md shadow-sm"
      onClick={() => router.back()}
    >
      Буцах
    </Button>
  );
};

export default BackButton;
