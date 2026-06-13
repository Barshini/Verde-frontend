import React, { useState } from 'react';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { GoldButton } from '@/components/common/GoldButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const OrderTracking: React.FC = () => {
  const [ref, setRef] = useState('VH-2025-0001');
  const [tracked, setTracked] = useState(true);
  useScrollReveal();

  const today = new Date();
  const delivery14 = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CH', { day: 'numeric', month: 'long', year: 'numeric' });
  const delivery21 = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CH', { day: 'numeric', month: 'long', year: 'numeric' });

  const STAGES = [
    { label: 'Order Received', done: true },
    { label: 'In Assembly', active: true },
    { label: 'Quality Control', done: false },
    { label: 'En Route', done: false },
    { label: 'Delivered', done: false },
  ];

  return (
    <div className="bg-[#1B3A2D] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Order Tracking' }]} />
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-20">
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-4 reveal">Client Services</p>
        <h1 className="font-serif text-[56px] font-light mb-4 reveal">Track Your Timepiece.</h1>
        <p className="font-sans text-[15px] text-[rgba(245,240,232,0.6)] mb-12 reveal">Where is your masterpiece in its journey to you?</p>

        <div className="flex gap-4 mb-16 reveal">
          <input
            type="text"
            value={ref}
            onChange={e => setRef(e.target.value)}
            placeholder="VH-XXXXXX"
            className="flex-1 bg-transparent border border-[rgba(201,168,76,0.3)] px-6 py-4 font-sans text-[15px] text-[#F5F0E8] placeholder-[rgba(245,240,232,0.3)] focus:outline-none focus:border-[#C9A84C] font-mono tracking-wider"
            data-testid="tracking-input"
          />
          <GoldButton onClick={() => setTracked(true)} data-testid="tracking-submit">Track Order</GoldButton>
        </div>

        {tracked && (
          <div className="reveal space-y-12">
            {/* Watch card */}
            <div className="flex gap-8 border border-[rgba(201,168,76,0.2)] p-8 bg-[rgba(201,168,76,0.02)]">
              <img src="/images/watch1.png" alt="Forêt Perpetuelle" className="w-24 h-24 object-cover grayscale" />
              <div className="flex-1">
                <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-1">Reference {ref}</p>
                <h2 className="font-serif text-[28px] mb-1">Forêt Perpetuelle</h2>
                <p className="font-sans text-[13px] text-[rgba(245,240,232,0.5)]">Masterpiece Collection · V.24-001</p>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.4)] mt-2">Ordered: {new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CH', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="text-right">
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">Expected Delivery</p>
                <p className="font-sans text-[13px] text-[#F5F0E8]">{delivery14}</p>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.4)]">to {delivery21}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="border border-[rgba(201,168,76,0.15)] p-8">
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C9A84C] mb-8">Journey Status</p>
              {/* Progress bar */}
              <div className="relative mb-12">
                <div className="absolute top-4 left-0 right-0 h-[1px] bg-[rgba(245,240,232,0.1)]" />
                <div className="absolute top-4 left-0 h-[1px] bg-[#C9A84C] transition-all duration-1000" style={{ width: '40%' }} />
                <div className="flex justify-between relative">
                  {STAGES.map((s, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] z-10 ${s.done ? 'bg-[#C9A84C] text-[#0F2318]' : s.active ? 'border-2 border-[#C9A84C] text-[#C9A84C] bg-[#1B3A2D]' : 'border border-[rgba(245,240,232,0.2)] text-[rgba(245,240,232,0.3)] bg-[#1B3A2D]'}`}>
                        {s.done ? '✓' : i + 1}
                      </div>
                      <p className={`font-sans text-[10px] tracking-[0.1em] uppercase mt-3 text-center max-w-[80px] ${s.done || s.active ? 'text-[#C9A84C]' : 'text-[rgba(245,240,232,0.3)]'}`}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-[#C9A84C] pl-6">
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1">Current Status</p>
                <p className="font-serif text-[20px]">Your timepiece is being assembled by hand in our Geneva workshops.</p>
                <p className="font-sans text-[12px] text-[rgba(245,240,232,0.5)] mt-2">Your dedicated director will contact you when it enters quality control.</p>
              </div>
            </div>

            <div className="text-center">
              <a href="/contact" className="font-sans text-[12px] tracking-[0.2em] uppercase text-[#C9A84C] underline underline-offset-4 hover:opacity-70 transition-opacity">
                Contact Your Director
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
