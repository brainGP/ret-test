import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { isAdminC, logoutUser } from "@/lib/authHelper";
import { toast } from "sonner";

function UserAvatar({ name }: { name: string; picture?: string }) {
  const router = useRouter();
  const isUserAdmin = isAdminC();

  const handleLogout = () => {
    logoutUser();
    toast.success("Амжилттай гарлаа!");
    router.push(`/`);
    window.location.reload();
  };

  return (
    <div className="flex flex-row gap-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full p-0"
            aria-label="User menu"
          >
            <Avatar className="bg-slate-300 rounded-full">
              <AvatarFallback className="text-black/85 font-bold">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Миний мэдээлэл</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {isUserAdmin && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/admin");
                    router.refresh();
                  }}
                >
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Админ</span>
                  <DropdownMenuShortcut>P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Гарах</span>
            <DropdownMenuShortcut>Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
        {name}
      </DropdownMenu>
    </div>
  );
}

export default UserAvatar;
