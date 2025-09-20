'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Target, Code, GraduationCap, Zap, Settings, Cloud,
  Brain, Shield, TrendingUp, Users, Layers, Cpu
} from 'lucide-react';

interface ServiceOrb {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; }>;
  color: string;
  glowColor: string;
  position: { x: number; y: number; z: number };
  services: string[];
  connections: string[];
}

interface HolographicEcosystemProps {
  className?: string;
  interactive?: boolean;
}

export default function HolographicEcosystem({
  className = '',
  interactive = true
}: HolographicEcosystemProps) {
  const [activeOrb, setActiveOrb] = useState<string>('consulting');
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [hoverEffect, setHoverEffect] = useState<string | null>(null);
  const [connectionPulse, setConnectionPulse] = useState(0);
  const [floatingComments, setFloatingComments] = useState<Array<{id: string, text: string, x: number, y: number, opacity: number, delay: number}>>([]);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const serviceOrbs: ServiceOrb[] = [
    {
      id: 'consulting',
      title: 'Strategic Consulting',
      subtitle: 'Vision to Strategy',
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      position: { x: 0, y: -180, z: 0 }, // Top position (0°)
      services: [
        'Digital Transformation',
        'Enterprise Architecture',
        'Strategy Roadmaps',
        'Governance Framework',
        'Cloud Advisory',
        'Security Compliance'
      ],
      connections: ['development', 'training']
    },
    {
      id: 'development',
      title: 'Expert Development',
      subtitle: 'Strategy to Reality',
      icon: Code,
      color: 'from-purple-500 to-pink-600',
      glowColor: 'rgba(147, 51, 234, 0.4)',
      position: { x: 156, y: 90, z: 10 }, // Bottom right position (120°)
      services: [
        'App Dev & Modernization',
        'Cloud Engineering',
        'AI-ML & Automation',
        'Data & Analytics',
        'DevOps & Platform',
        'Integration Solutions'
      ],
      connections: ['consulting', 'training']
    },
    {
      id: 'training',
      title: 'Professional Training',
      subtitle: 'Reality to Excellence',
      icon: GraduationCap,
      color: 'from-green-500 to-teal-600',
      glowColor: 'rgba(34, 197, 94, 0.4)',
      position: { x: -156, y: 90, z: -5 }, // Bottom left position (240°)
      services: [
        'Technical Certifications',
        'Leadership Development',
        'Process Training',
        'Tool Mastery',
        'Best Practices',
        'Continuous Learning'
      ],
      connections: ['consulting', 'development']
    }
  ];

  const comments = [
    "Innovative solutions delivered",
    "Client satisfaction: 99.2%",
    "24/7 expert support",
    "Agile methodology applied",
    "Digital transformation accelerated",
    "Cloud-native architecture",
    "Security-first approach",
    "Scalable solutions deployed",
    "Industry best practices",
    "ROI improvement: 340%"
  ];

  // Generate floating comments occasionally
  useEffect(() => {
    if (!interactive) return;

    const generateComment = () => {
      const comment = {
        id: Math.random().toString(36).substr(2, 9),
        text: comments[Math.floor(Math.random() * comments.length)],
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: Math.random() * 60 + 20, // 20% to 80% of container height
        opacity: 1,
        delay: 0
      };

      setFloatingComments(prev => [...prev, comment]);

      // Remove comment after animation
      setTimeout(() => {
        setFloatingComments(prev => prev.filter(c => c.id !== comment.id));
      }, 8000);
    };

    // Generate comments every 3-7 seconds
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 4000; // 3-7 seconds
      setTimeout(() => {
        generateComment();
        scheduleNext();
      }, delay);
    };

    scheduleNext();
  }, [interactive]);

  // Animation loop for orbital mechanics
  useEffect(() => {
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const pulse = Math.sin(elapsed * 0.002) * 0.5 + 0.5;
      setConnectionPulse(pulse);

      if (interactive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (interactive) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [interactive]);

  const handleOrbClick = (orbId: string) => {
    setActiveOrb(orbId);
    setRotationSpeed(2); // Boost rotation on interaction
    setTimeout(() => setRotationSpeed(1), 1000);
  };

  const handleOrbHover = (orbId: string | null) => {
    setHoverEffect(orbId);
  };

  const getConnectionPath = (orb1: ServiceOrb, orb2: ServiceOrb) => {
    const midX = (orb1.position.x + orb2.position.x) / 2;
    const midY = (orb1.position.y + orb2.position.y) / 2;
    const controlOffset = 15;

    return `M ${orb1.position.x} ${orb1.position.y}
            Q ${midX + controlOffset} ${midY - controlOffset}
            ${orb2.position.x} ${orb2.position.y}`;
  };

  const getOrbTransform = (orb: ServiceOrb, index: number) => {
    const baseRotation = Date.now() * 0.0003 * rotationSpeed; // Slower rotation around COE
    const orbitalRadius = 15; // Larger orbital radius for COE rotation

    // Calculate 120° symmetrical positions with orbital rotation
    const baseAngle = index * (Math.PI * 2 / 3); // 120° intervals
    const currentAngle = baseAngle + baseRotation;

    const orbitalX = Math.cos(currentAngle) * orbitalRadius;
    const orbitalY = Math.sin(currentAngle) * orbitalRadius;

    const finalX = orb.position.x + orbitalX;
    const finalY = orb.position.y + orbitalY;

    const scale = activeOrb === orb.id ? 1.2 :
                  hoverEffect === orb.id ? 1.1 : 1;

    return {
      transform: `translate(${finalX}px, ${finalY}px) scale(${scale})`,
      zIndex: activeOrb === orb.id ? 50 : hoverEffect === orb.id ? 40 : 30,
      rotation: baseRotation // For moon rotation
    };
  };

  const getMoonTransform = (orbIndex: number, moonIndex: number, orbRotation: number) => {
    const moonRotation = Date.now() * 0.002 * rotationSpeed; // Faster moon rotation
    const moonRadius = 35; // Distance from orb center
    // Add orbit-specific offset so each circle has different moon positions
    const orbOffset = orbIndex * (Math.PI / 3); // 60° offset per orbit
    const moonAngle = moonRotation + orbOffset + (moonIndex * Math.PI); // 180° apart for 2 moons

    const moonX = Math.cos(moonAngle) * moonRadius;
    const moonY = Math.sin(moonAngle) * moonRadius;

    return {
      transform: `translate(${moonX}px, ${moonY}px)`,
    };
  };

  return (
    <div className={`relative w-full h-full min-h-[800px] ${className}`} ref={ecosystemRef}>
      {/* Holographic Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-teal-900/10 rounded-2xl"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            animation: 'holographicGrid 10s linear infinite'
          }}
        />
      </div>

      {/* Central Hub - COE */}
      <div className="absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-38 h-38 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-white to-yellow-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-800 mb-1">COE</div>
              <div className="text-xs text-yellow-600 font-medium">Center of Excellence</div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400/30"></div>
        </div>
      </div>

      {/* SVG for Connection Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="50%" stopColor="rgba(147, 51, 234, 0.8)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0.6)" />
          </linearGradient>

          <filter id="connectionGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(50%, 60%)">
          {serviceOrbs.map(orb =>
            orb.connections.map(connectionId => {
              const targetOrb = serviceOrbs.find(o => o.id === connectionId);
              if (!targetOrb) return null;

              const isActive = activeOrb === orb.id || activeOrb === targetOrb.id;
              const pulseOpacity = 0.3 + connectionPulse * 0.4;

              return (
                <path
                  key={`${orb.id}-${connectionId}`}
                  d={getConnectionPath(orb, targetOrb)}
                  stroke="url(#connectionGradient)"
                  strokeWidth={isActive ? "3" : "2"}
                  fill="none"
                  opacity={isActive ? pulseOpacity : 0.2}
                  filter="url(#connectionGlow)"
                  className="transition-all duration-500"
                />
              );
            })
          )}

          {/* Data Flow Particles */}
          {interactive && serviceOrbs.map(orb =>
            orb.connections.map(connectionId => {
              const targetOrb = serviceOrbs.find(o => o.id === connectionId);
              if (!targetOrb || activeOrb !== orb.id) return null;

              return (
                <circle
                  key={`particle-${orb.id}-${connectionId}`}
                  r="2"
                  fill="rgba(255, 255, 255, 0.8)"
                  className="animate-pulse"
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={getConnectionPath(orb, targetOrb)}
                  />
                </circle>
              );
            })
          )}
        </g>
      </svg>

      {/* Service Orbs */}
      {serviceOrbs.map((orb, index) => {
        const orbTransform = getOrbTransform(orb, index);
        const isActive = activeOrb === orb.id;
        const isHovered = hoverEffect === orb.id;

        return (
          <div
            key={orb.id}
            className="absolute top-3/5 left-1/2 transition-all duration-500 cursor-pointer"
            style={{
              transform: orbTransform.transform,
              zIndex: orbTransform.zIndex
            }}
            onClick={() => handleOrbClick(orb.id)}
            onMouseEnter={() => handleOrbHover(orb.id)}
            onMouseLeave={() => handleOrbHover(null)}
          >
            {/* Orb Glow Effect */}
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: `radial-gradient(circle, ${orb.glowColor} 0%, transparent 70%)`,
                width: '120px',
                height: '120px',
                transform: 'translate(-50%, -50%)',
                opacity: isActive || isHovered ? 0.6 : 0.3
              }}
            />

            {/* Main Orb with Text */}
            <div className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${orb.color}
                           flex items-center justify-center text-white shadow-2xl
                           transform -translate-x-1/2 -translate-y-1/2
                           ${isActive ? 'shadow-2xl' : 'shadow-lg'}
                           ${isHovered ? 'shadow-xl' : ''}`}>

              {/* Inner Glow */}
              <div className="absolute inset-3 rounded-full bg-white/20 backdrop-blur-sm"></div>

              {/* Content */}
              <div className="text-center relative z-10">
                <orb.icon className={`w-10 h-10 mx-auto mb-2 ${isActive ? 'animate-pulse' : ''}`} />
                <div className="text-xs font-bold leading-tight">{orb.title}</div>
                <div className="text-xs opacity-90 mt-1">{orb.subtitle}</div>
              </div>

              {/* Orbital Ring */}
              {isActive && (
                <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-spin"
                     style={{ animationDuration: '3s' }}>
                  <div className="absolute w-3 h-3 bg-white rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-1.5"></div>
                </div>
              )}
            </div>

            {/* Single Rotating Moon around each service circle */}
            {[0].map((moonIndex) => {
              const moonTransform = getMoonTransform(index, moonIndex, orbTransform.rotation);
              return (
                <div
                  key={`moon-${moonIndex}`}
                  className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-lg"
                  style={{
                    ...moonTransform,
                    opacity: isActive || isHovered ? 1 : 0.6,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <div className="w-full h-full rounded-full bg-white/50 animate-pulse"></div>
                </div>
              );
            })}

            {/* Service Details Box - Positioned Next to Circle */}
            {
              <div className={`absolute z-50 ${
                orb.id === 'consulting' ? 'bottom-full mb-32 left-1/2 transform -translate-x-1/2 -translate-y-24 -translate-x-52' : // Top circle - box above with more space
                orb.id === 'development' ? 'left-full ml-20 top-1/2 transform -translate-y-1/2' : // Bottom right - box to right with more space
                'right-full mr-20 top-1/2 transform -translate-y-1/2' // Bottom left - box to left with more space
              }`}>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl max-w-xs min-w-[208px] relative text-xs floating-interface">
                  {/* Connection Arrow */}
                  <div className={`absolute ${
                    orb.id === 'consulting' ? 'top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95' : // Arrow pointing down
                    orb.id === 'development' ? 'right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white/95' : // Arrow pointing left
                    'left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white/95' // Arrow pointing right
                  }`}></div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${orb.color} flex items-center justify-center`}>
                      <orb.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-white ${orb.id === 'consulting' ? 'text-xs' : 'text-sm'}`} style={orb.id === 'consulting' ? {fontSize: '0.715rem'} : orb.id === 'training' ? {fontSize: '0.72rem'} : {}}>{orb.title}</h4>
                      <p className={`text-white/80 ${orb.id === 'consulting' ? 'text-xs' : 'text-xs'}`} style={orb.id === 'consulting' ? {fontSize: '0.66rem'} : orb.id === 'training' ? {fontSize: '0.65rem'} : {}}>{orb.subtitle}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {orb.services.map((service, idx) => (
                      <div key={idx} className={`flex items-center gap-3 text-white/90 ${orb.id === 'consulting' ? 'text-xs' : 'text-xs'}`}>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${orb.color}`}></div>
                        <span className={`font-medium ${orb.id === 'consulting' ? 'text-xs' : 'text-xs'}`} style={orb.id === 'consulting' ? {fontSize: '0.66rem'} : orb.id === 'training' ? {fontSize: '0.65rem'} : {}}>{service}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/20">
                    <div className="text-xs text-white/70 font-medium">
                      {orb.services.length} Services Available
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        );
      })}

      {/* Floating Tech Icons */}
      {interactive && (
        <div className="absolute inset-0 pointer-events-none z-5">
          {[Settings, Cloud, Brain, Shield, TrendingUp, Users, Layers, Cpu].map((Icon, index) => (
            <div
              key={index}
              className="absolute animate-bounce"
              style={{
                left: `${20 + (index * 10) % 60}%`,
                top: `${15 + (index * 15) % 70}%`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: `${3 + (index % 3)}s`
              }}
            >
              <Icon className="w-4 h-4 text-white/20" />
            </div>
          ))}
        </div>
      )}

      {/* Floating Comments */}
      {interactive && floatingComments.map((comment) => (
        <div
          key={comment.id}
          className="absolute pointer-events-none z-30 floating-comment"
          style={{
            left: `${comment.x}%`,
            top: `${comment.y}%`,
            animation: 'floatComment 8s ease-out forwards'
          }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 shadow-lg">
            <span className="text-white/90 text-xs font-medium whitespace-nowrap">
              {comment.text}
            </span>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes holographicGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }

        @keyframes orbitalFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .floating-interface {
          box-shadow:
            0 8px 32px 0 rgba(31, 38, 135, 0.37),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          animation: floatingPulse 3s ease-in-out infinite;
        }

        @keyframes floatingPulse {
          0%, 100% {
            transform: translateY(0px);
            box-shadow:
              0 8px 32px 0 rgba(31, 38, 135, 0.37),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
          }
          50% {
            transform: translateY(-5px);
            box-shadow:
              0 12px 40px 0 rgba(31, 38, 135, 0.45),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
          }
        }

        @keyframes floatComment {
          0% {
            opacity: 0;
            transform: translateY(0px) scale(0.8);
          }
          15% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
          85% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
          }
        }

        .floating-comet {
          animation-fill-mode: forwards;
        }

        .comet-head {
          animation: cometGlow 2s ease-in-out infinite alternate;
        }

        .comet-tail {
          animation: tailFlicker 1.5s ease-in-out infinite;
        }

        @keyframes cometGlow {
          0% {
            filter: brightness(1);
          }
          100% {
            filter: brightness(1.5);
          }
        }

        @keyframes tailFlicker {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}