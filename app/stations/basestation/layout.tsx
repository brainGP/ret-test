import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Retevis",
  description: "Retevis Mongolia",
};

export default function BasestationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
