import React, { useState } from 'react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { GhostButton } from '@/components/common/GhostButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const PRESS_ITEMS = [
  { pub: 'Hodinkee', type: 'Editorial Feature', date: 'June 2025', headline: 'VÉRDE and the Art of Perpetual Devotion', excerpt: 'The Geneva maison\'s latest perpetual calendar is not merely a watch — it is a philosophical argument rendered in metal and moonphase.' },
  { pub: 'Financial Times', type: 'News', date: 'May 2025', headline: 'VÉRDE Reports Record Q1 Growth Amid Luxury Slowdown', excerpt: 'The independent Swiss watchmaker defies market trends, posting a 34% increase in bespoke commissions year-on-year.' },
  { pub: 'Vogue', type: 'Editorial Feature', date: 'April 2025', headline: 'The Watch That Outlives Fashion', excerpt: 'In an era of trend cycles measured in weeks, VÉRDE\'s Champagne Dress reminds us what permanence looks like on the wrist.' },
  { pub: 'Bloomberg', type: 'Interview', date: 'March 2025', headline: 'Why the Ultra-Rich Are Choosing Bespoke Over Brands', excerpt: 'VÉRDE\'s atelier director explains how personalisation is reshaping the top end of the luxury market.' },
  { pub: 'GQ', type: 'Press Release', date: 'February 2025', headline: 'Meet the Master: VÉRDE\'s Head of Movement Design', excerpt: 'Forty years in the Geneva workshops. Sixty seconds to explain why he still winds his own watch every morning.' },
  { pub: 'Le Figaro', type: 'Events', date: 'January 2025', headline: 'VÉRDE Opens New Boutique at Place Vendôme', excerpt: 'The Geneva watchmaker\'s Paris address brings an intimate atelier experience to the French capital\'s most storied jewellery square.' },
];

const AWARDS = [
  { title: 'GPHG Artistic Crafts Prize', year: '2024', org: 'Geneva Watch Grand Prix' },
  { title: 'Luxury Watch of the Year', year: '2024', org: 'Robb Report' },
  { title: 'Best Independent Boutique', year: '2023', org: 'Europa Star' },
  { title: 'Heritage Preservation Award', year: '2023', org: 'Fondation de la Haute Horlogerie' },
  { title: 'Sustainable Design Mark', year: '2023', org: 'Swiss Watch Industry Federation' },
  { title: 'Red Dot Best of the Best', year: '2022', org: 'Red Dot Design Award' },
];

const PUBS = ['Financial Times', 'Hodinkee', 'Wall Street Journal', 'Vogue', 'Bloomberg', 'GQ', 'Esquire', 'Le Figaro'];
const FILTERS = ['All', 'Press Release', 'Editorial Feature', 'News', 'Interview', 'Events'];

