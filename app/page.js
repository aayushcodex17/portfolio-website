import Achievements from "@/components/Achievements";
import Band from "@/components/Band";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import LeetCode from "@/components/LeetCode";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <div id="top" className="mx-auto min-h-screen max-w-3xl border-x border-dashed border-line">
      <div className="scroll-progress" aria-hidden="true" />
      <Band />
      <div className="rise">
        <Header />
      </div>
      <Band />
      <div className="rise" style={{ "--d": "120ms" }}>
        <Banner />
        <Ticker />
      </div>
      <Band />
      <main>
        <Intro />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <LeetCode />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
