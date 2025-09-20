'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp, Zap, Cloud, Shield, Brain, Database,
  Globe, Users, Building, Cpu, Network, Target
} from 'lucide-react';

interface MarketDriver {
  id: string;
  title: string;
  description: string;
  growth: string;
  icon: React.ComponentType<{ className?: string; }>;
  position: { x: number; y: number; z: number };
  energy: number;
  plasmaColor: string;
  connectionStrength: number;
}

interface EnergyPacket {
  id: string;
  fromNode: string;
  toNode: string;
  progress: number;
  speed: number;
  color: string;
  intensity: number;
}

interface TeslaArc {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  intensity: number;
  branches: Array<{ x: number; y: number; intensity: number }>;
}

interface MarketDriversEnergyNexusProps {
  className?: string;
  interactive?: boolean;
}

export default function MarketDriversEnergyNexus({
  className = '',
  interactive = true
}: MarketDriversEnergyNexusProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [coreRotation, setCoreRotation] = useState(0);
  const [energyPackets, setEnergyPackets] = useState<EnergyPacket[]>([]);
  const [teslaArcs, setTeslaArcs] = useState<TeslaArc[]>([]);
  const [auroraPhase, setAuroraPhase] = useState(0);
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  const marketDrivers: MarketDriver[] = [
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      description: 'Enterprise modernization accelerating post-pandemic',
      growth: '+47%',
      icon: TrendingUp,
      position: { x: 30, y: 20, z: 0 },
      energy: 95,
      plasmaColor: 'from-blue-400 to-cyan-500',
      connectionStrength: 0.9
    },
    {
      id: 'cloud-first',
      title: 'Cloud-First Strategy',
      description: 'Mass migration to scalable cloud infrastructure',
      growth: '+62%',
      icon: Cloud,
      position: { x: 70, y: 25, z: 10 },
      energy: 88,
      plasmaColor: 'from-purple-400 to-indigo-500',
      connectionStrength: 0.85
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      description: 'Intelligent systems driving operational efficiency',
      growth: '+73%',
      icon: Brain,
      position: { x: 80, y: 60, z: -5 },
      energy: 92,
      plasmaColor: 'from-green-400 to-emerald-500',
      connectionStrength: 0.88
    },
    {
      id: 'cybersecurity',
      title: 'Zero Trust Security',
      description: 'Advanced security frameworks for remote work',
      growth: '+58%',
      icon: Shield,
      position: { x: 55, y: 80, z: 5 },
      energy: 87,
      plasmaColor: 'from-red-400 to-orange-500',
      connectionStrength: 0.83
    },
    {
      id: 'data-analytics',
      title: 'Real-Time Analytics',
      description: 'Data-driven decision making at enterprise scale',
      growth: '+65%',
      icon: Database,
      position: { x: 20, y: 75, z: -10 },
      energy: 89,
      plasmaColor: 'from-yellow-400 to-amber-500',
      connectionStrength: 0.86
    },
    {
      id: 'remote-collaboration',
      title: 'Hybrid Workforce',
      description: 'Distributed teams requiring seamless collaboration',
      growth: '+84%',
      icon: Users,
      position: { x: 15, y: 45, z: 15 },
      energy: 91,
      plasmaColor: 'from-pink-400 to-rose-500',
      connectionStrength: 0.87
    }
  ];

  // Scroll tracking for holographic wheel rotation
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollPosition(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!interactive) return;

    const animate = () => {
      const time = Date.now() * 0.001;

      // Core rotation based on scroll and time
      setCoreRotation(scrollPosition * 360 + time * 20);

      // Aurora phase animation
      setAuroraPhase(time * 0.5);

      // Generate energy packets
      if (Math.random() < 0.1) {
        const fromDriver = marketDrivers[Math.floor(Math.random() * marketDrivers.length)];
        const toDriver = marketDrivers[Math.floor(Math.random() * marketDrivers.length)];

        if (fromDriver.id !== toDriver.id) {
          const newPacket: EnergyPacket = {
            id: `packet-${Date.now()}-${Math.random()}`,
            fromNode: fromDriver.id,
            toNode: toDriver.id,
            progress: 0,
            speed: 0.02 + Math.random() * 0.03,
            color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)],
            intensity: 0.8 + Math.random() * 0.2
          };

          setEnergyPackets(prev => [...prev.slice(-20), newPacket]);
        }
      }

      // Update energy packets
      setEnergyPackets(prev =>
        prev.map(packet => ({ ...packet, progress: packet.progress + packet.speed }))
            .filter(packet => packet.progress <= 1)
      );

      // Generate Tesla arcs
      if (Math.random() < 0.15) {
        const driver1 = marketDrivers[Math.floor(Math.random() * marketDrivers.length)];
        const driver2 = marketDrivers[Math.floor(Math.random() * marketDrivers.length)];

        if (driver1.id !== driver2.id) {
          const branches = Array.from({ length: 3 + Math.floor(Math.random() * 4) }, () => ({
            x: driver1.position.x + (driver2.position.x - driver1.position.x) * Math.random(),
            y: driver1.position.y + (driver2.position.y - driver1.position.y) * Math.random(),
            intensity: 0.3 + Math.random() * 0.7
          }));

          const newArc: TeslaArc = {
            id: `arc-${Date.now()}-${Math.random()}`,
            fromX: driver1.position.x,
            fromY: driver1.position.y,
            toX: driver2.position.x,
            toY: driver2.position.y,
            intensity: 0.8 + Math.random() * 0.2,
            branches
          };

          setTeslaArcs(prev => [...prev.slice(-8), newArc]);
        }
      }

      // Fade Tesla arcs
      setTeslaArcs(prev =>
        prev.map(arc => ({ ...arc, intensity: arc.intensity - 0.02 }))
            .filter(arc => arc.intensity > 0)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [interactive, scrollPosition]);

  const getDriverPosition = (driver: MarketDriver, index: number) => {
    const baseRotation = scrollPosition * 180;
    const driverRotation = baseRotation + (index * 60); // 60° spacing for 6 drivers
    const radius = 200;
    const centerX = 50;
    const centerY = 50;

    const x = centerX + Math.cos((driverRotation * Math.PI) / 180) * (radius / window.innerWidth * 100);
    const y = centerY + Math.sin((driverRotation * Math.PI) / 180) * (radius / window.innerHeight * 100);

    return { x, y };
  };

  const getPacketPosition = (packet: EnergyPacket) => {
    const fromDriver = marketDrivers.find(d => d.id === packet.fromNode);
    const toDriver = marketDrivers.find(d => d.id === packet.toNode);

    if (!fromDriver || !toDriver) return { x: 0, y: 0 };

    const fromPos = getDriverPosition(fromDriver, marketDrivers.indexOf(fromDriver));
    const toPos = getDriverPosition(toDriver, marketDrivers.indexOf(toDriver));

    const x = fromPos.x + (toPos.x - fromPos.x) * packet.progress;
    const y = fromPos.y + (toPos.y - fromPos.y) * packet.progress;

    return { x, y };
  };

  return (
    <div
      className={`relative w-full min-h-[1000px] bg-gradient-to-br from-slate-900 via-black to-indigo-950 overflow-hidden ${className}`}
      ref={containerRef}
    >
      {/* Aurora Effects Background */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, rgba(0, 255, 255, ${0.1 + Math.sin(auroraPhase) * 0.05}) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, rgba(255, 0, 255, ${0.08 + Math.cos(auroraPhase * 1.2) * 0.04}) 0%, transparent 50%),
              radial-gradient(ellipse at 60% 80%, rgba(0, 255, 0, ${0.06 + Math.sin(auroraPhase * 0.8) * 0.03}) 0%, transparent 50%)
            `
          }}
        />

        {/* Aurora waves */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(${45 + i * 30 + auroraPhase * 10}deg,
                transparent 0%,
                rgba(0, 255, 255, 0.1) 30%,
                rgba(255, 0, 255, 0.1) 50%,
                rgba(0, 255, 0, 0.1) 70%,
                transparent 100%
              )`,
              transform: `translateY(${Math.sin(auroraPhase + i) * 20}px)`
            }}
          />
        ))}
      </div>

      {/* Tesla Arcs */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <defs>
          <filter id="electricGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {teslaArcs.map(arc => (
          <g key={arc.id}>
            {/* Main arc */}
            <path
              d={`M ${arc.fromX}% ${arc.fromY}% Q ${(arc.fromX + arc.toX) / 2 + Math.sin(Date.now() * 0.01) * 10}% ${(arc.fromY + arc.toY) / 2 + Math.cos(Date.now() * 0.01) * 10}% ${arc.toX}% ${arc.toY}%`}
              stroke={`rgba(0, 255, 255, ${arc.intensity})`}
              strokeWidth="2"
              fill="none"
              filter="url(#electricGlow)"
              className="animate-pulse"
            />

            {/* Arc branches */}
            {arc.branches.map((branch, i) => (
              <circle
                key={i}
                cx={`${branch.x}%`}
                cy={`${branch.y}%`}
                r="2"
                fill={`rgba(255, 255, 255, ${branch.intensity * arc.intensity})`}
                filter="url(#electricGlow)"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Central Power Core */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <div
          className="relative w-32 h-32"
          style={{ transform: `rotateY(${coreRotation}deg) rotateX(15deg)` }}
        >
          {/* Core rings */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 animate-pulse"
              style={{
                borderColor: `rgba(0, 255, 255, ${0.8 - i * 0.15})`,
                transform: `scale(${1 - i * 0.2}) rotateX(${i * 30}deg)`,
                boxShadow: `0 0 ${20 + i * 10}px rgba(0, 255, 255, ${0.6 - i * 0.1})`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}

          {/* Central energy orb */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-white/50 animate-ping" />
          </div>
        </div>
      </div>

      {/* Market Driver Nodes */}
      {marketDrivers.map((driver, index) => {
        const position = getDriverPosition(driver, index);
        const Icon = driver.icon;
        const isHovered = hoveredDriver === driver.id;
        const bobOffset = Math.sin(Date.now() * 0.002 + index) * 3; // Magnetic levitation effect

        return (
          <div
            key={driver.id}
            className="absolute cursor-pointer transition-all duration-500 hover:scale-110"
            style={{
              left: `${position.x}%`,
              top: `${position.y + bobOffset}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: isHovered ? 50 : 40
            }}
            onMouseEnter={() => setHoveredDriver(driver.id)}
            onMouseLeave={() => setHoveredDriver(null)}
          >
            {/* Plasma Containment Field */}
            <div className="relative">
              {/* Outer plasma field */}
              <div
                className={`absolute -inset-8 rounded-full bg-gradient-to-br ${driver.plasmaColor} opacity-30 animate-pulse`}
                style={{
                  filter: 'blur(8px)',
                  transform: `scale(${isHovered ? 1.3 : 1})`,
                }}
              />

              {/* Inner plasma field */}
              <div
                className={`absolute -inset-4 rounded-full bg-gradient-to-br ${driver.plasmaColor} opacity-50`}
                style={{
                  filter: 'blur(4px)',
                  transform: `scale(${isHovered ? 1.2 : 1})`,
                }}
              />

              {/* Particle effects */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white animate-bounce"
                  style={{
                    left: `${40 + Math.cos((i * 45) * Math.PI / 180) * 30}px`,
                    top: `${40 + Math.sin((i * 45) * Math.PI / 180) * 30}px`,
                    animationDelay: `${i * 0.1}s`,
                    opacity: isHovered ? 1 : 0.6
                  }}
                />
              ))}

              {/* Driver Node */}
              <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${driver.plasmaColor} flex items-center justify-center shadow-2xl border-2 border-white/30`}>
                <Icon className="w-8 h-8 text-white drop-shadow-lg" />

                {/* Energy level indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-white rounded-full animate-pulse"
                    style={{ width: `${driver.energy}%` }}
                  />
                </div>
              </div>

              {/* Driver Info Panel */}
              {isHovered && (
                <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-64 bg-black/80 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-2xl">
                  <h3 className="text-white font-bold text-lg mb-2">{driver.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{driver.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Market Growth</span>
                    <span className="text-green-400 font-bold text-lg">{driver.growth}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400 text-xs">Energy Level</span>
                    <span className="text-cyan-400 font-bold">{driver.energy}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Energy Packets */}
      {energyPackets.map(packet => {
        const position = getPacketPosition(packet);
        return (
          <div
            key={packet.id}
            className="absolute w-2 h-2 rounded-full animate-pulse pointer-events-none z-35"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              backgroundColor: packet.color,
              opacity: packet.intensity,
              boxShadow: `0 0 8px ${packet.color}`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        );
      })}

      {/* Section Header */}
      <div className="relative z-40 text-center pt-16 pb-8">
        <span className="text-cyan-400 font-bold uppercase tracking-wider text-lg animate-pulse">
          Energy Nexus Activated
        </span>
        <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Market Drivers — Energy Nexus
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Witness the electromagnetic forces driving digital transformation through interconnected energy systems.
        </p>
      </div>

      {/* Power Grid Status */}
      <div className="absolute bottom-8 right-8 z-40">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Power Grid Status</span>
          </div>
          <div className="text-white text-xs">
            <div>Core Rotation: {Math.round(coreRotation % 360)}°</div>
            <div>Active Packets: {energyPackets.length}</div>
            <div>Tesla Arcs: {teslaArcs.length}</div>
            <div>System Load: {Math.round(85 + Math.sin(Date.now() * 0.001) * 10)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}