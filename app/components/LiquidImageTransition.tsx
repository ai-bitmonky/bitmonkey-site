'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LiquidImageTransitionProps {
  images: string[];
  width?: string | number;
  height?: string | number;
  autoPlay?: boolean;
  interval?: number;
  transitionDuration?: number;
  effect?: 'wave' | 'ripple' | 'blob' | 'liquid' | 'morph' | 'flow' | 'spiral';
  trigger?: 'auto' | 'hover' | 'click';
  className?: string;
  borderRadius?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  alt?: string;
}

export default function LiquidImageTransition({
  images,
  width = '100%',
  height = 300,
  autoPlay = true,
  interval = 4000,
  transitionDuration = 800,
  effect = 'liquid',
  trigger = 'auto',
  className = '',
  borderRadius = '12px',
  objectFit = 'cover',
  alt = 'Image'
}: LiquidImageTransitionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const componentId = React.useId();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !autoPlay || trigger !== 'auto' || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      handleNext();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMounted, autoPlay, trigger, images.length, interval, currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % images.length;

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration / 2);
    }, transitionDuration / 2);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    setTimeout(() => {
      setCurrentIndex(prevIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration / 2);
    }, transitionDuration / 2);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      handleNext();
    }
  };

  const handleHover = () => {
    if (trigger === 'hover') {
      handleNext();
    }
  };

  if (!isMounted || images.length === 0) {
    return (
      <div
        className={`liquid-image-container ${className}`}
        style={{
          width,
          height,
          borderRadius,
          background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const nextImage = images[(currentIndex + 1) % images.length];

  return (
    <div
      ref={containerRef}
      className={`liquid-image-container relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        borderRadius,
        cursor: trigger === 'click' ? 'pointer' : 'default'
      }}
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      {/* Current Image */}
      <div
        className={`absolute inset-0 liquid-image-layer liquid-effect-${effect}`}
        style={{
          zIndex: isTransitioning ? 1 : 2,
          transform: isTransitioning ? 'scale(1.1)' : 'scale(1)',
          opacity: isTransitioning ? 0 : 1,
          transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          filter: isTransitioning ? 'blur(2px)' : 'blur(0px)'
        }}
      >
        <img
          src={currentImage}
          alt={`${alt} ${currentIndex + 1}`}
          className="w-full h-full"
          style={{
            objectFit,
            borderRadius
          }}
        />

        {/* Liquid overlay effect */}
        <div
          className={`absolute inset-0 liquid-overlay liquid-overlay-${effect}`}
          style={{
            background: `radial-gradient(circle at 50% 50%,
              rgba(139, 92, 246, 0.1) 0%,
              rgba(79, 70, 229, 0.05) 30%,
              transparent 60%)`,
            opacity: isTransitioning ? 1 : 0,
            transition: `opacity ${transitionDuration}ms ease-out`,
            borderRadius
          }}
        />
      </div>

      {/* Next Image (transitioning in) */}
      <div
        className={`absolute inset-0 liquid-image-layer liquid-effect-${effect}`}
        style={{
          zIndex: isTransitioning ? 2 : 1,
          transform: isTransitioning ? 'scale(1)' : 'scale(1.1)',
          opacity: isTransitioning ? 1 : 0,
          transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          filter: isTransitioning ? 'blur(0px)' : 'blur(2px)'
        }}
      >
        <img
          src={nextImage}
          alt={`${alt} ${((currentIndex + 1) % images.length) + 1}`}
          className="w-full h-full"
          style={{
            objectFit,
            borderRadius
          }}
        />
      </div>

      {/* Liquid distortion mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='liquid-${componentId}'%3E%3CfeTurbulence baseFrequency='0.3' numOctaves='4' result='noise'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='8'/%3E%3C/filter%3E%3C/svg%3E")`,
          filter: isTransitioning ? `url(#liquid-${componentId})` : 'none',
          opacity: isTransitioning ? 0.6 : 0,
          transition: `opacity ${transitionDuration}ms ease-out`,
          borderRadius
        }}
      />

      {/* Progress indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setTimeout(() => {
                      setIsTransitioning(false);
                    }, transitionDuration / 2);
                  }, transitionDuration / 2);
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows (for manual control) */}
      {images.length > 1 && trigger !== 'auto' && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* SVG Filters for liquid effects */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={`liquid-${componentId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              baseFrequency="0.3"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
            />
          </filter>

          <filter id={`wave-${componentId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              baseFrequency="0.02 0.1"
              numOctaves="2"
              result="wave"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="wave"
              scale="15"
            />
          </filter>

          <filter id={`ripple-${componentId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              baseFrequency="0.5"
              numOctaves="1"
              result="ripple"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="ripple"
              scale="5"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// Preset configurations for common use cases
export const LiquidTransitionPresets = {
  gallery: {
    effect: 'liquid' as const,
    trigger: 'hover' as const,
    transitionDuration: 1000,
    autoPlay: false
  },

  hero: {
    effect: 'wave' as const,
    trigger: 'auto' as const,
    transitionDuration: 1200,
    autoPlay: true,
    interval: 5000
  },

  portfolio: {
    effect: 'morph' as const,
    trigger: 'click' as const,
    transitionDuration: 800,
    autoPlay: false
  },

  background: {
    effect: 'flow' as const,
    trigger: 'auto' as const,
    transitionDuration: 2000,
    autoPlay: true,
    interval: 8000
  }
};

// Quick preset component
interface LiquidPresetProps extends Omit<LiquidImageTransitionProps, 'effect' | 'trigger' | 'transitionDuration' | 'autoPlay' | 'interval'> {
  preset: keyof typeof LiquidTransitionPresets;
}

export function LiquidPreset({ preset, ...props }: LiquidPresetProps) {
  const presetConfig = LiquidTransitionPresets[preset];

  return (
    <LiquidImageTransition
      {...props}
      {...presetConfig}
    />
  );
}