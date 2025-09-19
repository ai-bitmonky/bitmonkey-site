'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParallaxLayer {
  id: string;
  speed: number; // 0 to 1, where 0 is static and 1 moves with scroll
  zIndex: number;
  opacity?: number;
  blur?: number;
  scale?: number;
  children: React.ReactNode;
}

interface ParallaxDepthLayersProps {
  layers: ParallaxLayer[];
  height?: string;
  className?: string;
  trigger?: 'viewport' | 'container';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export default function ParallaxDepthLayers({
  layers,
  height = '100vh',
  className = '',
  trigger = 'viewport',
  intensity = 'medium'
}: ParallaxDepthLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const intensityMultiplier = {
    subtle: 0.3,
    medium: 0.6,
    strong: 1.0
  };

  const multiplier = intensityMultiplier[intensity];

  useEffect(() => {
    const handleScroll = () => {
      if (trigger === 'viewport') {
        setScrollY(window.scrollY);
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerTop = rect.top + window.scrollY;
        const scrollPosition = window.scrollY - containerTop;
        setScrollY(scrollPosition);
      }
    };

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          handleScroll();
        }
      },
      { threshold: 0.1, rootMargin: '10% 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScrollEvent = () => {
      if (isInView) {
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      observer.disconnect();
    };
  }, [trigger, isInView]);

  const getLayerTransform = (layer: ParallaxLayer) => {
    if (!isInView) return 'translate3d(0, 0, 0)';

    const movement = scrollY * layer.speed * multiplier;
    const scaleValue = layer.scale || 1;

    return `translate3d(0, ${-movement}px, 0) scale(${scaleValue})`;
  };

  const getLayerStyle = (layer: ParallaxLayer) => ({
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: layer.zIndex,
    opacity: layer.opacity || 1,
    filter: layer.blur ? `blur(${layer.blur}px)` : 'none',
    transform: getLayerTransform(layer),
    willChange: 'transform',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {layers.map((layer) => (
        <div
          key={layer.id}
          style={getLayerStyle(layer)}
          className="parallax-layer"
        >
          {layer.children}
        </div>
      ))}

      <style jsx>{`
        .parallax-layer {
          transform-style: preserve-3d;
        }

        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          .parallax-layer {
            transform: none !important;
          }
        }

        /* GPU acceleration hint */
        .parallax-layer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          background: transparent;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}

// Service to Portfolio Transition Component
interface ServicePortfolioTransitionProps {
  className?: string;
}

export function ServicePortfolioTransition({ className = '' }: ServicePortfolioTransitionProps) {
  const layers: ParallaxLayer[] = [
    // Background layer - Slow moving digital landscape
    {
      id: 'background-landscape',
      speed: 0.1,
      zIndex: 1,
      opacity: 0.3,
      blur: 1,
      children: (
        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 60%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
            `
          }} />
          {/* Digital grid pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      )
    },
    // Mid layer - Service icons floating
    {
      id: 'service-icons',
      speed: 0.3,
      zIndex: 2,
      opacity: 0.7,
      children: (
        <div className="w-full h-full relative">
          {/* Consulting Icon */}
          <div className="absolute top-20 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          {/* Development Icon */}
          <div className="absolute top-40 right-1/4 w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-400/30">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>

          {/* AI/ML Icon */}
          <div className="absolute bottom-32 left-1/3 w-18 h-18 bg-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/30">
            <div className="w-9 h-9 bg-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>
      )
    },
    // Fast layer - Results and transformation arrows
    {
      id: 'transformation-flow',
      speed: 0.6,
      zIndex: 3,
      opacity: 0.8,
      children: (
        <div className="w-full h-full relative">
          {/* Transformation Arrow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-2">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-60"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-cyan-500 rotate-45 translate-x-2"></div>
            </div>
          </div>

          {/* Problem to Solution Labels */}
          <div className="absolute top-1/3 left-8 text-blue-600 font-semibold text-lg opacity-80">
            Business Challenges
          </div>
          <div className="absolute top-1/3 right-8 text-cyan-600 font-semibold text-lg opacity-80">
            Digital Solutions
          </div>

          {/* Success Metrics */}
          <div className="absolute bottom-20 left-1/4 bg-green-500/20 backdrop-blur-sm rounded-lg p-3 border border-green-400/30">
            <div className="text-green-600 font-bold text-2xl">98%</div>
            <div className="text-green-700 text-xs">Success Rate</div>
          </div>

          <div className="absolute bottom-20 right-1/4 bg-blue-500/20 backdrop-blur-sm rounded-lg p-3 border border-blue-400/30">
            <div className="text-blue-600 font-bold text-2xl">50+</div>
            <div className="text-blue-700 text-xs">Projects</div>
          </div>
        </div>
      )
    },
    // Foreground layer - Call to action
    {
      id: 'cta-foreground',
      speed: 0.8,
      zIndex: 4,
      children: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">From Vision to Reality</h3>
            <p className="text-gray-700 mb-6">We transform your business challenges into innovative digital solutions through strategic consulting and expert development.</p>
            <div className="flex gap-4 justify-center">
              <span className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">Consult</span>
              <span className="text-xl text-gray-400">→</span>
              <span className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium">Develop</span>
              <span className="text-xl text-gray-400">→</span>
              <span className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium">Succeed</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <ParallaxDepthLayers
      layers={layers}
      height="120vh"
      intensity="medium"
      trigger="viewport"
      className={`bg-gradient-to-b from-gray-50 to-white ${className}`}
    />
  );
}