const Press: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [kitEmail, setKitEmail] = useState('');
  const [kitSent, setKitSent] = useState(false);
  // Bug #4 fix: modal state for placeholder article
  const [articleModal, setArticleModal] = useState<typeof PRESS_ITEMS[0] | null>(null);
  useScrollReveal();

  const filtered = activeFilter === 'All' ? PRESS_ITEMS : PRESS_ITEMS.filter(p => p.type === activeFilter);

  const openArticle = (item: typeof PRESS_ITEMS[0]) => {
    setArticleModal(item);
  };

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      {/* Bug #4 fix: Article unavailable modal */}
      {articleModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-6"
          onClick={() => setArticleModal(null)}
        >
          <div
            className="bg-[#0F2318] border border-[rgba(201,168,76,0.3)] max-w-lg w-full p-12 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setArticleModal(null)}
              className="absolute top-6 right-6 text-[rgba(245,240,232,0.4)] hover:text-[#C9A84C] transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">{articleModal.pub} · {articleModal.date}</p>
            <h3 className="font-serif text-[28px] font-light text-[#F5F0E8] mb-6">{articleModal.headline}</h3>
            <div className="w-12 h-[1px] bg-[rgba(201,168,76,0.4)] mb-6"></div>
            <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] leading-relaxed mb-8">
              Article currently unavailable. Full publication access will be available soon.
            </p>
            <GhostButton onClick={() => setArticleModal(null)}>Close</GhostButton>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Press & Media' }]} />
      </div>

      {/* Hero */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 flex flex-col md:flex-row items-start justify-between gap-8 reveal">
        <div>
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Press & Media</p>
          <h1 className="font-serif text-[52px] font-light">The World Has Always Had<br />Something to Say About VÉRDE.</h1>
        </div>
        <div className="text-right">
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[rgba(245,240,232,0.5)] mb-2">Media Contact</p>
          <p className="font-sans text-[14px] text-[#F5F0E8]">press@verde-horology.com</p>
          <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)]">+41 22 000 0001</p>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-y border-[rgba(201,168,76,0.1)] py-6 overflow-hidden bg-[#0F2318]">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          {[...PUBS, ...PUBS].map((pub, i) => (
            <span key={i} className="font-serif text-[20px] text-[rgba(201,168,76,0.5)] px-12 shrink-0">{pub}</span>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 font-sans text-[11px] tracking-[0.2em] uppercase transition-all border ${activeFilter === f ? 'bg-[#C9A84C] text-[#0F2318] border-[#C9A84C]' : 'border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Press Grid */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-16">
        {/* Featured */}
        {filtered.length > 0 && (
          <div
            className="relative mb-8 reveal overflow-hidden cursor-pointer group"
            onClick={() => openArticle(filtered[0])}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && openArticle(filtered[0])}
            aria-label={`Read article: ${filtered[0].headline}`}
          >
            <div className="absolute inset-0 z-0">
              <img src="/images/hero-bg.png" alt="" className="w-full h-full object-cover opacity-10" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 bg-[#0F2318]/70" />
            </div>
            <div className="relative z-10 p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C]">{filtered[0].type}</span>
                <span className="font-sans text-[11px] text-[rgba(245,240,232,0.4)]">{filtered[0].date}</span>
              </div>
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[rgba(201,168,76,0.6)] mb-3">{filtered[0].pub}</p>
              <h2 className="font-serif text-[42px] font-light mb-4 group-hover:text-[#C9A84C] transition-colors">{filtered[0].headline}</h2>
              <p className="font-sans text-[15px] italic text-[rgba(245,240,232,0.65)] max-w-2xl">{filtered[0].excerpt}</p>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] mt-6">Read Article →</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-stagger">
          {filtered.slice(1).map((item, i) => (
            <div
              key={i}
              className="reveal border border-[rgba(201,168,76,0.15)] p-8 hover:border-[rgba(201,168,76,0.4)] transition-all group cursor-pointer"
              onClick={() => openArticle(item)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && openArticle(item)}
              aria-label={`Read article: ${item.headline}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[rgba(245,240,232,0.4)] border border-[rgba(245,240,232,0.1)] px-3 py-1">{item.type}</span>
                <span className="font-sans text-[11px] text-[rgba(245,240,232,0.35)]">{item.date}</span>
              </div>
              <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#C9A84C] mb-3">{item.pub}</p>
              <h3 className="font-serif text-[24px] font-light mb-3 group-hover:text-[#C9A84C] transition-colors">{item.headline}</h3>
              <p className="font-sans text-[13px] italic text-[rgba(245,240,232,0.55)]">{item.excerpt}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 border border-[rgba(201,168,76,0.2)] bg-[#0F2318]">
            <p className="font-serif text-[24px] text-[rgba(245,240,232,0.5)]">No articles found for this category.</p>
          </div>
        )}
      </div>

      {/* Awards */}
      <section className="bg-[#0F2318] py-24 border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4 reveal">Recognised Excellence</p>
          <h2 className="font-serif text-[42px] font-light mb-12 reveal">Celebrating Excellence</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 reveal-stagger">
            {AWARDS.map(a => (
              <div key={a.title} className="reveal border border-[rgba(201,168,76,0.15)] p-6 hover:border-[#C9A84C] transition-colors">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-3">{a.year}</p>
                <h3 className="font-serif text-[20px] mb-2">{a.title}</h3>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.5)]">{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit + Media Enquiries */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 reveal-stagger">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="reveal border border-[rgba(201,168,76,0.2)] p-10 bg-[rgba(201,168,76,0.02)]">
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Resources</p>
            <h3 className="font-serif text-[32px] mb-4">Official Press Kit</h3>
            <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] mb-8">Brand guidelines, product imagery at 300dpi, movement photography, and executive biographies.</p>
            <GoldButton onClick={() => toast.info('Press kit download will begin shortly.')}>Download Press Kit</GoldButton>
          </div>
          <div className="reveal border border-[rgba(201,168,76,0.15)] p-10">
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Connect</p>
            <h3 className="font-serif text-[32px] mb-4">Media Enquiries</h3>
            <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] mb-8">For editorial features, interview requests, and product loans.</p>
            <div className="flex flex-col gap-4">
              {kitSent ? (
                <p className="font-sans text-[13px] text-[#C9A84C]">✓ Press kit sent to your email.</p>
              ) : (
                <div className="flex gap-3">
                  <input type="email" value={kitEmail} onChange={e => setKitEmail(e.target.value)} placeholder="your@email.com"
                    className="flex-1 bg-transparent border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[13px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]" />
                  <GhostButton onClick={() => { if (kitEmail) { setKitSent(true); } }}>Send Kit</GhostButton>
                </div>
              )}
              <GhostButton onClick={() => window.open('mailto:press@verde-horology.com')}>Schedule Interview</GhostButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Press;
