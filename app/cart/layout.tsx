import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Retevis",
  description: "Retevis Mongolia",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
