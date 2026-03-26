import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoCarousel } from "@/components/sections/LogoCarousel";
import { Introduction } from "@/components/sections/Introduction";
import { Domains } from "@/components/sections/Domains";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { Portfolio } from "@/components/sections/Portfolio";
import { News } from "@/components/sections/News";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoCarousel />
        <Introduction />
        <Domains />
        <GlobalPresence />
        <Portfolio />
        <News />
      </main>
      <Footer />
    </>
  );
}
