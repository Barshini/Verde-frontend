import React from 'react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SECTIONS = [
  { title: '1. Orders', body: `An order placed through verde-horology.com or through a boutique director constitutes an offer to purchase. Your order is accepted and a binding contract formed only upon confirmation by a VÉRDE director, communicated by telephone or email within 2 business hours of placement.

We reserve the right to decline any order, including where items are subject to allocation or where payment authorisation cannot be confirmed. For limited edition and bespoke commissions, orders are accepted subject to availability and the completion of a consultation with your assigned director.` },
  { title: '2. Payment', body: `Prices are displayed in Swiss Francs (CHF) and converted to other currencies at live exchange rates for indication only. The authorised transaction currency is CHF unless otherwise agreed in writing with your director.

We accept Visa, Mastercard, American Express, and international bank transfer. For bespoke commissions, a non-refundable 50% deposit is required to secure your commission slot, with the balance due upon completion. VAT is applied in accordance with Swiss federal law and the applicable laws of the destination country for export orders.` },
  { title: '3. Delivery', body: `Every VÉRDE timepiece is delivered via our White Glove service — a hand-delivery by a trained VÉRDE specialist within 14-21 business days of dispatch from Geneva. For Express White Glove (CHF 250), delivery is within 1-3 business days.

Your timepiece departs Geneva fully insured at its retail value. You will receive a tracking reference and a personal call from your director on the day of dispatch. A signature is required upon delivery. All deliveries are accompanied by the timepiece documentation, authenticity certificate, and warranty card.` },
  { title: '4. Returns', body: `Returns are accepted within 14 calendar days of the confirmed delivery date. To initiate a return, contact your director by telephone or at returns@verde-horology.com. The timepiece must be in its original, unworn condition with all original packaging, documentation, and accessories intact.

Bespoke commissions and limited edition pieces allocated under reservation are non-returnable. Watch straps and accessories are non-returnable once removed from their sealed packaging. Upon receipt and inspection in Geneva, refunds are processed to the original payment method within 5 business days.` },
  { title: '5. Warranty', body: `Every VÉRDE timepiece is covered by a 2-year international warranty against defects in materials and workmanship from the date of delivery. Warranty service is performed exclusively at our Geneva workshops. Proof of purchase is required for all warranty claims.

The warranty covers the movement and its components, the case and its finish, and the dial and applied elements under conditions of normal use. The warranty does not cover leather, rubber, or textile straps; crystal damage from impact; water damage resulting from improper use or crown closure; or damage caused by unauthorised service.` },
  { title: '6. Governing Law', body: `These Terms of Sale are governed by and construed in accordance with Swiss law, without regard to conflict of law principles. Any dispute arising from or in connection with these terms or a purchase from VÉRDE HOROLOGY SA shall be subject to the exclusive jurisdiction of the courts of the Canton of Geneva, Switzerland.

For consumer clients resident in the European Union, mandatory statutory rights under EU consumer law are unaffected by this choice of law and jurisdiction clause.

VÉRDE HOROLOGY SA · Rue de la Paix 14, 1211 Geneva · CHE-123.456.789 MWST` },
];

const TermsOfSale: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Sale' }]} />
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-16">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4 reveal">Legal</p>
        <h1 className="font-serif text-[52px] font-light mb-3 reveal">Terms of Sale</h1>
        <p className="font-sans text-[13px] text-[rgba(245,240,232,0.4)] mb-16 reveal">Effective: January 2025 · VÉRDE HOROLOGY SA, Geneva, Switzerland</p>

        <div className="space-y-12 reveal-stagger">
          {SECTIONS.map((sec, i) => (
            <div key={i} className="reveal border-t border-[rgba(201,168,76,0.1)] pt-10">
              <h2 className="font-serif text-[28px] text-[#C9A84C] mb-6">{sec.title}</h2>
              <div className="space-y-4">
                {sec.body.split('\n\n').map((para, j) => (
                  <p key={j} className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.7)]">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfSale;
