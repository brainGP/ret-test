import React from "react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex flex-col gap-16 px-4 xl:px-16 py-8">
      {/* Map Section */}
      <div className="flex flex-col gap-4">
        <h1 className="font-medium text-xl md:text-2xl">Газрын зураг</h1>
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.659448480662!2d106.90872647687203!3d47.90427637121876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693fe320bd967%3A0xbbac0999ded34b5!2zUmV0ZXZpcyBNb25nb2xpYS8g0KDQsNC00LjQviDRgdGC0LDQvdGG!5e0!3m2!1sen!2smn!4v1732851245626!5m2!1sen!2smn"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-end flex-row gap-4">
          <span className="text-neutral-400">Google maps: </span>
          <Image
            src="/RetevisMongolia.svg"
            alt="logo"
            height={10}
            width={120}
          />
        </div>
      </div>

      {/* Poster Section */}
      <div className="flex flex-col gap-4">
        <h1 className="font-medium text-xl md:text-2xl">Сошиал хуудсууд</h1>
        <div className="flex flex-col 2xl:flex-row gap-8 items-center 2xl:items-start justify-center 2xl:justify-between">
          <div className="w-full xl:max-w-3xl ">
            <Image
              src="/fbpost.png"
              alt="Facebook Poster"
              width={700}
              height={700}
              className="w-full rounded-lg border b-1"
            />
          </div>
          <div className="w-full xl:max-w-3xl">
            <Image
              src="/igpost.png"
              alt="Instagram Poster"
              width={700}
              height={700}
              className="w-full rounded-lg border b-1"
            />
          </div>
        </div>
        <div className="flex justify-end flex-row gap-4">
          <span className="text-neutral-400">Facebook, Instagram: </span>
          <Image
            src="/RetevisMongolia.svg"
            alt="logo"
            height={10}
            width={120}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
