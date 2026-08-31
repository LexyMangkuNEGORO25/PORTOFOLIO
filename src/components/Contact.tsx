import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, socials, resumeLink, contactEmail } from '../data';

gsap.registerPlugin(ScrollTrigger);

const HEADING_WORDS = ["Let's", 'Work', 'Together'];

export default function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Word-by-word reveal on scroll
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const wordEls = el.querySelectorAll('.contact-word');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative z-10 w-full flex flex-col justify-between overflow-hidden bg-dark text-white px-6 py-20 text-center sm:px-10 md:sticky md:bottom-0 md:h-screen md:min-h-[600px] md:px-24 md:py-16"
    >
      {/* Huge watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center font-bold leading-none tracking-[-0.075em] text-white/[0.03] blur-[3px]"
        style={{ fontSize: 'clamp(6rem,22vw,22rem)' }}
      >
        CONTACT
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-between gap-12 md:gap-0">
        {/* Top label */}
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/55">Get in touch</p>

        {/* Heading + email + links */}
        <div className="flex flex-col items-center gap-8">
          <h2
            ref={headingRef}
            className="font-bold uppercase leading-[0.9] tracking-[-0.055em] text-white"
            style={{ fontSize: 'clamp(3.5rem,10vw,8.5rem)' }}
          >
            {HEADING_WORDS.map((w, i) => (
              <span key={w} className={`inline-block overflow-hidden mr-[0.2em] py-1 ${i === 2 ? 'block mr-0' : ''}`}>
                <span className="contact-word inline-block will-change-transform">{w}</span>
              </span>
            ))}
          </h2>

          <div className="mt-4 flex flex-col items-center gap-10">
            {/* Email */}
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-2 font-sans text-xl font-light text-white/70 transition-colors duration-300 hover:text-white sm:text-2xl lg:text-3xl no-underline"
            >
              <span>{contactEmail}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8 font-mono text-[11px] uppercase tracking-wider text-white/45">
              <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 no-underline">Resume</a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300 no-underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: monitor icon + copyright */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-white/45 hover:text-white transition-colors duration-300">
            <svg width="40" height="40" viewBox="0 0 16 16" fill="currentColor" className="animate-pulse" style={{ animationDuration: '3s' }}>
              <rect x="2" y="1" width="2" height="3" />
              <rect x="12" y="1" width="2" height="3" />
              <rect x="4" y="3" width="8" height="9" />
              <rect x="3" y="4" width="10" height="7" />
              <rect x="5" y="6" width="1" height="1" fill="#10b981" />
              <rect x="10" y="6" width="1" height="1" fill="#10b981" />
              <rect x="7" y="8" width="2" height="1" fill="#111114" />
              <rect x="3" y="12" width="2" height="2" />
              <rect x="11" y="12" width="2" height="2" />
            </svg>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
