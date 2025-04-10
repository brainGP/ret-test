"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { isUserLoggedIn } from "@/lib/authHelper";
import UserAvatar from "./UserAvatar";
import { useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  _id: string;
}

export function Profile() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsClient(true);
    const loggedInUser = isUserLoggedIn();
    if (loggedInUser && typeof loggedInUser === "object") {
      setUser(loggedInUser);
    } else {
      setUser(null);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  if (user) {
    return <UserAvatar name={user.username} />;
  }

  return (
    <Button className="flex flex-row bg-white transition-transform shadow-none duration-200 p-0 hover:bg-white group">
      <Link href={`/login`}>
        <div className="flex gap-4 items-center group-hover:text-yellow">
          <Image
            src="/icons/profile.svg"
            alt="icon"
            height={24}
            width={24}
            className="transition-colors duration-200"
          />
          <span className="hidden lg:block text-sm font-medium text-gray transition-colors duration-200 group-hover:text-yellow">
            Нэвтрэх
          </span>
        </div>
      </Link>
    </Button>
  );
}
