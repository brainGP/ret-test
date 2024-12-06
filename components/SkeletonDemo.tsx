import Image from "next/image";
import { Button } from "./ui/button";
export function Profile() {
  return (
    <Button className="flex flex-row bg-transparent shadow-none p-0 items-center space-x-2 hover:bg-transparent">
      <Image
        src="/icons/profile.svg"
        alt="icon"
        height={24}
        width={24}
        className="group"
      />
      <span className="text-sm font-medium text-gray  hover:text-yellow ">
        Нэвтрэх
      </span>
    </Button>
  );
}
