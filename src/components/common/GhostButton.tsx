import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/utils/utils';

interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export const GhostButton: React.FC<GhostButtonProps> = ({ children, className, href, ...props }) => {
  const baseClasses = "font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-[#C9A84C] border border-[#C9A84C] px-10 py-4 hover:bg-[rgba(201,168,76,0.1)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center bg-transparent";
  
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
