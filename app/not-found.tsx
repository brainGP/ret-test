import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className=" min-h-[70vh] sm:min-h-[82vh] md:min-h-[45vh] lg:min-h-[46vh] xl:min-h-[47vh] flex flex-col gap-6 items-center justify-center text-center">
        <Image src="/notfound.png" alt="Not Found" width={500} height={80} />
        <h2 className="font-heading text-2xl font-bold">
          Oops! Page Not Found!
        </h2>

        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
