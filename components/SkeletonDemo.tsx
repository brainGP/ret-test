import Image from "next/image";
export function Profile() {
  return (
    <div className="flex flex-row items-center space-x-4">
      {/* <Skeleton className="h-10 w-10 rounded-full" /> */}
      <Image src="/icons/profile.svg" alt="icon" height={24} width={24} />
      <span className="text-sm font-medium text-gray">Нэвтрэх</span>
    </div>
  );
}
