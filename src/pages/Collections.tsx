import React, { useState, useRef, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { WatchCard } from '../components/common/WatchCard';
import { GoldButton } from '../components/common/GoldButton';
import { WATCHES } from '../services/data';
import { toast } from 'sonner';
import { SEOHead } from '../components/common/SEOHead';

const Collections: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [email, setEmail] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['ALL', 'DRESS', 'SPORT', 'PERPETUAL', 'LIMITED', 'BESPOKE'];

  const filteredWatches = WATCHES.filter(watch => {
    if (filter === 'ALL') return true;
    if (filter === 'LIMITED') return watch.limited;
    return watch.category.toUpperCase() === filter;
  });

  // Bug #2 fix: after filter changes, immediately mark new reveal elements visible
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gridRef.current) {
        gridRef.current.querySelectorAll('.reveal').forEach(el => {
          el.classList.add('visible');
        });
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [filter]);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Reservation request received.');
    setEmail('');
  };

  return (
    <div className="w-full bg-[#1B3A2D]">
      <SEOHead
        title="The Collection | VÉRDE Horology"
        description="Six references. Each a complete argument in itself — Dress, Sport, Perpetual, Heritage, Celebration, and Bespoke. Fewer than 200 watches per year, all produced in Geneva."
        url="/collections"
      />
      {/* Hero */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center border-b border-[rgba(201,168,76,0.1)]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt="Collection Background"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D] to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 reveal visible">
          <Breadcrumb items={[{label: 'Home', href: '/'}, {label: 'Collections'}]} className="justify-center mb-8" />
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 block">The Collection</span>
          <h1 className="font-serif text-[56px] md:text-[72px] font-light leading-tight">
            Every Watch, A Manuscript
          </h1>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[80px] z-40 backdrop-blur-md bg-[#1B3A2D]/80 border-b border-[rgba(201,168,76,0.2)] py-4 overflow-x-auto hide-scrollbar">
        <div className="container mx-auto px-6 flex items-center justify-center gap-4 min-w-max">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase px-6 py-2 transition-all duration-300 ${
                filter === cat
                  ? 'bg-[#C9A84C] text-[#0F2318]'
                  : 'border border-[#C9A84C] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-24 container mx-auto px-6 min-h-[50vh]">
        {filteredWatches.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {filteredWatches.map((watch, index) => (
              <div key={`${filter}-${watch.id}`} className={`reveal ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
                <WatchCard watch={watch} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-[rgba(201,168,76,0.2)] bg-[#0F2318] max-w-3xl mx-auto">
            <div className="w-12 h-[1px] bg-[#C9A84C] mx-auto mb-8"></div>
            <h3 className="font-serif text-[36px] text-[#C9A84C] mb-4">Currently Unavailable</h3>
            <p className="font-sans text-[14px] text-[rgba(245,240,232,0.5)] tracking-wide">
              These pieces are currently resting in our archives. Will come soon.
            </p>
          </div>
        )}
      </section>

      {/* Quote */}
      <section className="py-32 bg-[#0F2318] border-y border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-6 text-center max-w-4xl reveal">
          <p className="font-serif text-[36px] md:text-[48px] italic text-[#C9A84C] font-light leading-relaxed">
            "We do not make watches for people who tell time. We make them for people who understand it."
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-[#0F2318]">
        <div className="container mx-auto px-6">
          <div className="border border-[#C9A84C] p-12 md:p-24 text-center reveal">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 block">Exclusive Release</span>
            <h2 className="font-serif text-[42px] md:text-[56px] mb-12">THE FORÊT NOIR — LIMITED TO 88 PIECES WORLDWIDE</h2>
            <GoldButton href="/limited-editions">Reserve Allocation</GoldButton>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#1B3A2D] text-center border-t border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto px-6 max-w-xl reveal">
          <h3 className="font-serif text-[32px] text-[#C9A84C] mb-8">Reserve The Future</h3>
          <form onSubmit={handleReserve} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-transparent border-b border-[rgba(201,168,76,0.3)] px-4 py-3 text-center sm:text-left focus:outline-none focus:border-[#C9A84C] transition-colors w-full font-sans text-[13px]"
            />
            <GoldButton type="submit">Reserve</GoldButton>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Collections;
