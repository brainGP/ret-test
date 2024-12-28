import { Toaster } from "@/components/ui/sonner";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
