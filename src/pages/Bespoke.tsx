import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Hand, Clock, Hash, Wrench, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';
import { SEOHead } from '../components/common/SEOHead';
import { useGlobalState } from '../context/GlobalStateContext';
import { formatPrice } from '../services/data';

const BASE_PRICE = 45000;

const MOVEMENT_OPTIONS = [
  { name: 'Manual Wind', price: 0, desc: 'The purest expression. Wind it yourself — a daily ritual.' },
  { name: 'Automatic', price: 5000, desc: 'Self-winding through natural motion. The quiet constant.' },
  { name: 'Tourbillon', price: 35000, desc: 'The pinnacle of regulation. Three months to assemble.' },
];

const CASE_OPTIONS = [
  { name: 'Rose Gold', price: 0, desc: '18k. Warm, distinctive, entirely itself.' },
  { name: 'White Gold', price: 8000, desc: '18k. Cooler. More architectural. Harder to ignore.' },
  { name: 'Platinum', price: 12000, desc: 'The rarest. The heaviest. The most resistant. Used once before.' },
  { name: 'Titanium', price: 3000, desc: 'Grade 5 aerospace alloy. Lighter than any gold. Stronger than most.' },
];

const DIAL_OPTIONS = [
  { name: 'Grand Feu Enamel', price: 0, desc: 'Fired six times at 840°C. Impossible to rush. Impossible to replicate.' },
  { name: 'Aventurine', price: 4000, desc: 'Natural quartz with suspended copper particles. No two are identical.' },
  { name: 'Meteorite', price: 8000, desc: '4.5 billion years old. Sliced to 0.4mm. Etched with acid to reveal the universe.' },
  { name: 'Carbon Fibre', price: 2000, desc: 'Contemporary, structural, unambiguous. The material of aircraft and Formula One.' },
];

const STRAP_OPTIONS = [
  { name: 'Alligator', price: 0, desc: 'Hand-stitched in Geneva. Tan or midnight — your choice at order.' },
  { name: 'Calfskin', price: 500, desc: 'Supple from the first wearing. Ages without losing its form.' },
  { name: 'Rubber', price: 300, desc: 'Medical-grade. Vulcanised. Suited for any environment.' },
  { name: 'Steel Bracelet', price: 2500, desc: 'Brushed flanks, polished edges. Integrated to the case.' },
];

