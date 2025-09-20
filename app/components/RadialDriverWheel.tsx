'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, TrendingUp, Rocket, Target, CheckCircle, ArrowDown
} from 'lucide-react';

interface Driver {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: string[];
  angle: number; // Position on the wheel (0-360 degrees)
  category: 'agility' | 'investment' | 'speed' | 'summary';
}

interface RadialDriverWheelProps {
  className?: string;
}

export default function RadialDriverWheel({ className = '' }: RadialDriverWheelProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDriver, setActiveDriver] = useState(0);
  const [hoveredDriver, setHoveredDriver] = useState<number | null>(null);
  const [expandedDriver, setExpandedDriver] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const drivers: Driver[] = [
    {
      id: 'business-agility',
      title: 'Improve Business agility',
      subtitle: 'Market Responsiveness',
      description: 'Enable rapid adaptation to market changes through streamlined processes',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Quickly adapt to market changes',
        'Streamline decision-making processes thru Governance',
        'Agile product development and deployment'
      ],
      angle: 0, // Top
      category: 'agility'
    },
    {
      id: 'return-investment',
      title: 'Improve return on investments',
      subtitle: 'Investment Optimization',
      description: 'Maximize ROI through strategic technology investments and automation',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      items: [
        'Invest in scalable IT solutions',
        'Prioritize high-value tech projects',
        'Automate to boost efficiency and profits'
      ],
      angle: 90, // Right
      category: 'investment'
    },
    {
      id: 'time-to-market',
      title: 'Faster Time to Market',
      subtitle: 'Speed & Efficiency',
      description: 'Accelerate product delivery through agile methodologies and automation',
      icon: Rocket,
      color: 'from-purple-500 to-indigo-500',
      items: [
        'Use agile methods for faster iterations',
        'Automate testing and deployment to minimize delays'
      ],
      angle: 180, // Bottom
      category: 'speed'
    },
    {
      id: 'key-drivers-summary',
      title: 'Key Drivers of Digital Transformation',
      subtitle: 'Strategic Focus Areas',
      description: 'The three core drivers that enable successful digital transformation initiatives',
      icon: Target,
      color: 'from-indigo-500 to-violet-500',
      items: [
        'Improve Business agility',
        'Improve return on investments',
        'Faster Time to Market'
      ],
      angle: 270, // Left
      category: 'summary'
    }
  ];

  // Scroll tracking - simplified and more reliable
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const elementHeight = rect.height;

      let progress = 0;

      // Simple logic: if any part of component is visible, start revealing
      if (elementBottom > 0 && elementTop < windowHeight) {
        if (elementTop <= windowHeight * 0.5) {
          // Component center has entered viewport, start progression
          progress = Math.min(1, (windowHeight * 0.5 - elementTop) / (elementHeight * 0.8));
        } else {
          // Component is entering from bottom
          progress = 0.1; // Show at least first arc
        }
      }

      // Always show at least something when component is visible for testing
      if (elementBottom > 0 && elementTop < windowHeight) {
        progress = Math.max(0.1, progress);
      }

      setScrollProgress(progress);

      // Debug with more visible info
      console.log('🎯 Scroll Debug:', {
        elementTop: Math.round(elementTop),
        elementBottom: Math.round(elementBottom),
        windowHeight,
        progress: Math.round(progress * 100) / 100,
        isVisible: elementBottom > 0 && elementTop < windowHeight,
        showingArcs: progress > 0
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [drivers.length]);

  // Calculate arc path for each driver segment (updated for 700x700 canvas)
  const createArcPath = (startAngle: number, endAngle: number, radius: number, thickness: number) => {
    const startAngleRad = (startAngle - 90) * Math.PI / 180;
    const endAngleRad = (endAngle - 90) * Math.PI / 180;

    const outerRadius = radius + thickness / 2;
    const innerRadius = radius - thickness / 2;

    const centerX = 350; // Updated center for 700px canvas
    const centerY = 350;

    const x1 = centerX + outerRadius * Math.cos(startAngleRad);
    const y1 = centerY + outerRadius * Math.sin(startAngleRad);
    const x2 = centerX + outerRadius * Math.cos(endAngleRad);
    const y2 = centerY + outerRadius * Math.sin(endAngleRad);

    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  // Calculate icon position on tangent (updated for 700x700 canvas)
  const getIconPosition = (angle: number, radius: number) => {
    const angleRad = (angle - 90) * Math.PI / 180;
    const centerX = 350;
    const centerY = 350;
    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);
    return { x, y };
  };

  // Handle driver interaction
  const handleDriverClick = (index: number) => {
    setExpandedDriver(expandedDriver === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className={`relative min-h-[174vh] overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 ${className}`}
      style={{ transform: 'translateY(-15%)' }}
    >
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 40% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
            `,
            animation: 'aurora 20s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[174vh] py-24">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-20 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent text-center">
          Drivers of
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Digital Transformation
          </span>
        </h1>

        {/* Radial Driver Wheel Container */}
        <div className="flex items-center justify-center w-full">
          <div
            ref={wheelRef}
            className="relative w-[700px] h-[700px]"
            style={{
              perspective: '1000px',
              transform: 'translate(-5%, 5%)'
            }}
          >
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-purple-500/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Central Ripples */}
              {hoveredDriver !== null && (
                <div className="absolute inset-0 animate-ripple">
                  <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping" style={{ animationDelay: '1s' }} />
                </div>
              )}
            </div>

            {/* SVG for Arcs */}
            <svg className="absolute inset-0 w-full h-full svg-morph-container" viewBox="0 0 700 700">
              <defs>
                {/* Gradients for each driver */}
                {drivers.map((driver, index) => {
                  const getGradientColors = (colorClass: string) => {
                    const colorMap: { [key: string]: { from: string; to: string } } = {
                      'from-blue-500 to-cyan-500': { from: '#3b82f6', to: '#06b6d4' },
                      'from-green-500 to-emerald-500': { from: '#10b981', to: '#059669' },
                      'from-purple-500 to-indigo-500': { from: '#8b5cf6', to: '#6366f1' },
                      'from-indigo-500 to-violet-500': { from: '#6366f1', to: '#8b5cf6' }
                    };
                    return colorMap[colorClass] || { from: '#3b82f6', to: '#06b6d4' };
                  };

                  const colors = getGradientColors(driver.color);
                  return (
                    <linearGradient key={driver.id} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={colors.from} stopOpacity="0.8" />
                      <stop offset="100%" stopColor={colors.to} stopOpacity="0.4" />
                    </linearGradient>
                  );
                })}

                {/* Specular highlight gradient */}
                <linearGradient id="specular" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>

                {/* Arc sweep animation mask */}
                <mask id="sweep-mask">
                  <rect x="0" y="0" width="700" height="700" fill="black" />
                  <path
                    d="M 350 350 L 350 150 A 200 200 0 0 1 550 350 Z"
                    fill="white"
                    className="animate-arc-sweep"
                  />
                </mask>
              </defs>

              {/* Driver Arcs */}
              {drivers.map((driver, index) => {
                const segmentAngle = 360 / drivers.length;
                const startAngle = driver.angle - segmentAngle / 2;
                const endAngle = driver.angle + segmentAngle / 2;

                // Simplified arc visibility - show based on scroll progress
                let arcProgress = 0;

                if (scrollProgress > 0) {
                  if (driver.angle === 0) {
                    // Top arc (0°) - appears first
                    arcProgress = Math.min(1, scrollProgress * 4);
                  } else if (driver.angle === 270 || driver.angle === 90) {
                    // Left (270°) and Right (90°) arcs - appear in middle
                    arcProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) * 3));
                  } else if (driver.angle === 180) {
                    // Bottom arc (180°) - appears last
                    arcProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 2));
                  }
                }

                const isActive = arcProgress > 0;
                const isFullyVisible = arcProgress >= 1;
                const isHovered = hoveredDriver === index;
                const isExpanded = expandedDriver === index;

                return (
                  <g key={driver.id}>
                    {/* Main Arc */}
                    <path
                      d={createArcPath(startAngle, endAngle, 200, 50)}
                      fill={`url(#gradient-${index})`}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                      className={`transition-all duration-1500 cursor-pointer svg-morph-arc ${
                        isHovered ? 'filter brightness-125 svg-morph-hover' : ''
                      } ${isExpanded ? 'svg-morph-expand' : ''}`}
                      style={{
                        opacity: isActive ? arcProgress * 0.9 + 0.1 : 0,
                        transform: `${isExpanded ? 'scale(1.1)' : 'scale(1)'} scale(${0.3 + arcProgress * 0.7})`,
                        transformOrigin: '350px 350px',
                        filter: isFullyVisible ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' : 'none',
                        transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={() => setHoveredDriver(index)}
                      onMouseLeave={() => setHoveredDriver(null)}
                      onClick={() => handleDriverClick(index)}
                    />

                    {/* Specular Highlight */}
                    {(isFullyVisible || isHovered) && (
                      <path
                        d={createArcPath(startAngle, endAngle, 200, 25)}
                        fill="url(#specular)"
                        className="animate-specular-sweep pointer-events-none svg-morph-highlight"
                        style={{
                          animationDelay: `${index * 0.5}s`,
                          opacity: arcProgress
                        }}
                      />
                    )}

                    {/* Arc Sweep Animation */}
                    {isActive && arcProgress > 0.5 && (
                      <path
                        d={createArcPath(startAngle, endAngle, 200, 50)}
                        fill="rgba(255,255,255,0.3)"
                        mask="url(#sweep-mask)"
                        className="animate-arc-reveal pointer-events-none"
                        style={{
                          animationDelay: `${index * 0.3}s`,
                          opacity: (arcProgress - 0.5) * 2
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Driver Icons */}
            {drivers.map((driver, index) => {
              // Adjust radius based on position
              let iconRadius = 200;
              if (driver.angle === 0 || driver.angle === 270) {
                // Top and left icons - 10% closer
                iconRadius = 180;
              } else if (driver.angle === 90 || driver.angle === 180) {
                // Right and bottom icons - 10% farther
                iconRadius = 220;
              }

              const iconPos = getIconPosition(driver.angle, iconRadius);

              // Same simplified logic as arcs
              let arcProgress = 0;

              if (scrollProgress > 0) {
                if (driver.angle === 0) {
                  // Top arc (0°) - appears first
                  arcProgress = Math.min(1, scrollProgress * 4);
                } else if (driver.angle === 270 || driver.angle === 90) {
                  // Left (270°) and Right (90°) arcs - appear in middle
                  arcProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) * 3));
                } else if (driver.angle === 180) {
                  // Bottom arc (180°) - appears last
                  arcProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 2));
                }
              }

              const isActive = arcProgress > 0;
              const isFullyVisible = arcProgress >= 1;
              const isHovered = hoveredDriver === index;
              const isExpanded = expandedDriver === index;

              return (
                <div
                  key={`icon-${driver.id}`}
                  className={`absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1500 cursor-pointer ${
                    isHovered ? 'scale-110' : ''
                  }`}
                  style={{
                    left: iconPos.x,
                    top: iconPos.y,
                    opacity: isActive ? arcProgress : 0,
                    transform: `translate(-50%, -50%) scale(${0.4 + arcProgress * 0.8}) ${isExpanded ? 'scale(1.2)' : ''} ${isFullyVisible ? `rotate(${driver.angle * 0.1}deg)` : 'rotate(0deg)'}`,
                    animationDelay: `${index * 0.2}s`,
                    transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={() => setHoveredDriver(index)}
                  onMouseLeave={() => setHoveredDriver(null)}
                  onClick={() => handleDriverClick(index)}
                >
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${driver.color} flex items-center justify-center border-4 border-white/30 shadow-lg svg-morph-container ${
                    isFullyVisible ? 'animate-icon-orbit' : ''
                  } ${isHovered ? 'svg-morph-hover' : ''}`}>
                    <driver.icon className={`w-8 h-8 text-white svg-morph-icon ${isHovered ? 'svg-morph-active' : ''}`} />
                  </div>

                  {/* Icon Glow */}
                  {(isActive || isHovered) && (
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${driver.color} blur-xl animate-pulse`}
                      style={{
                        opacity: arcProgress * 0.5
                      }}
                    />
                  )}
                </div>
              );
            })}

            {/* Driver Labels - Positioned Precisely Adjacent to Icons */}
            {drivers.map((driver, index) => {
              // Same visibility logic as arcs
              let arcProgress = 0;

              if (scrollProgress > 0) {
                if (driver.angle === 0) {
                  arcProgress = Math.min(1, scrollProgress * 4);
                } else if (driver.angle === 270 || driver.angle === 90) {
                  arcProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) * 3));
                } else if (driver.angle === 180) {
                  arcProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 2));
                }
              }

              if (arcProgress <= 0) return null;

              // Position labels precisely relative to icon position with same radius adjustments
              let iconRadius = 200;
              if (driver.angle === 0 || driver.angle === 270) {
                // Top and left icons - 10% closer
                iconRadius = 180;
              } else if (driver.angle === 90 || driver.angle === 180) {
                // Right and bottom icons - 10% farther
                iconRadius = 220;
              }

              const iconPos = getIconPosition(driver.angle, iconRadius);
              const isHovered = hoveredDriver === index;

              // Calculate text position based on icon angle
              let textStyle: any = {
                opacity: arcProgress,
                transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
              };

              let containerClass = "absolute transition-all duration-1000 cursor-pointer";
              let textAlignment = "";

              if (driver.angle === 0) {
                // Top - text above icon (10% farther away)
                textStyle.left = iconPos.x;
                textStyle.top = iconPos.y - 90;
                textStyle.transform = 'translate(-50%, -100%)';
                textAlignment = "text-center";
              } else if (driver.angle === 90) {
                // Right - text to the right of icon
                textStyle.left = iconPos.x + 60;
                textStyle.top = iconPos.y;
                textStyle.transform = 'translate(0%, -50%)';
                textAlignment = "text-left";
              } else if (driver.angle === 180) {
                // Bottom - text below icon
                textStyle.left = iconPos.x;
                textStyle.top = iconPos.y + 60;
                textStyle.transform = 'translate(-50%, 0%)';
                textAlignment = "text-center";
              } else if (driver.angle === 270) {
                // Left - text to the left of icon (10% farther away)
                textStyle.left = iconPos.x - 90;
                textStyle.top = iconPos.y;
                textStyle.transform = 'translate(-100%, -50%)';
                textAlignment = "text-right";
              }

              return (
                <div
                  key={`label-${driver.id}`}
                  className={containerClass}
                  style={textStyle}
                  onMouseEnter={() => setHoveredDriver(index)}
                  onMouseLeave={() => setHoveredDriver(null)}
                  onClick={() => handleDriverClick(index)}
                >
                  <div className={`max-w-48 ${textAlignment} ${isHovered ? 'scale-105' : ''} transition-transform`}>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                      {driver.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {driver.subtitle}
                    </p>
                    {isHovered && (
                      <div className="mt-2 text-xs text-blue-300">
                        Click for details
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Expanded Driver Content */}
            {expandedDriver !== null && (() => {
              const driver = drivers[expandedDriver];

              // Calculate same positioning logic as text labels
              let iconRadius = 200;
              if (driver.angle === 0 || driver.angle === 270) {
                iconRadius = 180;
              } else if (driver.angle === 90 || driver.angle === 180) {
                iconRadius = 220;
              }

              const iconPos = getIconPosition(driver.angle, iconRadius);

              // Position detail box based on text position with additional offset
              let detailStyle: any = {};

              if (driver.angle === 0) {
                // Top - position above text
                detailStyle.left = iconPos.x;
                detailStyle.top = iconPos.y - 200; // 90px for text + 110px for detail box
                detailStyle.transform = 'translate(-50%, 0%)';
              } else if (driver.angle === 90) {
                // Right - position to the right of text
                detailStyle.left = iconPos.x + 180; // 60px for text + 120px for detail box
                detailStyle.top = iconPos.y;
                detailStyle.transform = 'translate(0%, -50%)';
              } else if (driver.angle === 180) {
                // Bottom - position below text
                detailStyle.left = iconPos.x;
                detailStyle.top = iconPos.y + 180; // 60px for text + 120px for detail box
                detailStyle.transform = 'translate(-50%, 0%)';
              } else if (driver.angle === 270) {
                // Left - position to the left of text
                detailStyle.left = iconPos.x - 180; // 90px for text + 90px for detail box
                detailStyle.top = iconPos.y;
                detailStyle.transform = 'translate(-100%, -50%)';
              }

              // Determine width based on position - right and left side boxes are narrower
              let boxWidth = 'max-w-sm'; // Default size (384px)
              if (driver.angle === 90) {
                boxWidth = 'max-w-xs'; // Right side: ~20% smaller (320px)
              } else if (driver.angle === 270) {
                boxWidth = 'max-w-72'; // Left side: ~30% smaller (288px)
              }

              return (
                <div
                  className={`absolute z-30 bg-black/90 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 ${boxWidth} animate-expand-in`}
                  style={detailStyle}
                >
                <div className="flex items-center mb-4">
                  {React.createElement(drivers[expandedDriver].icon, {
                    className: `w-6 h-6 mr-3 text-white`
                  })}
                  <h3 className="text-xl font-bold text-white">{drivers[expandedDriver].title}</h3>
                </div>

                <div className="space-y-3">
                  {drivers[expandedDriver].items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-200">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${drivers[expandedDriver].color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              );
            })()}
          </div>
        </div>

      </div>

      {/* Progress indicator */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50">
        <div className="flex flex-col items-center gap-2">
          <div className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">
            Progress: {Math.round(scrollProgress * 100)}%
          </div>
          <div className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">
            Showing: {scrollProgress > 0 ? 'YES' : 'NO'}
          </div>
          <div className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">
            Arcs: {drivers.filter((driver, i) => {
              if (scrollProgress > 0) {
                if (driver.angle === 0) return scrollProgress * 4 > 0;
                if (driver.angle === 270 || driver.angle === 90) return (scrollProgress - 0.2) * 3 > 0;
                if (driver.angle === 180) return (scrollProgress - 0.5) * 2 > 0;
              }
              return false;
            }).length}/4
          </div>
          <div className="w-1 h-32 bg-white/20 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-t from-purple-400 to-blue-400 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <ArrowDown className="w-4 h-4 text-white/60 animate-bounce" />
        </div>
      </div>

      <style jsx>{`
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

        @keyframes arc-sweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes specular-sweep {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(100px);
          }
        }

        @keyframes arc-reveal {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        @keyframes icon-orbit {
          0% {
            transform: rotate(0deg) translateY(-2px);
          }
          100% {
            transform: rotate(360deg) translateY(-2px);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        @keyframes expand-in {
          0% {
            opacity: 0;
            transform: translateY(-50%) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }

        .animate-arc-sweep {
          animation: arc-sweep 8s linear infinite;
        }

        .animate-specular-sweep {
          animation: specular-sweep 3s ease-in-out infinite;
        }

        .animate-arc-reveal {
          animation: arc-reveal 2s ease-out;
        }

        .animate-icon-orbit {
          animation: icon-orbit 20s linear infinite;
        }

        .animate-ripple {
          animation: ripple 2s ease-out infinite;
        }

        .animate-expand-in {
          animation: expand-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}