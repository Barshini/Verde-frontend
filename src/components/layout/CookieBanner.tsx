import React, { useState, useEffect } from 'react';
import { GoldButton } from '../common/GoldButton';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('cookiesAccepted')) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    sessionStorage.setItem('cookiesAccepted', '1');
    setVisible(false);
  };

  const handleDecline = () => {
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[5000] bg-[#0F2318] border-t border-[rgba(201,168,76,0.2)] py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
      <p className="font-sans text-[12px] tracking-wide text-[rgba(245,240,232,0.8)] text-center sm:text-left">
        We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
      </p>
      <div className="flex items-center gap-4">
        <button onClick={handleDecline} className="font-sans text-[11px] tracking-[0.1em] text-[rgba(245,240,232,0.6)] hover:text-white transition-colors">
          DECLINE
        </button>
        <GoldButton onClick={handleAccept} className="px-6 py-2">
          Accept
        </GoldButton>
      </div>
    </div>
  );
};
