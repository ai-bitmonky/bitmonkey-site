'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RippleEffect {
  x: number;
  y: number;
  id: string;
  timestamp: number;
}

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  liquidEffect?: 'ripple' | 'deform' | 'morph' | 'mercury' | 'blob' | 'wave';
  intensity?: 'subtle' | 'medium' | 'strong';
  colors?: {
    base: string;
    hover: string;
    active: string;
    ripple?: string;
  };
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
  animate?: boolean;
  glowEffect?: boolean;
}

export default function LiquidButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  liquidEffect = 'ripple',
  intensity = 'medium',
  colors,
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
  animate = true,
  glowEffect = false
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const componentId = React.useId();

  // Size configurations
  const sizeMap = {
    sm: { padding: 'px-4 py-2', text: 'text-sm', height: 'h-8', fontSize: '14px' },
    md: { padding: 'px-6 py-3', text: 'text-base', height: 'h-10', fontSize: '16px' },
    lg: { padding: 'px-8 py-4', text: 'text-lg', height: 'h-12', fontSize: '18px' },
    xl: { padding: 'px-10 py-5', text: 'text-xl', height: 'h-14', fontSize: '20px' }
  };

  // Variant color schemes
  const variantColors = {
    primary: {
      base: '#8B5CF6',
      hover: '#7C3AED',
      active: '#6D28D9',
      ripple: '#A78BFA'
    },
    secondary: {
      base: '#6B7280',
      hover: '#4B5563',
      active: '#374151',
      ripple: '#9CA3AF'
    },
    accent: {
      base: '#06B6D4',
      hover: '#0891B2',
      active: '#0E7490',
      ripple: '#67E8F9'
    },
    ghost: {
      base: 'transparent',
      hover: '#F3F4F6',
      active: '#E5E7EB',
      ripple: '#D1D5DB'
    },
    gradient: {
      base: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
      hover: 'linear-gradient(135deg, #7C3AED 0%, #0891B2 100%)',
      active: 'linear-gradient(135deg, #6D28D9 0%, #0E7490 100%)',
      ripple: '#A78BFA'
    }
  };

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.5,
    medium: 1.0,
    strong: 1.8
  };

  const currentColors = colors || variantColors[variant];
  const currentSize = sizeMap[size];
  const currentIntensity = intensityMap[intensity];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle ripple effect
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !animate) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: RippleEffect = {
      x,
      y,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
  };

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    createRipple(e);
    setIsPressed(true);

    if (onClick) {
      onClick(e);
    }

    // Reset pressed state
    setTimeout(() => setIsPressed(false), 150);
  };

  // Mouse event handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  // Get dynamic styles
  const getButtonStyles = (): React.CSSProperties => {
    let background = currentColors.base;
    let transform = 'scale(1)';
    let filter = 'none';

    if (isPressed && !disabled) {
      background = currentColors.active;
      transform = `scale(${0.98 - (currentIntensity * 0.02)})`;
    } else if (isHovered && !disabled) {
      background = currentColors.hover;
      transform = `scale(${1 + (currentIntensity * 0.02)})`;
    }

    if (disabled) {
      background = '#E5E7EB';
      filter = 'grayscale(1) opacity(0.6)';
    }

    if (glowEffect && isHovered && !disabled) {
      filter += ` drop-shadow(0 0 ${8 * currentIntensity}px ${currentColors.ripple || currentColors.base}40)`;
    }

    // Handle gradient backgrounds
    if (variant === 'gradient') {
      return {
        background,
        transform,
        filter,
        transition: `all ${300 / currentIntensity}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      };
    }

    return {
      backgroundColor: background,
      transform,
      filter,
      transition: `all ${300 / currentIntensity}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  };

  // Get liquid effect styles
  const getLiquidEffectStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      overflow: 'hidden'
    };

    if (liquidEffect === 'deform' && (isHovered || isPressed)) {
      return {
        ...baseStyle,
        transform: `skew(${isPressed ? 2 * currentIntensity : 1 * currentIntensity}deg, ${isPressed ? 1 * currentIntensity : 0.5 * currentIntensity}deg)`,
        transition: 'transform 200ms ease-out'
      };
    }

    if (liquidEffect === 'morph' && (isHovered || isPressed)) {
      const morphScale = isPressed ? 1.1 * currentIntensity : 1.05 * currentIntensity;
      return {
        ...baseStyle,
        transform: `scale(${morphScale}) rotate(${isPressed ? 2 * currentIntensity : 1 * currentIntensity}deg)`,
        transition: 'transform 300ms ease-out'
      };
    }

    return baseStyle;
  };

  if (!isMounted) {
    return (
      <button
        className={`${currentSize.padding} ${currentSize.text} rounded-lg bg-gray-200 animate-pulse ${className}`}
        disabled
      >
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden
        ${currentSize.padding} ${currentSize.text}
        ${fullWidth ? 'w-full' : 'w-auto'}
        rounded-xl
        font-semibold
        border-0
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        active:outline-none
        cursor-pointer
        select-none
        liquid-button
        shadow-realistic shadow-transition
        ${disabled ? 'cursor-not-allowed' : ''}
        ${className}
      `}
      style={{
        ...getButtonStyles(),
        color: variant === 'ghost' ? '#374151' : '#FFFFFF',
        willChange: 'transform, background-color, filter',
        ...(variant === 'ghost' && { border: '2px solid #E5E7EB' })
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
    >
      {/* Liquid Effect Layer */}
      {liquidEffect !== 'ripple' && (
        <div
          className="liquid-effect-layer"
          style={getLiquidEffectStyle()}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${currentColors.ripple || currentColors.hover}20 0%, transparent 70%)`,
              opacity: isHovered || isPressed ? 1 : 0,
              transition: 'opacity 300ms ease-out'
            }}
          />
        </div>
      )}

      {/* Ripple Effects */}
      {liquidEffect === 'ripple' && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${currentColors.ripple || currentColors.hover}40 0%, transparent 70%)`,
            transform: 'scale(0)',
            animation: `liquid-ripple ${800 * currentIntensity}ms ease-out forwards`
          }}
        />
      ))}

      {/* Wave Effect */}
      {liquidEffect === 'wave' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 0%, ${currentColors.ripple || currentColors.hover}20 50%, transparent 100%)`,
            transform: `translateX(${isHovered ? 0 : -100}%)`,
            transition: `transform ${600 * currentIntensity}ms ease-out`,
            opacity: isHovered ? 1 : 0
          }}
        />
      )}

      {/* Blob Effect */}
      {liquidEffect === 'blob' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: isHovered || isPressed ? 0.3 : 0 }}
        >
          <defs>
            <filter id={`blob-${componentId}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
          <circle
            cx="50%"
            cy="50%"
            r={`${20 * currentIntensity}`}
            fill={currentColors.ripple || currentColors.hover}
            filter={`url(#blob-${componentId})`}
            style={{
              animation: isHovered ? `liquid-blob ${1000 * currentIntensity}ms ease-in-out infinite` : 'none'
            }}
          />
        </svg>
      )}

      {/* Mercury Effect */}
      {liquidEffect === 'mercury' && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius: 'inherit' }}
        >
          <div
            className="absolute w-full h-full"
            style={{
              background: `radial-gradient(ellipse at center, ${currentColors.ripple || currentColors.hover}30 0%, transparent 50%)`,
              transform: `scale(${isPressed ? 1.5 * currentIntensity : isHovered ? 1.2 * currentIntensity : 0})`,
              transition: `transform ${400 * currentIntensity}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
              borderRadius: isPressed ? '60%' : isHovered ? '40%' : '50%'
            }}
          />
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            style={{ borderColor: variant === 'ghost' ? '#374151' : 'white' }}
          />
        </div>
      )}

      {/* Button Content */}
      <span
        className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          transition: 'opacity 200ms ease-out',
          fontWeight: '600',
          letterSpacing: '0.025em'
        }}
      >
        {children}
      </span>
    </button>
  );
}

// CSS Animation keyframes (to be added to globals.css)
export const liquidButtonStyles = `
@keyframes liquid-ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes liquid-blob {
  0%, 100% {
    transform: scale(1) translate(0, 0);
  }
  25% {
    transform: scale(1.2) translate(10px, -5px);
  }
  50% {
    transform: scale(0.8) translate(-10px, 10px);
  }
  75% {
    transform: scale(1.1) translate(5px, -10px);
  }
}

@keyframes liquid-wave {
  0% {
    transform: translateX(-100%) skew(-10deg);
  }
  100% {
    transform: translateX(100%) skew(10deg);
  }
}

@keyframes liquid-mercury {
  0%, 100% {
    border-radius: 50%;
    transform: rotate(0deg) scale(1);
  }
  25% {
    border-radius: 60% 40% 60% 40%;
    transform: rotate(5deg) scale(1.1);
  }
  50% {
    border-radius: 40% 60% 40% 60%;
    transform: rotate(-5deg) scale(0.9);
  }
  75% {
    border-radius: 60% 40% 60% 40%;
    transform: rotate(3deg) scale(1.05);
  }
}

.liquid-button {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  isolation: isolate;
}

.liquid-button:hover {
  transform: translateY(-1px);
}

.liquid-button:active {
  transform: translateY(0);
}

.liquid-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
}

.liquid-button:disabled {
  transform: none !important;
  cursor: not-allowed;
}
`;

// Preset configurations for common use cases
export const LiquidButtonPresets = {
  cta: {
    variant: 'primary' as const,
    size: 'lg' as const,
    liquidEffect: 'ripple' as const,
    intensity: 'strong' as const,
    glowEffect: true
  },

  action: {
    variant: 'accent' as const,
    size: 'md' as const,
    liquidEffect: 'mercury' as const,
    intensity: 'medium' as const,
    glowEffect: false
  },

  subtle: {
    variant: 'ghost' as const,
    size: 'md' as const,
    liquidEffect: 'wave' as const,
    intensity: 'subtle' as const,
    glowEffect: false
  },

  dramatic: {
    variant: 'gradient' as const,
    size: 'xl' as const,
    liquidEffect: 'blob' as const,
    intensity: 'strong' as const,
    glowEffect: true
  }
};

// Quick preset component
interface LiquidButtonPresetProps extends Omit<LiquidButtonProps, keyof typeof LiquidButtonPresets.cta> {
  preset: keyof typeof LiquidButtonPresets;
}

export function LiquidButtonPreset({ preset, children, ...props }: LiquidButtonPresetProps) {
  const presetConfig = LiquidButtonPresets[preset];

  return (
    <LiquidButton
      {...presetConfig}
      {...props}
    >
      {children}
    </LiquidButton>
  );
}