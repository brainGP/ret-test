import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retevis",
  description: "Retevis Mongolia",
};

export default function HandstationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
