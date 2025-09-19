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

interface EnterpriseForce {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  intensity: number; // 0-100 how strongly this force affects transformation
  category: 'regulatory' | 'customer' | 'market' | 'disruption';
}

interface TechnologyShift {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  impact: string;
  adoptionRate: number; // 0-100 percentage
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
    {
      id: 'legacy-present',
      title: 'Legacy Systems',
      subtitle: 'Where We Start',
      description: 'Traditional infrastructures holding back innovation and growth potential',
      icon: Monitor,
      color: 'from-gray-600 to-gray-800',
      position: 0,
      technologies: ['On-Premise Servers', 'Manual Processes', 'Isolated Systems', 'Legacy Databases']
    },
    {
      id: 'digital-awakening',
      title: 'Digital Awakening',
      subtitle: 'The First Step',
      description: 'Recognition of transformation needs and strategic planning initiation',
      icon: Brain,
      color: 'from-orange-500 to-red-600',
      position: 20,
      technologies: ['Digital Strategy', 'Process Analysis', 'Technology Assessment', 'Roadmap Planning']
    },
    {
      id: 'cloud-migration',
      title: 'Cloud Migration',
      subtitle: 'Infrastructure Evolution',
      description: 'Transitioning to scalable, flexible cloud-based architectures',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-600',
      position: 40,
      technologies: ['AWS/Azure/GCP', 'Microservices', 'Container Orchestration', 'API Gateways']
    },
    {
      id: 'ai-integration',
      title: 'AI Integration',
      subtitle: 'Intelligence Layer',
      description: 'Embedding artificial intelligence for automated decision-making and insights',
      icon: Cpu,
      color: 'from-purple-500 to-pink-600',
      position: 60,
      technologies: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics']
    },
    {
      id: 'automation-excellence',
      title: 'Automation Excellence',
      subtitle: 'Process Optimization',
      description: 'Intelligent automation eliminating manual work and increasing efficiency',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      position: 80,
      technologies: ['RPA', 'Workflow Automation', 'Smart Contracts', 'IoT Integration']
    },
    {
      id: 'future-ready',
      title: 'Future-Ready Enterprise',
      subtitle: 'Transformation Complete',
      description: 'Fully digitized, intelligent, and adaptable organization ready for any challenge',
      icon: Rocket,
      color: 'from-green-500 to-teal-600',
      position: 100,
      technologies: ['Edge Computing', 'Quantum-Ready', 'Autonomous Systems', 'Adaptive Architecture']
    }
  ];

  const enterpriseForces: EnterpriseForce[] = [
    {
      id: 'regulatory-norms',
      title: 'Changing Regulatory Norms',
      description: 'Evolving compliance requirements driving digital governance and transparency',
      icon: Scale,
      color: 'from-red-500 to-orange-500',
      intensity: 85,
      category: 'regulatory'
    },
    {
      id: 'user-centricity',
      title: 'Growing User-Centricity',
      description: 'Customer experience becoming the primary competitive differentiator',
      icon: UserCheck,
      color: 'from-blue-500 to-cyan-500',
      intensity: 92,
      category: 'customer'
    },
    {
      id: 'globalization-ma',
      title: 'Globalization & Increasing M&A',
      description: 'Market consolidation and global expansion driving integration complexity',
      icon: Merge,
      color: 'from-purple-500 to-pink-500',
      intensity: 78,
      category: 'market'
    },
    {
      id: 'disruption-threat',
      title: 'Increased Threat of Disruption',
      description: 'Accelerating innovation cycles creating existential business risks',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-red-500',
      intensity: 95,
      category: 'disruption'
    }
  ];

  const technologyShifts: TechnologyShift[] = [
    {
      id: 'ubiquitous-mobility',
      title: 'Ubiquitous Mobility',
      description: 'Mobile-first experiences becoming the default across all touchpoints',
      icon: Smartphone,
      color: 'from-green-500 to-teal-500',
      impact: 'Universal Access',
      adoptionRate: 89
    },
    {
      id: 'autonomous-systems',
      title: 'Autonomous, Self-Learning Systems',
      description: 'AI systems that adapt and improve without human intervention',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      impact: 'Intelligent Automation',
      adoptionRate: 67
    },
    {
      id: 'big-fast-data',
      title: 'Big & Fast Data Analytics',
      description: 'Real-time processing of massive datasets for instant decision-making',
      icon: BarChart,
      color: 'from-orange-500 to-red-500',
      impact: 'Instant Insights',
      adoptionRate: 81
    },
    {
      id: 'cloud-growth',
      title: 'Growth of Cloud',
      description: 'Cloud-native architectures enabling infinite scalability and agility',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      impact: 'Limitless Scale',
      adoptionRate: 94
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

          {/* Enterprise Forces - Left Side */}
          {enterpriseForces.map((force, index) => (
            <div
              key={force.id}
              className={`absolute transition-all duration-1000 ${
                scrollProgress > (index + 1) * 0.2 ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
              }`}
              style={{
                left: '5%',
                top: `${15 + index * 20}%`,
                transform: `translateY(${scrollProgress * -50}px)`
              }}
            >
              <div className={`group relative bg-gradient-to-br ${force.color} rounded-xl p-4 border border-white/20 backdrop-blur-sm max-w-xs hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center mb-2">
                  <force.icon className="w-6 h-6 text-white mr-3" />
                  <span className="text-white font-bold text-sm">FORCE</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{force.title}</h4>
                <p className="text-white/80 text-xs mb-2">{force.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Intensity</span>
                  <div className="flex items-center">
                    <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-1000"
                        style={{ width: `${force.intensity}%` }}
                      />
                    </div>
                    <span className="text-white text-xs ml-2">{force.intensity}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Technology Shifts - Right Side */}
          {technologyShifts.map((shift, index) => (
            <div
              key={shift.id}
              className={`absolute transition-all duration-1000 ${
                scrollProgress > (index + 1) * 0.25 ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
              }`}
              style={{
                right: '5%',
                top: `${10 + index * 22}%`,
                transform: `translateY(${scrollProgress * -60}px)`
              }}
            >
              <div className={`group relative bg-gradient-to-br ${shift.color} rounded-xl p-4 border border-white/20 backdrop-blur-sm max-w-xs hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center mb-2">
                  <shift.icon className="w-6 h-6 text-white mr-3" />
                  <span className="text-white font-bold text-xs">TECH SHIFT</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{shift.title}</h4>
                <p className="text-white/80 text-xs mb-2">{shift.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Impact: {shift.impact}</span>
                  <div className="flex items-center">
                    <Activity className="w-3 h-3 text-white/60 mr-1" />
                    <span className="text-white">{shift.adoptionRate}%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-white to-green-400 transition-all duration-1000"
                      style={{ width: `${shift.adoptionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Central floating tech icons */}
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
                Cinematic Journey
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
              The Digital
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transformation
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Era
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              Experience the complete transformation journey from legacy systems to future-ready enterprises.
              Witness how enterprise forces and technology shifts drive each stage of digital evolution.
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
                {userGuideStep === 0 && "Scroll to begin your transformation journey and witness enterprise forces in action"}
                {userGuideStep === 1 && "Watch as your organization evolves while enterprise forces reshape the landscape"}
                {userGuideStep === 2 && "See technology shifts and disruption forces transform business capabilities"}
                {userGuideStep === 3 && "Experience the complete digital transformation with all forces aligned"}
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