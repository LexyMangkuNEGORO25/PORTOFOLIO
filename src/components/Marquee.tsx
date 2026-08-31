import { techMarquee } from '../data';

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const doubled = [...techMarquee, ...techMarquee];

  const borderColor = dark ? 'border-white/10' : 'border-line';
  const textColor = dark ? 'text-white/45 hover:text-white' : 'text-muted hover:text-ink';
  const separator = dark ? 'text-white/10' : 'text-line';

  return (
    <div className={`marquee-track w-full overflow-hidden border-y ${borderColor} py-5 select-none`}>
      <div className="animate-marquee flex whitespace-nowrap items-center" style={{ width: 'max-content' }}>
        {doubled.map((tech, i) => (
          <span key={i} className={`mx-6 text-lg font-medium ${textColor} transition-colors cursor-default`}>
            {tech} <span className={`ml-6 ${separator}`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
