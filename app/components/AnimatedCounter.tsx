'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
  showProgress?: boolean;
  progressMax?: number;
  color: string;
  bgGradient: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  label,
  duration = 2000,
  showProgress = false,
  progressMax = 100,
  color,
  bgGradient
}: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOutCubic;

      setCurrentValue(Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };

    animate();
  }, [isVisible, value, duration]);

  const progressPercentage = showProgress ? (currentValue / progressMax) * 100 : 0;
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div
      ref={elementRef}
      className={`text-center p-6 ${bgGradient} rounded-xl relative overflow-hidden hover:scale-105 transition-all duration-300 group`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {showProgress && (
        <div className="relative mb-4 flex justify-center">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-white/20"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={color}
              style={{
                transition: 'stroke-dashoffset 0.3s ease-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${color.replace('text-', 'text-')}`}>
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
      )}

      <div className={`text-3xl font-bold ${color} mb-2 transition-all duration-300`}>
        {currentValue.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-600 font-medium uppercase tracking-wider">
        {label}
      </div>

      {/* Subtle animation indicator */}
      <div className={`absolute bottom-0 left-0 h-1 ${color.replace('text-', 'bg-')} transition-all duration-300 ease-out`}
           style={{ width: isVisible ? '100%' : '0%' }} />
    </div>
  );
}