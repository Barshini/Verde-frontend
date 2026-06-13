import React, { useState } from 'react';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { SEOHead } from '../components/common/SEOHead';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const MATERIALS = [
  {
    name: '18k Champagne Gold',
    subtitle: 'Proprietary Alloy',
    front: 'The warmth of gold, hardened with platinum.',
    back: 'Alloyed in-house from 18-karat gold with a closely guarded proportion of platinum. The result resists oxidation, holds its colour over decades, and develops a patina that becomes, over time, entirely its own.',
    icon: '◈',
    color: '#C9A84C',
  },
  {
    name: 'Black Ceramic',
    subtitle: 'Diamond-Hardness',
    front: 'Scratch-proof. Chemically inert. Timeless.',
    back: 'Formed under 8,000 tonnes of isostatic pressure from zirconium dioxide powder, then kiln-fired at 1,450°C. The resulting material registers 9 on the Mohs scale — harder than most metals — and will not fade, tarnish, or scratch under any normal condition of wear.',
    icon: '◆',
    color: '#2D2D2D',
  },
  {
    name: 'Grade 5 Titanium',
    subtitle: 'Aerospace-Grade',
    front: 'The material inside the turbine blades of commercial aircraft.',
    back: 'Ti-6Al-4V, the most widely used titanium alloy in aerospace engineering. We select it because nothing else achieves this ratio of strength to weight. A 42mm case in Grade 5 Titanium weighs less than half its equivalent in gold — without sacrificing a single degree of rigidity.',
    icon: '◇',
    color: '#8B9EA8',
  },
  {
    name: 'Grand Feu Enamel',
    subtitle: 'Dial Artistry',
    front: 'Fired at 840°C. Applied by hand. Impossible to rush.',
    back: 'The oldest and most demanding dial-making technique. Powdered glass suspended in oil is applied to a copper base and fired multiple times in a kiln. Each firing takes thirty seconds. Each layer must cool fully before the next. A single crack at any stage destroys the dial. There is no shortcut.',
    icon: '◉',
    color: '#1B3A2D',
  },
  {
    name: 'Sapphire Crystal',
    subtitle: 'Mohs Hardness 9',
    front: 'The clearest view into the most important part of the watch.',
    back: 'Grown from aluminium oxide at 2,050°C in a Verneuil furnace, then ground and polished to a tolerance of 0.01mm. Our domed sapphire crystals receive three separate anti-reflective coatings, applied in a vacuum chamber, eliminating 99.7% of surface reflection. You see the dial — only the dial.',
    icon: '◎',
    color: '#4A7A9B',
  },
  {
    name: 'Widmanstätten Meteorite',
    subtitle: 'Extraterrestrial Iron',
    front: 'Formed four billion years ago. Still spectacular.',
    back: 'Iron-nickel meteorite, sourced and certified from verified falls. Sliced to 0.4mm, acid-etched to reveal the Widmanstätten crystalline structure — a pattern that forms only during the extremely slow cooling of a planetary core over millions of years. No two dials are identical. None can be reproduced.',
    icon: '✦',
    color: '#6B5A3A',
  },
];

