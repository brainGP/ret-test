import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col bg-gray-100 justify-center items-center px-4 md:px-6 md:mt-16">
      <div className="h-[0.5px] w-full bg-gray/20 my-4" />
      <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-6 text-gray-700">
        <div className="flex items-start md:items-center justify-center sm:justify-start">
          <Image
            src="/retevis.png"
            alt="Retevis Mongolia Logo"
            width={160}
            height={80}
            priority={true}
          />
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">ХОЛБОО БАРИХ</h2>
          <p className="text-sm mt-2">
            <strong>Утас:</strong> (+976) 9902 1617
          </p>
          <p className="text-sm mt-2">
            <strong>Имэйл:</strong> retevismongolia@gmail.com
          </p>
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">ХАЯГ БАЙРШИЛ</h2>
          <p className="text-sm mt-2">
            ХУД, Энх-Тайваны гүүрний баруун урд уулзвар, Ulaanbaatar, Mongolia
          </p>
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">СОШИАЛ ХАЯГУУД</h2>
          <a
            href="https://www.facebook.com/RetevisMongolia"
            className="flex items-center gap-2 text-sm mt-2"
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
            className="flex items-center gap-2 text-sm mt-2"
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
      <div className="w-full border-gray-300 py-4 text-sm text-center text-gray-600">
        © 2024 Retevis Mongolia
        <h1 className="  text-gray-100 mx-16 p-4">
          Америк стандартын RETEVIS брэндийн хэт богино долгионы гар болон
          суурин радио станцын төрөлжсөн худалдаа.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
