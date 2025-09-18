'use client';

import React, { useRef, useEffect, ReactNode } from 'react';

interface MagneticEffectProps {
  children: ReactNode;
  strength?: number;
  range?: number;
  className?: string;
  disabled?: boolean;
}

export default function MagneticEffect({
  children,
  strength = 0.3,
  range = 100,
  className = '',
  disabled = false
}: MagneticEffectProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (disabled) return;

    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < range) {
          const factor = (range - distance) / range;
          const translateX = distanceX * strength * factor;
          const translateY = distanceY * strength * factor;

          element.style.transform = `translate(${translateX}px, ${translateY}px)`;
          element.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
          element.style.transform = 'translate(0px, 0px)';
          element.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
      });
    };

    const handleMouseLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      element.style.transform = 'translate(0px, 0px)';
      element.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [strength, range, disabled]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}