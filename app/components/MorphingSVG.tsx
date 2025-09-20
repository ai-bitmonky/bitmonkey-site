'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface MorphingSVGProps {
  icons: LucideIcon[];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'normal' | 'fast';
  trigger?: 'auto' | 'hover' | 'click' | 'scroll';
  color?: string;
  className?: string;
  morphDuration?: number;
  pauseDuration?: number;
  easing?: string;
  glow?: boolean;
}

export default function MorphingSVG({
  icons,
  size = 'md',
  speed = 'normal',
  trigger = 'auto',
  color = 'currentColor',
  className = '',
  morphDuration = 800,
  pauseDuration = 2000,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  glow = false
}: MorphingSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const componentId = React.useId();

  const sizeMap = {
    sm: { width: 16, height: 16, strokeWidth: 2 },
    md: { width: 24, height: 24, strokeWidth: 2 },
    lg: { width: 32, height: 32, strokeWidth: 1.5 },
    xl: { width: 48, height: 48, strokeWidth: 1.5 }
  };

  const speedMap = {
    slow: { morph: 1200, pause: 3000 },
    normal: { morph: 800, pause: 2000 },
    fast: { morph: 500, pause: 1000 }
  };

  const { width, height, strokeWidth } = sizeMap[size];
  const { morph: morphSpeed, pause: pauseSpeed } = speedMap[speed];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get SVG path data from Lucide icon
  const getIconPath = (IconComponent: LucideIcon): string => {
    if (!isMounted) return '';

    // Create a temporary container to render the icon
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    try {
      const iconElement = React.createElement(IconComponent, { size: width });
      if (React.isValidElement(iconElement) && iconElement.props.children) {
        tempDiv.innerHTML = `<svg>${iconElement.props.children}</svg>`;
      } else {
        return '';
      }
    } catch (error) {
      return '';
    }
    document.body.appendChild(tempDiv);

    const paths = tempDiv.querySelectorAll('path, circle, rect, line, polyline, polygon');
    let pathData = '';

    paths.forEach((element, index) => {
      if (element.tagName === 'path') {
        pathData += (element as SVGPathElement).getAttribute('d') || '';
      } else if (element.tagName === 'circle') {
        const cx = parseFloat(element.getAttribute('cx') || '0');
        const cy = parseFloat(element.getAttribute('cy') || '0');
        const r = parseFloat(element.getAttribute('r') || '0');
        pathData += `M ${cx - r},${cy} A ${r},${r} 0 1,1 ${cx + r},${cy} A ${r},${r} 0 1,1 ${cx - r},${cy}`;
      } else if (element.tagName === 'rect') {
        const x = parseFloat(element.getAttribute('x') || '0');
        const y = parseFloat(element.getAttribute('y') || '0');
        const w = parseFloat(element.getAttribute('width') || '0');
        const h = parseFloat(element.getAttribute('height') || '0');
        pathData += `M ${x},${y} L ${x + w},${y} L ${x + w},${y + h} L ${x},${y + h} Z`;
      } else if (element.tagName === 'line') {
        const x1 = parseFloat(element.getAttribute('x1') || '0');
        const y1 = parseFloat(element.getAttribute('y1') || '0');
        const x2 = parseFloat(element.getAttribute('x2') || '0');
        const y2 = parseFloat(element.getAttribute('y2') || '0');
        pathData += `M ${x1},${y1} L ${x2},${y2}`;
      }
      if (index < paths.length - 1) pathData += ' ';
    });

    document.body.removeChild(tempDiv);
    return pathData;
  };

  const morphToNextIcon = () => {
    if (icons.length <= 1 || isAnimating) return;

    setIsAnimating(true);
    const nextIndex = (currentIconIndex + 1) % icons.length;

    const currentPath = getIconPath(icons[currentIconIndex]);
    const nextPath = getIconPath(icons[nextIndex]);

    if (svgRef.current) {
      const path = svgRef.current.querySelector('path');
      if (path) {
        // Create morphing animation
        const animation = path.animate([
          { d: currentPath },
          { d: nextPath }
        ], {
          duration: morphSpeed,
          easing,
          fill: 'forwards'
        });

        animation.onfinish = () => {
          setCurrentIconIndex(nextIndex);
          setIsAnimating(false);
        };
      }
    }
  };

  const handleTrigger = () => {
    if (trigger === 'hover' || trigger === 'click') {
      morphToNextIcon();
    }
  };

  useEffect(() => {
    if (!isMounted || trigger !== 'auto' || icons.length <= 1) return;

    intervalRef.current = setInterval(() => {
      morphToNextIcon();
    }, morphSpeed + pauseSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIconIndex, isMounted, icons.length, morphSpeed, pauseSpeed, trigger]);

  useEffect(() => {
    if (!isMounted || trigger !== 'scroll') return;

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const targetIndex = Math.floor(scrollPercent * icons.length);
      const clampedIndex = Math.min(Math.max(targetIndex, 0), icons.length - 1);

      if (clampedIndex !== currentIconIndex && !isAnimating) {
        setCurrentIconIndex(clampedIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIconIndex, isAnimating, icons.length, isMounted, trigger]);

  if (!isMounted || icons.length === 0) {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
      </div>
    );
  }

  const CurrentIcon = icons[currentIconIndex];
  const currentPath = getIconPath(CurrentIcon);

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      style={{ cursor: trigger === 'click' || trigger === 'hover' ? 'pointer' : 'default' }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-300 ${glow ? 'drop-shadow-lg' : ''}`}
        style={{
          filter: glow ? `drop-shadow(0 0 8px ${color}40)` : 'none'
        }}
      >
        <defs>
          {glow && (
            <filter id={`glow-${componentId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
        </defs>

        <path
          d={currentPath}
          style={{
            transition: `d ${morphSpeed}ms ${easing}`,
            filter: glow ? `url(#glow-${componentId})` : 'none'
          }}
        />

        {/* Loading indicator during animation */}
        {isAnimating && (
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.3"
            fill="none"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 63;31.5 31.5;0 63"
              dur={`${morphSpeed}ms`}
              repeatCount="1"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}

// Preset morphing sequences for common use cases
export const MorphingPresets = {
  // Loading states
  loading: ['Loader', 'RotateCcw', 'RefreshCw'],

  // Navigation states
  menu: ['Menu', 'X'],

  // Social media sequence
  social: ['Github', 'Linkedin', 'Twitter', 'Instagram'],

  // Development tools
  development: ['Code', 'Terminal', 'Settings', 'Zap'],

  // Business process
  process: ['Target', 'TrendingUp', 'Award', 'CheckCircle'],

  // Communication
  contact: ['Mail', 'Phone', 'MessageCircle', 'Send'],

  // Technology stack
  tech: ['Database', 'Server', 'Cloud', 'Shield'],

  // User interaction
  interaction: ['Mouse', 'Hand', 'Eye', 'Heart'],

  // Progress indicators
  progress: ['Circle', 'MoreHorizontal', 'CheckCircle', 'Award']
};

// Utility component for quick preset usage
interface MorphingPresetProps extends Omit<MorphingSVGProps, 'icons'> {
  preset: keyof typeof MorphingPresets;
}

export function MorphingPreset({ preset, ...props }: MorphingPresetProps) {
  // This would need to be implemented with actual icon imports
  // For now, return a placeholder
  return (
    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
      <span className="text-xs text-purple-600">{preset[0].toUpperCase()}</span>
    </div>
  );
}