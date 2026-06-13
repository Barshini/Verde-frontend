import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Mail, MapPin } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { GhostButton } from '@/components/common/GhostButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SEOHead } from '@/components/common/SEOHead';

const CATEGORIES = ['All', 'Orders', 'Shipping', 'Returns', 'Authentication', 'Bespoke', 'Servicing', 'Account', 'Payment'];

const FAQS = [
  { category: 'Orders', q: 'How do I place a concierge reservation?', a: 'You may place an order through our website, by contacting your boutique director, or via our concierge line at +41 22 000 0000. Each order is confirmed with a personal call from your assigned director within 2 business hours.' },
  { category: 'Orders', q: 'Can I modify my order after placement?', a: 'Order modifications can be requested within 24 hours of placement. Contact your assigned director directly by phone or email. For bespoke commissions, the modification window depends on the production stage.' },
  { category: 'Shipping', q: 'What is White Glove Delivery?', a: 'Every VÉRDE timepiece is hand-delivered by a trained VÉRDE specialist. Your watch arrives in a hand-stitched travel case, accompanied by authentication documentation and a personal letter from our Maison Director.' },
  { category: 'Shipping', q: 'Do you ship internationally?', a: 'We deliver to over 140 countries. All export documentation is prepared by our logistics team. International clients may be subject to import duties, which are charged separately and are the responsibility of the recipient.' },
  { category: 'Returns', q: 'What is your returns policy?', a: 'Returns are accepted within 14 calendar days of delivery, provided the timepiece is in its original unworn condition with all documentation intact. Bespoke commissions and limited editions are non-returnable. Contact your director to initiate a return.' },
  { category: 'Authentication', q: 'What are the Geneva Seal standards?', a: 'Every VÉRDE calibre is independently tested and exceeds Geneva Seal requirements, as well as COSC chronometer standards. Each movement is accompanied by a personalised chronometric test certificate.' },
  { category: 'Bespoke', q: 'How does the bespoke commission process work?', a: 'A bespoke commission is a six-stage journey lasting 12-18 months, beginning with a private consultation in Geneva. You will be guided by a dedicated creation director throughout movement selection, case design, dial artistry, strap selection, and personal engraving.' },
  { category: 'Servicing', q: 'How often should I service my VÉRDE?', a: 'We recommend a full workshop service every 3 to 5 years for mechanical movements, or every 5 years for our quartz-assisted calibres. Our Geneva workshops can service every VÉRDE calibre ever produced, with a turnaround of 4 to 8 weeks.' },
  { category: 'Account', q: 'What is the Circle membership?', a: 'The Circle is our complimentary membership programme offering early access to limited editions, exclusive atelier event invitations, a dedicated horological director, and lifetime digital service reminders — all for every registered VÉRDE client.' },
  { category: 'Payment', q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), international bank transfer, and our exclusive instalment programme. For bespoke commissions, a 50% deposit secures your creation. Prices are listed in CHF and converted at live rates.' },
  { category: 'Orders', q: 'Can I purchase as a gift?', a: 'Absolutely. Each order includes complimentary gift packaging — a handcrafted wooden presentation case with silk lining. Add a personalised note at checkout, and we can arrange direct delivery to the recipient with a discreet sender\'s address.' },
  { category: 'Servicing', q: 'What does a VÉRDE service include?', a: 'A full service includes complete movement disassembly, ultrasonic cleaning of all components, replacement of worn parts, lubrication, regulation, case and bracelet polishing, water resistance testing, and chronometric certification.' },
];

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  useScrollReveal();

  const filtered = FAQS.filter(f => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <SEOHead
        title="Frequently Asked Questions | VÉRDE Horology"
        description="Answers about ordering, shipping, authentication, bespoke commissions, servicing intervals, warranty, and the VÉRDE Circle membership programme."
        url="/faq"
      />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      </div>

      {/* Hero */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 reveal">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Client Services</p>
        <h1 className="font-serif text-[56px] font-light mb-4">Every Question Deserves<br />A Considered Answer.</h1>
        <div className="relative mt-8 max-w-lg">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] px-6 py-4 font-sans text-[14px] text-[#F5F0E8] placeholder-[rgba(245,240,232,0.3)] focus:outline-none focus:border-[#C9A84C] transition-colors"
            data-testid="faq-search"
          />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24 flex gap-16">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 shrink-0 sticky top-28 self-start">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">Categories</p>
          <nav className="space-y-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`block w-full text-left px-3 py-2 font-sans text-[12px] tracking-[0.1em] transition-all ${activeCategory === cat ? 'text-[#C9A84C] border-l border-[#C9A84C] pl-4' : 'text-[rgba(245,240,232,0.5)] hover:text-[#F5F0E8]'}`}
                data-testid={`faq-cat-${cat}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Category pills mobile */}
          <div className="flex flex-wrap gap-2 mb-8 lg:hidden">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-sans text-[10px] tracking-[0.2em] uppercase transition-all border ${activeCategory === cat ? 'bg-[#C9A84C] text-[#0F2318] border-[#C9A84C]' : 'border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-serif text-[28px] text-[rgba(245,240,232,0.4)]">No questions found.</p>
              <p className="font-sans text-[14px] text-[rgba(245,240,232,0.4)] mt-4">Try a different search term or browse all categories.</p>
            </div>
          ) : (
            <div className="space-y-2 reveal-stagger">
              {filtered.map((faq, i) => (
                <div
                  key={i}
                  className="reveal border-l-2 border-[rgba(201,168,76,0.2)] hover:border-[#C9A84C] transition-all"
                >
                  <button
                    onClick={() => setOpenItem(openItem === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    data-testid={`faq-item-${i}`}
                  >
                    <div>
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-1">{faq.category}</span>
                      <span className="font-serif text-[20px] font-light text-[#F5F0E8]">{faq.q}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-[#C9A84C] shrink-0 ml-4 transition-transform duration-300 ${openItem === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openItem === i && (
                    <div className="px-6 pb-6">
                      <p className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.75)] border-t border-[rgba(201,168,76,0.1)] pt-5">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-[#0F2318] py-24 border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 reveal">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4 text-center">Still curious?</p>
          <h2 className="font-serif text-[42px] font-light text-center mb-12">Unanswered Curiosities?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[rgba(201,168,76,0.2)] p-8 text-center hover:border-[#C9A84C] transition-colors group">
              <MessageCircle className="text-[#C9A84C] mx-auto mb-4" size={32} />
              <h3 className="font-serif text-[22px] mb-2">Concierge Chat</h3>
              <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] mb-6">Real-time assistance from Marie, your personal director</p>
              <GhostButton onClick={() => { const btn = document.querySelector<HTMLButtonElement>('[data-testid="concierge-open"]'); btn?.click(); }}>Start Chat</GhostButton>
            </div>
            <div className="border border-[rgba(201,168,76,0.2)] p-8 text-center hover:border-[#C9A84C] transition-colors">
              <Mail className="text-[#C9A84C] mx-auto mb-4" size={32} />
              <h3 className="font-serif text-[22px] mb-2">Email a Director</h3>
              <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] mb-6">Responses within 4 business hours, personally</p>
              <GhostButton href="/contact">Write to Us</GhostButton>
            </div>
            <div className="border border-[rgba(201,168,76,0.2)] p-8 text-center hover:border-[#C9A84C] transition-colors">
              <MapPin className="text-[#C9A84C] mx-auto mb-4" size={32} />
              <h3 className="font-serif text-[22px] mb-2">Find a Boutique</h3>
              <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] mb-6">Visit us in Geneva, Paris, London or Tokyo</p>
              <GhostButton href="/boutiques">Our Locations</GhostButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
