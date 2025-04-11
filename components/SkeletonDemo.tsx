"use client";
import { User } from "lucide-react";
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
        <div className="flex gap-4 items-center text-gray">
          <User
            className=" group-hover:text-yellow transition-colors duration-200"
            size={24}
          />
          <span className="hidden lg:block text-sm font-medium group-hover:text-yellow transition-colors duration-200">
            Нэвтрэх
          </span>
        </div>
      </Link>
    </Button>
  );
}
