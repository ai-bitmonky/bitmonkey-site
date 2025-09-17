'use client';

import { useEffect, useRef } from 'react';

export default function CursorEffects() {
  const trailRef = useRef<HTMLDivElement>(null);
  const magneticElementsRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    // Cursor trail effect
    const handleMouseMove = (e: MouseEvent) => {
      if (trailRef.current) {
        trailRef.current.style.left = e.clientX - 10 + 'px';
        trailRef.current.style.top = e.clientY - 10 + 'px';
      }

      // Update CSS custom properties for content glow effect
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    };

    // Magnetic pull effect for buttons
    const handleMagneticEffect = (e: MouseEvent) => {
      if (!magneticElementsRef.current) return;

      magneticElementsRef.current.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Only apply effect if cursor is within 100px of the element
        if (distance < 100) {
          const strength = (100 - distance) / 100;
          const moveX = (deltaX * strength) * 0.1;
          const moveY = (deltaY * strength) * 0.1;

          (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.05})`;
        } else {
          (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
        }
      });
    };

    // Initialize magnetic elements
    magneticElementsRef.current = document.querySelectorAll('.magnetic-pull');

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleMagneticEffect);

    // Hide cursor trail on mouse leave
    const handleMouseLeave = () => {
      if (trailRef.current) {
        trailRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (trailRef.current) {
        trailRef.current.style.opacity = '1';
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleMagneticEffect);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Cursor Trail */}
      <div
        ref={trailRef}
        className="cursor-trail"
        style={{ opacity: 0 }}
      />
    </>
  );
}