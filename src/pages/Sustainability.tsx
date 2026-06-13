import React from 'react';
import { Leaf, Gem, Clock, TreePine, Shield } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SEOHead } from '@/components/common/SEOHead';

const CERTIFICATIONS = [
  { title: 'Fairmined Certified', body: '100% traceable gold from responsible artisanal mines.' },
  { title: 'Lab-Grown Sapphire', body: 'Zero mined sapphires. Every crystal is grown ethically.' },
  { title: 'Carbon Neutral Switzerland', body: 'Certified carbon neutral operations since 2022.' },
  { title: 'REACH Compliant', body: 'All chemicals and materials comply with EU REACH regulations.' },
];

const SECTIONS = [
  {
    icon: <Leaf size={28} />, label: 'Gold Sourcing', title: 'Fairmined, Fully Traceable', stat: '100% Fairmined Certified Gold',
    body: 'Every gram of gold in a VÉRDE timepiece is sourced from certified Fairmined mines, where miners receive fair wages, safe conditions, and community premiums. From the earth to the case, the chain of custody is verified and documented.',
    img: '/images/craftsmanship-bg.png', left: true,
  },
  {
    icon: <Gem size={28} />, label: 'Sapphire Crystal', title: 'Zero Conflict. Zero Compromise.', stat: '0 Mined Sapphires Since 2019',
    body: 'In 2019, we became the first Swiss maison to transition entirely to lab-grown sapphire crystal. The optical quality is identical. The ethical benefit is absolute. No mining. No environmental disruption.',
    img: '/images/watch1.png', left: false,
  },
  {
    icon: <Clock size={28} />, label: 'Longevity Philosophy', title: 'Built for 100 Years.', stat: 'Engineered to Outlast 3 Generations',
    body: 'The most sustainable watch is one that never needs replacing. Every VÉRDE calibre is designed with full serviceability for a minimum of 100 years. Spare parts are guaranteed for the life of every movement we have ever produced.',
    img: '/images/heritage-bg.png', left: true,
  },
  {
    icon: <TreePine size={28} />, label: 'Carbon Programme', title: 'Rooted in the Alps.', stat: '100 Trees Planted Per Timepiece',
    body: 'In partnership with the Swiss Alpine Reforestation Foundation, we plant 100 native trees for every timepiece sold. Over 60,000 trees have been planted in the Swiss and French Alps since 2020, restoring ecosystems that inspired our dials.',
    img: '/images/boutique-interior.png', left: false,
  },
];

const Sustainability: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <SEOHead
        title="Our Sustainability Commitment | VÉRDE Horology"
        description="Fairmined certified gold. Zero mined sapphires since 2019. Carbon neutral Swiss operations. 100 trees planted per timepiece. Engineered to outlast three generations."
        url="/sustainability"
      />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Sustainability' }]} />
      </div>

      {/* Hero */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 reveal">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Our Commitment</p>
        <h1 className="font-serif text-[64px] font-light mb-6">Crafted With<br /><span className="italic text-[#C9A84C]">Conscience.</span></h1>
        <p className="font-sans text-[16px] leading-relaxed text-[rgba(245,240,232,0.7)] max-w-2xl">
          Luxury and responsibility are not opposites. At VÉRDE, our commitment to ethical sourcing, 
          environmental stewardship, and longevity engineering is inseparable from the craft itself.
        </p>
      </div>

      {/* Alternating Sections */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {SECTIONS.map((sec, i) => (
          <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-20 border-t border-[rgba(201,168,76,0.1)] reveal ${!sec.left ? 'md:[&>:first-child]:order-last' : ''}`}>
            <div>
              <div className="text-[#C9A84C] mb-6">{sec.icon}</div>
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">{sec.label}</p>
              <h2 className="font-serif text-[42px] font-light mb-4">{sec.title}</h2>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[rgba(201,168,76,0.7)] border-l border-[#C9A84C] pl-4 mb-6">{sec.stat}</p>
              <p className="font-sans text-[15px] leading-relaxed text-[rgba(245,240,232,0.65)]">{sec.body}</p>
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={sec.img} alt={sec.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <section className="bg-[#0F2318] py-24 border-t border-[rgba(201,168,76,0.1)] mt-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4 reveal">Verified</p>
          <h2 className="font-serif text-[42px] font-light mb-12 reveal">Our Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-stagger">
            {CERTIFICATIONS.map(c => (
              <div key={c.title} className="reveal border border-[rgba(201,168,76,0.2)] p-8 text-center hover:border-[#C9A84C] transition-colors">
                <Shield className="text-[#C9A84C] mx-auto mb-4" size={32} />
                <h3 className="font-serif text-[20px] mb-3">{c.title}</h3>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.55)]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center py-20 reveal">
        <GoldButton href="/craftsmanship">Explore Our Craft</GoldButton>
      </div>
    </div>
  );
};

export default Sustainability;
