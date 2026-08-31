import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Reveal from './Reveal';
import { experiences } from '../data';

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = experiences.length;

  return (
    <section id="experience" className="relative overflow-hidden bg-dark text-white px-4 py-5 sm:px-8 sm:py-7 lg:px-24 lg:py-12">
      {/* Huge background watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center font-bold leading-none tracking-[-0.075em] text-white/[0.045] blur-[3px]"
        style={{ fontSize: 'clamp(5rem, 17vw, 17rem)' }}
      >
        EXPERIENCES
      </div>

      <h2 className="sr-only">Professional Experience</h2>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col pt-6">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-white/45 sm:text-[0.65rem]">Career archive</p>
            <h3
              className="mt-2 font-semibold uppercase leading-none tracking-[-0.035em] text-white sm:mt-3"
              style={{ fontSize: 'clamp(1.9rem, 9vw, 2.6rem)' }}
            >
              experiences
            </h3>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <p className="max-w-104 text-right text-sm leading-relaxed text-white/45 md:block">Roles, systems, and the work behind them.</p>
            <span className="font-mono text-sm text-white/45 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={(s: SwiperType) => setActiveIndex(s.activeIndex)}
          className="pb-14"
        >
          {experiences.map((exp) => (
            <SwiperSlide key={exp.index}>
              <Reveal>
                <article className="grid overflow-hidden rounded-2xl border border-white/10 bg-card text-card-foreground shadow-[0_32px_90px_rgba(0,0,0,0.28)] md:grid-cols-[1.28fr_0.92fr]">
                  {/* Left: info */}
                  <div className="flex min-h-0 flex-col px-5 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-10">
                    <header>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-white/50 sm:gap-3 sm:text-[0.65rem]">
                        <span>{exp.index} · Professional experience</span>
                        <span className="rounded-full border border-white/14 px-2 py-1 text-[0.48rem] font-semibold tracking-[0.18em] text-white/65 sm:px-2.5 sm:text-[0.58rem]">
                          {exp.type}
                        </span>
                      </div>
                      <h4
                        className="mt-3 max-w-[18ch] font-bold uppercase leading-[0.9] tracking-[-0.055em] sm:mt-4"
                        style={{ fontSize: 'clamp(1.45rem, 6.8vw, 3.4rem)' }}
                      >
                        {exp.role}
                      </h4>
                      <p className="mt-3 text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.08em] sm:mt-4 sm:text-sm">
                        {exp.company}
                      </p>
                      <span className="mt-2 inline-block font-mono text-xs text-white/45">{exp.period}</span>
                    </header>

                    <p className="mt-4 max-w-[55ch] text-sm leading-[1.55] text-white/75 sm:text-base">{exp.desc}</p>

                    <div className="mt-6">
                      <p className="mb-3 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-white/50 sm:mb-4 sm:text-xs">Highlights</p>
                      <ol className="grid sm:grid-cols-2">
                        {exp.highlights.map((h) => (
                          <li key={h.num} className="flex items-center gap-2 border-t border-white/18 py-3 pr-2 sm:gap-3 sm:py-3 sm:pr-4">
                            <span className="font-mono text-xs font-semibold text-white/45">{h.num}</span>
                            <span className="text-[0.6rem] font-semibold uppercase leading-[1.25] tracking-[0.06em] sm:text-[0.72rem] sm:leading-relaxed">
                              {h.text}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Right: image */}
                  <div className="group relative min-h-[12rem] overflow-hidden border-t border-white/12 bg-black/90 md:min-h-full md:border-l md:border-t-0">
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="h-full w-full object-cover object-center grayscale transition-[filter,scale] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                </article>
              </Reveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
