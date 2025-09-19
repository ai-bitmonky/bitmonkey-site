'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, TrendingUp, Clock, Target, Rocket, Settings,
  CheckCircle, ArrowDown, Building, BarChart3,
  Activity, Star, Hexagon, Triangle, Circle, Square, Diamond
} from 'lucide-react';

interface ParallaxLayer {
  id: string;
  speed: number;
  zIndex: number;
  opacity?: number;
  blur?: number;
  scale?: number;
  children: React.ReactNode;
}

interface Driver {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  position: number; // 0-100 percentage along the journey
  items: string[];
  category: 'agility' | 'investment' | 'speed';
}

interface DriversOfDigitalTransformationProps {
  className?: string;
}

export default function DriversOfDigitalTransformation({ className = '' }: DriversOfDigitalTransformationProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDriver, setActiveDriver] = useState(0);
  const [driversParticles, setDriversParticles] = useState<Array<{x: number, y: number, delay: number, size: number, type: string}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const drivers: Driver[] = [
    // Improve Business Agility
    {
      id: 'business-agility',
      title: 'Improve Business agility',
      subtitle: 'Market Responsiveness',
      description: 'Enable rapid adaptation to market changes through streamlined processes',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      position: 25,
      items: [
        'Quickly adapt to market changes',
        'Streamline decision-making processes thru Governance',
        'Agile product development and deployment'
      ],
      category: 'agility'
    },
    // Improve Return on Investments
    {
      id: 'return-investment',
      title: 'Improve return on investments',
      subtitle: 'Investment Optimization',
      description: 'Maximize ROI through strategic technology investments and automation',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      position: 50,
      items: [
        'Invest in scalable IT solutions',
        'Prioritize high-value tech projects',
        'Automate to boost efficiency and profits'
      ],
      category: 'investment'
    },
    // Faster Time to Market
    {
      id: 'time-to-market',
      title: 'Faster Time to Market',
      subtitle: 'Speed & Efficiency',
      description: 'Accelerate product delivery through agile methodologies and automation',
      icon: Rocket,
      color: 'from-purple-500 to-indigo-500',
      position: 75,
      items: [
        'Use agile methods for faster iterations',
        'Automate testing and deployment to minimize delays'
      ],
      category: 'speed'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress through the container
        const progress = Math.max(0, Math.min(1,
          (viewportHeight - rect.top) / (containerHeight + viewportHeight)
        ));

        setScrollProgress(progress);

        // Update active driver based on scroll progress
        const currentDriver = Math.floor(progress * drivers.length);
        setActiveDriver(Math.min(currentDriver, drivers.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Generate journey particles
    const particles = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      size: 1 + Math.random() * 4,
      type: ['agility', 'investment', 'speed'][Math.floor(Math.random() * 3)]
    }));
    setDriversParticles(particles);
  }, []);

  const parallaxLayers: ParallaxLayer[] = [
    // Enhanced background with animated gradients
    {
      id: 'background-landscape',
      speed: 0.1,
      zIndex: 1,
      opacity: 0.6,
      blur: 0.5,
      children: (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '4s' }} />
            <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/40 to-emerald-500/40 rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-500/35 to-indigo-500/35 rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '6s', animationDelay: '2s' }} />
          </div>

          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'backgroundShift 20s ease-in-out infinite'
            }} />
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 animate-bounce" style={{ animationDuration: '3s' }}>
            <Hexagon className="w-8 h-8 text-blue-400/40 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="absolute top-40 right-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <Triangle className="w-6 h-6 text-green-400/40 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="absolute bottom-32 left-16 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}>
            <Diamond className="w-7 h-7 text-purple-400/40 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div className="absolute bottom-20 right-32 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
            <Square className="w-5 h-5 text-cyan-400/40 animate-spin" style={{ animationDuration: '7s' }} />
          </div>
        </div>
      )
    },
    // Enhanced particle system
    {
      id: 'drivers-elements',
      speed: 0.3,
      zIndex: 2,
      opacity: 0.9,
      children: (
        <div className="w-full h-full relative">
          {/* Enhanced particle system */}
          {driversParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
              }}
            >
              {/* Particle with glow effect */}
              <div className="relative">
                <div
                  className={`rounded-full animate-ping ${
                    particle.type === 'agility' ? 'bg-blue-400 shadow-lg shadow-blue-400/50' :
                    particle.type === 'investment' ? 'bg-green-400 shadow-lg shadow-green-400/50' :
                    'bg-purple-400 shadow-lg shadow-purple-400/50'
                  }`}
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
                {/* Secondary glow ring */}
                <div
                  className={`absolute inset-0 rounded-full animate-pulse ${
                    particle.type === 'agility' ? 'bg-blue-300/20 ring-2 ring-blue-400/30' :
                    particle.type === 'investment' ? 'bg-green-300/20 ring-2 ring-green-400/30' :
                    'bg-purple-300/20 ring-2 ring-purple-400/30'
                  }`}
                  style={{
                    animationDuration: `${2 + Math.random() * 3}s`,
                    animationDelay: `${Math.random()}s`
                  }}
                />
              </div>
            </div>
          ))}

          {/* Enhanced floating driver icons */}
          <div className={`absolute top-32 left-1/4 transition-all duration-1000 ${
            scrollProgress > 0.2 ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
          }`}>
            <div className="relative">
              <Zap className="w-12 h-12 text-blue-400 animate-pulse drop-shadow-lg" />
              <div className="absolute inset-0 animate-ping">
                <Zap className="w-12 h-12 text-blue-300/40" />
              </div>
              <div className="absolute -inset-2 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          <div className={`absolute top-1/2 right-1/4 transition-all duration-1000 ${
            scrollProgress > 0.5 ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
          }`}>
            <div className="relative">
              <TrendingUp className="w-14 h-14 text-green-400 animate-bounce drop-shadow-lg" />
              <div className="absolute inset-0 animate-ping" style={{ animationDelay: '0.5s' }}>
                <TrendingUp className="w-14 h-14 text-green-300/40" />
              </div>
              <div className="absolute -inset-3 bg-green-400/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          <div className={`absolute bottom-32 left-1/3 transition-all duration-1000 ${
            scrollProgress > 0.8 ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
          }`}>
            <div className="relative">
              <Rocket className="w-13 h-13 text-purple-400 animate-pulse drop-shadow-lg" />
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                <Rocket className="w-13 h-13 text-purple-300/30" />
              </div>
              <div className="absolute -inset-2 bg-purple-400/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          {/* Additional floating elements */}
          <div className={`absolute top-1/4 left-1/2 transition-all duration-1000 ${
            scrollProgress > 0.3 ? 'opacity-100' : 'opacity-20'
          }`}>
            <Star className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          <div className={`absolute bottom-1/4 right-1/3 transition-all duration-1000 ${
            scrollProgress > 0.7 ? 'opacity-100' : 'opacity-20'
          }`}>
            <Target className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>
        </div>
      )
    },
    // Drivers path
    {
      id: 'drivers-path',
      speed: 0.5,
      zIndex: 3,
      children: (
        <div className="w-full h-full relative">
          {/* Journey progress line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-green-500 to-purple-600 transform -translate-x-1/2">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-purple-400 transition-all duration-1000 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Enhanced driver markers with effects */}
          {drivers.map((driver, index) => (
            <div
              key={driver.id}
              className={`absolute left-1/2 w-20 h-20 transform -translate-x-1/2 transition-all duration-700 ${
                index <= activeDriver ? 'scale-125 opacity-100' : 'scale-80 opacity-60'
              }`}
              style={{ top: `${driver.position}%` }}
            >
              {/* Enhanced marker with multiple effects */}
              <div className="relative">
                {/* Outer glow ring */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${driver.color} opacity-30 blur-lg ${
                  index === activeDriver ? 'animate-pulse scale-150' : ''
                }`} />

                {/* Main marker */}
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${driver.color} flex items-center justify-center border-4 transition-all duration-500 ${
                  index === activeDriver
                    ? 'border-white shadow-2xl shadow-cyan-400/50 ring-4 ring-cyan-400/30'
                    : 'border-white/40 shadow-lg'
                } backdrop-blur-sm`}>
                  <driver.icon className={`w-10 h-10 text-white transition-all duration-300 ${
                    index === activeDriver ? 'animate-pulse' : ''
                  }`} />
                </div>

                {/* Rotating border effect for active driver */}
                {index === activeDriver && (
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin"
                       style={{ animationDuration: '8s' }} />
                )}

                {/* Success indicator */}
                {index < activeDriver && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Enhanced driver info panel */}
              <div className={`absolute ${index % 2 === 0 ? 'left-28' : 'right-28'} top-1/2 transform -translate-y-1/2 transition-all duration-700 ${
                index === activeDriver ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-4'
              }`}>
                <div className={`relative bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-6 border-2 ${
                  index % 2 === 0 ? 'text-left' : 'text-right'
                } ${driver.color.replace('from-', 'border-').replace('to-', '').split(' ')[0]}/30 shadow-2xl`}
                     style={{ width: '360px' }}>

                  {/* Panel glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${driver.color} opacity-10 blur-sm`} />

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <driver.icon className={`w-6 h-6 mr-3 bg-gradient-to-br ${driver.color} bg-clip-text text-transparent`} />
                      <h3 className="text-xl font-bold text-white">{driver.title}</h3>
                    </div>

                    <div className="space-y-3">
                      {driver.items.map((item, i) => (
                        <div key={i} className={`flex items-start gap-3 text-sm text-gray-200 transition-all duration-300`}
                             style={{ animationDelay: `${i * 0.1}s` }}>
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${driver.color} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress indicator for this driver */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Progress</span>
                        <span>{Math.round((index + 1) / drivers.length * 100)}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${driver.color} rounded-full transition-all duration-1000`}
                          style={{ width: index <= activeDriver ? '100%' : '0%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    // Header title at the beginning
    {
      id: 'header-title',
      speed: 0.2,
      zIndex: 4,
      children: (
        <div className="w-full flex justify-center pt-20">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Drivers of
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
                Transformation
              </span>
            </h1>
          </div>
        </div>
      )
    }
  ];

  const getLayerTransform = (layer: ParallaxLayer) => {
    const movement = scrollProgress * layer.speed * 500;
    const scaleValue = layer.scale || 1;
    return `translate3d(0, ${-movement}px, 0) scale(${scaleValue})`;
  };

  return (
    <section
      ref={containerRef}
      className={`relative h-[300vh] overflow-hidden ${className}`}
    >
      {/* Parallax layers */}
      {parallaxLayers.map((layer) => (
        <div
          key={layer.id}
          className="absolute inset-0 will-change-transform"
          style={{
            zIndex: layer.zIndex,
            opacity: layer.opacity || 1,
            filter: layer.blur ? `blur(${layer.blur}px)` : 'none',
            transform: getLayerTransform(layer),
            backfaceVisibility: 'hidden',
            perspective: 1000
          }}
        >
          {layer.children}
        </div>
      ))}

      {/* Progress indicator */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50">
        <div className="flex flex-col items-center gap-2">
          <div className="text-white text-xs font-bold">{Math.round(scrollProgress * 100)}%</div>
          <div className="w-1 h-32 bg-white/20 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-t from-purple-400 to-blue-400 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <ArrowDown className="w-4 h-4 text-white/60 animate-bounce" />
        </div>
      </div>

      {/* Driver progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <span className="text-white text-sm font-semibold">
            Driver {activeDriver + 1} of {drivers.length}
          </span>
          <div className="flex gap-1">
            {drivers.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= activeDriver ? 'bg-purple-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes parallaxFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.8;
          }
          25% {
            transform: translateY(-15px) rotate(1deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-25px) rotate(0deg);
            opacity: 0.9;
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
            opacity: 1;
          }
        }

        @keyframes backgroundShift {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translate(10px, -5px) rotate(1deg);
            opacity: 0.3;
          }
          50% {
            transform: translate(5px, -10px) rotate(0deg);
            opacity: 0.25;
          }
          75% {
            transform: translate(-5px, -5px) rotate(-1deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}