import Reveal from './Reveal';
import { projects } from '../data';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-30 mt-0 rounded-t-[2rem] bg-base px-6 pt-16 pb-20 text-ink sm:px-10 sm:pt-24 md:-mt-[14vh] md:rounded-t-[2.5rem] md:pt-36 md:shadow-[0_-30px_60px_rgba(0,0,0,0.15)] lg:-mt-[10vh] lg:px-24 lg:pt-48"
    >
      <h2 className="sr-only">Selected projects</h2>

      {/* Huge background watermark */}
      <div className="pointer-events-none absolute inset-x-0 top-20 hidden select-none items-center justify-center text-center font-bold leading-none tracking-[-0.075em] text-ink/[0.045] blur-[3px] md:flex" style={{ fontSize: 'clamp(5rem,17vw,17rem)' }}>
        PROJECTS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-9 flex flex-col items-start justify-between gap-6 border-b border-ink/10 pb-6 sm:mb-12 sm:flex-row sm:items-end sm:pb-8 lg:mb-24">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink/65">Portfolio showcase</p>
            <h3
              className="mt-3 font-semibold uppercase tracking-[-0.035em] text-ink"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)' }}
            >
              selected projects
            </h3>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-3 border-b border-ink/25 pb-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink no-underline"
          >
            View all projects
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Projects list */}
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {projects.map((p, i) => (
            <Reveal key={p.id}>
              <article className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Image */}
                <div className={`min-w-0 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <div className="group/img relative isolate aspect-[16/10] overflow-hidden rounded-lg bg-ink/5">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className={`flex flex-col ${i % 2 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink/55">
                    <span>{p.index}</span>
                    <span className="rounded-full border border-ink/15 px-2 py-0.5 text-[0.55rem] font-semibold text-ink/65">
                      {p.role}
                    </span>
                  </div>

                  <h4 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{p.title}</h4>

                  <p className="mt-3 text-ink/70 leading-relaxed lg:max-w-lg">{p.desc}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stacks.map((stack) => (
                      <span
                        key={stack}
                        className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink/60 border border-ink/10 bg-ink/5 px-3 py-1.5 rounded-full font-mono"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
