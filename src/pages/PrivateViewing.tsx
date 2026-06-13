import React, { useState } from 'react';
import { Wine, Lock, Eye, User } from 'lucide-react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { toast } from 'sonner';

const BENEFITS = [
  { icon: <Lock size={24} />, title: 'Exclusive Atelier Access', body: 'Step behind the glass and observe master watchmakers at their benches in our Geneva headquarters.' },
  { icon: <Wine size={24} />, title: 'Complimentary Champagne', body: 'Each viewing begins with a welcome tasting of a cuvée selected by our Maison Director.' },
  { icon: <Eye size={24} />, title: 'Private Collector Vault', body: 'Access our archive of extraordinary historic and one-of-a-kind VÉRDE pieces, unavailable anywhere else.' },
  { icon: <User size={24} />, title: 'Director Consultation', body: 'A one-to-one session with your personal horological director — with no pressure, only conversation.' },
];

const BOUTIQUES_LIST = ['Geneva (HQ)', 'Paris', 'London', 'Milan', 'New York', 'Dubai', 'Tokyo', 'Singapore'];
const today = new Date().toISOString().split('T')[0];

const PrivateViewing: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', boutique: '', date: '', time: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your viewing has been requested. Your director will confirm within 24 hours.');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Private Viewing' }]} />
      </div>

      {/* Hero */}
      <div className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/boutique-interior.png" alt="Boutique" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2318]/90 to-[#1B3A2D]/50" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 reveal">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4">By Appointment Only</p>
          <h1 className="font-serif text-[64px] font-light">An Experience Worthy<br /><span className="italic text-[#C9A84C]">of the Timepiece.</span></h1>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal-stagger">
          {BENEFITS.map(b => (
            <div key={b.title} className="reveal border border-[rgba(201,168,76,0.2)] p-8 hover:border-[#C9A84C] transition-colors">
              <div className="text-[#C9A84C] mb-4">{b.icon}</div>
              <h3 className="font-serif text-[20px] mb-3">{b.title}</h3>
              <p className="font-sans text-[13px] leading-relaxed text-[rgba(245,240,232,0.6)]">{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-[800px] mx-auto px-6 py-12 pb-24 reveal">
        <div className="border border-[rgba(201,168,76,0.2)] p-12">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-3">Request Your Experience</p>
          <h2 className="font-serif text-[40px] font-light mb-10">Reserve a Private Viewing</h2>

          {submitted ? (
            <div className="text-center py-12 border border-[#C9A84C]">
              <div className="w-14 h-14 rounded-full border border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
                <span className="text-[#C9A84C] text-[24px]">✓</span>
              </div>
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-3">Request Received</p>
              <p className="font-serif text-[28px] mb-3">Your director will be in touch.</p>
              <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)]">Expect confirmation within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Full Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                    data-testid="viewing-name" />
                </div>
                <div>
                  <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Email Address</label>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                    data-testid="viewing-email" />
                </div>
              </div>
              <div>
                <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Preferred Boutique</label>
                <select required value={form.boutique} onChange={e => setForm({...form, boutique: e.target.value})}
                  className="w-full bg-[#1B3A2D] border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                  data-testid="viewing-boutique">
                  <option value="">Select a boutique</option>
                  {BOUTIQUES_LIST.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Preferred Date</label>
                  <input type="date" required min={today} value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                    className="w-full bg-[#1B3A2D] border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                    data-testid="viewing-date" />
                </div>
                <div>
                  <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Preferred Time</label>
                  <select required value={form.time} onChange={e => setForm({...form, time: e.target.value})}
                    className="w-full bg-[#1B3A2D] border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[14px] text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                    data-testid="viewing-time">
                    <option value="">Select a time</option>
                    <option value="morning">Morning (10:00 – 13:00)</option>
                    <option value="afternoon">Afternoon (14:00 – 17:00)</option>
                    <option value="evening">Evening (18:00 – 20:00)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] block mb-2">Message (Optional)</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="Tell us what you'd like to see or discuss..."
                  className="w-full bg-transparent border border-[rgba(201,168,76,0.3)] px-4 py-3 font-sans text-[14px] text-[#F5F0E8] placeholder-[rgba(245,240,232,0.3)] focus:outline-none focus:border-[#C9A84C] resize-none"
                  data-testid="viewing-message" />
              </div>
              <GoldButton type="submit" data-testid="viewing-submit">Request Private Viewing</GoldButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateViewing;
