import Navbar from "@/components/Navbar";
import TickerTapeClient from "@/components/TickerTapeClient";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-14">
        <TickerTapeClient />
        <main>{children}</main>
      </div>
    </>
  );
}
