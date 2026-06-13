import React from 'react';
import { RotateCw, Droplets, Box, Wrench, Shield } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { GhostButton } from '@/components/common/GhostButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const WATER_TABLE = [
  { rating: '3 ATM / 30m', suitable: 'Light rain, splashes' },
  { rating: '5 ATM / 50m', suitable: 'Swimming, surface water' },
  { rating: '10 ATM / 100m', suitable: 'Snorkelling, recreational diving' },
  { rating: '20 ATM / 200m', suitable: 'Scuba diving, high-pressure water' },
];

const SECTIONS = [
  {
    icon: <RotateCw size={32} />,
    title: 'Winding Instructions',
    content: [
      { h: 'Manual Wind', b: 'Wind your manual movement 20-30 full turns when the watch has run down. Turn the crown gently clockwise until you feel a soft resistance — do not force it. We recommend winding at the same time each morning to maintain a consistent power reserve.' },
      { h: 'Automatic', b: 'Your automatic calibre winds itself through wrist motion. If worn daily, no additional winding is required. After extended storage, give it 30-40 gentle turns to start the movement before wearing.' },
      { h: 'Never Over-Wind', b: 'All VÉRDE movements are equipped with slip-click devices to prevent over-winding damage. However, forcing the crown once resistance is felt can damage the crown tube — always wind with a light touch.' },
    ],
  },
  {
    icon: <Box size={32} />,
    title: 'Storage',
    content: [
      { h: 'Humidity', b: 'Store between 45-55% relative humidity. Excessive moisture accelerates corrosion of steel components and can fog the crystal. A silica gel sachet in your watch box is recommended.' },
      { h: 'Temperature', b: 'Ideal storage temperature is 15-25°C (59-77°F). Avoid leaving your watch in direct sunlight or near heat sources — extreme temperature fluctuations stress lubricants and seals.' },
      { h: 'Watch Winder', b: 'For automatic movements, a quality Swiss-made watch winder set to 650 TPD (turns per day) is ideal for maintaining the mainspring during storage periods over two weeks.' },
    ],
  },
  {
    icon: <Wrench size={32} />,
    title: 'Service Intervals',
    content: [
      { h: 'Recommended Schedule', b: 'A comprehensive service every 3-5 years for mechanical movements, or every 5 years for quartz-assisted calibres. Regular servicing preserves accuracy, extends component life, and maintains water resistance.' },
      { h: 'What\'s Included', b: 'Complete movement disassembly and inspection, ultrasonic component cleaning, worn part replacement, re-lubrication with Swiss-grade oils, regulation to within -2/+2 seconds per day, case and bracelet polishing, and seal replacement.' },
      { h: 'Estimated Cost', b: 'Movement service: CHF 800-1,800 depending on calibre complexity. Case and bracelet refinishing: CHF 400-600. All services include a 2-year post-service warranty.' },
    ],
  },
  {
    icon: <Shield size={32} />,
    title: 'Warranty Coverage',
    content: [
      { h: '2-Year Comprehensive Warranty', b: 'Every VÉRDE timepiece is covered for 2 years from date of delivery against defects in materials and manufacture. This covers the movement, case, dial, and bracelet under normal use conditions.' },
      { h: 'What\'s Covered', b: 'Movement defects, case finishing defects, dial printing and applied index failures, bracelet clasp mechanism failures. All warranty work is performed exclusively at our Geneva workshops.' },
      { h: 'Exclusions', b: 'Leather and rubber straps are consumable items and not covered. Crystal (glass) damage from impact is not covered. Water damage resulting from improper crown closure or use beyond rated depth is not covered.' },
    ],
  },
];

const CareGuide: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Care Guide' }]} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 reveal">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Care & Maintenance</p>
        <h1 className="font-serif text-[64px] font-light mb-4">The Art of<br /><span className="italic text-[#C9A84C]">Preservation.</span></h1>
        <p className="font-sans text-[16px] text-[rgba(245,240,232,0.65)] max-w-2xl">
          A VÉRDE timepiece is engineered to last a century. Proper care ensures it becomes an heirloom rather than a memory.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-20 space-y-16 reveal-stagger">
        {SECTIONS.map((sec, i) => (
          <div key={i} className="reveal border-t border-[rgba(201,168,76,0.2)] pt-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-[#C9A84C]">{sec.icon}</div>
              <h2 className="font-serif text-[36px] font-light">{sec.title}</h2>
            </div>
            {sec.title === 'Water Resistance' ? null : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sec.content.map((item, j) => (
                  <div key={j}>
                    <h3 className="font-sans text-[12px] tracking-[0.2em] uppercase text-[#C9A84C] mb-3">{item.h}</h3>
                    <p className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.65)]">{item.b}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Water table */}
        <div className="reveal border-t border-[rgba(201,168,76,0.2)] pt-12">
          <div className="flex items-center gap-4 mb-8">
            <Droplets size={32} className="text-[#C9A84C]" />
            <h2 className="font-serif text-[36px] font-light">Water Resistance Guide</h2>
          </div>
          <div className="border border-[rgba(201,168,76,0.15)] overflow-hidden">
            <div className="grid grid-cols-2 bg-[rgba(201,168,76,0.1)] px-6 py-3">
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C]">Rating</p>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C]">Suitable For</p>
            </div>
            {WATER_TABLE.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 px-6 py-4 ${i % 2 === 0 ? '' : 'bg-[rgba(201,168,76,0.03)]'} border-t border-[rgba(201,168,76,0.1)]`}>
                <p className="font-sans text-[14px] text-[#C9A84C]">{row.rating}</p>
                <p className="font-sans text-[14px] text-[rgba(245,240,232,0.7)]">{row.suitable}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-[#0F2318] py-20 border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center reveal">
          <h2 className="font-serif text-[42px] font-light mb-10">Time for a Service?</h2>
          <div className="flex gap-4 justify-center">
            <GoldButton href="/contact">Book a Service</GoldButton>
            <GhostButton href="/boutiques">Find a Boutique</GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareGuide;
