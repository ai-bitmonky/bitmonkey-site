'use client';

import React, { useEffect, useState } from 'react';

interface NeuroLoaderProps {
  type?: 'neural-network' | 'brain-wave' | 'synaptic' | 'dendrite' | 'neuron-fire';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export default function NeuroLoader({
  type = 'neural-network',
  size = 'md',
  color = '#8B5CF6',
  speed = 'normal',
  className = ''
}: NeuroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const componentId = React.useId();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const speedValues = {
    slow: '3s',
    normal: '2s',
    fast: '1s'
  };

  const animationSpeed = speedValues[speed];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const renderNeuralNetwork = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <filter id={`glow-${componentId}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id={`pulse-${componentId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2">
            <animate attributeName="stop-opacity" values="0.2;0.8;0.2" dur={animationSpeed} repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor={color} stopOpacity="0.8">
            <animate attributeName="stop-opacity" values="0.8;0.2;0.8" dur={animationSpeed} repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={color} stopOpacity="0.2">
            <animate attributeName="stop-opacity" values="0.2;0.8;0.2" dur={animationSpeed} repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>

      {/* Neural Network Nodes */}
      <circle cx="20" cy="20" r="3" fill={color} filter={`url(#glow-${componentId})`}>
        <animate attributeName="r" values="2;4;2" dur={animationSpeed} repeatCount="indefinite" begin="0s" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur={animationSpeed} repeatCount="indefinite" begin="0s" />
      </circle>
      <circle cx="80" cy="20" r="3" fill={color} filter={`url(#glow-${componentId})`}>
        <animate attributeName="r" values="2;4;2" dur={animationSpeed} repeatCount="indefinite" begin="0.3s" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur={animationSpeed} repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="50" cy="50" r="4" fill={color} filter={`url(#glow-${componentId})`}>
        <animate attributeName="r" values="3;5;3" dur={animationSpeed} repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur={animationSpeed} repeatCount="indefinite" begin="0.6s" />
      </circle>
      <circle cx="20" cy="80" r="3" fill={color} filter={`url(#glow-${componentId})`}>
        <animate attributeName="r" values="2;4;2" dur={animationSpeed} repeatCount="indefinite" begin="0.9s" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur={animationSpeed} repeatCount="indefinite" begin="0.9s" />
      </circle>
      <circle cx="80" cy="80" r="3" fill={color} filter={`url(#glow-${componentId})`}>
        <animate attributeName="r" values="2;4;2" dur={animationSpeed} repeatCount="indefinite" begin="1.2s" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur={animationSpeed} repeatCount="indefinite" begin="1.2s" />
      </circle>

      {/* Synaptic Connections */}
      <path d="M20,20 Q35,35 50,50" fill="none" stroke={`url(#pulse-${componentId})`} strokeWidth="1.5" />
      <path d="M80,20 Q65,35 50,50" fill="none" stroke={`url(#pulse-${componentId})`} strokeWidth="1.5" />
      <path d="M50,50 Q35,65 20,80" fill="none" stroke={`url(#pulse-${componentId})`} strokeWidth="1.5" />
      <path d="M50,50 Q65,65 80,80" fill="none" stroke={`url(#pulse-${componentId})`} strokeWidth="1.5" />
      <path d="M20,20 Q50,20 80,20" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M20,80 Q50,80 80,80" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />

      {/* Animated signal pulses */}
      <circle r="1" fill={color} opacity="0.8">
        <animateMotion dur={`calc(${animationSpeed} * 1.5)`} repeatCount="indefinite">
          <mpath href="#path1"/>
        </animateMotion>
      </circle>
      <path id="path1" d="M20,20 Q35,35 50,50 Q65,65 80,80" fill="none" opacity="0" />
    </svg>
  );

  const renderBrainWave = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id={`wave-gradient-${componentId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          <animateTransform attributeName="gradientTransform" type="translate" values="-100,0;100,0;-100,0" dur={animationSpeed} repeatCount="indefinite" />
        </linearGradient>
      </defs>

      {/* Brain wave pattern */}
      <path d="M0,50 Q10,30 20,50 Q30,70 40,50 Q50,20 60,50 Q70,80 80,50 Q90,30 100,50"
            fill="none"
            stroke={`url(#wave-gradient-${componentId})`}
            strokeWidth="2" />
      <path d="M0,40 Q15,25 30,40 Q45,55 60,40 Q75,25 90,40 Q95,35 100,40"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`calc(${animationSpeed} * 0.8)`} repeatCount="indefinite" />
      </path>
      <path d="M0,60 Q12,45 25,60 Q38,75 50,60 Q62,45 75,60 Q88,75 100,60"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`calc(${animationSpeed} * 1.2)`} repeatCount="indefinite" />
      </path>

      {/* Neuron activity indicators */}
      <circle cx="20" cy="50" r="2" fill={color} opacity="0.6">
        <animate attributeName="r" values="1;3;1" dur={animationSpeed} repeatCount="indefinite" begin="0s" />
      </circle>
      <circle cx="50" cy="50" r="2" fill={color} opacity="0.6">
        <animate attributeName="r" values="1;3;1" dur={animationSpeed} repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="80" cy="50" r="2" fill={color} opacity="0.6">
        <animate attributeName="r" values="1;3;1" dur={animationSpeed} repeatCount="indefinite" begin="1s" />
      </circle>
    </svg>
  );

  const renderSynaptic = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id={`synapse-gradient-${componentId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="70%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </radialGradient>
      </defs>

      {/* Synaptic vesicles */}
      <circle cx="30" cy="30" r="8" fill={`url(#synapse-gradient-${componentId})`}>
        <animate attributeName="r" values="6;10;6" dur={animationSpeed} repeatCount="indefinite" begin="0s" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur={animationSpeed} repeatCount="indefinite" begin="0s" />
      </circle>
      <circle cx="70" cy="30" r="8" fill={`url(#synapse-gradient-${componentId})`}>
        <animate attributeName="r" values="6;10;6" dur={animationSpeed} repeatCount="indefinite" begin="0.3s" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur={animationSpeed} repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="50" cy="70" r="8" fill={`url(#synapse-gradient-${componentId})`}>
        <animate attributeName="r" values="6;10;6" dur={animationSpeed} repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur={animationSpeed} repeatCount="indefinite" begin="0.6s" />
      </circle>

      {/* Neurotransmitter particles */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x = 50 + 20 * Math.cos(angle);
        const y = 50 + 20 * Math.sin(angle);
        return (
          <circle key={i} cx={x} cy={y} r="1.5" fill={color} opacity="0.6">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 50 50;360 50 50`}
              dur={`calc(${animationSpeed} * 2)`}
              repeatCount="indefinite"
              begin={`${i * 0.1}s`}
            />
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur={animationSpeed} repeatCount="indefinite" begin={`${i * 0.1}s`} />
          </circle>
        );
      })}
    </svg>
  );

  const renderDendrite = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Main dendrite trunk */}
      <path d="M50,90 Q48,70 50,50 Q52,30 50,10" fill="none" stroke={color} strokeWidth="3" opacity="0.8">
        <animate attributeName="stroke-width" values="2;4;2" dur={animationSpeed} repeatCount="indefinite" />
      </path>

      {/* Dendrite branches */}
      <path d="M50,70 Q35,60 20,55" fill="none" stroke={color} strokeWidth="2" opacity="0.7">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur={animationSpeed} repeatCount="indefinite" begin="0.2s" />
      </path>
      <path d="M50,70 Q65,60 80,55" fill="none" stroke={color} strokeWidth="2" opacity="0.7">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur={animationSpeed} repeatCount="indefinite" begin="0.4s" />
      </path>
      <path d="M50,50 Q40,45 30,35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur={animationSpeed} repeatCount="indefinite" begin="0.6s" />
      </path>
      <path d="M50,50 Q60,45 70,35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur={animationSpeed} repeatCount="indefinite" begin="0.8s" />
      </path>
      <path d="M50,30 Q42,25 35,15" fill="none" stroke={color} strokeWidth="1" opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur={animationSpeed} repeatCount="indefinite" begin="1s" />
      </path>
      <path d="M50,30 Q58,25 65,15" fill="none" stroke={color} strokeWidth="1" opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur={animationSpeed} repeatCount="indefinite" begin="1.2s" />
      </path>

      {/* Terminal boutons */}
      <circle cx="20" cy="55" r="2" fill={color}>
        <animate attributeName="r" values="1.5;3;1.5" dur={animationSpeed} repeatCount="indefinite" begin="0.2s" />
      </circle>
      <circle cx="80" cy="55" r="2" fill={color}>
        <animate attributeName="r" values="1.5;3;1.5" dur={animationSpeed} repeatCount="indefinite" begin="0.4s" />
      </circle>
      <circle cx="30" cy="35" r="1.5" fill={color}>
        <animate attributeName="r" values="1;2.5;1" dur={animationSpeed} repeatCount="indefinite" begin="0.6s" />
      </circle>
      <circle cx="70" cy="35" r="1.5" fill={color}>
        <animate attributeName="r" values="1;2.5;1" dur={animationSpeed} repeatCount="indefinite" begin="0.8s" />
      </circle>
    </svg>
  );

  const renderNeuronFire = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <filter id={`fire-glow-${componentId}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Neuron cell body */}
      <circle cx="50" cy="50" r="12" fill={color} opacity="0.3" filter={`url(#fire-glow-${componentId})`}>
        <animate attributeName="r" values="10;15;10" dur={animationSpeed} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur={animationSpeed} repeatCount="indefinite" />
      </circle>

      {/* Action potential waves */}
      <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.7">
        <animate attributeName="r" values="12;30;12" dur={animationSpeed} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur={animationSpeed} repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5">
        <animate attributeName="r" values="15;35;15" dur={animationSpeed} repeatCount="indefinite" begin="0.3s" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur={animationSpeed} repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="18;40;18" dur={animationSpeed} repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur={animationSpeed} repeatCount="indefinite" begin="0.6s" />
      </circle>

      {/* Electrical impulses */}
      <path d="M50,38 L52,35 L48,32 L54,29 L46,26 L52,23 L48,20" fill="none" stroke={color} strokeWidth="2" opacity="0.8">
        <animate attributeName="opacity" values="0;1;0" dur={`calc(${animationSpeed} * 0.5)`} repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-20;0,0" dur={`calc(${animationSpeed} * 0.5)`} repeatCount="indefinite" />
      </path>
    </svg>
  );

  const renderLoader = () => {
    if (!isMounted) {
      // Render static placeholder during SSR
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="3" fill={color} opacity="0.5" />
        </svg>
      );
    }

    switch (type) {
      case 'neural-network':
        return renderNeuralNetwork();
      case 'brain-wave':
        return renderBrainWave();
      case 'synaptic':
        return renderSynaptic();
      case 'dendrite':
        return renderDendrite();
      case 'neuron-fire':
        return renderNeuronFire();
      default:
        return renderNeuralNetwork();
    }
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <div className="relative w-full h-full">
        {renderLoader()}
        {isMounted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-xs font-semibold opacity-70"
              style={{ color }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}