import React from 'react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { GhostButton } from '@/components/common/GhostButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SEOHead } from '@/components/common/SEOHead';

const MILESTONES = [
  { year: '1887', title: 'The Genesis', img: '/images/watch1.png' },
  { year: '1923', title: 'Art Deco Era', img: '/images/watch4.png' },
  { year: '1951', title: 'The Morillon Cal.', img: '/images/watch2.png' },
  { year: '1976', title: 'Quartz Resistance', img: '/images/watch3.png' },
  { year: '2003', title: 'Digital Atelier', img: '/images/watch5.png' },
  { year: '2024', title: 'The Future', img: '/images/watch6.png' },
];

const PILLARS = [
  { num: '01', title: 'PRECISION', body: 'Every measurement is verified to 1/100th of a second. No calibre leaves Geneva without an independent chronometric certificate surpassing COSC and Geneva Seal standards.' },
  { num: '02', title: 'PERMANENCE', body: 'Built to outlast the wearer by generations. Every VÉRDE movement is engineered for a century of service, with full part availability guaranteed for the life of the watch.' },
  { num: '03', title: 'PROVENANCE', body: 'Each piece carries a documented lineage from raw material to wrist. From Fairmined gold to lab-grown sapphire, every element is traceable and certified.' },
];

const About: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <SEOHead
        title="About VÉRDE Horology | Est. Geneva, 1887"
        description="Founded in 1887 by Antoine Verde. Fewer than 200 watches per year. Every movement made in Geneva. A house built not on volume, but on the insistence that nothing imprecise should leave."
        url="/about"
      />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      </div>

      {/* Hero */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 reveal">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">The House of VÉRDE</p>
        <h1 className="font-serif text-[64px] font-light mb-6">A Legacy Written in<br /><span className="italic text-[#C9A84C]">Gold and Time.</span></h1>
        <p className="font-sans text-[16px] leading-relaxed text-[rgba(245,240,232,0.7)] max-w-2xl">
          Antoine Verde founded this maison in 1887 with a single conviction: that a watch should outlast its maker. 
          In a converted Geneva workshop on Rue de la Paix, he began crafting timepieces of such refined precision 
          that they drew the attention of three crowned heads of Europe within his first decade.
        </p>
      </div>

      {/* Founder */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center reveal">
          <div className="flex justify-center">
            <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-[#C9A84C] grayscale">
              <img src="/images/heritage-bg.png" alt="Antoine Verde, Founder" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6">Antoine Verde, 1887</p>
            <blockquote className="font-serif text-[32px] italic text-[rgba(245,240,232,0.85)] leading-relaxed mb-6">
              "To craft a VÉRDE is to leave something behind for those who come after."
            </blockquote>
            <p className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.65)]">
              A third-generation horologist from Le Sentier, Antoine Verde trained under the legendary Abraham-Louis Breguet school of thought. 
              His revolutionary barrel architecture — still used in every VÉRDE calibre today — extended power reserve by 40% without increasing case diameter. 
              It was an act of invisible genius that defined the maison's character forever.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-20 bg-[#0F2318] border-y border-[rgba(201,168,76,0.1)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12 reveal">
          <h2 className="font-serif text-[42px] font-light">137 Years of History</h2>
        </div>
        <div className="overflow-x-auto hide-scrollbar px-12">
          <div className="relative flex gap-0 min-w-max">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[rgba(201,168,76,0.25)]" />
            {MILESTONES.map((m, i) => (
              <div key={m.year} className={`relative w-72 flex flex-col items-center ${i % 2 === 0 ? '-mt-16' : 'mt-16'} group`}>
                <div className="relative w-full aspect-square overflow-hidden border border-[rgba(201,168,76,0.2)] group-hover:border-[#C9A84C] transition-all duration-500 mb-4">
                  <img src={m.img} alt={m.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="w-3 h-3 rounded-full bg-[#C9A84C] border-2 border-[#C9A84C] my-3" />
                <p className="font-serif text-[36px] text-[#C9A84C] font-bold">{m.year}</p>
                <p className="font-sans text-[12px] tracking-[0.1em] uppercase text-[rgba(245,240,232,0.6)] text-center">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4 reveal">Our Values</p>
        <h2 className="font-serif text-[42px] font-light mb-16 reveal">The Three Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 reveal-stagger">
          {PILLARS.map(p => (
            <div key={p.num} className="reveal border-t border-[rgba(201,168,76,0.3)] pt-8">
              <p className="font-serif text-[64px] text-[rgba(201,168,76,0.15)] font-bold mb-4">{p.num}</p>
              <h3 className="font-sans text-[14px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">{p.title}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.65)]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-[#0F2318] py-24 border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center reveal">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-6">Begin Your Journey</p>
          <h2 className="font-serif text-[52px] font-light mb-4">Your story deserves a timepiece<br /><span className="italic text-[#C9A84C]">equal to it.</span></h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <GoldButton href="/collections">Discover Our Timepieces</GoldButton>
            <GhostButton href="/bespoke">Commission Your Own</GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
