'use client';

import React from 'react';
import TiltCard from './TiltCard';

interface BentoItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  gradient: string;
  onClick?: () => void;
  size: 'sm' | 'md' | 'lg' | 'xl';
  featured?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

export default function BentoGrid({ items, className = '' }: BentoGridProps) {
  const getSizeClasses = (size: string) => {
    const baseClasses = "hologram-card iridescent flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:bg-purple-50 cursor-pointer group magnetic-pull hover-highlight gradient-border gradient-border-hover";

    switch (size) {
      case 'xl':
        return `${baseClasses} md:col-span-2 md:row-span-2 flex-col justify-center text-center p-6`;
      case 'lg':
        return `${baseClasses} md:col-span-2 p-5`;
      case 'md':
        return `${baseClasses} md:row-span-1`;
      case 'sm':
      default:
        return baseClasses;
    }
  };

  const getIconSize = (size: string) => {
    switch (size) {
      case 'xl':
        return 'w-16 h-16';
      case 'lg':
        return 'w-12 h-12';
      case 'md':
        return 'w-10 h-10';
      case 'sm':
      default:
        return 'w-8 h-8';
    }
  };

  const getTextSize = (size: string) => {
    switch (size) {
      case 'xl':
        return { title: 'text-lg font-bold', subtitle: 'text-sm' };
      case 'lg':
        return { title: 'text-base font-semibold', subtitle: 'text-sm' };
      case 'md':
        return { title: 'text-sm font-semibold', subtitle: 'text-xs' };
      case 'sm':
      default:
        return { title: 'text-xs font-semibold', subtitle: 'text-xs' };
    }
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-fr ${className}`}>
      {items.map((item) => {
        const sizeClasses = getSizeClasses(item.size);
        const iconSize = getIconSize(item.size);
        const textClasses = getTextSize(item.size);

        return (
          <TiltCard
            key={item.id}
            intensity="subtle"
            className="h-full"
          >
            <button
              onClick={item.onClick}
              className={sizeClasses}
            >
              <div className={`${item.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${iconSize}`}>
                {item.icon}
              </div>
              <div className={item.size === 'xl' ? 'mt-4 text-center' : 'text-left'}>
                <h5 className={`text-gray-900 underline-reveal-text ${textClasses.title}`}>{item.title}</h5>
                {item.subtitle && (
                  <p className={`text-gray-500 ${textClasses.subtitle}`}>{item.subtitle}</p>
                )}
              </div>
            </button>
          </TiltCard>
        );
      })}
    </div>
  );
}