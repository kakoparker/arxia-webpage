import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoCarousel } from "@/components/sections/LogoCarousel";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { Domains } from "@/components/sections/Domains";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { Portfolio } from "@/components/sections/Portfolio";
import { News } from "@/components/sections/News";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoCarousel />
        <WhoWeServe />
        <Domains />
        <GlobalPresence />
        <Portfolio />
        <News />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
