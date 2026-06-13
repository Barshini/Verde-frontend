import React from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ConciergeChat } from './ConciergeChat';
import { CookieBanner } from './CookieBanner';
import { BackToTop } from './BackToTop';
import { ScrollToTop } from './ScrollToTop';
import { GrainOverlay } from '../common/GrainOverlay';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useScrollReveal();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#1B3A2D] text-[#F5F0E8] overflow-x-hidden selection:bg-[#C9A84C] selection:text-[#0F2318]">
      <ScrollToTop />
      <GrainOverlay />
      <Navigation />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <ConciergeChat />
      <CookieBanner />
      <BackToTop />
    </div>
  );
};
