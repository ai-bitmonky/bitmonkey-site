'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  subtitle?: string;
  animated?: boolean;
  animationDuration?: number;
  showPercentage?: boolean;
  className?: string;
  glowEffect?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#8B5CF6',
  backgroundColor = '#E5E7EB',
  label,
  subtitle,
  animated = true,
  animationDuration = 1500,
  showPercentage = true,
  className = '',
  glowEffect = false
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  // Generate a stable ID for the gradient
  const gradientId = useMemo(() => {
    return `gradient-${progress}-${size}-${color.replace('#', '')}-${strokeWidth}`;
  }, [progress, size, color, strokeWidth]);

  useEffect(() => {
    if (!animated) {
      setAnimatedProgress(progress);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate progress
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progressPercent = Math.min(elapsed / animationDuration, 1);

            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progressPercent, 3);
            setAnimatedProgress(progress * easeOutCubic);

            if (progressPercent < 1) {
              requestAnimationFrame(animate);
            }
          };

          setTimeout(() => {
            animate();
          }, 200);
        }
      },
      { threshold: 0.3 }
    );

    if (ringRef.current) {
      observer.observe(ringRef.current);
    }

    return () => {
      if (ringRef.current) {
        observer.unobserve(ringRef.current);
      }
    };
  }, [progress, animated, animationDuration]);

  return (
    <div
      ref={ringRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{
          filter: glowEffect ? `drop-shadow(0 0 8px ${color}40)` : 'none'
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color + '80'} />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-20"
        />

        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-75 ease-out"
          style={{
            filter: glowEffect ? `drop-shadow(0 0 4px ${color})` : 'none'
          }}
        />

        {/* Glow effect for the progress line */}
        {glowEffect && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth + 2}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="opacity-30 transition-all duration-75 ease-out"
            style={{ filter: `blur(2px)` }}
          />
        )}
      </svg>

      {/* Content in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
        {showPercentage && (
          <div
            className="text-lg font-bold text-gray-900 transition-opacity duration-500"
            style={{
              fontSize: `${size / 8}px`,
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${animationDuration * 0.5}ms`
            }}
          >
            {Math.round(animatedProgress)}%
          </div>
        )}

        {label && (
          <div
            className="text-xs font-medium text-gray-700 mt-1 transition-opacity duration-500"
            style={{
              fontSize: `${size / 15}px`,
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${animationDuration * 0.7}ms`
            }}
          >
            {label}
          </div>
        )}

        {subtitle && (
          <div
            className="text-xs text-gray-500 transition-opacity duration-500"
            style={{
              fontSize: `${size / 18}px`,
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${animationDuration * 0.9}ms`
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

interface ProgressRingGroupProps {
  rings: Array<{
    progress: number;
    label: string;
    subtitle?: string;
    color: string;
  }>;
  size?: number;
  className?: string;
  title?: string;
  description?: string;
}

export const ProgressRingGroup: React.FC<ProgressRingGroupProps> = ({
  rings,
  size = 100,
  className = '',
  title,
  description
}) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-realistic shadow-transition border border-white/20 ${className}`}>
      {title && (
        <h4 className="text-sm font-medium text-gray-800 mb-2 text-center">{title}</h4>
      )}
      {description && (
        <p className="text-xs text-gray-600 mb-6 text-center">{description}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {rings.map((ring, index) => (
          <div key={index} className="flex flex-col items-center">
            <ProgressRing
              progress={ring.progress}
              size={size}
              color={ring.color}
              label={ring.label}
              subtitle={ring.subtitle}
              glowEffect={true}
              animationDuration={1800 + index * 200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressRing;