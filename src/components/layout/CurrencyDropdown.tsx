import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useGlobalState, Currency } from '@/context/GlobalStateContext';

const currencies: Currency[] = ['CHF', 'USD', 'GBP', 'EUR', 'AED', 'JPY'];

export const CurrencyDropdown: React.FC = () => {
  const { currency, setCurrency } = useGlobalState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group" onMouseLeave={() => setIsOpen(false)}>
      <button 
        className="flex items-center gap-1 font-sans text-[11px] tracking-[0.15em] text-[#F5F0E8] hover:text-[#C9A84C] transition-colors py-2"
        onMouseEnter={() => setIsOpen(true)}
      >
        {currency}
        <ChevronDown size={12} className="opacity-50" />
      </button>

      <div className={`absolute top-full right-0 w-24 bg-[#0F2318] border border-[rgba(201,168,76,0.2)] shadow-xl transition-all duration-300 origin-top-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {currencies.map(c => (
          <button
            key={c}
            onClick={() => { setCurrency(c); setIsOpen(false); }}
            className={`w-full text-left px-4 py-2 font-sans text-[11px] tracking-widest hover:bg-[rgba(201,168,76,0.1)] transition-colors ${currency === c ? 'text-[#C9A84C]' : 'text-[#F5F0E8]'}`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};
