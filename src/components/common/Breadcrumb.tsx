import React from 'react';
import { Link } from 'wouter';
import { cn } from '@/utils/utils';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn("flex items-center space-x-2 text-[11px] font-sans tracking-[0.2em] uppercase text-[rgba(245,240,232,0.6)]", className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href} className="hover:text-[#C9A84C] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#F5F0E8]">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="text-[#C9A84C]" aria-hidden="true">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
