import Link from "next/link";
import Image from "next/image";

interface NotFoundProps {
  explain?: string;
}

export default function NotFound({ explain }: NotFoundProps) {
  return (
    <div>
      <div className="w-full py-20 flex flex-col justify-center">
        <div className="min-h-[70vh] sm:min-h-[82vh] md:min-h-[45vh] lg:min-h-[46vh] xl:min-h-[47vh] flex flex-col gap-6 items-center justify-center text-center">
          <Image
            src="/notfound.png"
            alt="Not Found"
            width={500}
            height={500}
            priority={true}
            className="w-500"
          />
          <h2 className="font-heading text-2xl font-bold">
            Тус хуудас олдсонгүй!
          </h2>
          {explain && <span>{explain}</span>}
          <Link
            href="/"
            className="mt-4 px-4 py-2 text-gray rounded-md hover:underline"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
