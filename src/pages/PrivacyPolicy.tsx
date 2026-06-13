import React from 'react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SECTIONS = [
  { title: '1. Data We Collect', body: `We collect information you provide directly to us, including your name, email address, postal address, phone number, and payment information when you make a purchase or create an account. We also collect information about your interactions with our website, including pages visited, timepieces viewed, and search queries. When you contact us through our concierge or boutique teams, records of those communications are maintained.

Device and usage data is collected automatically, including your IP address, browser type, operating system, referring URLs, and cookies. For clients registered in the Circle programme, we maintain a complete record of your purchase history, service appointments, and horological preferences.` },
  { title: '2. How We Use Your Data', body: `Your data is used exclusively to deliver, personalise, and improve your VÉRDE experience. This includes processing and fulfilling your orders, confirming appointments, and sending service reminders. With your consent, we communicate about new collections, limited edition releases, and exclusive events tailored to your demonstrated preferences.

We use anonymised analytics data to improve our website and atelier services. We never sell personal data to third parties. Our marketing communications can be withdrawn at any time by contacting your director or using the unsubscribe link in any email.` },
  { title: '3. Data Storage & Security', body: `All personal data is stored on encrypted servers located in Switzerland, operated under Swiss data protection law (nDSG) and, for European clients, in compliance with GDPR. Our infrastructure employs 256-bit SSL/TLS encryption for all data in transit. Access to personal data is strictly limited to VÉRDE staff whose role requires it.

Data is retained for as long as your account remains active, and for a period of 7 years thereafter to fulfil warranty, tax, and legal obligations. Payment card data is never stored by VÉRDE — all payment processing is handled by PCI DSS-certified processors.` },
  { title: '4. Cookies', body: `Essential cookies are required for the website to function — including session management, shopping cart persistence, and security tokens. These cannot be disabled without affecting site functionality.

Analytics cookies (where consented) help us understand how clients navigate our collection pages and improve the experience. Marketing cookies, used with your explicit consent, allow us to present relevant VÉRDE content on third-party platforms. All non-essential cookies can be declined at the consent banner or adjusted at any time through your browser settings.` },
  { title: '5. Your Rights', body: `Under GDPR (for European clients) and Swiss nDSG, you have the right to access the personal data we hold about you at any time, to request its correction, and to request its deletion subject to legal retention obligations. You may also request a portable copy of your data in a structured machine-readable format.

You have the right to object to processing for marketing purposes at any time, and to lodge a complaint with the relevant supervisory authority. To exercise any of these rights, contact our Data Director using the details below. We will respond within 30 days.` },
  { title: '6. Contact Us', body: `Data Protection Officer\nVÉRDE HOROLOGY SA\nRue de la Paix 14, 1211 Geneva, Switzerland\n\nEmail: data@verde-horology.com\nTelephone: +41 22 000 0099\n\nAll enquiries are acknowledged within 5 business days and resolved within 30 days.` },
];

const PrivacyPolicy: React.FC = () => {
  useScrollReveal();

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-16">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4 reveal">Legal</p>
        <h1 className="font-serif text-[52px] font-light mb-3 reveal">Privacy Policy</h1>
        <p className="font-sans text-[13px] text-[rgba(245,240,232,0.4)] mb-16 reveal">Last updated: January 2025</p>

        <div className="space-y-12 reveal-stagger">
          {SECTIONS.map((sec, i) => (
            <div key={i} className="reveal border-t border-[rgba(201,168,76,0.1)] pt-10">
              <h2 className="font-serif text-[28px] text-[#C9A84C] mb-6">{sec.title}</h2>
              <div className="space-y-4">
                {sec.body.split('\n\n').map((para, j) => (
                  <p key={j} className="font-sans text-[14px] leading-relaxed text-[rgba(245,240,232,0.7)] whitespace-pre-line">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
