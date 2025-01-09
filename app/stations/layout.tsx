import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function StationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}
