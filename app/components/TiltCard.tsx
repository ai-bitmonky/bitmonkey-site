'use client';

import React, { useRef, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  shine?: boolean;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  intensity = 'medium',
  shine = true,
  glare = true
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Tilt intensity settings
    const maxTilt = {
      subtle: 5,
      medium: 10,
      strong: 15
    }[intensity];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation angles
      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      // Apply 3D transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glare position and opacity
      if (glare && glareRef.current) {
        const glareOpacity = Math.min(0.4, Math.abs(mouseX + mouseY) / 300);
        const glareX = (mouseX / rect.width) * 100 + 50;
        const glareY = (mouseY / rect.height) * 100 + 50;

        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareOpacity}) 0%, transparent 50%)`;
        glareRef.current.style.opacity = '1';
      }

      // Update shine position
      if (shine && shineRef.current) {
        const shineX = ((mouseX + rect.width / 2) / rect.width) * 100;

        shineRef.current.style.background = `linear-gradient(135deg,
          transparent 40%,
          rgba(255, 255, 255, 0.1) ${Math.max(0, shineX - 10)}%,
          rgba(255, 255, 255, 0.3) ${shineX}%,
          rgba(255, 255, 255, 0.1) ${Math.min(100, shineX + 10)}%,
          transparent 60%)`;
      }
    };

    const handleMouseLeave = () => {
      // Reset transformations with smooth transition
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

      // Hide glare
      if (glareRef.current) {
        glareRef.current.style.opacity = '0';
      }

      // Reset shine
      if (shineRef.current) {
        shineRef.current.style.background = 'transparent';
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, shine, glare]);

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-200 ease-out transform-gpu ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Glare effect */}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-200 rounded-xl opacity-0"
          style={{
            mixBlendMode: 'overlay',
            zIndex: 5
          }}
        />
      )}

      {/* Shine effect */}
      {shine && (
        <div
          ref={shineRef}
          className="absolute inset-0 pointer-events-none transition-all duration-200 rounded-xl"
          style={{
            zIndex: 4
          }}
        />
      )}
    </div>
  );
}