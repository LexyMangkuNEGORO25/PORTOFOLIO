import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { profile, socials } from '../data';
import SocialIcon from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem) clamp(1.5rem, 6vw, 6rem)' }}
      >
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 select-none">
            <span
              className="w-9 h-9 rounded-full bg-ink text-base grid place-items-center font-[var(--font-serif)] italic font-semibold leading-none text-lg"
            >
              L
            </span>
            <span
              className="px-3 py-1.5 rounded-full border border-ink/10 text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
              style={{ background: 'rgba(232,232,229,0.86)', backdropFilter: 'blur(12px)' }}
            >
              LEXY / Portfolio
            </span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2.5 cursor-pointer text-[0.7rem] font-semibold uppercase tracking-[0.12em] overflow-hidden"
            style={{ background: 'rgba(232,232,229,0.9)', backdropFilter: 'blur(12px)' }}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {/* Text with vertical slide (Menu <-> Close) */}
            <span className="relative flex flex-col items-center" style={{ width: '12ch' }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'menu'}
                  initial={{ y: menuOpen ? 0 : '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: menuOpen ? '-100%' : 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  {menuOpen ? 'Close' : 'Menu'}
                </motion.span>
              </AnimatePresence>
            </span>

            <span className="flex flex-col gap-[5px] w-3.5">
              <span className={`h-[2px] bg-ink rounded transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-[2px] bg-ink rounded transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] bg-ink rounded transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Layered menu with pre-layer reveal */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop layer */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.35)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel with clip-path/fade reveal */}
            <motion.aside
              key="panel"
              className="fixed top-0 right-0 h-full z-40 flex flex-col"
              style={{
                width: 'clamp(360px, 44vw, 620px)',
                background: '#1e1e1e',
                backdropFilter: 'blur(12px)',
                padding: 'clamp(7rem, 15vh, 9rem) clamp(1.75rem, 4vw, 3.5rem) clamp(2rem, 5vh, 3.5rem)',
                color: '#f4f4f1',
                clipPath: 'inset(0 0 0 100%)'
              }}
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              animate={{ clipPath: 'inset(0 0% 0 0%)' }}
              exit={{ clipPath: 'inset(0 0 0 100%)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex flex-col gap-2 list-none m-0 p-0">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="overflow-hidden leading-none"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '110%', opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="group relative block font-[var(--font-sans)] font-semibold uppercase tracking-tight no-underline pb-1"
                      style={{
                        fontSize: 'clamp(2.4rem, 4.2vw, 4rem)',
                        lineHeight: 0.98,
                        letterSpacing: '-0.055em',
                        paddingRight: '2.75rem',
                        color: '#f4f4f1',
                        transition: 'color 0.3s'
                      }}
                    >
                      {item.label}
                      <span
                        className="absolute top-[0.1em] right-0 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-8 flex flex-col gap-3">
                <h3 className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.24em]" style={{ color: '#aeb8b0' }}>
                  Socials
                </h3>
                <div className="flex gap-4 flex-wrap">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-[0.75rem] font-medium uppercase tracking-[0.12em] no-underline transition-opacity hover:opacity-100"
                      style={{ color: 'rgba(244,244,241,0.58)', opacity: 1 }}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
