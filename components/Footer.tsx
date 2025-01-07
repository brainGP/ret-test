import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactInfo from "./ContactInfo";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col justify-center items-center px-4 md:px-6 md:mt-1 text-gray">
      <div className="h-[0.5px] w-full bg-gray/20 my-4" />
      <div className="container flex justify-between items-start mx-auto max-w-7xl gap-8 py-6 flex-wrap">
        <div className="flex items-center justify-center sm:justify-start hover:scale-105 duration-300 transition">
          <Image
            src="/Retevis/retevis.png"
            alt="Retevis Mongolia Logo"
            width={160}
            height={80}
            priority={true}
          />
        </div>
        <ContactInfo />
        <Link href="https://www.google.com/maps?ll=47.904276,106.911301&z=16&t=m&hl=en&gl=MN&mapclient=embed&cid=845199646097487029">
          <div className="flex flex-col group items-start hover:scale-105 duration-300 transition ">
            <h2 className="text-lg font-semibold">ХАЯГ БАЙРШИЛ</h2>
            <p className="text-sm mt-2">
              ХУД, Энхтайвны гүүрний баруун урд,
              <br /> Төв банкны эсрэг талд
            </p>
            <span className="underline">Зочлох</span>
          </div>
        </Link>
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">СОШИАЛ ХАЯГУУД</h2>
          <a
            href="https://www.facebook.com/RetevisMongolia"
            className="flex items-center gap-2 text-sm mt-2 hover:scale-105 duration-300 transition hover:underline"
          >
            <Image
              src="/icons/fb_logo.svg"
              alt="Facebook Logo"
              width={16}
              height={16}
              priority={true}
            />
            Retevis Mongolia
          </a>
          <a
            href="https://www.instagram.com/retevis_mongolia"
            className="flex items-center gap-2 text-sm mt-2 hover:scale-105 duration-300 transition hover:underline"
          >
            <Image
              src="/icons/ig_logo.svg"
              alt="Instagram Logo"
              width={16}
              height={16}
              priority={true}
            />
            Retevis Mongolia
          </a>
        </div>
      </div>

      <div className="h-[0.5px] w-full bg-gray/20 my-4" />
      <div className="w-full border-gray py-4 text-sm text-center">
        © 2024 Retevis Mongolia
        <p className="p-4">
          Америк стандартын RETEVIS брэндийн хэт богино долгионы гар болон
          суурин радио станцын төрөлжсөн худалдаа.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