const Bespoke: React.FC = () => {
  const { addToCart, user, currency, currencyRates } = useGlobalState();
  const [, setLocation] = useLocation();

  const [options, setOptions] = useState({
    movement: { name: 'Manual Wind', price: 0 },
    case: { name: 'Rose Gold', price: 0 },
    dial: { name: 'Grand Feu Enamel', price: 0 },
    strap: { name: 'Alligator', price: 0 },
    engraving: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', vision: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const livePrice = BASE_PRICE + options.movement.price + options.case.price + options.dial.price + options.strap.price;

  const updateOption = (category: 'movement' | 'case' | 'dial' | 'strap', name: string, price: number) => {
    setOptions(prev => ({ ...prev, [category]: { name, price } }));
  };

  const handleAddToCart = () => {
    addToCart({
      id: 'bespoke-' + Date.now(),
      name: 'Bespoke Commission',
      collection: 'Custom',
      price: livePrice,
      image: '/images/watch6.png',
      strap: options.strap.name,
      size: 'Custom',
    });
    toast.success('Bespoke commission added to your cart.');
  };

  const handleSaveConfig = () => {
    if (!user.isLoggedIn) { setLocation('/login'); return; }
    toast.success('Configuration saved to your profile.');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'A valid email address is required.';
    if (!formData.vision.trim() || formData.vision.trim().length < 20) errors.vision = 'Please describe your vision in at least a few words.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    toast.success('Your consultation request has been received. A director will contact you within 48 hours.');
    setFormData({ firstName: '', lastName: '', email: '', vision: '' });
    setFormErrors({});
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b px-1 py-3 font-sans text-[13px] text-[#F5F0E8] focus:outline-none transition-colors placeholder:text-[rgba(245,240,232,0.3)] ${formErrors[field] ? 'border-red-400' : 'border-[rgba(201,168,76,0.3)] focus:border-[#C9A84C]'}`;

  return (
    <div className="w-full bg-[#1B3A2D]">
      <SEOHead
        title="Bespoke Commission | VÉRDE Horology"
        description="Commission a watch made for no one else. A VÉRDE Bespoke is a twelve to eighteen month collaboration between you and our Geneva atelier — one object, one owner."
        url="/bespoke"
      />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden border-b border-[rgba(201,168,76,0.1)]" aria-labelledby="bespoke-hero-title">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img src="/images/watch6.png" alt="" loading="eager" className="w-full h-full object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D] via-[#1B3A2D]/70 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 reveal mt-20 max-w-3xl mx-auto">
          <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-[#C9A84C] mb-6 block">
            The VÉRDE Bespoke Atelier
          </span>
          <h1 id="bespoke-hero-title" className="font-serif text-[44px] sm:text-[64px] md:text-[76px] font-light leading-tight mb-6 text-[#F5F0E8]">
            A Watch Made <br />
            <span className="italic text-[#C9A84C]">For No One Else.</span>
          </h1>
          <p className="font-sans text-[13px] text-[rgba(245,240,232,0.55)] leading-relaxed mb-10 max-w-lg mx-auto">
            There is no reference number. No production run. No second example. Only a conversation, a collaboration, and a single object that will exist for as long as you choose to care for it.
          </p>
          <GoldButton onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}>
            Begin the Commission
          </GoldButton>
        </div>
        <ChevronDown size={24} className="absolute bottom-8 text-[#C9A84C] animate-bounce" aria-hidden="true" />
      </section>

      {/* Pillars */}
      <section className="py-14 bg-[#0F2318] border-b border-[rgba(201,168,76,0.1)]" aria-label="Bespoke service pillars">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Hand size={22} aria-hidden="true" />, title: 'Entirely by Hand', desc: 'Twelve specialists. One object.' },
            { icon: <Clock size={22} aria-hidden="true" />, title: '12–18 Months', desc: 'From first meeting to delivery.' },
            { icon: <Hash size={22} aria-hidden="true" />, title: 'Unique Reference', desc: 'Your name inside the caseback.' },
            { icon: <Wrench size={22} aria-hidden="true" />, title: 'Lifetime Servicing', desc: 'We keep every schematic, forever.' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3 text-[#C9A84C]">
              {item.icon}
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#F5F0E8]">{item.title}</span>
              <span className="font-sans text-[11px] text-[rgba(245,240,232,0.4)] leading-relaxed">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The Commission Process */}
      <section className="py-20 sm:py-28 bg-[#1B3A2D]" aria-labelledby="process-title">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4 block">How It Works</span>
            <h2 id="process-title" className="font-serif text-[32px] sm:text-[38px]">The Commission Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 reveal">
            {[
              { step: '01', title: 'The First Conversation', desc: 'You meet — by appointment, in person or by private video — with the Bespoke Director. Not a sales conversation. A listening session. We want to understand what you are trying to hold in your hand.' },
              { step: '02', title: 'The Design Phase', desc: 'Our atelier produces three distinct proposals based on that conversation. You choose one, modify it, reject all three and start again. This phase continues until what is on paper is precisely what you mean.' },
              { step: '03', title: 'The Making', desc: 'The watch enters production with a named master watchmaker assigned for its duration. You receive updates — photographs, video, access to the atelier if you wish. When it is done, it is brought to you personally.' },
            ].map(phase => (
              <div key={phase.step} className="border-t border-[rgba(201,168,76,0.2)] pt-8">
                <div className="font-serif text-[44px] text-[#C9A84C] opacity-20 mb-2 leading-none">{phase.step}</div>
                <h3 className="font-serif text-[24px] text-[#F5F0E8] mb-4">{phase.title}</h3>
                <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.65)]">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section id="configurator" className="py-16 sm:py-24 bg-[#0F2318] border-y border-[rgba(201,168,76,0.1)]" aria-labelledby="configurator-title">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4 block">
              The Configurator
            </span>
            <h2 id="configurator-title" className="font-serif text-[30px] sm:text-[38px]">Design Your Commission</h2>
            <p className="font-sans text-[13px] text-[rgba(245,240,232,0.45)] mt-3 max-w-md mx-auto">
              Not a product selector — a conversation starter. Your selections form the basis of our first proposal.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-10 xl:gap-16">
            {/* Sticky Summary */}
            <div className="w-full xl:w-[35%] order-2 xl:order-1">
              <div className="xl:sticky xl:top-[100px] bg-[#1B3A2D] border border-[rgba(201,168,76,0.2)] p-6 sm:p-8">
                <div className="aspect-square bg-[#0F2318] mb-7 overflow-hidden border border-[rgba(201,168,76,0.1)]">
                  <img src="/images/watch1.png" alt="Commission preview" loading="lazy" className="w-full h-full object-cover grayscale mix-blend-screen opacity-75" />
                </div>

                <h3 className="font-serif text-[20px] text-[#C9A84C] mb-5 border-b border-[rgba(201,168,76,0.15)] pb-4">
                  Your Commission
                </h3>

                <dl className="space-y-3 mb-7 font-sans text-[11px] tracking-wide text-[rgba(245,240,232,0.7)]">
                  {[
                    ['Movement', options.movement.name],
                    ['Case', options.case.name],
                    ['Dial', options.dial.name],
                    ['Strap', options.strap.name],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <dt className="text-[#C9A84C] uppercase tracking-[0.15em] text-[9px]">{label}</dt>
                      <dd>{val}</dd>
                    </div>
                  ))}
                  {options.engraving && (
                    <div className="flex justify-between pt-2 border-t border-[rgba(201,168,76,0.1)]">
                      <dt className="text-[#C9A84C] uppercase tracking-[0.15em] text-[9px]">Engraving</dt>
                      <dd className="font-serif italic text-[14px] text-[#F5F0E8]">{options.engraving}</dd>
                    </div>
                  )}
                </dl>

                <div className="font-serif text-[36px] sm:text-[42px] text-[#C9A84C] mb-7 leading-none" aria-label={`Total price: ${formatPrice(livePrice, currency, currencyRates[currency])}`}>
                  {formatPrice(livePrice, currency, currencyRates[currency])}
                </div>

                <div className="flex flex-col gap-3">
                  <GoldButton onClick={handleAddToCart} className="w-full">Add to Cart</GoldButton>
                  <GhostButton onClick={handleSaveConfig} className="w-full">Save Configuration</GhostButton>
                </div>
                <p className="font-sans text-[10px] text-[rgba(245,240,232,0.35)] text-center mt-4 leading-relaxed">
                  Indicative pricing. Final commission cost confirmed at consultation.
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="w-full xl:w-[65%] space-y-14 order-1 xl:order-2">
              {([
                { key: 'movement', label: '01. Movement', options: MOVEMENT_OPTIONS },
                { key: 'case', label: '02. Case Material', options: CASE_OPTIONS },
                { key: 'dial', label: '03. Dial', options: DIAL_OPTIONS },
                { key: 'strap', label: '04. Strap', options: STRAP_OPTIONS },
              ] as const).map(section => (
                <div key={section.key} className="reveal border-t border-[rgba(201,168,76,0.15)] pt-10">
                  <h3 className="font-serif text-[24px] sm:text-[28px] mb-7 text-[#F5F0E8]">{section.label}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.options.map(opt => {
                      const isSelected = options[section.key].name === opt.name;
                      return (
                        <button
                          key={opt.name}
                          onClick={() => updateOption(section.key, opt.name, opt.price)}
                          aria-pressed={isSelected}
                          className={`text-left p-5 border transition-all duration-200 ${
                            isSelected
                              ? 'bg-[rgba(201,168,76,0.1)] border-[#C9A84C]'
                              : 'border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,0.5)] bg-[rgba(15,35,24,0.3)]'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#F5F0E8]">{opt.name}</span>
                            {opt.price > 0 && (
                              <span className="font-sans text-[10px] text-[#C9A84C] ml-2 flex-shrink-0">
                                +{formatPrice(opt.price, currency, currencyRates[currency])}
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-[11px] text-[rgba(245,240,232,0.45)] leading-relaxed">{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Engraving */}
              <div className="reveal border-y border-[rgba(201,168,76,0.15)] py-10">
                <h3 className="font-serif text-[24px] sm:text-[28px] mb-3 text-[#F5F0E8]">05. Personal Engraving</h3>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.45)] mb-6 leading-relaxed">
                  Applied to the inner caseback by hand. Maximum 40 characters. Coordinates, a date, initials, a line that matters.
                </p>
                <label htmlFor="engraving-input" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.4)] mb-3 block">
                  Engraving Text
                </label>
                <input
                  id="engraving-input"
                  type="text"
                  maxLength={40}
                  placeholder="Your text here"
                  value={options.engraving}
                  onChange={e => setOptions(prev => ({ ...prev, engraving: e.target.value }))}
                  className="w-full bg-[#0F2318] border border-[rgba(201,168,76,0.25)] px-5 py-4 font-sans text-[13px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] transition-colors mb-4"
                  aria-describedby="engraving-preview"
                />
                <p id="engraving-preview" className="font-sans text-[11px] text-[rgba(245,240,232,0.4)]">
                  Preview:{' '}
                  <span className="font-serif italic text-[18px] text-[#C9A84C] ml-2">
                    {options.engraving || 'Your text here'}
                  </span>
                  <span className="ml-3 text-[10px] text-[rgba(245,240,232,0.3)]">
                    {40 - options.engraving.length} characters remaining
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-20 sm:py-28 bg-[#1B3A2D]" aria-labelledby="consultation-title">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-14 reveal">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-4 block">
              Private Consultation
            </span>
            <h2 id="consultation-title" className="font-serif text-[32px] sm:text-[38px] mb-4 text-[#F5F0E8]">
              Speak with a Director
            </h2>
            <p className="font-sans text-[13px] text-[rgba(245,240,232,0.5)] leading-relaxed max-w-md mx-auto">
              Some commissions require more than a configurator. Speak directly with a Bespoke Director to discuss materials, complications, or ideas that have no name yet.
            </p>
          </div>

          <form onSubmit={handleConsultation} noValidate className="space-y-7 reveal bg-[#0F2318] p-8 sm:p-12 border border-[rgba(201,168,76,0.15)]">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="flex-1">
                <label htmlFor="firstName" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.4)] mb-2 block">
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Antoine"
                  value={formData.firstName}
                  onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                  className={inputClass('firstName')}
                  aria-invalid={!!formErrors.firstName}
                  aria-describedby={formErrors.firstName ? 'err-firstName' : undefined}
                />
                {formErrors.firstName && <p id="err-firstName" className="font-sans text-[11px] text-red-400 mt-2">{formErrors.firstName}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.4)] mb-2 block">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Verde"
                  value={formData.lastName}
                  onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                  className={inputClass('lastName')}
                  aria-invalid={!!formErrors.lastName}
                  aria-describedby={formErrors.lastName ? 'err-lastName' : undefined}
                />
                {formErrors.lastName && <p id="err-lastName" className="font-sans text-[11px] text-red-400 mt-2">{formErrors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="consultEmail" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.4)] mb-2 block">
                Email Address *
              </label>
              <input
                id="consultEmail"
                type="email"
                autoComplete="email"
                placeholder="your@address.com"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className={inputClass('email')}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? 'err-email' : undefined}
              />
              {formErrors.email && <p id="err-email" className="font-sans text-[11px] text-red-400 mt-2">{formErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="vision" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[rgba(245,240,232,0.4)] mb-2 block">
                Describe Your Vision *
              </label>
              <textarea
                id="vision"
                placeholder="Tell us what you are trying to hold in your hand. There are no wrong answers here."
                value={formData.vision}
                onChange={e => setFormData(p => ({ ...p, vision: e.target.value }))}
                className={`${inputClass('vision')} h-32 resize-none border`}
                aria-invalid={!!formErrors.vision}
                aria-describedby={formErrors.vision ? 'err-vision' : undefined}
              />
              {formErrors.vision && <p id="err-vision" className="font-sans text-[11px] text-red-400 mt-2">{formErrors.vision}</p>}
            </div>

            <div className="text-center pt-4">
              <GoldButton type="submit" disabled={isSubmitting} className="min-w-[200px]">
                {isSubmitting ? 'Sending…' : 'Request Consultation'}
              </GoldButton>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Bespoke;
