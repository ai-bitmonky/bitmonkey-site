'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface MorphingIconProps {
  fromIcon: LucideIcon;
  toIcon: LucideIcon;
  size?: number;
  color?: string;
  trigger?: 'hover' | 'auto' | 'click';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  glow?: boolean;
  reverse?: boolean;
}

export default function MorphingIcon({
  fromIcon: FromIcon,
  toIcon: ToIcon,
  size = 24,
  color = 'currentColor',
  trigger = 'hover',
  speed = 'normal',
  className = '',
  glow = false,
  reverse = false
}: MorphingIconProps) {
  const [isTransformed, setIsTransformed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const componentId = React.useId();

  const speedMap = {
    slow: 600,
    normal: 400,
    fast: 250
  };

  const duration = speedMap[speed];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (trigger === 'auto' && isMounted) {
      const interval = setInterval(() => {
        setIsTransformed(prev => !prev);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [trigger, isMounted]);

  const handleTrigger = () => {
    if (trigger === 'hover' || trigger === 'click') {
      setIsTransformed(prev => reverse ? !prev : true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      // Add small delay to prevent flickering
      timeoutRef.current = setTimeout(() => {
        setIsTransformed(reverse ? true : false);
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isMounted) {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
      </div>
    );
  }

  const CurrentIcon = isTransformed ? ToIcon : FromIcon;
  const NextIcon = isTransformed ? FromIcon : ToIcon;

  return (
    <div
      className={`morphing-container relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        cursor: trigger === 'click' ? 'pointer' : 'default'
      }}
      onMouseEnter={handleTrigger}
      onMouseLeave={handleMouseLeave}
      onClick={trigger === 'click' ? handleTrigger : undefined}
    >
      {/* Current Icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all ease-out ${
          glow ? 'morphing-glow' : ''
        }`}
        style={{
          transitionDuration: `${duration}ms`,
          opacity: 1,
          transform: `scale(1) rotate(0deg)`,
          filter: glow ? `drop-shadow(0 0 4px ${color}40)` : 'none'
        }}
      >
        <CurrentIcon
          size={size}
          color={color}
          className="morphing-svg"
        />
      </div>

      {/* Morphing Animation Layer */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all ease-out"
        style={{
          transitionDuration: `${duration}ms`,
          opacity: isTransformed ? 0 : 0,
          transform: `scale(${isTransformed ? 1.2 : 0.8}) rotate(${isTransformed ? 180 : -180}deg)`,
        }}
      >
        <NextIcon
          size={size}
          color={color}
          className="morphing-svg"
        />
      </div>

      {/* Loading indicator during transition */}
      {trigger !== 'auto' && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: 0,
            transition: `opacity ${duration / 2}ms ease-out`
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="animate-spin"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={color}
              strokeWidth="2"
              strokeOpacity="0.2"
              fill="none"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
          </svg>
        </div>
      )}

      {/* Glow filter for enhanced effects */}
      {glow && (
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id={`morphing-glow-${componentId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      )}
    </div>
  );
}

// Preset morphing combinations for common use cases
export const MorphingPresets = {
  menu: { fromIcon: 'Menu', toIcon: 'X' },
  play: { fromIcon: 'Play', toIcon: 'Pause' },
  like: { fromIcon: 'Heart', toIcon: 'HeartFill' },
  bookmark: { fromIcon: 'Bookmark', toIcon: 'BookmarkFill' },
  star: { fromIcon: 'Star', toIcon: 'StarFill' },
  eye: { fromIcon: 'Eye', toIcon: 'EyeOff' },
  volume: { fromIcon: 'Volume2', toIcon: 'VolumeX' },
  theme: { fromIcon: 'Sun', toIcon: 'Moon' },
  expand: { fromIcon: 'Maximize2', toIcon: 'Minimize2' },
  loading: { fromIcon: 'Loader', toIcon: 'CheckCircle' },
  refresh: { fromIcon: 'RefreshCw', toIcon: 'Check' },
  search: { fromIcon: 'Search', toIcon: 'X' },
  more: { fromIcon: 'MoreHorizontal', toIcon: 'ChevronUp' },
  settings: { fromIcon: 'Settings', toIcon: 'Cog' },
  user: { fromIcon: 'User', toIcon: 'UserCheck' },
  lock: { fromIcon: 'Lock', toIcon: 'Unlock' },
  wifi: { fromIcon: 'Wifi', toIcon: 'WifiOff' },
  bell: { fromIcon: 'Bell', toIcon: 'BellRing' },
  edit: { fromIcon: 'Edit', toIcon: 'Check' },
  download: { fromIcon: 'Download', toIcon: 'CheckCircle' }
};

// Quick utility components for common patterns
interface QuickMorphingProps {
  preset: keyof typeof MorphingPresets;
  size?: number;
  color?: string;
  trigger?: 'hover' | 'auto' | 'click';
  className?: string;
}

export function QuickMorphing({
  preset,
  size = 24,
  color = 'currentColor',
  trigger = 'hover',
  className = ''
}: QuickMorphingProps) {
  // This is a placeholder - in real implementation, you'd import the actual icons
  return (
    <div
      className={`morphing-container ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full bg-purple-100 rounded-full flex items-center justify-center">
        <span className="text-xs text-purple-600 font-bold">
          {preset.slice(0, 2).toUpperCase()}
        </span>
      </div>
    </div>
  );
}