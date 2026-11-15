import { About } from "@/components/About";
import { Activities } from "@/components/Activities";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Join } from "@/components/Join";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { Resources } from "@/components/Resources";
import { BackToTop, ScrollProgress } from "@/components/ScrollExtras";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="conteudo" className="overflow-x-clip">
        <Hero />
        <Marquee />
        <About />
        <Activities />
        <Resources />
        <Join />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
