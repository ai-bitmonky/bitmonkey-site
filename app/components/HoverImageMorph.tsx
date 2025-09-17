'use client';

import React, { useState, useEffect } from 'react';

interface MorphImage {
  id: string;
  src: string;
  alt: string;
  fallbackGradient: string;
}

interface HoverImageMorphProps {
  images: MorphImage[];
  defaultImageId: string;
  activeImageId?: string;
  className?: string;
}

export default function HoverImageMorph({
  images,
  defaultImageId,
  activeImageId: externalActiveImageId,
  className = ''
}: HoverImageMorphProps) {
  const [internalActiveImageId, setInternalActiveImageId] = useState(defaultImageId);
  const [previousImageId, setPreviousImageId] = useState(defaultImageId);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use external activeImageId if provided, otherwise use internal state
  const activeImageId = externalActiveImageId || internalActiveImageId;

  const activeImage = images.find(img => img.id === activeImageId);
  const previousImage = images.find(img => img.id === previousImageId);

  useEffect(() => {
    if (activeImageId !== previousImageId) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setPreviousImageId(activeImageId);
        setIsTransitioning(false);
      }, 500); // Match transition duration

      return () => clearTimeout(timer);
    }
  }, [activeImageId, previousImageId]);

  const handleImageChange = (imageId: string) => {
    if (imageId !== activeImageId && !externalActiveImageId) {
      setInternalActiveImageId(imageId);
    }
  };

  const resetToDefault = () => {
    if (!externalActiveImageId) {
      setInternalActiveImageId(defaultImageId);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Previous Image Layer */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {previousImage && (
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <img
              src={previousImage.src}
              alt={previousImage.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              className={`w-full h-full ${previousImage.fallbackGradient} items-center justify-center text-white text-xl font-semibold hidden`}
              style={{ display: 'none' }}
            >
              {previousImage.alt}
            </div>
          </div>
        )}
      </div>

      {/* Current Image Layer */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
          isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      >
        {activeImage && (
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              className={`w-full h-full ${activeImage.fallbackGradient} items-center justify-center text-white text-xl font-semibold hidden`}
              style={{ display: 'none' }}
            >
              {activeImage.alt}
            </div>
          </div>
        )}
      </div>

      {/* Morphing overlay effects */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
        isTransitioning
          ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20'
          : 'bg-transparent'
      }`} />

      {/* Ripple effect for transitions */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
        isTransitioning
          ? 'bg-gradient-radial from-white/10 via-transparent to-transparent animate-pulse'
          : 'bg-transparent'
      }`} />
    </div>
  );
}