const Craftsmanship: React.FC = () => {
  const hoursRef = useAnimatedCounter(400);
  const partsRef = useAnimatedCounter(612);
  const reserveRef = useAnimatedCounter(72);
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#1B3A2D]">
      <SEOHead
        title="Craftsmanship | VÉRDE Horology"
        description="Four hundred hours per watch. Six hundred and twelve movement parts. Discover the materials, methods, and philosophy behind every VÉRDE timepiece."
        url="/craftsmanship"
      />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" aria-labelledby="craft-hero-title">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="/images/craftsmanship-bg.png"
            alt=""
            loading="eager"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#0F2318]/85" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 reveal mt-20">
          <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#C9A84C] mb-8 block">
            The Art Between Science
          </span>
          <h1 id="craft-hero-title" className="font-serif text-[44px] sm:text-[64px] md:text-[84px] font-light leading-tight mb-14">
            Where Engineering Ends,
            <br />
            <span className="italic text-[#C9A84C]">Devotion Begins.</span>
          </h1>

          <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-10 border-t border-[rgba(201,168,76,0.2)] pt-10 max-w-2xl mx-auto">
            {[
              { ref: hoursRef, label: 'Hours Per Watch' },
              { ref: partsRef, label: 'Movement Parts' },
              { ref: reserveRef, label: 'Power Reserve (hrs)' },
            ].map(({ ref, label }) => (
              <div key={label}>
                <div ref={ref} className="font-serif text-[36px] sm:text-[48px] text-[#F5F0E8] mb-2" aria-label={label}>0</div>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#C9A84C]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Three Stages */}
      <div className="bg-[#1B3A2D]">
        {[
          {
            number: '01',
            stage: 'Stage 01',
            title: 'The Micro-Architecture',
            body: 'Before a single piece of metal is cut, our movements are engineered as architectural problems. We design for absolute stability: every component is positioned to distribute force evenly across the gear train. The tolerance for dimensional error is two microns — about the same as the width of a human red blood cell. We exceed it routinely. We never accept it when we do not.',
            pull: 'Precision begins long before the cutting edge meets the metal.',
            img: '/images/watch1.png',
            alt: 'Watch movement micro-architecture detail',
            reverse: false,
          },
          {
            number: '02',
            stage: 'Stage 02',
            title: 'Metallurgical Alchemy',
            body: 'We forge our own proprietary alloys in-house. Our Champagne Gold begins as standard 18-karat stock and is re-alloyed with a closely guarded proportion of platinum, producing a compound that is harder, warmer in tone, and more resistant to wear than anything commercially available. The process takes four days per batch. We do not outsource it. We never have.',
            pull: '"Metal has memory. You must treat it with respect, or it will eventually fail you." — Atelier, Geneva',
            img: '/images/craftsmanship-bg.png',
            alt: 'Gold alloy metallurgy process',
            reverse: true,
          },
          {
            number: '03',
            stage: 'Stage 03',
            title: 'The Final Reckoning',
            body: 'Assembly of a grand complication is the sole responsibility of a single master watchmaker — from first component to caseback closure. The process takes an average of eleven weeks. The completed movement then enters a regime of 1,000 hours of continuous testing: temperature cycling between -10°C and +50°C, positional testing in six orientations, magnetic resistance at 15,000 A/m. Only then does it qualify for the VÉRDE mark.',
            pull: 'One thousand hours of testing for a movement that will run for a hundred years.',
            img: '/images/heritage-bg.png',
            alt: 'Master watchmaker assembly process',
            reverse: false,
          },
        ].map((section, i) => (
          <section
            key={section.number}
            className={`py-20 sm:py-28 border-b border-[rgba(201,168,76,0.1)] relative overflow-hidden ${i % 2 === 1 ? 'bg-[#0F2318]' : ''}`}
            aria-labelledby={`stage-title-${section.number}`}
          >
            <div
              className="absolute top-0 font-serif text-[200px] sm:text-[300px] leading-none text-[#C9A84C] opacity-4 pointer-events-none select-none"
              style={{ [section.reverse ? 'left' : 'right']: 0, opacity: 0.04 }}
              aria-hidden="true"
            >
              {section.number}
            </div>
            <div className="container mx-auto px-4 sm:px-6">
              <div className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 sm:gap-16`}>
                <div className="w-full md:w-1/2 reveal">
                  <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-5 block">
                    {section.stage}
                  </span>
                  <h2 id={`stage-title-${section.number}`} className="font-serif text-[32px] sm:text-[42px] mb-7 text-[#F5F0E8]">
                    {section.title}
                  </h2>
                  <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.75)] mb-8">
                    {section.body}
                  </p>
                  <p className="font-serif italic text-[18px] sm:text-[22px] text-[#C9A84C] font-light border-l-2 border-[#C9A84C] pl-6 py-2">
                    {section.pull}
                  </p>
                </div>
                <div className="w-full md:w-1/2 reveal">
                  <div className="aspect-[4/3] sm:aspect-square bg-[rgba(15,35,24,0.5)] p-3 border border-[rgba(201,168,76,0.15)] overflow-hidden">
                    <img
                      src={section.img}
                      alt={section.alt}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Materials — Flip Cards */}
      <section className="py-20 sm:py-28 bg-[#0F2318]" aria-labelledby="materials-title">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4 block">
              The Palette
            </span>
            <h2 id="materials-title" className="font-serif text-[32px] sm:text-[42px] mb-3">Rare Earths &amp; Elements</h2>
            <p className="font-sans text-[13px] text-[rgba(245,240,232,0.45)]">
              Hover to discover the material philosophy. Tap on mobile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MATERIALS.map((material, i) => (
              <div
                key={i}
                className="flip-card-container h-[280px] sm:h-[300px] cursor-pointer"
                onMouseEnter={() => setFlipped(i)}
                onMouseLeave={() => setFlipped(null)}
                onClick={() => setFlipped(flipped === i ? null : i)}
                tabIndex={0}
                role="button"
                aria-label={`${material.name}: ${flipped === i ? material.back : material.front} — click to reveal`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setFlipped(flipped === i ? null : i);
                  }
                }}
              >
                <div
                  className="flip-card-inner w-full h-full relative"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
                    transform: flipped === i ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-[#1B3A2D] border border-[rgba(201,168,76,0.15)] p-7 flex flex-col items-center justify-center text-center"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    aria-hidden={flipped === i}
                  >
                    <div
                      className="w-14 h-14 rounded-full border border-[rgba(201,168,76,0.4)] mb-5 flex items-center justify-center text-[22px]"
                      style={{ color: material.color }}
                      aria-hidden="true"
                    >
                      {material.icon}
                    </div>
                    <h3 className="font-serif text-[20px] sm:text-[22px] text-[#F5F0E8] mb-2">{material.name}</h3>
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] mb-4">{material.subtitle}</p>
                    <p className="font-sans text-[12px] text-[rgba(245,240,232,0.5)] italic leading-relaxed">{material.front}</p>
                    <div className="absolute bottom-4 right-4 font-sans text-[9px] tracking-widest uppercase text-[rgba(201,168,76,0.4)]">
                      Hover ↗
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-[#0F2318] border border-[#C9A84C] p-7 flex flex-col items-center justify-center text-center overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                    aria-hidden={flipped !== i}
                  >
                    <div className="absolute inset-0 opacity-5" aria-hidden="true">
                      <img src="/images/watch1.png" alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <h3 className="font-serif text-[18px] text-[#C9A84C] mb-4 relative z-10">{material.name}</h3>
                    <p className="font-sans text-[12px] leading-relaxed text-[rgba(245,240,232,0.85)] relative z-10">{material.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Hand */}
      <section className="py-20 sm:py-28 bg-[#1B3A2D]" aria-labelledby="hand-title">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-16 reveal">
            <h2 id="hand-title" className="font-serif text-[32px] sm:text-[38px] mb-6">The Irreducible Human Element</h2>
            <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] leading-relaxed max-w-2xl mx-auto">
              There are processes in watchmaking that machines perform better than human hands. We use machines for those. There are processes that require a level of tactile judgement, perceptual precision, and corrective intelligence that no machine can yet replicate. We use human hands for those — and we refuse to compromise the distinction.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
            {[
              { stat: '47h', label: 'Hand-finishing per case' },
              { stat: '2,847', label: 'Perlage circles per movement' },
              { stat: '11w', label: 'Assembly time, tourbillon' },
              { stat: '1,000h', label: 'Quality testing, minimum' },
            ].map(({ stat, label }) => (
              <div key={stat} className="text-center border-t border-[rgba(201,168,76,0.2)] pt-6">
                <div className="font-serif text-[32px] sm:text-[40px] text-[#C9A84C] mb-2">{stat}</div>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-[rgba(245,240,232,0.45)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-[#0F2318] text-center border-t border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-6 reveal">
          <h2 className="font-serif text-[32px] sm:text-[42px] mb-5">Command Your Own Caliber</h2>
          <p className="font-sans text-[13px] text-[rgba(245,240,232,0.5)] mb-12 max-w-sm mx-auto leading-relaxed">
            Commission a watch with the same materials, the same hands, and your name inside the caseback.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <GoldButton href="/bespoke">Start a Bespoke Commission</GoldButton>
            <GhostButton href="/heritage">Explore Heritage</GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Craftsmanship;
