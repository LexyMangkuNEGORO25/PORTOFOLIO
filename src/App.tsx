import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
    // Prevent the browser from restoring a previous scroll position, so the
    // page always loads at the very top (hero).
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Force start position + recalc triggers after layout is ready.
    const refresh = () => {
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    refresh();
    const id = window.setTimeout(refresh, 100);

    return () => {
      window.clearTimeout(id);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

export default function App() {
  useLenis();

  return (
    <div className="bg-base text-ink min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <div className="relative z-10">
          <Contact />
        </div>
      </main>
    </div>
  );
}
