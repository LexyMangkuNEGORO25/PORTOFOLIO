import { profile } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-8 px-6 sm:px-10 bg-base">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted font-[var(--font-mono)]">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-ink transition-colors cursor-pointer bg-transparent border-none text-muted text-sm font-[var(--font-mono)]"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
