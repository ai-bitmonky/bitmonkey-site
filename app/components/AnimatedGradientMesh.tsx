'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GradientStop {
  color: string;
  position: number;
  opacity?: number;
}

interface AnimatedGradientMeshProps {
  colors?: string[];
  width?: string | number;
  height?: string | number;
  speed?: 'slow' | 'normal' | 'fast';
  intensity?: 'subtle' | 'medium' | 'strong';
  pattern?: 'organic' | 'geometric' | 'waves' | 'noise' | 'plasma' | 'marble';
  direction?: 'radial' | 'linear' | 'conic';
  blur?: boolean;
  interactive?: boolean;
  className?: string;
  autoPlay?: boolean;
  timeOfDay?: boolean; // Changes colors based on time
}

export default function AnimatedGradientMesh({
  colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
  width = '100%',
  height = '100vh',
  speed = 'normal',
  intensity = 'medium',
  pattern = 'organic',
  direction = 'radial',
  blur = true,
  interactive = false,
  className = '',
  autoPlay = true,
  timeOfDay = false
}: AnimatedGradientMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const componentId = React.useId();

  const speedMap = {
    slow: 0.3,
    normal: 0.6,
    fast: 1.2
  };

  const intensityMap = {
    subtle: 0.3,
    medium: 0.6,
    strong: 1.0
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    ctx.scale(dpr, dpr);

    const speedFactor = speedMap[speed];
    const intensityFactor = intensityMap[intensity];

    // Get time-based colors if enabled
    const getCurrentColors = () => {
      if (!timeOfDay) return colors;

      const hour = new Date().getHours();

      if (hour >= 6 && hour < 12) {
        // Morning - warmer colors
        return ['#FEF3C7', '#FDE68A', '#F59E0B', '#D97706', '#92400E'];
      } else if (hour >= 12 && hour < 18) {
        // Afternoon - bright colors
        return ['#DBEAFE', '#93C5FD', '#3B82F6', '#1D4ED8', '#1E3A8A'];
      } else if (hour >= 18 && hour < 22) {
        // Evening - sunset colors
        return ['#FED7D7', '#FBB6CE', '#F687B3', '#ED64A6', '#D53F8C'];
      } else {
        // Night - darker colors
        return ['#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF'];
      }
    };

    const currentColors = getCurrentColors();

    const drawGradientMesh = () => {
      if (!ctx) return;

      const time = timeRef.current * speedFactor;
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Generate gradient points based on pattern
      const generatePoints = () => {
        const points = [];
        const numPoints = pattern === 'geometric' ? 6 : 8;

        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2 + time * 0.1;
          let x, y;

          switch (pattern) {
            case 'organic':
              x = 0.5 + Math.sin(angle + time * 0.3) * 0.3 * intensityFactor;
              y = 0.5 + Math.cos(angle + time * 0.2) * 0.3 * intensityFactor;
              break;
            case 'waves':
              x = (i / numPoints) + Math.sin(time * 0.5 + i) * 0.1 * intensityFactor;
              y = 0.5 + Math.sin(time * 0.3 + i * 0.5) * 0.2 * intensityFactor;
              break;
            case 'noise':
              x = 0.5 + (Math.random() - 0.5) * 0.4 * intensityFactor;
              y = 0.5 + (Math.random() - 0.5) * 0.4 * intensityFactor;
              break;
            case 'plasma':
              x = 0.5 + Math.sin(angle * 2 + time) * 0.3 * intensityFactor;
              y = 0.5 + Math.cos(angle * 3 + time * 0.7) * 0.3 * intensityFactor;
              break;
            case 'marble':
              x = 0.5 + Math.sin(angle + time * 0.2) * Math.cos(time * 0.1) * 0.4 * intensityFactor;
              y = 0.5 + Math.cos(angle + time * 0.15) * Math.sin(time * 0.12) * 0.4 * intensityFactor;
              break;
            default: // geometric
              x = 0.5 + Math.sin(angle) * 0.3 * intensityFactor;
              y = 0.5 + Math.cos(angle) * 0.3 * intensityFactor;
          }

          // Add mouse interaction
          if (interactive) {
            const mouseDist = Math.sqrt((x - mousePosition.x) ** 2 + (y - mousePosition.y) ** 2);
            const mouseInfluence = Math.max(0, 1 - mouseDist * 2) * 0.1;
            x += (mousePosition.x - x) * mouseInfluence;
            y += (mousePosition.y - y) * mouseInfluence;
          }

          points.push({
            x: Math.max(0, Math.min(1, x)) * canvasWidth,
            y: Math.max(0, Math.min(1, y)) * canvasHeight,
            color: currentColors[i % currentColors.length]
          });
        }

        return points;
      };

      const points = generatePoints();

      // Create multiple overlapping gradients for mesh effect
      points.forEach((point, index) => {
        const nextPoint = points[(index + 1) % points.length];
        const radius = Math.min(canvasWidth, canvasHeight) * 0.8;

        let gradient;

        switch (direction) {
          case 'radial':
            gradient = ctx.createRadialGradient(
              point.x, point.y, 0,
              point.x, point.y, radius
            );
            break;
          case 'conic':
            gradient = ctx.createConicGradient(
              time + index,
              point.x, point.y
            );
            break;
          default: // linear
            gradient = ctx.createLinearGradient(
              point.x, point.y,
              nextPoint.x, nextPoint.y
            );
        }

        // Add color stops
        const alpha = intensityFactor * 0.3;
        gradient.addColorStop(0, point.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.5, point.color + Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, 'transparent');

        // Draw gradient
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      });

      // Add noise texture
      if (pattern === 'noise' || pattern === 'marble') {
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * 10 * intensityFactor;
          data[i] = Math.min(255, Math.max(0, data[i] + noise));     // Red
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // Green
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // Blue
        }

        ctx.putImageData(imageData, 0, 0);
      }

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
    };

    const animate = () => {
      if (!autoPlay) {
        drawGradientMesh();
        return;
      }

      timeRef.current += 0.016; // ~60fps
      drawGradientMesh();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      canvas.style.width = newRect.width + 'px';
      canvas.style.height = newRect.height + 'px';
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, colors, speed, intensity, pattern, direction, autoPlay, timeOfDay, mousePosition, interactive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  if (!isMounted) {
    return (
      <div
        className={`gradient-mesh-loading ${className}`}
        style={{ width, height }}
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className={`gradient-mesh-container relative overflow-hidden ${className}`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${blur ? 'gradient-mesh-blur' : ''}`}
        style={{
          filter: blur ? 'blur(40px) saturate(1.5)' : 'none',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Overlay for additional effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,255,255,0.1) 100%)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Development info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded">
          Pattern: {pattern} | Speed: {speed} | Interactive: {interactive ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const GradientMeshPresets = {
  hero: {
    colors: ['#8B5CF6', '#06B6D4', '#10B981'],
    pattern: 'organic' as const,
    speed: 'slow' as const,
    intensity: 'medium' as const,
    blur: true,
    timeOfDay: true
  },

  background: {
    colors: ['#F3F4F6', '#E5E7EB', '#D1D5DB'],
    pattern: 'waves' as const,
    speed: 'slow' as const,
    intensity: 'subtle' as const,
    blur: true,
    interactive: false
  },

  accent: {
    colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
    pattern: 'plasma' as const,
    speed: 'fast' as const,
    intensity: 'strong' as const,
    blur: false,
    interactive: true
  },

  ambient: {
    colors: ['#1F2937', '#374151', '#4B5563'],
    pattern: 'marble' as const,
    speed: 'slow' as const,
    intensity: 'subtle' as const,
    blur: true,
    timeOfDay: true
  }
};

// Quick preset component
interface GradientMeshPresetProps extends Omit<AnimatedGradientMeshProps, keyof typeof GradientMeshPresets.hero> {
  preset: keyof typeof GradientMeshPresets;
}

export function GradientMeshPreset({ preset, ...props }: GradientMeshPresetProps) {
  const presetConfig = GradientMeshPresets[preset];

  return (
    <AnimatedGradientMesh
      {...presetConfig}
      {...props}
    />
  );
}