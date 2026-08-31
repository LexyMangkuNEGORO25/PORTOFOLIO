import { useEffect, useRef, useState } from 'react';
import { profile, socials, resumeLink } from '../data';
import SocialIcon from './Icons';

const ROLES = ['Front-End Web Developer', 'Front-End Developer', 'UI Craftsman', 'React Specialist'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typeCount, setTypeCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIndex % ROLES.length];
    let timeout: number | undefined;

    if (!deleting && typeCount === current.length) {
      timeout = window.setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && typeCount === 0) {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % ROLES.length);
    } else {
      timeout = window.setTimeout(
        () => setTypeCount(typeCount + (deleting ? -1 : 1)),
        deleting ? 40 : 85
      );
    }
    return () => window.clearTimeout(timeout);
  }, [typeCount, deleting, roleIndex]);

  // Tilt effect on profile card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 10;
      const ry = (px - 0.5) * 12;
      card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const typedRole = ROLES[roleIndex % ROLES.length].slice(0, typeCount);

  return (
    <section
      id="home"
      className="relative min-h-screen grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)] items-center gap-8 px-6 sm:px-10 lg:px-24 py-28 lg:py-10"
    >
      {/* Dot pattern background */}
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" style={{ maskImage: 'radial-gradient(ellipse at center, white 40%, transparent 100%)' }} />

      {/* Left column: text */}
      <div className="relative z-10 max-w-4xl">
        {/* Social icons */}
        <div className="mb-4 sm:mb-5 lg:mb-6 flex items-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition-colors duration-300"
              aria-label={s.label}
            >
              <SocialIcon name={s.label} />
            </a>
          ))}
        </div>

        {/* Location */}
        <p className="font-sans text-sm uppercase tracking-[0.28em] text-muted">{profile.location}</p>

        {/* Name */}
        <h1 className="mt-4 sm:mt-5 lg:mt-6 font-[var(--font-serif)] leading-none" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>
          Hi, I&apos;m <span className="italic">{profile.firstName}.</span>
        </h1>

        {/* Role with typewriter cursor */}
        <div className="mt-2 sm:mt-3 lg:mt-4 text-xl sm:text-4xl lg:text-5xl font-light tracking-wide h-[1.2em]">
          <span style={{ color: 'var(--color-ink)' }}>{typedRole}</span>
          <span className="text-type-cursor ml-1 inline-block">█</span>
        </div>

        {/* Resume button */}
        <div className="mt-4 sm:mt-5 lg:mt-6">
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-ink/15 bg-ink px-5 py-3 font-[var(--font-mono)] text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-base hover:bg-transparent hover:text-ink transition-colors duration-300"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Right column: portrait card (tilt) */}
      <div className="relative z-10 flex w-full justify-center lg:justify-end" style={{ perspective: '1200px' }}>
        <div
          ref={cardRef}
          className="relative w-full max-w-[390px] sm:max-w-[450px] lg:max-w-[520px] overflow-hidden rounded-3xl border border-white/18 transition-transform duration-200 ease-out will-change-transform"
          style={{
            background: '#0b0b0d',
            boxShadow: '0 28px 70px rgba(17,17,20,0.18)',
            aspectRatio: '3/4',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Gradient overlay top */}
          <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0) 34%),linear-gradient(180deg,#25252a 0%,#131418 48%,#050506 100%)' }} />

          {/* Decorative lines */}
          <div className="absolute inset-x-8 top-8 h-px bg-white/10" />

          {/* Profile image */}
          <img
            src={profile.profileImage}
            alt="Portrait"
            className="relative z-10 w-full h-full object-cover object-bottom rounded-3xl grayscale hover:grayscale-50 transition-[filter] duration-700"
          />

          {/* Bottom gradient fade */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-40 rounded-b-3xl bg-gradient-to-t from-[#050506] via-[#050506]/80 to-transparent" />

          {/* Badge overlay */}
          <div className="absolute inset-x-5 bottom-5 z-30 flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.075] px-5 py-4 text-white shadow-2xl backdrop-blur-md">
            <div>
              <p className="text-sm font-semibold leading-none">{profile.handle}</p>
              <p className="mt-2 text-sm leading-none text-white/58">Available for work!</p>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80 shadow-[0_0_14px_rgba(255,255,255,0.34)]" />
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-45 pointer-events-none">
        <div className="w-5 h-8 border border-ink/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-ink rounded-full animate-scroll-bounce" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-[var(--font-mono)] text-[8px] uppercase tracking-[0.25em] text-ink/65">Scroll Down</span>
          <i className="fas fa-chevron-down text-[10px] text-ink/50 animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}
