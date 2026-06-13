import React from 'react';
import { Package, RefreshCw, Shield, Truck } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SHIPPING_OPTIONS = [
  { service: 'Standard White Glove', price: 'CHF 0', timeline: '14–21 Business Days', detail: 'Complimentary worldwide' },
  { service: 'Express White Glove', price: 'CHF 250', timeline: '1–3 Business Days', detail: 'Priority dispatch from Geneva' },
  { service: 'Same-Day Boutique', price: 'By appointment', timeline: 'Same Day', detail: 'Geneva, Paris, London only' },
];

const RETURN_STEPS = [
  { num: '01', title: 'Contact Your Director', body: 'Reach out by phone or email within 14 days of delivery. Your director will confirm eligibility and initiate the process.' },
  { num: '02', title: 'Receive Prepaid Label', body: 'A pre-paid, fully insured FedEx Priority shipping label is emailed within 4 hours of approval.' },
  { num: '03', title: 'VÉRDE Repackaging', body: 'Our team arranges collection of your timepiece with original packaging materials to ensure safe transit.' },
  { num: '04', title: 'Inspection in Geneva', body: 'Upon receipt in Geneva, our watchmakers conduct a condition inspection within 24 hours.' },
  { num: '05', title: 'Refund or Exchange', body: 'Refunds are processed to the original payment method within 5 business days of inspection completion.' },
];

const ShippingReturns: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shipping & Returns' }]} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 reveal">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Delivery & Returns</p>
        <h1 className="font-serif text-[64px] font-light mb-4">Delivery Without<br /><span className="italic text-[#C9A84C]">Compromise.</span></h1>
        <p className="font-sans text-[16px] text-[rgba(245,240,232,0.65)] max-w-2xl">Every VÉRDE timepiece travels from our Geneva workshops to your wrist with the same care with which it was made.</p>
      </div>

      {/* Shipping Options */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-20">
        <div className="flex items-center gap-4 mb-8 reveal">
          <Truck size={28} className="text-[#C9A84C]" />
          <h2 className="font-serif text-[36px] font-light">Delivery Options</h2>
        </div>
        <div className="border border-[rgba(201,168,76,0.15)] overflow-hidden reveal">
          <div className="grid grid-cols-4 bg-[rgba(201,168,76,0.1)] px-8 py-4">
            {['Service', 'Price', 'Delivery Time', 'Details'].map(h => (
              <p key={h} className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C]">{h}</p>
            ))}
          </div>
          {SHIPPING_OPTIONS.map((row, i) => (
            <div key={i} className={`grid grid-cols-4 px-8 py-6 border-t border-[rgba(201,168,76,0.1)] ${i % 2 === 0 ? '' : 'bg-[rgba(201,168,76,0.02)]'}`}>
              <p className="font-serif text-[18px] text-[#F5F0E8]">{row.service}</p>
              <p className="font-sans text-[14px] text-[#C9A84C]">{row.price}</p>
              <p className="font-sans text-[14px] text-[rgba(245,240,232,0.75)]">{row.timeline}</p>
              <p className="font-sans text-[13px] text-[rgba(245,240,232,0.5)]">{row.detail}</p>
            </div>
          ))}
        </div>

        {/* Packaging */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
          {[
            { icon: <Package size={24} />, title: 'Handcrafted Box', body: 'Solid walnut presentation case with silk lining, hand-stitched to accommodate the timepiece and all accessories.' },
            { icon: <Shield size={24} />, title: 'Insured Transit', body: 'Every shipment is fully insured at retail value. A signature is required upon delivery in all territories.' },
            { icon: <RefreshCw size={24} />, title: 'White Glove Delivery', body: 'Our specialist delivers in person, presents the timepiece, and assists with initial setup and strap fitting.' },
          ].map(card => (
            <div key={card.title} className="reveal border border-[rgba(201,168,76,0.15)] p-8 hover:border-[#C9A84C] transition-colors">
              <div className="text-[#C9A84C] mb-4">{card.icon}</div>
              <h3 className="font-serif text-[22px] mb-3">{card.title}</h3>
              <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.6)]">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Returns Process */}
      <section className="bg-[#0F2318] py-24 border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4 reveal">
            <RefreshCw size={28} className="text-[#C9A84C]" />
            <h2 className="font-serif text-[36px] font-light">The Returns Process</h2>
          </div>
          <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] mb-12 reveal">Returns accepted within 14 days of delivery. Bespoke and limited edition pieces are non-returnable.</p>
          <div className="space-y-6 reveal-stagger">
            {RETURN_STEPS.map(step => (
              <div key={step.num} className="reveal flex gap-8 border-l-2 border-[rgba(201,168,76,0.2)] hover:border-[#C9A84C] pl-8 py-4 transition-colors">
                <p className="font-serif text-[36px] text-[rgba(201,168,76,0.25)] font-bold shrink-0">{step.num}</p>
                <div>
                  <h3 className="font-serif text-[22px] mb-2">{step.title}</h3>
                  <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center py-20 reveal">
        <GoldButton href="/contact">Contact a Director</GoldButton>
      </div>
    </div>
  );
};

export default ShippingReturns;
