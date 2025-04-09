"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

interface BackButtonProps {
  customRoute?: string;
  goToHome?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ customRoute, goToHome }) => {
  const router = useRouter();

  const handleClick = () => {
    if (customRoute) {
      router.push(customRoute);
    } else if (goToHome) {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <Button
      className="flex text-white max-w-[64px] border relative px-4 py-2 rounded-md shadow-sm"
      onClick={handleClick}
    >
      Буцах
    </Button>
  );
};

export default BackButton;
