import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { isUserLoggedIn } from "@/lib/authHelper";
import UserAvatar from "./UserAvatar";

export function Profile() {
    const user = isUserLoggedIn();

    if (user) {
        return <UserAvatar name={user.username} />;
    }
    return (
        <Button className="flex flex-row bg-white transition-transform shadow-none duration-200 p-0 hover:bg-white group">
            <Link href={`/login`}>
                {" "}
                <div className="flex gap-4 items-center group-hover:text-yellow">
                    <Image
                        src="/icons/profile.svg"
                        alt="icon"
                        height={24}
                        width={24}
                        className="transition-colors duration-200"
                        color="currenColor"
                    />
                    <span className="text-sm font-medium text-gray transition-colors duration-200 group-hover:text-yellow">
                        Нэвтрэх
                    </span>
                </div>
            </Link>
        </Button>
    );
}
