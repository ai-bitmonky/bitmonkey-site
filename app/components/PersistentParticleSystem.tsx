'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  trail: Array<{ x: number; y: number; opacity: number }>;
  sectionBehavior: 'float' | 'orbit' | 'spiral' | 'pulse' | 'wave' | 'magnetic';
  energy: number;
  phase: number;
}

interface PersistentParticleSystemProps {
  particleCount?: number;
  className?: string;
}

export default function PersistentParticleSystem({
  particleCount = 50, // Reduced for scroll transitions only
  className = ''
}: PersistentParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mousePosition = useRef({ x: 0, y: 0 });
  const time = useRef(0);

  // Color palettes for different sections
  const sectionConfigs = {
    hero: {
      colors: ['#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE'],
      behavior: 'float' as const,
      intensity: 0.8
    },
    about: {
      colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
      behavior: 'wave' as const,
      intensity: 0.6
    },
    services: {
      colors: ['#10B981', '#34D399', '#6EE7B7', '#D1FAE5'],
      behavior: 'orbit' as const,
      intensity: 0.7
    },
    portfolio: {
      colors: ['#F59E0B', '#FBBF24', '#FDE047', '#FEF3C7'],
      behavior: 'spiral' as const,
      intensity: 0.9
    },
    testimonials: {
      colors: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA'],
      behavior: 'pulse' as const,
      intensity: 0.5
    },
    contact: {
      colors: ['#8B5CF6', '#EC4899', '#F472B6', '#FBCFE8'],
      behavior: 'magnetic' as const,
      intensity: 1.0
    }
  };

  // Track scroll state for gap detection
  const [, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Check if particle should be rendered (only in section gaps during scroll)
  const isInSectionGap = useCallback((x: number, y: number) => {
    // Only show particles when actively scrolling
    if (!isScrolling) return false;

    // Only show particles in middle area of viewport (avoiding menus)
    const viewportMiddle = dimensions.height * 0.3 < y && y < dimensions.height * 0.7;
    const horizontalCenter = dimensions.width * 0.2 < x && x < dimensions.width * 0.8;

    // Only during active scroll transitions
    return viewportMiddle && horizontalCenter && isScrolling;
  }, [isScrolling, dimensions]);

  // Initialize particles
  const initializeParticles = useCallback(() => {
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const sectionKeys = Object.keys(sectionConfigs);
      const randomSection = sectionKeys[Math.floor(Math.random() * sectionKeys.length)];
      const config = sectionConfigs[randomSection as keyof typeof sectionConfigs];

      // Generate particle position in section gaps only
      let x, y;
      let attempts = 0;
      do {
        x = Math.random() * dimensions.width;
        y = Math.random() * dimensions.height;
        attempts++;
      } while (isInSectionGap && !isInSectionGap(x, y) && attempts < 50);

      // If we couldn't find a gap after 50 attempts, place it in first gap area
      if (attempts >= 50) {
        x = Math.random() * dimensions.width;
        y = Math.random() * 100 + 100; // First potential gap area
      }

      newParticles.push({
        id: i,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        trail: [],
        sectionBehavior: config.behavior,
        energy: Math.random() * 0.5 + 0.5,
        phase: Math.random() * Math.PI * 2
      });
    }

    particles.current = newParticles;
  }, [particleCount, dimensions, isInSectionGap]);

  // Update particle behavior based on current section
  const updateParticleBehavior = useCallback((particle: Particle, deltaTime: number) => {
    const config = sectionConfigs[currentSection as keyof typeof sectionConfigs];
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Update trail
    particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
    if (particle.trail.length > 10) {
      particle.trail.shift();
    }

    // Decay trail opacity
    particle.trail.forEach((point, index) => {
      point.opacity *= 0.95;
    });

    switch (config.behavior) {
      case 'float':
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        break;

      case 'wave':
        const waveX = Math.sin(time.current * 0.002 + particle.phase) * 2;
        const waveY = Math.cos(time.current * 0.001 + particle.phase) * 1;
        particle.vx += waveX * 0.01;
        particle.vy += waveY * 0.01;
        break;

      case 'orbit':
        const orbitRadius = 100 + particle.energy * 50;
        const orbitSpeed = 0.001 + particle.energy * 0.001;
        const targetX = centerX + Math.cos(time.current * orbitSpeed + particle.phase) * orbitRadius;
        const targetY = centerY + Math.sin(time.current * orbitSpeed + particle.phase) * orbitRadius;

        particle.vx += (targetX - particle.x) * 0.01;
        particle.vy += (targetY - particle.y) * 0.01;
        break;

      case 'spiral':
        const spiralRadius = (time.current * 0.1 + particle.phase * 10) % 200;
        const spiralAngle = time.current * 0.002 + particle.phase;
        const spiralX = centerX + Math.cos(spiralAngle) * spiralRadius;
        const spiralY = centerY + Math.sin(spiralAngle) * spiralRadius;

        particle.vx += (spiralX - particle.x) * 0.005;
        particle.vy += (spiralY - particle.y) * 0.005;
        break;

      case 'pulse':
        const pulseIntensity = Math.sin(time.current * 0.005 + particle.phase) * 0.5 + 0.5;
        particle.opacity = 0.2 + pulseIntensity * 0.6;
        particle.size = 1 + pulseIntensity * 2;

        const pulseForce = Math.sin(time.current * 0.003 + particle.phase) * 0.02;
        particle.vx += (Math.random() - 0.5) * pulseForce;
        particle.vy += (Math.random() - 0.5) * pulseForce;
        break;

      case 'magnetic':
        const mouseX = mousePosition.current.x;
        const mouseY = mousePosition.current.y;
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.02;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }

        // Add some repulsion between particles
        particles.current.forEach(other => {
          if (other.id !== particle.id) {
            const odx = particle.x - other.x;
            const ody = particle.y - other.y;
            const odistance = Math.sqrt(odx * odx + ody * ody);
            if (odistance < 50 && odistance > 0) {
              const repulsion = 0.001;
              particle.vx += (odx / odistance) * repulsion;
              particle.vy += (ody / odistance) * repulsion;
            }
          }
        });
        break;
    }

    // Apply velocity
    const newX = particle.x + particle.vx;
    const newY = particle.y + particle.vy;

    // Check if new position would be outside section gaps
    if (!isInSectionGap(newX, newY)) {
      // Reverse velocity to stay in section gaps
      if (newY < 100) { // Too high
        particle.vy = Math.abs(particle.vy); // Force downward
      }
      if (newY > dimensions.height - 100) { // Too low
        particle.vy = -Math.abs(particle.vy); // Force upward
      }
      // For horizontal boundaries, reverse horizontal velocity
      if (newX < 0 || newX > dimensions.width) {
        particle.vx = -particle.vx;
      }
    } else {
      particle.x = newX;
      particle.y = newY;
    }

    // Boundary conditions with wrapping
    if (particle.x < 0) particle.x = dimensions.width;
    if (particle.x > dimensions.width) particle.x = 0;
    if (particle.y < 0) particle.y = dimensions.height;
    if (particle.y > dimensions.height) particle.y = 0;

    // Update color based on current section
    if (Math.random() < 0.001) {
      const colors = config.colors;
      particle.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }, [currentSection, dimensions, sectionConfigs, isInSectionGap]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    time.current += 16;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    const config = sectionConfigs[currentSection as keyof typeof sectionConfigs];

    // Update and render particles
    particles.current.forEach(particle => {
      updateParticleBehavior(particle, 16);

      // Only render if particle is in section gap
      if (!isInSectionGap(particle.x, particle.y)) {
        return;
      }

      // Render trail
      particle.trail.forEach((point) => {
        if (point.opacity > 0.01 && isInSectionGap(point.x, point.y)) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(point.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      });

      // Render main particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

      // Create glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${particle.color}00`);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Core particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    // Connection lines between nearby particles
    if (config.behavior === 'magnetic' || config.behavior === 'orbit') {
      particles.current.forEach((particle, i) => {
        // Skip if particle is not in section gap
        if (!isInSectionGap(particle.x, particle.y)) return;

        particles.current.slice(i + 1).forEach(other => {
          // Skip if other particle is not in section gap
          if (!isInSectionGap(other.x, other.y)) return;

          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [currentSection, dimensions, updateParticleBehavior, isInSectionGap]);

  // Detect current section based on scroll position and track scrolling state
  useEffect(() => {
    const detectSection = () => {
      const sections = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      const sectionHeight = documentHeight / sections.length;
      const currentIndex = Math.min(
        Math.floor(scrollY / sectionHeight),
        sections.length - 1
      );

      const newSection = sections[currentIndex];
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }

      // Detect scroll direction
      const direction = scrollY > lastScrollY.current ? 'down' : scrollY < lastScrollY.current ? 'up' : 'none';
      setScrollDirection(direction);
      lastScrollY.current = scrollY;

      // Set scrolling state
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set timeout to stop showing particles after scroll ends
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Hide particles 150ms after scroll stops
    };

    const handleScroll = () => {
      detectSection();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentSection]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize particles when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initializeParticles();
    }
  }, [dimensions, initializeParticles]);

  // Start animation
  useEffect(() => {
    if (particles.current.length > 0) {
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        background: 'transparent'
      }}
    />
  );
}