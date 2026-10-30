import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Posters from "@/components/Posters";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Posters />
        <Experience />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
