import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retevis",
  description: "Retevis Mongolia",
};

export default function OtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
