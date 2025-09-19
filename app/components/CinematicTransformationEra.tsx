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
      opacity: 1,
      children: (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
          {/* Animated Aurora Layers */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 40%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse 100% 60% at 40% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)
              `,
              animation: 'aurora 20s ease-in-out infinite',
            }}
          />

          {/* Secondary Aurora Layer */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 70% 60% at 60% 20%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
                radial-gradient(ellipse 50% 80% at 90% 70%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse 90% 50% at 10% 90%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
              `,
              animation: 'aurora 25s ease-in-out infinite reverse',
            }}
          />

          {/* Enhanced Animated Orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '4s' }} />
            <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-indigo-500/45 to-violet-500/45 rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '6s', animationDelay: '2s' }} />
          </div>

          {/* Sparkle Layer 1 - Small Sparkles */}
          <div className="absolute inset-0">
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={`sparkle-large-${i}`}
                className="absolute w-1 h-1 bg-white/22 rounded-full animate-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${4 + Math.random() * 6}s`,
                  boxShadow: '0 0 2px rgba(255, 255, 255, 0.18), 0 0 4px rgba(255, 255, 255, 0.1)',
                }}
              />
            ))}
          </div>

          {/* Sparkle Layer 2 - Tiny Sparkles */}
          <div className="absolute inset-0">
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={`sparkle-medium-${i}`}
                className="absolute w-0.5 h-0.5 bg-cyan-300/24 rounded-full animate-sparkle-slow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${5 + Math.random() * 8}s`,
                  boxShadow: '0 0 1px rgba(34, 211, 238, 0.14), 0 0 3px rgba(34, 211, 238, 0.07)',
                }}
              />
            ))}
          </div>

          {/* Sparkle Layer 3 - Micro Twinkling Stars */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={`sparkle-small-${i}`}
                className="absolute w-0.5 h-0.5 bg-purple-300/18 rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 12}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  boxShadow: '0 0 1px rgba(196, 181, 253, 0.14), 0 0 2px rgba(196, 181, 253, 0.09)',
                }}
              />
            ))}
          </div>

          {/* Floating Light Rays */}
          <div className="absolute inset-0">
            <div
              className="absolute w-0.5 h-20 bg-gradient-to-t from-transparent via-white/7 to-transparent animate-light-ray"
              style={{
                left: '15%',
                top: '10%',
                transform: 'rotate(15deg)',
                animationDelay: '3s',
              }}
            />
            <div
              className="absolute w-0.5 h-30 bg-gradient-to-t from-transparent via-cyan-300/7 to-transparent animate-light-ray"
              style={{
                left: '70%',
                top: '20%',
                transform: 'rotate(-25deg)',
                animationDelay: '8s',
              }}
            />
          </div>

          {/* Glitter Dust Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 14 }, (_, i) => (
              <div
                key={`glitter-${i}`}
                className="absolute rounded-full animate-float-glitter"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${0.3 + Math.random() * 0.4}px`,
                  height: `${0.3 + Math.random() * 0.4}px`,
                  backgroundColor: ['rgba(255,255,255,0.18)', 'rgba(34,211,238,0.14)', 'rgba(196,181,253,0.14)', 'rgba(251,191,36,0.12)'][Math.floor(Math.random() * 4)],
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${12 + Math.random() * 10}s`,
                  filter: 'blur(0.3px)',
                }}
              />
            ))}
          </div>

          {/* Subtle grain overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
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
                <div className={`bg-black/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 whitespace-nowrap ${
                  index % 2 === 0 ? 'text-left' : 'text-right'
                }`}>
                  <h3 className="text-lg font-bold text-white whitespace-nowrap">{stage.title}</h3>
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
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
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
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30 hover:bg-blue-500/30 transition-all">
                <FastForward className="w-5 h-5" />
                <span>Fast Forward</span>
              </button>
            </div>

            {/* User guide indicator */}
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-sm animate-pulse">
                {userGuideStep === 0 && ""}
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

        @keyframes aurora {
          0%, 100% {
            transform: rotate(0deg) scale(1) translate(0, 0);
            opacity: 0.3;
          }
          33% {
            transform: rotate(0.5deg) scale(1.05) translate(10px, -5px);
            opacity: 0.4;
          }
          66% {
            transform: rotate(-0.3deg) scale(0.95) translate(-5px, 10px);
            opacity: 0.35;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.06;
            transform: scale(0.9) rotate(0deg);
          }
          50% {
            opacity: 0.36;
            transform: scale(1.1) rotate(180deg);
          }
        }

        @keyframes sparkle-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2) rotate(360deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.04;
            transform: scale(0.7);
          }
          25% {
            opacity: 0.24;
            transform: scale(1.0);
          }
          50% {
            opacity: 0.1;
            transform: scale(0.85);
          }
          75% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        @keyframes light-ray {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0.5);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-50px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) scale(0.3);
          }
        }

        @keyframes float-glitter {
          0% {
            opacity: 0.2;
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            opacity: 0.8;
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            opacity: 0.4;
            transform: translateY(-10px) translateX(-5px) rotate(180deg);
          }
          75% {
            opacity: 1;
            transform: translateY(-30px) translateX(15px) rotate(270deg);
          }
          100% {
            opacity: 0.2;
            transform: translateY(0px) translateX(0px) rotate(360deg);
          }
        }

        .animate-parallax-float {
          animation: parallaxFloat 6s ease-in-out infinite;
        }

        .animate-tech-pulse {
          animation: techPulse 3s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }

        .animate-sparkle-slow {
          animation: sparkle-slow ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animate-light-ray {
          animation: light-ray 8s ease-in-out infinite;
        }

        .animate-float-glitter {
          animation: float-glitter ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}