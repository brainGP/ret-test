import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col bg-gray-100 shadow justify-center items-center px-4 md:px-6">
      {/* Main Content */}
      <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-6 text-gray-700">
        {/* Logo Section */}
        <div className="flex items-start justify-center sm:justify-start">
          <Image
            src="/retevis.svg"
            alt="Retevis Mongolia Logo"
            width={160}
            height={80}
          />
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">ХОЛБОО БАРИХ</h2>
          <p className="text-sm mt-2">
            <strong>Утас:</strong> (+976) 9902 1617
          </p>
          <p className="text-sm mt-2">
            <strong>Имэйл:</strong> retevismongolia@gmail.com
          </p>
        </div>

        {/* Address Section */}
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">ХАЯГ БАЙРШИЛ</h2>
          <p className="text-sm mt-2">
            ХУД, Энх-Тайваны гүүрний баруун урд уулзвар, Ulaanbaatar, Mongolia
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold">СОШИАЛ ХАЯГУУД</h2>
          <a
            href="https://www.facebook.com/profile.php?id=100026372252640"
            className="flex items-center gap-2 text-sm mt-2"
          >
            <Image
              src="/icons/fb_logo.svg"
              alt="Facebook Logo"
              width={16}
              height={16}
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
            />
            Retevis Mongolia
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full border-t border-gray-300 py-4 text-sm text-center text-gray-600">
        © 2024 Retevis Mongolia
      </div>
    </footer>
  );
};

export default Footer;
