import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { GhostButton } from '@/components/common/GhostButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SEOHead } from '@/components/common/SEOHead';

const BOUTIQUES_LIST = ['Geneva (HQ)', 'Paris', 'London', 'Milan', 'New York', 'Dubai', 'Tokyo', 'Singapore'];
const ENQUIRY_TYPES = ['General', 'Bespoke', 'Service', 'Press', 'Other'];
const CONTACT_METHODS = ['Email', 'Phone', 'WhatsApp'];
const DIRECTORS = [
  { name: 'Pierre Laurent', title: 'Maison Director', boutique: 'Geneva (HQ)', phone: '+41 22 000 1234', image: '/images/director-pierre.png' },
  { name: 'Sophie Renard', title: 'Collections Director', boutique: 'Paris', phone: '+33 1 00 00 00 01', image: '/images/director-sophie.png' },
  { name: 'James Whitmore', title: 'Atelier Director', boutique: 'London', phone: '+44 20 0000 0001', image: '/images/director-james.png' },
  { name: 'Yuki Tanaka', title: 'Asia Director', boutique: 'Tokyo', phone: '+81 3 0000 0001', image: '/images/director-yuki.png' },
];

const Contact: React.FC = () => {
  const [enquiryType, setEnquiryType] = useState('General');
  const [contactMethod, setContactMethod] = useState('Email');
  const [charCount, setCharCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', boutique: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});
  useScrollReveal();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!emailRegex.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Please enter a message of at least 10 characters.';
    return e;
  };

  const handleBlur = (field: string) => setFormTouched(p => ({ ...p, [field]: true }));

  const inputBorderClass = (field: string) =>
    `w-full bg-transparent border px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none transition-colors ${formErrors[field] && formTouched[field] ? 'border-red-400' : 'border-[rgba(201,168,76,0.3)] focus:border-[#C9A84C]'}`;

  const FieldError = ({ field }: { field: string }) =>
    formErrors[field] && formTouched[field] ? (
      <p className="font-sans text-[11px] text-red-400 mt-1.5" role="alert">{formErrors[field]}</p>
    ) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm();
    setFormErrors(errs);
    setFormTouched({ firstName: true, lastName: true, email: true, message: true });
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <SEOHead
        title="Contact | VÉRDE Horology"
        description="Speak with a director. Visit a boutique. Request a Bespoke consultation. We are available across eight boutiques and by appointment in Geneva."
        url="/contact"
      />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      </div>

      {/* Hero */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 reveal">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">Get In Touch</p>
        <h1 className="font-serif text-[64px] font-light mb-4">Every Conversation<br />Begins With a Single Question.</h1>
        <p className="font-sans text-[15px] text-[rgba(245,240,232,0.6)]">Our directors respond within 4 business hours.</p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-20 reveal-stagger">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Mail size={24} />, title: 'Email', detail: 'director@verde-horology.com', action: () => window.open('mailto:director@verde-horology.com'), cta: 'Send Email' },
            { icon: <Phone size={24} />, title: 'Telephone', detail: '+41 22 000 0000\nMon–Sat, 09:00–19:00 CET', action: () => {}, cta: 'Call Now' },
            { icon: <MessageCircle size={24} />, title: 'Concierge', detail: 'Real-time assistance\nfrom your personal director', action: () => { const btn = document.querySelector<HTMLButtonElement>('[data-testid="concierge-open"]'); btn?.click(); }, cta: 'Start Chat' },
          ].map(card => (
            <div key={card.title} className="reveal border border-[rgba(201,168,76,0.2)] p-8 hover:border-[#C9A84C] transition-colors group">
              <div className="text-[#C9A84C] mb-6">{card.icon}</div>
              <h3 className="font-serif text-[24px] mb-3">{card.title}</h3>
              <p className="font-sans text-[13px] text-[rgba(245,240,232,0.6)] mb-6 whitespace-pre-line">{card.detail}</p>
              <button onClick={card.action} className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] flex items-center gap-2 hover:gap-3 transition-all" data-testid={`contact-${card.title.toLowerCase()}`}>
                {card.cta} <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form + Quote */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-20">
          {/* Form */}
          <div className="reveal">
            <h2 className="font-serif text-[36px] font-light mb-10">Write to a Director</h2>
            {submitted ? (
              <div className="border border-[#C9A84C] p-12 text-center">
                <div className="w-12 h-12 rounded-full border border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#C9A84C] text-[20px]">✓</span>
                </div>
                <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Message Received</p>
                <h3 className="font-serif text-[32px] mb-4">Your enquiry is in our hands.</h3>
                <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)]">Your director will respond within 4 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ct-fname" className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">First Name</label>
                    <input id="ct-fname" type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} onBlur={() => handleBlur('firstName')}
                      className={inputBorderClass('firstName')} autoComplete="given-name" aria-invalid={!!formErrors.firstName && !!formTouched.firstName} data-testid="contact-firstname" />
                    <FieldError field="firstName" />
                  </div>
                  <div>
                    <label htmlFor="ct-lname" className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Last Name</label>
                    <input id="ct-lname" type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} onBlur={() => handleBlur('lastName')}
                      className={inputBorderClass('lastName')} autoComplete="family-name" aria-invalid={!!formErrors.lastName && !!formTouched.lastName} data-testid="contact-lastname" />
                    <FieldError field="lastName" />
                  </div>
                </div>
                <div>
                  <label htmlFor="ct-email" className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Email Address</label>
                  <input id="ct-email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} onBlur={() => handleBlur('email')}
                    className={inputBorderClass('email')} autoComplete="email" aria-invalid={!!formErrors.email && !!formTouched.email} data-testid="contact-email" />
                  <FieldError field="email" />
                </div>
                <div>
                  <label htmlFor="ct-phone" className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Phone (Optional)</label>
                  <input id="ct-phone" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors"
                    autoComplete="tel" data-testid="contact-phone" />
                </div>
                <div>
                  <label htmlFor="ct-boutique" className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Preferred Boutique</label>
                  <select id="ct-boutique" value={form.boutique} onChange={e => setForm({...form, boutique: e.target.value})}
                    className="w-full bg-[#1B3A2D] border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors"
                    data-testid="contact-boutique">
                    <option value="">Select a boutique</option>
                    {BOUTIQUES_LIST.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-3">Enquiry Type</label>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Enquiry type">
                    {ENQUIRY_TYPES.map(t => (
                      <button type="button" key={t} onClick={() => setEnquiryType(t)}
                        aria-pressed={enquiryType === t}
                        className={`px-4 py-2 font-sans text-[11px] tracking-[0.2em] uppercase transition-all border ${enquiryType === t ? 'bg-[#C9A84C] text-[#0F2318] border-[#C9A84C]' : 'border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]'}`}
                        data-testid={`contact-enquiry-${t.toLowerCase()}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-3">Preferred Contact Method</label>
                  <div className="flex gap-2" role="group" aria-label="Contact method">
                    {CONTACT_METHODS.map(m => (
                      <button type="button" key={m} onClick={() => setContactMethod(m)}
                        aria-pressed={contactMethod === m}
                        className={`px-4 py-2 font-sans text-[11px] tracking-[0.2em] uppercase transition-all border ${contactMethod === m ? 'bg-[#C9A84C] text-[#0F2318] border-[#C9A84C]' : 'border-[rgba(201,168,76,0.3)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)]'}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="ct-message" className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Your Message</label>
                  <textarea id="ct-message" rows={5} maxLength={400} value={form.message}
                    onChange={e => { setForm({...form, message: e.target.value}); setCharCount(e.target.value.length); }}
                    onBlur={() => handleBlur('message')}
                    aria-invalid={!!formErrors.message && !!formTouched.message}
                    className={`${inputBorderClass('message')} resize-none`}
                    data-testid="contact-message" />
                  <div className="flex justify-between items-center mt-1">
                    <FieldError field="message" />
                    <p className="font-sans text-[11px] text-[rgba(245,240,232,0.4)] ml-auto">{charCount}/400</p>
                  </div>
                </div>
                <GoldButton type="submit" data-testid="contact-submit">Send Enquiry</GoldButton>
              </form>
            )}
          </div>

          {/* Quote */}
          <div className="reveal flex flex-col justify-start">
            <div className="flex items-center justify-center w-24 h-24 border border-[#C9A84C] mb-10">
              <span className="font-serif text-[48px] text-[#C9A84C]">V</span>
            </div>
            <blockquote className="font-serif text-[24px] italic text-[rgba(245,240,232,0.75)] leading-relaxed mb-4">
              "We have never believed in transactions. Only in relationships."
            </blockquote>
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C]">— Marie Rousseau, Client Director</p>
          </div>
        </div>
      </div>

      {/* Directors */}
      <section className="bg-[#0F2318] py-24 border-t border-[rgba(201,168,76,0.1)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4 reveal">Our People</p>
          <h2 className="font-serif text-[42px] font-light mb-12 reveal">Our Boutique Directors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-stagger">
            {DIRECTORS.map(d => (
              <div key={d.name} className="reveal text-center group">
                <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-[#1B3A2D]">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/boutique-interior.png'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2318]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="font-serif text-[20px] mb-1 text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors duration-300">{d.name}</p>
                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#C9A84C] mb-1">{d.title}</p>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.4)]">{d.boutique}</p>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.4)]">{d.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
