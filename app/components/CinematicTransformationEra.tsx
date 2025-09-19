'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Rocket, Zap, Brain, Cloud, Shield, Target, TrendingUp, Globe,
  ArrowDown, Play, Pause, FastForward, ChevronRight, Sparkles,
  Monitor, Smartphone, Database, Cpu, Wifi, Settings, Users, Scale,
  AlertTriangle, BarChart, Building, Merge, UserCheck, Activity,
  Layers, RotateCcw, Zap as Lightning
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

interface TransformationStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  position: number; // 0-100 percentage along the journey
  technologies: string[];
}


interface CinematicTransformationEraProps {
  className?: string;
}

export default function CinematicTransformationEra({ className = '' }: CinematicTransformationEraProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [userGuideStep, setUserGuideStep] = useState(0);
  const [cinematicParticles, setCinematicParticles] = useState<Array<{x: number, y: number, delay: number, size: number, type: string}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  const transformationStages: TransformationStage[] = [
    // Enterprise Forces Reshaping Business
    {
      id: 'regulatory-norms',
      title: 'Changing Regulatory Norms',
      subtitle: 'Compliance Evolution',
      description: 'Evolving regulations driving digital governance, transparency, and automated compliance systems',
      icon: Scale,
      color: 'from-red-500 to-orange-500',
      position: 12.5,
      technologies: ['Digital Governance', 'Automated Compliance', 'Risk Management', 'Audit Trails']
    },
    {
      id: 'user-centricity',
      title: 'Growing User-Centricity',
      subtitle: 'Experience First',
      description: 'Customer experience becoming the primary competitive differentiator across all touchpoints',
      icon: UserCheck,
      color: 'from-blue-500 to-cyan-500',
      position: 25,
      technologies: ['UX Design', 'Personalization', 'Omnichannel', 'Customer Analytics']
    },
    {
      id: 'globalization-ma',
      title: 'Globalization & M&A',
      subtitle: 'Market Expansion',
      description: 'Global market consolidation and expansion driving complex integration requirements',
      icon: Merge,
      color: 'from-purple-500 to-pink-500',
      position: 37.5,
      technologies: ['Global Infrastructure', 'System Integration', 'Cultural Adaptation', 'Cross-border Compliance']
    },
    {
      id: 'disruption-threat',
      title: 'Increased Threat of Disruption',
      subtitle: 'Innovation Pressure',
      description: 'Accelerating innovation cycles creating existential risks and transformation urgency',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-red-500',
      position: 50,
      technologies: ['Innovation Labs', 'Agile Development', 'Market Intelligence', 'Rapid Prototyping']
    },
    // Technology Shifts Enabling Transformation
    {
      id: 'ubiquitous-mobility',
      title: 'Ubiquitous Mobility',
      subtitle: 'Mobile-First World',
      description: 'Mobile-first experiences becoming the universal standard across all business interactions',
      icon: Smartphone,
      color: 'from-green-500 to-teal-500',
      position: 62.5,
      technologies: ['Progressive Web Apps', 'Mobile APIs', 'Cross-Platform Development', 'Edge Computing']
    },
    {
      id: 'autonomous-systems',
      title: 'Autonomous Self-Learning Systems',
      subtitle: 'AI Intelligence',
      description: 'AI systems that continuously adapt, learn, and improve without human intervention',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      position: 75,
      technologies: ['Machine Learning', 'Neural Networks', 'Autonomous Agents', 'Continuous Learning']
    },
    {
      id: 'big-fast-data',
      title: 'Big & Fast Data Analytics',
      subtitle: 'Real-Time Insights',
      description: 'Instant processing of massive datasets enabling real-time decision-making at scale',
      icon: BarChart,
      color: 'from-orange-500 to-red-500',
      position: 87.5,
      technologies: ['Stream Processing', 'Real-Time Analytics', 'Edge Analytics', 'Predictive Models']
    },
    {
      id: 'cloud-growth',
      title: 'Growth of Cloud',
      subtitle: 'Infinite Scale',
      description: 'Cloud-native architectures providing unlimited scalability, agility, and global reach',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      position: 100,
      technologies: ['Cloud-Native', 'Serverless', 'Multi-Cloud', 'Global CDN']
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

        // Update active stage based on scroll progress
        const currentStage = Math.floor(progress * transformationStages.length);
        setActiveStage(Math.min(currentStage, transformationStages.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Generate cinematic particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
      size: 1 + Math.random() * 3,
      type: ['tech', 'data', 'ai', 'cloud'][Math.floor(Math.random() * 4)]
    }));
    setCinematicParticles(particles);

    // Auto-advance user guide
    if (isPlaying) {
      const interval = setInterval(() => {
        setUserGuideStep(prev => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const parallaxLayers: ParallaxLayer[] = [
    // Background universe layer
    {
      id: 'background-universe',
      speed: 0.1,
      zIndex: 1,
      opacity: 0.4,
      blur: 2,
      children: (
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 70%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)
            `
          }} />
        </div>
      )
    },
    // Mid-layer particles and tech elements
    {
      id: 'tech-elements',
      speed: 0.3,
      zIndex: 2,
      opacity: 0.8,
      children: (
        <div className="w-full h-full relative">
          {cinematicParticles.map((particle, i) => (
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
                  particle.type === 'tech' ? 'bg-blue-400' :
                  particle.type === 'data' ? 'bg-green-400' :
                  particle.type === 'ai' ? 'bg-purple-400' : 'bg-cyan-400'
                }`}
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`
                }}
              />
            </div>
          ))}

          {/* Floating tech icons */}
          <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 animate-pulse transition-all duration-1000 ${
            scrollProgress > 0.3 ? 'opacity-100' : 'opacity-30'
          }`}>
            <Database className="w-8 h-8 text-blue-400/80" />
          </div>
          <div className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-1000 ${
            scrollProgress > 0.7 ? 'opacity-100' : 'opacity-30'
          }`}>
            <Settings className="w-10 h-10 text-purple-400/80" />
          </div>
        </div>
      )
    },
    // Transformation journey path
    {
      id: 'journey-path',
      speed: 0.5,
      zIndex: 3,
      children: (
        <div className="w-full h-full relative">
          {/* Journey progress line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 via-blue-500 to-green-400 transform -translate-x-1/2">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-yellow-400 to-green-400 transition-all duration-1000 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Stage markers */}
          {transformationStages.map((stage, index) => (
            <div
              key={stage.id}
              className={`absolute left-1/2 w-16 h-16 transform -translate-x-1/2 transition-all duration-500 ${
                index <= activeStage ? 'scale-110 opacity-100' : 'scale-75 opacity-50'
              }`}
              style={{ top: `${stage.position}%` }}
            >
              <div className={`w-full h-full rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center border-4 ${
                index === activeStage ? 'border-yellow-400 shadow-2xl' : 'border-white/30'
              }`}>
                <stage.icon className="w-8 h-8 text-white" />
              </div>

              {/* Stage info panel */}
              <div className={`absolute ${index % 2 === 0 ? 'left-20' : 'right-20'} top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
                index === activeStage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className={`bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-sm ${
                  index % 2 === 0 ? 'text-left' : 'text-right'
                }`}>
                  <div className="text-sm text-gray-300 mb-1">{stage.subtitle}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{stage.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{stage.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stage.technologies.slice(0, 2).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    // Foreground content
    {
      id: 'foreground-content',
      speed: 0.8,
      zIndex: 4,
      children: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            <div className="mb-8">
              <span className="text-blue-400 font-bold uppercase tracking-wider text-sm animate-pulse">
                Market Trends Analysis
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
              Forces Reshaping
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Enterprises
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Today
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              Navigate through the critical enterprise forces and technology shifts driving digital transformation.
              Each trend represents a fundamental change reshaping how businesses operate and compete.
            </p>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isPlaying ? 'Pause Journey' : 'Play Journey'}</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 hover:bg-blue-500/30 transition-all">
                <FastForward className="w-5 h-5" />
                <span>Fast Forward</span>
              </button>
            </div>

            {/* User guide indicator */}
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-sm animate-pulse">
                {userGuideStep === 0 && "Scroll to explore enterprise forces reshaping businesses today"}
                {userGuideStep === 1 && "Navigate through regulatory, customer, and market transformation pressures"}
                {userGuideStep === 2 && "Discover technology shifts enabling new business capabilities"}
                {userGuideStep === 3 && "Experience how these trends create competitive advantages"}
              </span>
              <ChevronRight className="w-4 h-4 text-yellow-400 animate-bounce" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const getLayerTransform = (layer: ParallaxLayer) => {
    const movement = scrollProgress * layer.speed * 500; // Increased multiplier for more dramatic effect
    const scaleValue = layer.scale || 1;
    return `translate3d(0, ${-movement}px, 0) scale(${scaleValue})`;
  };

  return (
    <section
      ref={containerRef}
      className={`relative h-[300vh] overflow-hidden ${className}`} // Increased height for longer scroll
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
              className="w-full bg-gradient-to-t from-green-400 to-blue-400 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <ArrowDown className="w-4 h-4 text-white/60 animate-bounce" />
        </div>
      </div>

      {/* Stage progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <span className="text-white text-sm font-semibold">
            Stage {activeStage + 1} of {transformationStages.length}
          </span>
          <div className="flex gap-1">
            {transformationStages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= activeStage ? 'bg-green-400' : 'bg-white/30'
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

        @keyframes techPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .animate-parallax-float {
          animation: parallaxFloat 6s ease-in-out infinite;
        }

        .animate-tech-pulse {
          animation: techPulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}