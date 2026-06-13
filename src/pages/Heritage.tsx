import React from 'react';
import { ChevronDown } from 'lucide-react';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { SEOHead } from '../components/common/SEOHead';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const Heritage: React.FC = () => {
  const mastersRef = useAnimatedCounter(84);
  const calibresRef = useAnimatedCounter(246);
  const masteryRef = useAnimatedCounter(54);

  return (
    <div className="w-full bg-[#1B3A2D]">
      <SEOHead
        title="Heritage | VÉRDE Horology"
        description="Since 1887, VÉRDE Horology has built timepieces in the tradition of Geneva's finest ateliers. Discover the lineage, the founder, and the principles that shape every watch we make."
        url="/heritage"
      />

      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden" aria-labelledby="heritage-hero-title">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="/images/heritage-bg.png"
            alt=""
            loading="eager"
            className="w-full h-full object-cover grayscale opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2318] via-[#1B3A2D]/75 to-[#1B3A2D]/30" />
        </div>
        <div className="relative z-10 text-center px-6 reveal mt-20">
          <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#C9A84C] mb-8 block">
            Established Geneva, 1887
          </span>
          <h1 id="heritage-hero-title" className="font-serif text-[48px] sm:text-[64px] md:text-[80px] font-light leading-tight mb-8">
            A House Built on Silence <br />
            <span className="italic text-[#C9A84C]">and Steel</span>
          </h1>
          <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] tracking-[0.05em] max-w-sm mx-auto leading-relaxed">
            One hundred and thirty-seven years. One unchanging obsession.
          </p>
        </div>
        <ChevronDown size={28} className="absolute bottom-12 text-[#C9A84C] animate-bounce" aria-hidden="true" />
      </section>

      {/* Founder */}
      <section className="py-24 sm:py-32 bg-[#0F2318] border-y border-[rgba(201,168,76,0.1)]" aria-labelledby="founder-title">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-20">
            <div className="w-full md:w-1/3 reveal flex-shrink-0">
              <div className="aspect-[3/4] max-w-xs mx-auto md:mx-0 rounded-[80px] border-4 border-[#C9A84C] p-2">
                <img
                  src="/images/heritage-bg.png"
                  alt="Antoine Verde, founder of VÉRDE Horology, circa 1887"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[66px] grayscale"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 reveal">
              <blockquote className="font-serif text-[28px] sm:text-[38px] md:text-[46px] italic text-[#C9A84C] font-light leading-snug mb-6">
                "I did not set out to build a company. I set out to build something that would outlast me."
              </blockquote>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[rgba(245,240,232,0.4)] mb-10">
                — Antoine Verde, 1887
              </p>
              <div className="space-y-5 font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.75)]">
                <p>
                  In a modest workshop on the western edge of Geneva, within earshot of the lake, Antoine Verde began a solitary and impractical pursuit: absolute precision. He destroyed his first forty movements because each lost a single second over a month. Not lost consistently — lost unpredictably. That distinction mattered to him beyond reason.
                </p>
                <p>
                  What emerged from that obsession was not simply a watch company. It was a method — a set of standards so exacting that they could not be maintained at volume. So VÉRDE never grew large. It grew only better. The Geneva atelier today employs fewer than ninety people. It produces fewer than two hundred watches a year.
                </p>
                <p>
                  That restraint is not strategy. It is faithfulness to the founder's conviction that the moment you make more than the craft allows, you are no longer making what you said you were.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider Quote */}
      <section className="py-20 bg-[#1B3A2D] text-center px-6" aria-label="Heritage principle">
        <div className="max-w-3xl mx-auto reveal">
          <div className="w-[1px] h-16 bg-[rgba(201,168,76,0.3)] mx-auto mb-10" aria-hidden="true" />
          <p className="font-serif text-[22px] sm:text-[28px] italic text-[rgba(245,240,232,0.8)] leading-relaxed">
            "A watch is not a product. It is a position — on time, on quality, on what a human being with enough skill and patience can accomplish without the assistance of a machine."
          </p>
          <div className="w-[1px] h-16 bg-[rgba(201,168,76,0.3)] mx-auto mt-10" aria-hidden="true" />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 sm:py-36 bg-[#0F2318] overflow-hidden" aria-labelledby="timeline-title">
        <div className="text-center mb-16 sm:mb-24 reveal">
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4 block">
            Since 1887
          </span>
          <h2 id="timeline-title" className="font-serif text-[36px] sm:text-[42px] text-[#F5F0E8]">
            The Lineage
          </h2>
        </div>

        <div className="relative overflow-x-auto hide-scrollbar pb-16 px-6">
          <div className="absolute top-1/2 left-0 h-[1px] w-[300%] bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.25)] to-transparent -translate-y-1/2 pointer-events-none" aria-hidden="true" />

          <div className="flex gap-10 sm:gap-16 min-w-max items-center relative z-10 px-8">
            {[
              { year: '1887', title: 'The Genesis', event: 'Antoine Verde destroys his first forty movements. The standard is set.', img: '/images/heritage-bg.png' },
              { year: '1923', title: 'The Art Deco Era', event: 'The first rectangular case. A departure that defines a decade of design.', img: '/images/watch4.png' },
              { year: '1951', title: 'Calibre Morillon', event: 'Our first in-house tourbillon. Three years in the making. Twelve pieces produced.', img: '/images/craftsmanship-bg.png' },
              { year: '1976', title: 'Quartz Resistance', event: 'When the industry pivoted, VÉRDE refused. We doubled the atelier instead.', img: '/images/watch2.png' },
              { year: '2003', title: 'The Digital Atelier', event: 'CAD precision meets hand-finishing tradition. The tolerance drops to 0.001mm.', img: '/images/hero-bg.png' },
              { year: '2024', title: 'The Next Century', event: 'Fewer than two hundred watches. The same obsession. No plan to change either.', img: '/images/watch1.png' },
            ].map((item, i) => (
              <div
                key={item.year}
                className={`w-[240px] sm:w-[280px] group cursor-default ${i % 2 === 0 ? '-mt-16 sm:-mt-24' : 'mt-16 sm:mt-24'} transition-transform duration-500 hover:-translate-y-3`}
              >
                <div className="aspect-square bg-[#1B3A2D] border border-[rgba(201,168,76,0.15)] p-2 mb-5 group-hover:border-[#C9A84C] transition-colors duration-500 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-[40px] sm:text-[48px] font-bold text-[#C9A84C] mb-1 leading-none">{item.year}</h3>
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.7)] mb-3">{item.title}</p>
                  <p className="font-sans text-[11px] leading-relaxed text-[rgba(245,240,232,0.45)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[200px] mx-auto">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 sm:py-28 bg-[#1B3A2D]" aria-labelledby="pillars-title">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4 block">
              The Foundations
            </span>
            <h2 id="pillars-title" className="font-serif text-[32px] sm:text-[38px]">Three Principles. No Exceptions.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 reveal">
            {[
              {
                number: 'I.',
                title: 'Restraint',
                text: 'We have never produced more than two hundred watches in a calendar year. Every increase in volume that has ever been proposed internally has been declined. The capacity to make more is not the same as the right to make more.',
              },
              {
                number: 'II.',
                title: 'Accountability',
                text: 'Every watch leaves our atelier with the engraved initials of the master watchmaker responsible for its final assembly. That person can be reached directly — not through a department, not through a representative — for the life of the watch.',
              },
              {
                number: 'III.',
                title: 'Continuity',
                text: 'We retain the technical schematics of every calibre we have ever produced. We maintain the tooling. We keep the capability to service any watch bearing our name, regardless of when it was made. We have never broken this promise.',
              },
            ].map(pillar => (
              <div key={pillar.number} className="border-t border-[rgba(201,168,76,0.2)] pt-8">
                <div className="font-serif text-[48px] text-[#C9A84C] opacity-25 mb-2 leading-none">{pillar.number}</div>
                <h3 className="font-serif text-[26px] text-[#F5F0E8] mb-5">{pillar.title}</h3>
                <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.65)]">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Living Archive */}
      <section className="bg-[#0F2318]" aria-labelledby="archive-title">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-10 sm:p-16 lg:p-24 xl:p-32 flex flex-col justify-center reveal">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-6 block">
              The Living Archive
            </span>
            <h2 id="archive-title" className="font-serif text-[36px] sm:text-[42px] mb-7 text-[#F5F0E8]">
              A Record of Every Watch Ever Made
            </h2>
            <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.7)] mb-12">
              The Geneva atelier houses detailed records of every timepiece VÉRDE has produced since the first complete commission of 1889. We retain the technical drawings, the material specifications, the name of the watchmaker responsible, and the name of the first owner. We keep all of this not for regulatory purposes but because we consider it a moral obligation to the objects we put into the world.
            </p>

            <div className="space-y-8 mb-12">
              {[
                { ref: mastersRef, label: 'Master Watchmakers' },
                { ref: calibresRef, label: 'Calibres in Active Service' },
                { ref: masteryRef, label: 'Years Average Mastery' },
              ].map(({ ref, label }) => (
                <div key={label} className="flex items-center gap-6">
                  <div ref={ref} className="font-serif text-[44px] text-[#C9A84C] w-20 flex-shrink-0">0</div>
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.5)]">{label}</p>
                </div>
              ))}
            </div>

            <a
              href="/craftsmanship"
              className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#F5F0E8] hover:text-[#C9A84C] transition-colors border-b border-[#C9A84C] pb-1 self-start"
            >
              Explore Our Craft →
            </a>
          </div>

          <div className="w-full lg:w-1/2 h-[55vw] sm:h-[50vh] lg:h-auto min-h-[500px] relative" aria-hidden="true">
            <img
              src="/images/craftsmanship-bg.png"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2318] to-transparent w-1/2 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2318] to-transparent h-1/3 bottom-0 lg:hidden" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-[#1B3A2D] text-center border-t border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-6 reveal">
          <h2 className="font-serif text-[36px] sm:text-[48px] font-light mb-5">Become Part of the Heritage</h2>
          <p className="font-sans text-[13px] text-[rgba(245,240,232,0.5)] mb-12 max-w-md mx-auto leading-relaxed">
            Every watch we make is a numbered record in the archive. Acquire one, and your name joins theirs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <GoldButton href="/collections">Explore the Collection</GoldButton>
            <GhostButton href="/craftsmanship">Our Craftsmanship</GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Heritage;
