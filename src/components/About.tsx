import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from './Marquee';
import Reveal from './Reveal';
import { profile } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const bioRef = useRef<HTMLDivElement>(null);

  const bioLines = [
    { normal: ['I', 'build'], bold: ['modern', 'web'] },
    { normal: ['with', 'clean', 'interfaces,'], bold: ['performant', 'frontend', 'code,'] },
    { normal: ['and'], bold: ['responsive'] },
    { normal: ['designs'], bold: ['helping'] },
    { normal: ['teams'], bold: ['turn'] },
    { normal: ['ideas'], bold: ['into'] },
    { normal: [], bold: ['efficient', 'digital', 'products.'] }
  ];

  // Word-by-word reveal on scroll (each word slides up from mask)
  useEffect(() => {
    const el = bioRef.current;
    if (!el) return;
    const words = el.querySelectorAll('.bio-word');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative bg-dark px-6 pt-20 pb-32 text-white">
      {/* Curved top edge */}
      <div className="absolute left-1/2 -top-31 h-[180px] w-[130vw] -translate-x-1/2 rounded-full bg-dark" />

      <h2 className="sr-only">About {profile.name}</h2>

      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <p
            ref={bioRef}
            className="leading-[1.18] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(1.75rem, 3.8vw, 3.6rem)' }}
          >
            {bioLines.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <span className="block">
                  {line.normal.map((w, wi) => (
                    <span
                      key={`n-${li}-${wi}`}
                      className={`bio-word mr-[0.14em] inline-block font-normal text-white/45`}
                      style={{ willChange: 'transform' }}
                    >
                      {w}
                    </span>
                  ))}
                  {line.bold.map((w, bi) => (
                    <span
                      key={`b-${li}-${bi}`}
                      className={`bio-word mr-[0.14em] inline-block font-semibold text-white`}
                      style={{ willChange: 'transform' }}
                    >
                      {w}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </p>
        </Reveal>
      </div>

      <div className="mt-20">
        <Marquee dark />
      </div>
    </section>
  );
}
