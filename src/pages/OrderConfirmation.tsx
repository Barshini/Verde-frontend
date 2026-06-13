import React from 'react';
import { Check } from 'lucide-react';
import { GoldButton } from '../components/common/GoldButton';
import { GhostButton } from '../components/common/GhostButton';

const OrderConfirmation: React.FC = () => {
  const orderNumber = `VH-2025-${Math.floor(Math.random()*9000)+1000}`;
  
  return (
    <div className="w-full min-h-screen bg-[#0F2318] flex flex-col items-center pt-32 pb-24 relative overflow-hidden">
      
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#C9A84C] to-transparent"></div>

      <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 reveal">
        <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C9A84C] mb-8 block">ORDER CONFIRMED</span>
        <h1 className="font-serif text-[56px] md:text-[72px] font-light leading-tight text-[#F5F0E8] mb-8">
          Your Timepiece Is <br/><span className="text-[#C9A84C] italic">Being Prepared.</span>
        </h1>
        <p className="font-sans text-[14px] text-[rgba(245,240,232,0.6)] mb-16 max-w-2xl mx-auto">
          A confirmation has been sent to your email. Your personal director will contact you within the next two hours to personally verify the details of your commission.
        </p>

        {/* Order Details Card */}
        <div className="bg-[#1B3A2D] border border-[rgba(201,168,76,0.3)] p-8 md:p-12 text-left mb-16 relative">
          <div className="flex flex-col md:flex-row justify-between border-b border-[rgba(201,168,76,0.2)] pb-8 mb-8">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.5)] mb-2">Order Reference</p>
              <p className="font-serif text-[24px] text-[#C9A84C]">{orderNumber}</p>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <p className="font-sans text-[10px] uppercase tracking-widest text-[rgba(245,240,232,0.5)] mb-2">Expected Delivery</p>
              <p className="font-serif text-[20px] text-[#F5F0E8]">14-21 Business Days</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#0F2318] p-2 border border-[rgba(201,168,76,0.2)]">
              <img src="/images/watch1.png" alt="Watch" className="w-full h-full object-cover grayscale" />
            </div>
            <div>
              <h3 className="font-serif text-[24px] text-[#F5F0E8]">Forêt Perpetuelle</h3>
              <p className="font-sans text-[12px] text-[rgba(245,240,232,0.6)] tracking-wide">Masterpiece Collection</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24 relative pt-12">
          {/* Progress Bar Background */}
          <div className="absolute top-16 left-[10%] right-[10%] h-[2px] bg-[#1B3A2D] -z-10"></div>
          {/* Progress Bar Active */}
          <div className="absolute top-16 left-[10%] w-[20%] h-[2px] bg-[#C9A84C] -z-10 transition-all duration-1000"></div>

          <div className="flex justify-between">
            {[
              { label: 'Order Received', active: true },
              { label: 'In Assembly', active: true },
              { label: 'Quality Control', active: false },
              { label: 'En Route', active: false },
              { label: 'Delivered', active: false }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ${
                  step.active ? 'bg-[#C9A84C] text-[#0F2318]' : 'bg-[#1B3A2D] border border-[rgba(245,240,232,0.2)] text-[rgba(245,240,232,0.2)]'
                }`}>
                  {step.active && <Check size={16} strokeWidth={3} />}
                </div>
                <span className={`font-sans text-[8px] md:text-[10px] uppercase tracking-widest text-center w-16 md:w-auto ${
                  step.active ? 'text-[#F5F0E8]' : 'text-[rgba(245,240,232,0.4)]'
                }`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {['White Glove', 'Insured', 'Signature Required', 'Complimentary Packaging'].map((f, i) => (
            <div key={i} className="border border-[rgba(201,168,76,0.1)] p-4 text-center">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#C9A84C]">{f}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <GoldButton href="/dashboard">View in Dashboard</GoldButton>
          <GhostButton href="/collections">Continue Shopping</GhostButton>
        </div>
        
        <div className="mt-12">
          <a href="/contact" className="font-sans text-[11px] tracking-[0.1em] text-[rgba(245,240,232,0.5)] hover:text-[#C9A84C] underline decoration-[rgba(201,168,76,0.3)] underline-offset-4 transition-colors">
            Contact Your Director
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
