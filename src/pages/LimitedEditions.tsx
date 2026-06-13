import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { WATCHES, formatPrice } from '../services/data';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { useGlobalState } from '../context/GlobalStateContext';
import { SEOHead } from '../components/common/SEOHead';

const LimitedEditions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('foret');
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 0, minutes: 0, seconds: 0 });
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const { currency, currencyRates } = useGlobalState();

  useEffect(() => {
    const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReserve = () => {
    toast.success('Allocation request received. Director will contact within 24 hours.');
  };

  const handleWaitlist = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    toast.success('You have been added to the waitlist for future releases.');
    setWaitlistEmail('');
  };

  return (
    <div className="w-full bg-[#0F2318]">
      <SEOHead
        title="Limited Editions | VÉRDE Horology"
        description="88 pieces per year. Once a numbered edition closes, it stays closed. The Forêt Perpetuelle Tourbillon — the singular expression of a century of Geneva watchmaking."
        url="/limited-editions"
      />
      {/* Hero */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.png" alt="Limited" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2318] to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 reveal mt-20">
          <h1 className="font-serif text-[48px] md:text-[64px] font-light leading-tight mb-12 max-w-4xl mx-auto text-[#C9A84C]">
            NOT EVERY COLLECTOR WILL OWN ONE. BY DESIGN.
          </h1>
          
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#F5F0E8] mb-6 block">
            allocation window closes in:
          </span>
          
          <div className="flex gap-4 sm:gap-8 justify-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="font-serif text-[48px] sm:text-[64px] text-[#C9A84C] tabular-nums leading-none mb-2">
                  {String(value).padStart(2, '0')}
                </div>
                <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.6)]">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Tab Bar */}
      <div className="sticky top-[80px] z-40 bg-[#0F2318]/90 backdrop-blur-md border-y border-[rgba(201,168,76,0.2)] py-4 overflow-x-auto hide-scrollbar">
        <div className="container mx-auto px-6 flex items-center justify-center gap-4 min-w-max">
          {[
            { id: 'foret', label: 'Forêt Noir' },
            { id: 'champagne', label: 'Champagne Perpetuelle' },
            { id: 'alpine', label: 'Alpine Blanc' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-[#C9A84C] text-[#0F2318]' 
                  : 'border border-[#C9A84C] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editions */}
      <section className="py-24 container mx-auto px-6 min-h-screen">
        
        {/* Tab 1 */}
        {activeTab === 'foret' && (
          <div className="flex flex-col md:flex-row gap-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[400px] text-[#C9A84C] opacity-5 pointer-events-none select-none z-0">
                01
              </div>
              <div className="aspect-[3/4] relative z-10 border border-[rgba(201,168,76,0.2)] p-4 bg-[#1B3A2D]">
                <img src="/images/watch2.png" alt="Forêt Noir" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center py-12">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">EDITION 01 — 88 PIECES</span>
              <h2 className="font-serif text-[52px] mb-4">FORÊT NOIR</h2>
              <p className="font-serif italic text-[20px] text-[rgba(245,240,232,0.6)] mb-10">The absolute absence of light.</p>
              
              <div className="mb-10">
                <div className="flex justify-between font-sans text-[11px] tracking-widest text-[#F5F0E8] mb-2 uppercase">
                  <span>Allocated</span>
                  <span>45 / 88</span>
                </div>
                <div className="w-full h-[2px] bg-[#1B3A2D]">
                  <div className="h-full bg-[#C9A84C] w-[51%]"></div>
                </div>
              </div>

              <p className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.8)] mb-12">
                Crafted from black ceramic fired at 1400°C, the Forêt Noir features an obsidian grand feu enamel dial that absorbs 99.8% of visible light. The hands are pure 18k white gold, floating in darkness.
              </p>

              <div className="font-serif text-[36px] text-[#C9A84C] mb-12">
                {formatPrice(145000, currency, currencyRates[currency])}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <GoldButton onClick={handleReserve} className="flex-1">Reserve Allocation</GoldButton>
                <GhostButton href="/product/noir-classique" className="flex-1">View Details</GhostButton>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 */}
        {activeTab === 'champagne' && (
          <div className="flex flex-col md:flex-row gap-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[400px] text-[#C9A84C] opacity-5 pointer-events-none select-none z-0">
                02
              </div>
              <div className="aspect-[3/4] relative z-10 border border-[rgba(201,168,76,0.2)] p-4 bg-[#1B3A2D]">
                <img src="/images/watch5.png" alt="Champagne Perpetuelle" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center py-12">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">EDITION 02 — 150 PIECES</span>
              <h2 className="font-serif text-[52px] mb-4">CHAMPAGNE PERPETUELLE</h2>
              <p className="font-serif italic text-[20px] text-[rgba(245,240,232,0.6)] mb-10">A celebration etched in gold.</p>
              
              <div className="mb-10">
                <div className="flex justify-between font-sans text-[11px] tracking-widest text-[#F5F0E8] mb-2 uppercase">
                  <span>Allocated</span>
                  <span>142 / 150</span>
                </div>
                <div className="w-full h-[2px] bg-[#1B3A2D]">
                  <div className="h-full bg-[#C9A84C] w-[94%]"></div>
                </div>
              </div>

              <p className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.8)] mb-12">
                A masterpiece of monochromatic warmth. The dial, case, and integrated bracelet are all fashioned from our proprietary 18k Champagne Gold. The perpetual calendar requires no adjustment until 2100.
              </p>

              <div className="font-serif text-[36px] text-[#C9A84C] mb-12">
                {formatPrice(85000, currency, currencyRates[currency])}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <GoldButton onClick={handleReserve} className="flex-1">Reserve Allocation</GoldButton>
                <GhostButton href="/product/champagne-dress" className="flex-1">View Details</GhostButton>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3 - Sold Out */}
        {activeTab === 'alpine' && (
          <div className="flex flex-col md:flex-row gap-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[400px] text-[#C9A84C] opacity-5 pointer-events-none select-none z-0">
                03
              </div>
              <div className="aspect-[3/4] relative z-10 border border-[rgba(201,168,76,0.2)] p-4 bg-[#1B3A2D] overflow-hidden">
                <div className="absolute inset-0 bg-[#0F2318]/60 z-20 flex items-center justify-center">
                  <div className="font-serif text-[48px] text-[#C9A84C] border-4 border-[#C9A84C] px-8 py-4 -rotate-12 bg-[#0F2318]/80 backdrop-blur-sm shadow-2xl">
                    SOLD OUT
                  </div>
                </div>
                <img src="/images/watch3.png" alt="Alpine Blanc" className="w-full h-full object-cover grayscale opacity-50" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center py-12 opacity-80">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-red-500 mb-4">EDITION 03 — 50 PIECES (CLOSED)</span>
              <h2 className="font-serif text-[52px] mb-4 line-through decoration-[#C9A84C] decoration-2">ALPINE BLANC</h2>
              <p className="font-serif italic text-[20px] text-[rgba(245,240,232,0.6)] mb-10">Conquered peaks.</p>
              
              <div className="mb-10">
                <div className="flex justify-between font-sans text-[11px] tracking-widest text-[#F5F0E8] mb-2 uppercase">
                  <span>Allocated</span>
                  <span>50 / 50</span>
                </div>
                <div className="w-full h-[2px] bg-[#1B3A2D]">
                  <div className="h-full bg-red-800 w-full"></div>
                </div>
              </div>

              <p className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.8)] mb-12">
                This edition was fully allocated within 4 hours of the private collector preview. We are currently accepting names for the waitlist in the event of an allocation cancellation.
              </p>

              <div className="font-serif text-[36px] text-[#C9A84C] mb-12 opacity-50">
                {formatPrice(65000, currency, currencyRates[currency])}
              </div>

              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4 w-full">
                <input 
                  type="email" 
                  placeholder="Email for Waitlist" 
                  value={waitlistEmail}
                  onChange={e => setWaitlistEmail(e.target.value)}
                  className="bg-transparent border border-[rgba(201,168,76,0.3)] px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors flex-1 font-sans text-[13px]"
                />
                <GoldButton type="submit">Join Waitlist</GoldButton>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Allocation Process */}
      <section className="py-24 bg-[#1B3A2D] border-t border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <h2 className="font-serif text-[36px] text-[#C9A84C]">The Allocation Process</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal-stagger">
            {[
              { num: '01', title: 'Reserve Online', desc: 'Secure your interest with a reservation request.' },
              { num: '02', title: 'Director Call', desc: 'A boutique director will contact you within 24 hours.' },
              { num: '03', title: 'Personalisation', desc: 'Select bespoke engraving and strap options.' },
              { num: '04', title: 'Delivery', desc: 'White-glove delivery by a VÉRDE specialist.' }
            ].map(step => (
              <div key={step.num} className="border-l border-[#C9A84C] pl-6 py-2 reveal">
                <div className="font-serif text-[24px] text-[#C9A84C] mb-2">{step.num}</div>
                <h3 className="font-sans text-[14px] uppercase tracking-widest text-[#F5F0E8] mb-4">{step.title}</h3>
                <p className="font-sans text-[12px] leading-relaxed text-[rgba(245,240,232,0.6)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LimitedEditions;
