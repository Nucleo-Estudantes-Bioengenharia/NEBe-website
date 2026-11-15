import { About } from "@/components/About";
import { Activities } from "@/components/Activities";
import { Agenda } from "@/components/Agenda";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Join } from "@/components/Join";
import { Navbar } from "@/components/Navbar";
import { Resources } from "@/components/Resources";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <About />
        <Activities />
        <Agenda />
        <Resources />
        <Join />
      </main>
      <Footer />
    </>
  );
}
