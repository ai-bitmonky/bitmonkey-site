'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ParticleCloudProps {
  menuItems: string[];
  onItemSelect?: (item: string) => void;
}

interface LiquidMetalLogoProps {
  logoText: string;
  isRevealed: boolean;
}

interface VolumetricVideoProps {
  videoSrc?: string;
  depthLayers: number;
  fogDensity: number;
}

interface HolographicTextProps {
  text: string;
  delay?: number;
  className?: string;
}

interface NeuralNetworkProps {
  words: string[];
  connectionStrength: number;
}

interface CinematicHeroProps {
  logoText?: string;
  headline?: string;
  tagline?: string;
  menuItems?: string[];
  videoBackground?: string;
  enableAudio?: boolean;
  className?: string;
}

// Enhanced Cursor Trail Component
const EnhancedCursorTrail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const trailParticles = useRef<HTMLDivElement[]>([]);
  const moveTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear existing timeout
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current);
      }

      // Create trail particle
      createTrailParticle(e.clientX, e.clientY);

      // Set moving to false after a delay
      moveTimeout.current = setTimeout(() => setIsMoving(false), 100);
    };

    const createTrailParticle = (x: number, y: number) => {
      if (!containerRef.current) return;

      const particle = document.createElement('div');
      particle.className = 'cursor-trail-particle';
      particle.style.left = `${x - 4}px`;
      particle.style.top = `${y - 4}px`;

      containerRef.current.appendChild(particle);
      trailParticles.current.push(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        const index = trailParticles.current.indexOf(particle);
        if (index > -1) {
          trailParticles.current.splice(index, 1);
        }
      }, 800);

      // Limit number of particles
      if (trailParticles.current.length > 20) {
        const oldParticle = trailParticles.current.shift();
        if (oldParticle && oldParticle.parentNode) {
          oldParticle.parentNode.removeChild(oldParticle);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cursor-trail-container"
      style={{
        transform: isMoving ? `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)` : 'none',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Circuit Pattern Background */}
      <div
        className="circuit-pattern"
        style={{
          opacity: isMoving ? 0.6 : 0,
          transition: 'opacity 0.3s ease-out'
        }}
      />

      {/* Depth Parallax Layers */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`parallax-layer parallax-layer-${index + 1}`}
          style={{
            transform: `
              translateZ(${(index - 4) * 20}px)
              scale(${1 + (index - 4) * 0.02})
              translate(${mousePos.x * (index - 4) * 0.01}px, ${mousePos.y * (index - 4) * 0.01}px)
            `,
            background: index % 2 === 0
              ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(100, 200, 255, ${0.1 / (index + 1)}) 0%, transparent 50%)`
              : `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(200, 255, 255, ${0.05 / (index + 1)}) 0%, transparent 40%)`,
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};

// Liquid Metal Logo Component
const LiquidMetalLogo: React.FC<LiquidMetalLogoProps> = ({ logoText, isRevealed }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize liquid metal particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 200; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: Math.random(),
          targetX: 0,
          targetY: 0,
          isForming: false
        });
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particlesRef.current.forEach((particle, index) => {
        if (isRevealed && !particle.isForming) {
          // Start forming logo
          const charIndex = Math.floor(index / (particlesRef.current.length / logoText.length));
          const char = logoText[charIndex] || logoText[logoText.length - 1];

          // Simple letter positioning (you'd want more sophisticated text rendering)
          particle.targetX = (canvas.width / 2) + (charIndex - logoText.length / 2) * 40;
          particle.targetY = canvas.height / 2;
          particle.isForming = true;
        }

        if (particle.isForming) {
          // Move towards target with liquid metal effect
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          particle.vx += dx * 0.01;
          particle.vy += dy * 0.01;
          particle.vx *= 0.9; // Viscosity
          particle.vy *= 0.9;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw liquid metal particle with reflection
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 3
        );
        gradient.addColorStop(0, 'rgba(200, 200, 220, 0.9)');
        gradient.addColorStop(0.7, 'rgba(160, 160, 180, 0.6)');
        gradient.addColorStop(1, 'rgba(120, 120, 140, 0.3)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2 + Math.sin(time * 0.01 + index) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add metallic reflection
        ctx.beginPath();
        ctx.arc(particle.x - 0.5, particle.y - 0.5, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
    animate(0);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [logoText, isRevealed]);

  return (
    <div className="relative w-full h-32">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      {isRevealed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-100 metallic-text">
            {logoText}
          </h1>
        </div>
      )}
    </div>
  );
};

// Particle Cloud Navigation
const ParticleCloudNavigation: React.FC<ParticleCloudProps> = ({ menuItems, onItemSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize glass particles for each menu item
    const initParticles = () => {
      particlesRef.current = [];
      menuItems.forEach((item, itemIndex) => {
        for (let i = 0; i < 20; i++) {
          particlesRef.current.push({
            itemIndex,
            x: (canvas.width / (menuItems.length + 1)) * (itemIndex + 1) + (Math.random() - 0.5) * 100,
            y: 50 + Math.random() * 20,
            baseX: (canvas.width / (menuItems.length + 1)) * (itemIndex + 1),
            baseY: 50,
            vx: 0,
            vy: 0,
            life: Math.random(),
            attracted: false
          });
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        const distance = Math.sqrt(
          Math.pow(mousePos.x - particle.x, 2) + Math.pow(mousePos.y - particle.y, 2)
        );

        if (distance < 80) {
          // Magnetic attraction
          const force = (80 - distance) / 80;
          const angle = Math.atan2(mousePos.y - particle.y, mousePos.x - particle.x);
          particle.vx += Math.cos(angle) * force * 0.5;
          particle.vy += Math.sin(angle) * force * 0.5;
          particle.attracted = true;
        } else {
          // Return to base position
          const returnX = (particle.baseX - particle.x) * 0.05;
          const returnY = (particle.baseY - particle.y) * 0.05;
          particle.vx += returnX;
          particle.vy += returnY;
          particle.attracted = false;
        }

        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw glass particle
        const alpha = particle.attracted ? 0.8 : 0.4;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.attracted ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, ${alpha})`;
        ctx.fill();

        // Glass reflection
        ctx.beginPath();
        ctx.arc(particle.x - 0.5, particle.y - 0.5, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
    animate();

    return () => {
      // Cleanup handled by component unmount
    };
  }, [menuItems, mousePos]);

  return (
    <div className="relative w-full h-24">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="absolute inset-0 flex items-center justify-around">
        {menuItems.map((item, index) => (
          <button
            key={item}
            className="relative z-10 px-6 py-2 text-white font-medium hover:text-blue-300 transition-colors duration-300 glass-morphism"
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => onItemSelect?.(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

// Volumetric Video Background
const VolumetricVideoBackground: React.FC<VolumetricVideoProps> = ({
  videoSrc = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  depthLayers = 6,
  fogDensity = 0.3
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient background fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 z-0" />

      {/* Base video layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-1"
        style={{ filter: 'contrast(1.2) saturate(0.8)', opacity: 0.7 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Depth layers with parallax */}
      {Array.from({ length: depthLayers }).map((_, index) => (
        <div
          key={index}
          className="absolute inset-0 pointer-events-none volumetric-fog"
          style={{
            background: `radial-gradient(ellipse at ${50 + index * 10}% ${30 + index * 5}%,
              rgba(100, 150, 255, ${fogDensity / (index + 1)}) 0%,
              transparent 60%)`,
            transform: `translateZ(${index * 20}px) scale(${1 + index * 0.1})`,
            zIndex: index + 1,
            animationDelay: `${index * 0.5}s`
          }}
        />
      ))}

      {/* Light rays */}
      <div className="absolute inset-0 opacity-40 z-10">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white via-transparent to-transparent light-ray" />
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-200 via-transparent to-transparent light-ray" style={{ animationDelay: '4s' }} />
        <div className="absolute top-0 left-2/3 w-1 h-full bg-gradient-to-b from-cyan-200 via-transparent to-transparent light-ray" style={{ animationDelay: '2s' }} />
      </div>

      {/* Fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-20" />
    </div>
  );
};

// Holographic Text Component
const HolographicText: React.FC<HolographicTextProps> = ({ text, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          transition-all duration-1000 transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          holographic-text
        `}
      >
        {/* Main text */}
        <div className="relative z-10 text-white font-bold">
          {text}
        </div>

        {/* Chromatic aberration layers */}
        <div
          className="absolute inset-0 text-red-500 font-bold opacity-30 transform translate-x-1"
          style={{ mixBlendMode: 'screen' }}
        >
          {text}
        </div>
        <div
          className="absolute inset-0 text-blue-500 font-bold opacity-30 transform -translate-x-1"
          style={{ mixBlendMode: 'screen' }}
        >
          {text}
        </div>

        {/* Scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scan-lines" />
        </div>

        {/* Hologram flicker */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 transform -skew-x-12 animate-pulse" />
      </div>
    </div>
  );
};

// Neural Network Animation
const NeuralNetworkAnimation: React.FC<NeuralNetworkProps> = ({ words, connectionStrength }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<any[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize nodes for each word
    const initNodes = () => {
      nodesRef.current = words.map((word, index) => ({
        x: (canvas.width / (words.length + 1)) * (index + 1),
        y: canvas.height / 2,
        connections: [],
        activity: 0,
        lastFire: 0
      }));

      // Create connections between nodes
      nodesRef.current.forEach((node, i) => {
        nodesRef.current.forEach((otherNode, j) => {
          if (i !== j && Math.random() < connectionStrength) {
            node.connections.push(j);
          }
        });
      });
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node activity
      nodesRef.current.forEach((node, index) => {
        if (time - node.lastFire > 2000 + Math.random() * 3000) {
          node.activity = 1;
          node.lastFire = time;
        } else {
          node.activity *= 0.95;
        }

        // Draw connections
        node.connections.forEach(connectionIndex => {
          const targetNode = nodesRef.current[connectionIndex];
          if (node.activity > 0.1) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${node.activity * 0.6})`;
            ctx.lineWidth = node.activity * 2;
            ctx.stroke();

            // Pulse effect
            const pulsePosition = (time - node.lastFire) / 1000;
            if (pulsePosition < 1) {
              const pulseX = node.x + (targetNode.x - node.x) * pulsePosition;
              const pulseY = node.y + (targetNode.y - node.y) * pulsePosition;

              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${1 - pulsePosition})`;
              ctx.fill();
            }
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4 + node.activity * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${0.5 + node.activity * 0.5})`;
        ctx.fill();

        // Node glow
        if (node.activity > 0.5) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8 + node.activity * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 200, 255, ${node.activity * 0.2})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initNodes();
    animate(0);

    return () => {
      // Cleanup handled by component unmount
    };
  }, [words, connectionStrength]);

  return (
    <div className="relative w-full h-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="absolute inset-0 flex items-center justify-around">
        {words.map((word, index) => (
          <span key={index} className="text-white text-lg font-medium opacity-80">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

// Main Cinematic Hero Component
const CinematicHero: React.FC<CinematicHeroProps> = ({
  logoText = 'BitMonkey',
  headline = 'Transform Your Digital Future',
  tagline = 'AI-Powered Cloud Solutions',
  menuItems = ['Services', 'Solutions', 'About', 'Contact'],
  videoBackground,
  enableAudio = false,
  className = ''
}) => {
  const [logoRevealed, setLogoRevealed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger logo reveal after component mounts
    const timer = setTimeout(() => {
      setLogoRevealed(true);
    }, 1000);

    setIsLoaded(true);

    return () => clearTimeout(timer);
  }, []);

  const taglineWords = tagline.split(' ');

  return (
    <section
      ref={containerRef}
      className={`
        relative min-h-screen flex flex-col justify-center items-center
        overflow-hidden cinematic-hero
        ${className}
      `}
    >
      {/* Volumetric Video Background */}
      <VolumetricVideoBackground
        videoSrc={videoBackground}
        depthLayers={8}
        fogDensity={0.4}
      />

      {/* Enhanced Cursor Trail with Circuit Pattern */}
      <EnhancedCursorTrail />

      {/* Main Content */}
      <div className="relative z-30 text-center space-y-12 px-4">
        {/* Liquid Metal Logo */}
        <LiquidMetalLogo
          logoText={logoText}
          isRevealed={logoRevealed}
        />

        {/* Holographic Headline */}
        <HolographicText
          text={headline}
          delay={2000}
          className="text-6xl md:text-8xl"
        />

        {/* Neural Network Tagline */}
        <div className="max-w-2xl mx-auto">
          <NeuralNetworkAnimation
            words={taglineWords}
            connectionStrength={0.4}
          />
        </div>

        {/* Call to Action */}
        <HolographicText
          text="Experience the Future"
          delay={4000}
          className="text-xl md:text-2xl"
        />
      </div>

      {/* Particle Cloud Navigation */}
      <div className="absolute bottom-20 left-0 right-0 z-30">
        <ParticleCloudNavigation
          menuItems={menuItems}
          onItemSelect={(item) => {
            console.log(`Navigate to: ${item}`);
            // Handle navigation
          }}
        />
      </div>

      {/* Audio Visualizer (if enabled) */}
      {enableAudio && (
        <div className="absolute bottom-4 right-4 z-30">
          <div className="audio-visualizer">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="audio-bar"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: `${Math.random() * 20 + 10}px`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CinematicHero;