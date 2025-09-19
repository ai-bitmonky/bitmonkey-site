'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Smartphone, Cloud, Shield, DollarSign, Zap, Target,
  CheckCircle, ArrowRight, TrendingUp, Globe, Database, Cpu,
  ArrowDown, Play, Pause, FastForward, ChevronRight, Sparkles,
  Heart, Eye, Layers, RotateCcw, BarChart3, Lock, Settings,
  Rocket, Timer, Building, Code, Wrench, Activity
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

interface TransformationCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  position: number; // 0-100 percentage along the journey
  items: string[];
  category: 'expectations' | 'technology' | 'challenges' | 'security' | 'cost' | 'drivers';
}

interface CustomerTransformationJourneyProps {
  className?: string;
}

export default function CustomerTransformationJourney({ className = '' }: CustomerTransformationJourneyProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [userGuideStep, setUserGuideStep] = useState(0);
  const [journeyParticles, setJourneyParticles] = useState<Array<{x: number, y: number, delay: number, size: number, type: string}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const transformationCategories: TransformationCategory[] = [
    // Customer Expectations
    {
      id: 'customer-expectations',
      title: 'Changing Customer Expectations',
      subtitle: 'Experience Standards',
      description: 'Modern customers demand personalized, seamless experiences across all touchpoints',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      position: 16.67,
      items: [
        'Personalized experience',
        'Anytime, anywhere presence',
        'Consistent & intuitive design',
        'Multichannel enablement'
      ],
      category: 'expectations'
    },
    // Evolving Technology
    {
      id: 'evolving-technology',
      title: 'Evolving Technology',
      subtitle: 'Technology Evolution',
      description: 'Rapid technological advancement creating new possibilities and requirements',
      icon: Cpu,
      color: 'from-purple-500 to-indigo-500',
      position: 33.33,
      items: [
        'Web & mobile primary touchpoints',
        'Big Data & IOT',
        'Cloud Adoption',
        'Cognitive computing'
      ],
      category: 'technology'
    },
    // Growing Complexity & Challenges
    {
      id: 'growing-complexity',
      title: 'Growing Complexity & Challenges',
      subtitle: 'Market Pressures',
      description: 'Increasing operational complexity and competitive pressures demanding agility',
      icon: Layers,
      color: 'from-orange-500 to-red-500',
      position: 50,
      items: [
        'Polyglot technology stacks',
        'Increasing competition',
        'Disruption by startups',
        'Data fragmentation across systems & business units'
      ],
      category: 'challenges'
    },
    // Security & Regulatory
    {
      id: 'security-regulatory',
      title: 'Growing Regulatory and Security Requirements',
      subtitle: 'Compliance Focus',
      description: 'Strengthening security and compliance in response to evolving regulations',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      position: 66.67,
      items: [
        'Compliance with evolving regulations',
        'Focus on data protection laws',
        'Strengthen cybersecurity measures'
      ],
      category: 'security'
    },
    // TCO Reduction
    {
      id: 'reducing-tco',
      title: 'Reducing TCO',
      subtitle: 'Cost Optimization',
      description: 'Modernizing infrastructure to reduce total cost of ownership',
      icon: DollarSign,
      color: 'from-green-500 to-teal-500',
      position: 83.33,
      items: [
        'Modernize legacy application',
        'Reduce license cost',
        'Improve Reusability'
      ],
      category: 'cost'
    },
    // Transformation Drivers
    {
      id: 'transformation-drivers',
      title: 'Drivers of Digital Transformation',
      subtitle: 'Business Agility',
      description: 'Key drivers enabling rapid adaptation and competitive advantage',
      icon: Rocket,
      color: 'from-indigo-500 to-purple-500',
      position: 100,
      items: [
        'Improve Business agility - Quickly adapt to market changes',
        'Improve return on investments - Invest in scalable IT solutions',
        'Faster Time to Market - Use agile methods for faster iterations'
      ],
      category: 'drivers'
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

        // Update active category based on scroll progress
        const currentCategory = Math.floor(progress * transformationCategories.length);
        setActiveCategory(Math.min(currentCategory, transformationCategories.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Generate journey particles
    const particles = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      size: 1 + Math.random() * 4,
      type: ['customer', 'tech', 'challenge', 'security', 'cost', 'driver'][Math.floor(Math.random() * 6)]
    }));
    setJourneyParticles(particles);

    // Auto-advance user guide
    if (isPlaying) {
      const interval = setInterval(() => {
        setUserGuideStep(prev => (prev + 1) % 4);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const parallaxLayers: ParallaxLayer[] = [
    // Background transformation landscape
    {
      id: 'background-landscape',
      speed: 0.1,
      zIndex: 1,
      opacity: 0.4,
      blur: 1,
      children: (
        <div className="w-full h-full bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 75% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 50% 75%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)
            `
          }} />
        </div>
      )
    },
    // Mid-layer particles and elements
    {
      id: 'journey-elements',
      speed: 0.3,
      zIndex: 2,
      opacity: 0.8,
      children: (
        <div className="w-full h-full relative">
          {journeyParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: '4s'
              }}
            >
              <div
                className={`rounded-full ${
                  particle.type === 'customer' ? 'bg-blue-400' :
                  particle.type === 'tech' ? 'bg-purple-400' :
                  particle.type === 'challenge' ? 'bg-orange-400' :
                  particle.type === 'security' ? 'bg-red-400' :
                  particle.type === 'cost' ? 'bg-green-400' : 'bg-indigo-400'
                }`}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`
                }}
              />
            </div>
          ))}

          {/* Floating category icons */}
          <div className={`absolute top-32 left-1/4 animate-pulse transition-all duration-1000 ${
            scrollProgress > 0.2 ? 'opacity-100' : 'opacity-30'
          }`}>
            <Heart className="w-8 h-8 text-blue-400/70" />
          </div>
          <div className={`absolute top-1/2 right-1/4 animate-bounce transition-all duration-1000 ${
            scrollProgress > 0.5 ? 'opacity-100' : 'opacity-30'
          }`}>
            <Eye className="w-10 h-10 text-purple-400/70" />
          </div>
          <div className={`absolute bottom-32 left-1/3 animate-pulse transition-all duration-1000 ${
            scrollProgress > 0.8 ? 'opacity-100' : 'opacity-30'
          }`}>
            <Target className="w-9 h-9 text-green-400/70" />
          </div>
        </div>
      )
    },
    // Transformation categories path
    {
      id: 'categories-path',
      speed: 0.5,
      zIndex: 3,
      children: (
        <div className="w-full h-full relative">
          {/* Journey progress line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-500 to-indigo-600 transform -translate-x-1/2">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-purple-400 transition-all duration-1000 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Category markers */}
          {transformationCategories.map((category, index) => (
            <div
              key={category.id}
              className={`absolute left-1/2 w-16 h-16 transform -translate-x-1/2 transition-all duration-500 ${
                index <= activeCategory ? 'scale-110 opacity-100' : 'scale-75 opacity-50'
              }`}
              style={{ top: `${category.position}%` }}
            >
              <div className={`w-full h-full rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center border-4 ${
                index === activeCategory ? 'border-cyan-400 shadow-2xl' : 'border-white/30'
              }`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>

              {/* Category info panel */}
              <div className={`absolute ${index % 2 === 0 ? 'left-20' : 'right-20'} top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
                index === activeCategory ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className={`bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-sm ${
                  index % 2 === 0 ? 'text-left' : 'text-right'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                  <div className="space-y-2">
                    {category.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
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
              Customer-Driven
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Transformation
              </span>
            </h1>
          </div>
        </div>
      )
    },
    // Foreground controls
    {
      id: 'foreground-controls',
      speed: 0.8,
      zIndex: 4,
      children: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            {/* Playback controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isPlaying ? 'Pause Journey' : 'Play Journey'}</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-400/30 hover:bg-purple-500/30 transition-all">
                <FastForward className="w-5 h-5" />
                <span>Fast Forward</span>
              </button>
            </div>

            {/* User guide indicator */}
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-purple-400 text-sm animate-pulse">
                {userGuideStep === 0 && "Explore customer expectations driving transformation"}
                {userGuideStep === 1 && "Navigate through technology evolution and complexity challenges"}
                {userGuideStep === 2 && "Discover security, cost, and regulatory requirements"}
                {userGuideStep === 3 && "Experience the drivers of successful digital transformation"}
              </span>
              <ChevronRight className="w-4 h-4 text-purple-400 animate-bounce" />
            </div>
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

      {/* Category progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <span className="text-white text-sm font-semibold">
            Category {activeCategory + 1} of {transformationCategories.length}
          </span>
          <div className="flex gap-1">
            {transformationCategories.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= activeCategory ? 'bg-purple-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes parallaxFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes categoryPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .animate-parallax-float {
          animation: parallaxFloat 6s ease-in-out infinite;
        }

        .animate-category-pulse {
          animation: categoryPulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}