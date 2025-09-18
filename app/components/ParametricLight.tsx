'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParametricLightProps {
  type?: 'spiral' | 'wave' | 'orbit' | 'helix' | 'lissajous' | 'rose' | 'butterfly' | 'infinity';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  speed?: 'slow' | 'normal' | 'fast';
  intensity?: 'subtle' | 'medium' | 'bright';
  animationDuration?: number;
  className?: string;
  glow?: boolean;
  trail?: boolean;
}

export default function ParametricLight({
  type = 'spiral',
  size = 'md',
  color = '#8B5CF6',
  speed = 'normal',
  intensity = 'medium',
  animationDuration = 3000,
  className = '',
  glow = true,
  trail = false
}: ParametricLightProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [time, setTime] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const componentId = React.useId();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sizeMap = {
    sm: { width: 100, height: 100, strokeWidth: 1.5 },
    md: { width: 150, height: 150, strokeWidth: 2 },
    lg: { width: 200, height: 200, strokeWidth: 2.5 },
    xl: { width: 250, height: 250, strokeWidth: 3 }
  };

  const speedMap = {
    slow: 0.3,
    normal: 0.5,
    fast: 0.8
  };

  const intensityMap = {
    subtle: 0.4,
    medium: 0.7,
    bright: 1.0
  };

  const { width, height, strokeWidth } = sizeMap[size];
  const speedFactor = speedMap[speed];
  const opacityFactor = intensityMap[intensity];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + speedFactor);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [speedFactor]);

  // Parametric equations for different light patterns
  const generatePath = () => {
    const points: string[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) * 0.3;

    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2 + time * 0.1;
      let x = centerX;
      let y = centerY;

      switch (type) {
        case 'spiral':
          const spiralRadius = scale * (0.5 + 0.5 * Math.sin(time * 0.05)) * (i / 100);
          x = centerX + spiralRadius * Math.cos(t * 3);
          y = centerY + spiralRadius * Math.sin(t * 3);
          break;

        case 'wave':
          x = centerX + (i - 50) * (scale / 25);
          y = centerY + scale * 0.5 * Math.sin(t + i * 0.2) * Math.cos(time * 0.03);
          break;

        case 'orbit':
          const orbitRadius = scale * (0.8 + 0.2 * Math.sin(time * 0.04));
          x = centerX + orbitRadius * Math.cos(t);
          y = centerY + orbitRadius * Math.sin(t) * 0.6;
          break;

        case 'helix':
          const helixRadius = scale * 0.6;
          x = centerX + helixRadius * Math.cos(t);
          y = centerY + helixRadius * Math.sin(t) + (i - 50) * 0.5;
          break;

        case 'lissajous':
          x = centerX + scale * Math.sin(t * 3 + time * 0.02);
          y = centerY + scale * Math.sin(t * 2 + time * 0.03) * 0.8;
          break;

        case 'rose':
          const k = 4; // number of petals
          const roseRadius = scale * Math.cos(k * t) * (0.7 + 0.3 * Math.sin(time * 0.05));
          x = centerX + roseRadius * Math.cos(t);
          y = centerY + roseRadius * Math.sin(t);
          break;

        case 'butterfly':
          const butterflyRadius = scale * Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
          x = centerX + (butterflyRadius * 0.1) * Math.cos(t);
          y = centerY + (butterflyRadius * 0.1) * Math.sin(t);
          break;

        case 'infinity':
          const infinityScale = scale * 0.8;
          x = centerX + infinityScale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          y = centerY + infinityScale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
          break;
      }

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }

    return points.join(' ');
  };

  // Generate trail effect points
  const generateTrailPoints = () => {
    if (!trail) return [];

    const trailPoints = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) * 0.3;

    for (let i = 0; i < 5; i++) {
      const trailTime = time - i * 0.5;
      const t = trailTime * 0.1;
      let x = centerX;
      let y = centerY;

      switch (type) {
        case 'spiral':
          const spiralRadius = scale * 0.7;
          x = centerX + spiralRadius * Math.cos(t * 3);
          y = centerY + spiralRadius * Math.sin(t * 3);
          break;
        case 'orbit':
          const orbitRadius = scale * 0.8;
          x = centerX + orbitRadius * Math.cos(t);
          y = centerY + orbitRadius * Math.sin(t) * 0.6;
          break;
        // Add more cases as needed
        default:
          continue;
      }

      trailPoints.push({ x, y, opacity: (5 - i) / 5 * opacityFactor });
    }

    return trailPoints;
  };

  const pathData = isMounted ? generatePath() : "M 0 0";
  const trailPoints = isMounted ? generateTrailPoints() : [];

  if (!isMounted) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0"
        >
          {/* Static placeholder while mounting */}
          <circle
            cx={width / 2}
            cy={height / 2}
            r={strokeWidth}
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
          {glow && (
            <filter id={`parametric-glow-${componentId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}

          {/* Gradient definitions */}
          <linearGradient id={`light-gradient-${componentId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={opacityFactor}>
              <animate attributeName="stop-opacity"
                values={`${opacityFactor * 0.3};${opacityFactor};${opacityFactor * 0.3}`}
                dur={`${animationDuration}ms`}
                repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor={color} stopOpacity={opacityFactor * 0.8}>
              <animate attributeName="stop-opacity"
                values={`${opacityFactor * 0.8};${opacityFactor * 0.4};${opacityFactor * 0.8}`}
                dur={`${animationDuration}ms`}
                repeatCount="indefinite"
                begin="500ms" />
            </stop>
            <stop offset="100%" stopColor={color} stopOpacity={opacityFactor * 0.2}>
              <animate attributeName="stop-opacity"
                values={`${opacityFactor * 0.2};${opacityFactor * 0.6};${opacityFactor * 0.2}`}
                dur={`${animationDuration}ms`}
                repeatCount="indefinite"
                begin="1000ms" />
            </stop>
          </linearGradient>

          {/* Radial gradient for light points */}
          <radialGradient id={`light-point-${componentId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity={opacityFactor} />
            <stop offset="70%" stopColor={color} stopOpacity={opacityFactor * 0.3} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Main parametric light path */}
        <path
          d={pathData}
          fill="none"
          stroke={`url(#light-gradient-${componentId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={glow ? `url(#parametric-glow-${componentId})` : undefined}
          opacity={opacityFactor}
        >
          <animate attributeName="stroke-dasharray"
            values="0,1000;1000,0;0,1000"
            dur={`${animationDuration * 2}ms`}
            repeatCount="indefinite" />
        </path>

        {/* Trail effect points */}
        {trail && trailPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={strokeWidth * 2}
            fill={`url(#light-point-${componentId})`}
            opacity={point.opacity}
            filter={glow ? `url(#parametric-glow-${componentId})` : undefined}
          >
            <animate attributeName="r"
              values={`${strokeWidth};${strokeWidth * 3};${strokeWidth}`}
              dur="1000ms"
              repeatCount="indefinite"
              begin={`${index * 200}ms`} />
          </circle>
        ))}

        {/* Central light source */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={strokeWidth * 1.5}
          fill={color}
          opacity={opacityFactor * 0.8}
          filter={glow ? `url(#parametric-glow-${componentId})` : undefined}
        >
          <animate attributeName="r"
            values={`${strokeWidth * 0.5};${strokeWidth * 3};${strokeWidth * 0.5}`}
            dur={`${animationDuration}ms`}
            repeatCount="indefinite" />
          <animate attributeName="opacity"
            values={`${opacityFactor * 0.4};${opacityFactor};${opacityFactor * 0.4}`}
            dur={`${animationDuration}ms`}
            repeatCount="indefinite" />
        </circle>

        {/* Ambient light particles */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = Math.min(width, height) * 0.4;
          const x = width / 2 + radius * Math.cos(angle);
          const y = height / 2 + radius * Math.sin(angle);

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1"
              fill={color}
              opacity={opacityFactor * 0.3}
            >
              <animate attributeName="opacity"
                values={`0;${opacityFactor * 0.6};0`}
                dur={`${animationDuration + i * 200}ms`}
                repeatCount="indefinite"
                begin={`${i * 300}ms`} />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={`0 ${width / 2} ${height / 2};360 ${width / 2} ${height / 2}`}
                dur={`${animationDuration * 3}ms`}
                repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}