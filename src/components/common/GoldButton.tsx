import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/utils/utils';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export const GoldButton: React.FC<GoldButtonProps> = ({ children, className, href, ...props }) => {
  const baseClasses = "gold-shimmer-btn font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-[#0F2318] px-10 py-4 hover:opacity-90 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";
  
  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(baseClasses, className)} {...props}>
      {children}
    </button>
  );
};
