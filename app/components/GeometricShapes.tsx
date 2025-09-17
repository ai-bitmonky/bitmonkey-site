'use client';

import React from 'react';

interface GeometricShapeProps {
  type: 'blob' | 'grid' | 'lines' | 'dots' | 'triangle' | 'circle' | 'hexagon' | 'geometric-grid' | 'diagonal-lines' | 'circuit-pattern' | 'mesh-grid';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  animate?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  opacity?: number;
}

const GeometricShape: React.FC<GeometricShapeProps> = ({
  type,
  className = '',
  size = 'md',
  color = 'rgba(99, 102, 241, 0.1)',
  animate = true,
  position = 'center',
  opacity = 1
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const positionClasses = {
    'top-left': 'absolute top-4 left-4',
    'top-right': 'absolute top-4 right-4',
    'bottom-left': 'absolute bottom-4 left-4',
    'bottom-right': 'absolute bottom-4 right-4',
    'center': 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  const animationClass = animate ? 'animate-geometric' : '';

  const renderShape = () => {
    switch (type) {
      case 'blob':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M40.7,-58.6C54.1,-45.8,67.2,-34.2,75.4,-19.4C83.6,-4.6,86.9,13.4,82.7,29.1C78.5,44.8,66.8,58.2,52.3,69.1C37.8,80,20.5,88.4,2.6,84.8C-15.3,81.2,-30.6,65.6,-44.2,48.8C-57.8,32,-69.7,14,-73.4,-6.5C-77.1,-27,-72.6,-50,-61.8,-64.8C-51,-79.6,-33.9,-86.2,-17.9,-82.9C-1.9,-79.6,13,-66.4,26.8,-58.7C40.6,-51,53.3,-48.8,40.7,-58.6Z"
              fill={color}
              className={animationClass}
            />
          </svg>
        );

      case 'grid':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {Array.from({ length: 6 }, (_, i) =>
              Array.from({ length: 6 }, (_, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={20 + i * 30}
                  cy={20 + j * 30}
                  r="2"
                  fill={color}
                  className={animate ? `animate-pulse` : ''}
                  style={{ animationDelay: `${(i + j) * 0.1}s` }}
                />
              ))
            )}
          </svg>
        );

      case 'lines':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={i}
                x1={i * 25}
                y1="0"
                x2={i * 25}
                y2="200"
                stroke={color}
                strokeWidth="1"
                className={animate ? 'animate-pulse' : ''}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 25}
                x2="200"
                y2={i * 25}
                stroke={color}
                strokeWidth="1"
                className={animate ? 'animate-pulse' : ''}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>
        );

      case 'dots':
        // Generate deterministic dot positions to avoid hydration mismatches
        const dots = Array.from({ length: 30 }, (_, i) => {
          const angle = (i * 137.5 * Math.PI) / 180; // Golden angle for even distribution
          const radius = Math.sqrt(i) * 8;
          const x = 100 + radius * Math.cos(angle);
          const y = 100 + radius * Math.sin(angle);
          return {
            cx: Math.max(5, Math.min(195, x)),
            cy: Math.max(5, Math.min(195, y)),
            r: 1.5 + (i % 3) * 0.5,
            delay: (i * 0.1) % 2
          };
        });

        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {dots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill={color}
                className={animate ? 'animate-ping' : ''}
                style={{ animationDelay: `${dot.delay}s` }}
              />
            ))}
          </svg>
        );

      case 'triangle':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon
              points="100,20 180,180 20,180"
              fill={color}
              className={animationClass}
            />
          </svg>
        );

      case 'circle':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeDasharray="10,5"
              className={animate ? 'animate-spin-slow' : ''}
            />
          </svg>
        );

      case 'hexagon':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon
              points="100,20 170,60 170,140 100,180 30,140 30,60"
              fill={color}
              className={animationClass}
            />
          </svg>
        );

      case 'geometric-grid':
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full" style={{ opacity }}>
            <defs>
              <pattern id="geometric-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill={color} />
                <line x1="20" y1="0" x2="20" y2="40" stroke={color} strokeWidth="0.5" opacity="0.6" />
                <line x1="0" y1="20" x2="40" y2="20" stroke={color} strokeWidth="0.5" opacity="0.6" />
              </pattern>
              <pattern id="grid-overlay" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#geometric-grid)" />
                <circle cx="40" cy="40" r="3" fill={color} className={animate ? 'animate-pulse' : ''} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-overlay)" />
          </svg>
        );

      case 'diagonal-lines':
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full" style={{ opacity }}>
            <defs>
              <pattern id="diagonal-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="15" x2="30" y2="15" stroke={color} strokeWidth="1" />
                <line x1="15" y1="0" x2="15" y2="30" stroke={color} strokeWidth="0.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-pattern)" className={animate ? 'animate-pulse' : ''} />
          </svg>
        );

      case 'circuit-pattern':
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full" style={{ opacity }}>
            <defs>
              <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Vertical lines */}
                <line x1="20" y1="0" x2="20" y2="60" stroke={color} strokeWidth="1" />
                <line x1="40" y1="0" x2="40" y2="60" stroke={color} strokeWidth="1" />
                {/* Horizontal lines */}
                <line x1="0" y1="20" x2="60" y2="20" stroke={color} strokeWidth="1" />
                <line x1="0" y1="40" x2="60" y2="40" stroke={color} strokeWidth="1" />
                {/* Connection nodes */}
                <circle cx="20" cy="20" r="2" fill={color} />
                <circle cx="40" cy="40" r="2" fill={color} />
                <circle cx="20" cy="40" r="1.5" fill={color} opacity="0.7" />
                <circle cx="40" cy="20" r="1.5" fill={color} opacity="0.7" />
                {/* Small connecting segments */}
                <line x1="20" y1="20" x2="40" y2="20" stroke={color} strokeWidth="2" opacity="0.8" />
                <line x1="20" y1="40" x2="40" y2="40" stroke={color} strokeWidth="2" opacity="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" className={animate ? 'animate-pulse' : ''} />
          </svg>
        );

      case 'mesh-grid':
        return (
          <svg viewBox="0 0 400 400" className="w-full h-full" style={{ opacity }}>
            <defs>
              <pattern id="mesh" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                {/* Main grid */}
                <rect width="50" height="50" fill="none" stroke={color} strokeWidth="0.5" />
                {/* Diagonal cross lines */}
                <line x1="0" y1="0" x2="50" y2="50" stroke={color} strokeWidth="0.3" opacity="0.6" />
                <line x1="50" y1="0" x2="0" y2="50" stroke={color} strokeWidth="0.3" opacity="0.6" />
                {/* Center point */}
                <circle cx="25" cy="25" r="1" fill={color} opacity="0.8" />
                {/* Corner points */}
                <circle cx="0" cy="0" r="0.5" fill={color} />
                <circle cx="50" cy="0" r="0.5" fill={color} />
                <circle cx="0" cy="50" r="0.5" fill={color} />
                <circle cx="50" cy="50" r="0.5" fill={color} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" className={animate ? 'animate-pulse' : ''} />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${sizeClasses[size]} ${positionClasses[position]} ${className} pointer-events-none z-0`} style={{ opacity }}>
      {renderShape()}
    </div>
  );
};

interface GeometricAccentProps {
  children: React.ReactNode;
  shapes?: Array<Omit<GeometricShapeProps, 'className'>>;
  className?: string;
}

const GeometricAccent: React.FC<GeometricAccentProps> = ({
  children,
  shapes = [],
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {shapes.map((shape, index) => (
        <GeometricShape key={index} {...shape} />
      ))}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export { GeometricShape, GeometricAccent };
export default GeometricAccent;