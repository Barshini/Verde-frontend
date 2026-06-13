import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { GoldButton } from '../common/GoldButton';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [, navigate] = useLocation();

  // Bug #3 fix: redirect to register page with email prefilled instead of just showing toast
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    navigate(`/register?email=${encodeURIComponent(email)}`);
  };

  return (
    <footer className="bg-[#0F2318] border-t border-[rgba(201,168,76,0.1)] text-[#F5F0E8] pt-24 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center mb-24 reveal">
          <h3 className="font-serif text-[36px] text-[#C9A84C] mb-4">Join the Circle</h3>
          <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] mb-8">
            Receive private invitations, early allocations, and news from our Geneva atelier.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-transparent border-b border-[rgba(201,168,76,0.3)] px-4 py-3 text-center sm:text-left focus:outline-none focus:border-[#C9A84C] transition-colors w-full sm:w-80 font-sans text-[13px]"
            />
            <GoldButton type="submit">Join</GoldButton>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24 reveal-stagger">
          <div className="lg:col-span-2 reveal">
            <Link href="/" className="inline-flex flex-col mb-6">
              <span className="font-serif text-[32px] text-[#C9A84C] tracking-wide">VÉRDE</span>
              <span className="font-sans text-[11px] tracking-[0.4em] text-[rgba(245,240,232,0.6)]">HOROLOGY</span>
            </Link>
            <p className="font-serif italic text-[18px] text-[rgba(245,240,232,0.7)] mb-8">
              The pinnacle of Geneva horology.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Youtube', 'Twitter'].map(social => (
                <a
                  key={social}
                  href="#"
                  aria-label={`${social} (coming soon)`}
                  onClick={e => e.preventDefault()}
                  className="font-sans text-[10px] tracking-widest uppercase text-[#C9A84C] hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="reveal">
            <h4 className="font-sans text-[11px] tracking-[0.2em] text-[#C9A84C] uppercase mb-6">Collections</h4>
            <ul className="space-y-4">
              {[
                { label: 'All Timepieces', href: '/collections' },
                { label: 'Limited Editions', href: '/limited-editions' },
                { label: 'Bespoke Studio', href: '/bespoke' },
                { label: '360° Viewer', href: '/360-view' }
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] hover:text-[#C9A84C] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h4 className="font-sans text-[11px] tracking-[0.2em] text-[#C9A84C] uppercase mb-6">Maison</h4>
            <ul className="space-y-4">
              {[
                { label: 'Heritage', href: '/heritage' },
                { label: 'Craftsmanship', href: '/craftsmanship' },
                { label: 'Press & Media', href: '/press' },
                { label: 'Contact', href: '/contact' },
                { label: 'About Us', href: '/about' },
                { label: 'Sustainability', href: '/sustainability' }
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] hover:text-[#C9A84C] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h4 className="font-sans text-[11px] tracking-[0.2em] text-[#C9A84C] uppercase mb-6">Client Services</h4>
            <ul className="space-y-4">
              {[
                { label: 'FAQ', href: '/faq' },
                { label: 'Boutiques', href: '/boutiques' },
                { label: 'My Dashboard', href: '/dashboard' },
                { label: 'Order Tracking', href: '/order-tracking' },
                { label: 'Care Guide', href: '/care-guide' },
                { label: 'Private Viewing', href: '/private-viewing' }
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] hover:text-[#C9A84C] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(201,168,76,0.1)] flex flex-col md:flex-row justify-between items-center gap-4 reveal">
          <p className="font-sans text-[11px] tracking-wide text-[rgba(245,240,232,0.4)]">
            © 2025 VÉRDE HOROLOGY SA, Geneva
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="font-sans text-[11px] tracking-wide text-[rgba(245,240,232,0.4)] hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-sale" className="font-sans text-[11px] tracking-wide text-[rgba(245,240,232,0.4)] hover:text-[#C9A84C] transition-colors">Terms of Sale</Link>
            <Link href="/shipping-returns" className="font-sans text-[11px] tracking-wide text-[rgba(245,240,232,0.4)] hover:text-[#C9A84C] transition-colors">Shipping & Returns</Link>
          </div>
        </div>

      </div>

      {/* Decorative Monogram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-serif font-light text-[#C9A84C] opacity-[0.02] pointer-events-none select-none">
        V
      </div>
    </footer>
  );
};
