'use client';

import React, { useEffect, useRef, useState } from 'react';

interface DataSculptureProps {
  type?: 'cube' | 'pyramid' | 'sphere' | 'helix' | 'wave' | 'lattice';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  speed?: 'slow' | 'normal' | 'fast';
  intensity?: 'subtle' | 'medium' | 'bright';
  animationDuration?: number;
  className?: string;
  particles?: boolean;
  wireframe?: boolean;
}

export default function DataSculpture({
  type = 'cube',
  size = 'md',
  color = '#8B5CF6',
  speed = 'normal',
  intensity = 'medium',
  animationDuration = 4000,
  className = '',
  particles = false,
  wireframe = true
}: DataSculptureProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [time, setTime] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const componentId = React.useId();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sizeMap = {
    sm: { width: 120, height: 120, scale: 0.8 },
    md: { width: 160, height: 160, scale: 1.0 },
    lg: { width: 200, height: 200, scale: 1.2 },
    xl: { width: 240, height: 240, scale: 1.4 }
  };

  const speedMap = {
    slow: 0.2,
    normal: 0.4,
    fast: 0.6
  };

  const intensityMap = {
    subtle: 0.3,
    medium: 0.6,
    bright: 1.0
  };

  const { width, height, scale } = sizeMap[size];
  const speedFactor = speedMap[speed];
  const opacityFactor = intensityMap[intensity];

  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setTime(prev => prev + speedFactor);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [speedFactor, isMounted]);

  // Generate 3D-like cube sculpture
  const generateCube = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const size = 40 * scale;
    const rotation = time * 0.02;

    // Calculate 3D rotation for cube faces
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    // Front face
    const frontFace = [
      [centerX - size, centerY - size],
      [centerX + size, centerY - size],
      [centerX + size, centerY + size],
      [centerX - size, centerY + size]
    ];

    // Back face (with perspective)
    const depth = size * 0.5;
    const backFace = [
      [centerX - size + depth * cos, centerY - size - depth * sin],
      [centerX + size + depth * cos, centerY - size - depth * sin],
      [centerX + size + depth * cos, centerY + size - depth * sin],
      [centerX - size + depth * cos, centerY + size - depth * sin]
    ];

    return { frontFace, backFace };
  };

  // Generate 3D-like pyramid sculpture
  const generatePyramid = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const baseSize = 50 * scale;
    const height3d = 60 * scale;
    const rotation = time * 0.03;

    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    // Base vertices
    const base = [
      [centerX - baseSize, centerY + 20],
      [centerX + baseSize, centerY + 20],
      [centerX + baseSize * cos, centerY + 20 + baseSize * sin],
      [centerX - baseSize * cos, centerY + 20 - baseSize * sin]
    ];

    // Apex point
    const apex = [centerX + height3d * 0.3 * cos, centerY - height3d + height3d * 0.3 * sin];

    return { base, apex };
  };

  // Generate sphere sculpture with latitude/longitude lines
  const generateSphere = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 40 * scale;
    const rotation = time * 0.02;

    const meridians = [];
    const parallels = [];

    // Generate meridian lines (longitude)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + rotation;
      const meridian = [];
      for (let j = 0; j <= 20; j++) {
        const t = (j / 20) * Math.PI;
        const x = centerX + radius * Math.sin(t) * Math.cos(angle);
        const y = centerY + radius * Math.cos(t);
        meridian.push([x, y]);
      }
      meridians.push(meridian);
    }

    // Generate parallel lines (latitude)
    for (let i = 1; i < 5; i++) {
      const t = (i / 5) * Math.PI;
      const r = radius * Math.sin(t);
      const y = centerY + radius * Math.cos(t);
      const parallel = [];
      for (let j = 0; j <= 32; j++) {
        const angle = (j / 32) * Math.PI * 2 + rotation;
        const x = centerX + r * Math.cos(angle);
        parallel.push([x, y]);
      }
      parallels.push(parallel);
    }

    return { meridians, parallels };
  };

  // Generate helix sculpture
  const generateHelix = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 30 * scale;
    const helixHeight = 80 * scale;
    const points = [];

    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 4 + time * 0.02;
      const y = centerY - helixHeight/2 + (i / 100) * helixHeight;
      const x = centerX + radius * Math.cos(t);
      points.push([x, y]);
    }

    return points;
  };

  // Generate particle system
  const generateParticles = () => {
    if (!particles) return [];

    const particleList = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + time * 0.01;
      const radius = 20 + 40 * Math.sin(time * 0.05 + i);
      const x = width / 2 + radius * Math.cos(angle);
      const y = height / 2 + radius * Math.sin(angle);
      particleList.push({ x, y, opacity: 0.3 + 0.4 * Math.sin(time * 0.1 + i) });
    }
    return particleList;
  };

  const renderCube = () => {
    const { frontFace, backFace } = generateCube();

    return (
      <g>
        {/* Back face */}
        <polygon
          points={backFace.map(p => p.join(',')).join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity={opacityFactor * 0.4}
          strokeDasharray={wireframe ? "3,2" : "none"}
        />

        {/* Connecting edges */}
        {frontFace.map((point, i) => (
          <line
            key={i}
            x1={point[0]}
            y1={point[1]}
            x2={backFace[i][0]}
            y2={backFace[i][1]}
            stroke={color}
            strokeWidth="1"
            opacity={opacityFactor * 0.6}
            strokeDasharray={wireframe ? "2,1" : "none"}
          />
        ))}

        {/* Front face */}
        <polygon
          points={frontFace.map(p => p.join(',')).join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity={opacityFactor}
          strokeDasharray={wireframe ? "4,2" : "none"}
        />
      </g>
    );
  };

  const renderPyramid = () => {
    const { base, apex } = generatePyramid();

    return (
      <g>
        {/* Base */}
        <polygon
          points={base.map(p => p.join(',')).join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity={opacityFactor * 0.7}
          strokeDasharray={wireframe ? "3,2" : "none"}
        />

        {/* Edges to apex */}
        {base.map((point, i) => (
          <line
            key={i}
            x1={point[0]}
            y1={point[1]}
            x2={apex[0]}
            y2={apex[1]}
            stroke={color}
            strokeWidth="1.5"
            opacity={opacityFactor}
            strokeDasharray={wireframe ? "2,1" : "none"}
          />
        ))}

        {/* Apex point */}
        <circle
          cx={apex[0]}
          cy={apex[1]}
          r="2"
          fill={color}
          opacity={opacityFactor}
        />
      </g>
    );
  };

  const renderSphere = () => {
    const { meridians, parallels } = generateSphere();

    return (
      <g>
        {/* Meridian lines */}
        {meridians.map((meridian, i) => (
          <path
            key={`meridian-${i}`}
            d={`M ${meridian.map(p => p.join(' ')).join(' L ')}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity={opacityFactor * 0.8}
            strokeDasharray={wireframe ? "2,1" : "none"}
          />
        ))}

        {/* Parallel lines */}
        {parallels.map((parallel, i) => (
          <path
            key={`parallel-${i}`}
            d={`M ${parallel.map(p => p.join(' ')).join(' L ')} Z`}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity={opacityFactor * 0.6}
            strokeDasharray={wireframe ? "3,2" : "none"}
          />
        ))}
      </g>
    );
  };

  const renderHelix = () => {
    const points = generateHelix();

    return (
      <g>
        <path
          d={`M ${points.map(p => p.join(' ')).join(' L ')}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity={opacityFactor}
          strokeDasharray={wireframe ? "4,2" : "none"}
        />

        {/* Connection points */}
        {points.filter((_, i) => i % 5 === 0).map((point, i) => (
          <circle
            key={i}
            cx={point[0]}
            cy={point[1]}
            r="1.5"
            fill={color}
            opacity={opacityFactor * 0.8}
          />
        ))}
      </g>
    );
  };

  const renderSculpture = () => {
    if (!isMounted) {
      return (
        <circle
          cx={width / 2}
          cy={height / 2}
          r="3"
          fill={color}
          opacity={opacityFactor * 0.3}
        />
      );
    }

    switch (type) {
      case 'cube':
        return renderCube();
      case 'pyramid':
        return renderPyramid();
      case 'sphere':
        return renderSphere();
      case 'helix':
        return renderHelix();
      default:
        return renderCube();
    }
  };

  const particleList = isMounted ? generateParticles() : [];

  if (!isMounted) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0"
        >
          <circle
            cx={width / 2}
            cy={height / 2}
            r="3"
            fill={color}
            opacity={opacityFactor * 0.3}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0"
      >
        <defs>
          {/* Glow filter */}
          <filter id={`data-glow-${componentId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Gradient for depth */}
          <linearGradient id={`data-gradient-${componentId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={opacityFactor}>
              <animate attributeName="stop-opacity"
                values={`${opacityFactor * 0.5};${opacityFactor};${opacityFactor * 0.5}`}
                dur={`${animationDuration}ms`}
                repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor={color} stopOpacity={opacityFactor * 0.7}>
              <animate attributeName="stop-opacity"
                values={`${opacityFactor * 0.7};${opacityFactor * 0.3};${opacityFactor * 0.7}`}
                dur={`${animationDuration}ms`}
                repeatCount="indefinite"
                begin="500ms" />
            </stop>
            <stop offset="100%" stopColor={color} stopOpacity={opacityFactor * 0.3}>
              <animate attributeName="stop-opacity"
                values={`${opacityFactor * 0.3};${opacityFactor * 0.8};${opacityFactor * 0.3}`}
                dur={`${animationDuration}ms`}
                repeatCount="indefinite"
                begin="1000ms" />
            </stop>
          </linearGradient>
        </defs>

        {/* Main sculpture */}
        <g filter={`url(#data-glow-${componentId})`}>
          {renderSculpture()}
        </g>

        {/* Particle system */}
        {particleList.map((particle, index) => (
          <circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r="1"
            fill={color}
            opacity={particle.opacity * opacityFactor}
          >
            <animate attributeName="r"
              values="0.5;2;0.5"
              dur="2000ms"
              repeatCount="indefinite"
              begin={`${index * 100}ms`} />
          </circle>
        ))}

        {/* Central core */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r="2"
          fill={color}
          opacity={opacityFactor * 0.9}
        >
          <animate attributeName="r"
            values="1;4;1"
            dur={`${animationDuration}ms`}
            repeatCount="indefinite" />
          <animate attributeName="opacity"
            values={`${opacityFactor * 0.5};${opacityFactor};${opacityFactor * 0.5}`}
            dur={`${animationDuration}ms`}
            repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}