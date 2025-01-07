"use client";
import { toast } from "sonner";

export default function ContactInfo() {
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${text} хуулагдсан!`);
      })
      .catch(() => {
        toast.error("Хуулахас алдаа гарлаа. Дахин оролдоно уу!");
      });
  };

  return (
    <div className="flex flex-col items-start">
      <h2 className="text-lg font-semibold">ХОЛБОО БАРИХ</h2>
      <p
        className="text-sm mt-2 cursor-pointer hover:scale-105 duration-300 transition hover:underline"
        onClick={() => handleCopy("9902 1617")}
      >
        <strong>Утас:</strong> (+976) 9902 1617
      </p>
      <p
        className="text-sm mt-2 cursor-pointer hover:scale-105 duration-300 transition hover:underline"
        onClick={() => handleCopy("retevismongolia@gmail.com")}
      >
        <strong>Имэйл:</strong> retevismongolia@gmail.com
      </p>
    </div>
  );
}
