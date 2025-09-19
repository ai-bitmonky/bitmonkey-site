'use client';

import React, { useEffect, useRef, useState, createContext, useContext } from 'react';

// Context for micro-interactions state
const MicroInteractionsContext = createContext<{
  cursorPosition: { x: number; y: number };
  activeElements: Set<string>;
  registerElement: (id: string) => void;
  unregisterElement: (id: string) => void;
}>({
  cursorPosition: { x: 0, y: 0 },
  activeElements: new Set(),
  registerElement: () => {},
  unregisterElement: () => {}
});

// Main provider component
export function SignatureMicroInteractionsProvider({ children }: { children: React.ReactNode }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeElements, setActiveElements] = useState<Set<string>>(new Set());

  const registerElement = (id: string) => {
    setActiveElements(prev => new Set(prev).add(id));
  };

  const unregisterElement = (id: string) => {
    setActiveElements(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <MicroInteractionsContext.Provider
      value={{
        cursorPosition,
        activeElements,
        registerElement,
        unregisterElement
      }}
    >
      {children}
      <MagneticCursor />
    </MicroInteractionsContext.Provider>
  );
}

// Enhanced Magnetic Cursor with Button Gravity
function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { cursorPosition } = useContext(MicroInteractionsContext);
  const [nearbyElement, setNearbyElement] = useState<Element | null>(null);
  const [magneticStrength, setMagneticStrength] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      // Find nearest magnetic element
      const magneticElements = document.querySelectorAll('.magnetic-enhanced, .liquid-button, [data-magnetic="true"]');
      let closestElement: Element | null = null;
      let minDistance = Infinity;
      let strongestMagnetism = 0;

      magneticElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        // Enhanced gravity range based on element size
        const baseRange = Math.max(rect.width, rect.height) * 0.8;
        const gravityRange = Math.min(baseRange, 120);

        if (distance < gravityRange && distance < minDistance) {
          minDistance = distance;
          closestElement = element;

          // Calculate magnetic strength (0-1) with easing
          const strength = Math.max(0, (gravityRange - distance) / gravityRange);
          strongestMagnetism = Math.pow(strength, 0.8); // Ease out curve
        }
      });

      setNearbyElement(closestElement);
      setMagneticStrength(strongestMagnetism);

      // Apply magnetic pull to cursor
      let finalX = e.clientX;
      let finalY = e.clientY;

      if (closestElement && strongestMagnetism > 0) {
        const rect = closestElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const pullX = (centerX - e.clientX) * strongestMagnetism * 0.3;
        const pullY = (centerY - e.clientY) * strongestMagnetism * 0.3;

        finalX += pullX;
        finalY += pullY;

        // Add magnetic effect to the element itself
        const elementPullX = (e.clientX - centerX) * strongestMagnetism * 0.15;
        const elementPullY = (e.clientY - centerY) * strongestMagnetism * 0.15;

        (closestElement as HTMLElement).style.transform =
          `translate(${elementPullX}px, ${elementPullY}px) scale(${1 + strongestMagnetism * 0.05})`;
        (closestElement as HTMLElement).style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      } else {
        // Reset elements that are no longer being attracted
        magneticElements.forEach(element => {
          (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
          (element as HTMLElement).style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
      }

      // Update cursor position
      cursorRef.current.style.left = `${finalX}px`;
      cursorRef.current.style.top = `${finalY}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="signature-cursor"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        left: cursorPosition.x,
        top: cursorPosition.y,
        transform: `translate(-50%, -50%) scale(${1 + magneticStrength * 0.8})`,
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'transform'
      }}
    >
      {/* Inner cursor */}
      <div
        className="w-2 h-2 bg-white rounded-full shadow-lg"
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, ${0.8 + magneticStrength * 0.2}) 0%, rgba(59, 130, 246, ${0.6 + magneticStrength * 0.4}) 100%)`,
          transform: `scale(${1 + magneticStrength})`,
          transition: 'all 0.2s ease-out'
        }}
      />

      {/* Outer ring when magnetic */}
      {magneticStrength > 0.1 && (
        <div
          className="absolute inset-0 border border-purple-400 rounded-full"
          style={{
            width: `${20 + magneticStrength * 30}px`,
            height: `${20 + magneticStrength * 30}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: magneticStrength * 0.6,
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
      )}
    </div>
  );
}

// Glass Light Sweep Component
interface GlassSweepProps {
  children: React.ReactNode;
  triggerOnHover?: boolean;
  triggerOnInView?: boolean;
  sweepColor?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  className?: string;
}

export function GlassLightSweep({
  children,
  triggerOnHover = true,
  triggerOnInView = false,
  sweepColor = 'rgba(255, 255, 255, 0.4)',
  intensity = 'medium',
  direction = 'diagonal',
  className = ''
}: GlassSweepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sweepActive, setSweepActive] = useState(false);

  // Intensity mappings
  const intensityMap = {
    subtle: { width: 50, duration: 800, opacity: 0.3 },
    medium: { width: 80, duration: 600, opacity: 0.4 },
    strong: { width: 120, duration: 400, opacity: 0.6 }
  };

  const currentIntensity = intensityMap[intensity];

  // Direction configurations
  const directionConfig = {
    horizontal: { angle: '0deg', start: '-100%, 0%', end: '200%, 0%' },
    vertical: { angle: '90deg', start: '0%, -100%', end: '0%, 200%' },
    diagonal: { angle: '45deg', start: '-100%, -100%', end: '200%, 200%' }
  };

  const config = directionConfig[direction];

  useEffect(() => {
    if (!triggerOnInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setSweepActive(true), 200);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnInView]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      setIsHovered(true);
      setSweepActive(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => setSweepActive(false), currentIntensity.duration);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Glass Sweep Effect */}
      {(sweepActive || isHovered) && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${config.angle},
              transparent 0%,
              ${sweepColor} 50%,
              transparent 100%)`,
            width: `${currentIntensity.width}%`,
            height: `${currentIntensity.width}%`,
            opacity: currentIntensity.opacity,
            transform: `translate(${config.start})`,
            animation: `glassSweep${direction} ${currentIntensity.duration}ms ease-out`,
            animationFillMode: 'forwards'
          }}
        />
      )}
    </div>
  );
}

// Icon Micro-Rigs Component
interface IconMicroRigProps {
  children: React.ReactNode;
  hover?: boolean;
  focus?: boolean;
  active?: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

export function IconMicroRig({
  children,
  hover = true,
  focus = true,
  active = true,
  intensity = 'medium',
  className = ''
}: IconMicroRigProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const intensityMap = {
    subtle: { rotate: 3, lift: 1, scale: 1.02 },
    medium: { rotate: 6, lift: 2, scale: 1.05 },
    strong: { rotate: 9, lift: 3, scale: 1.08 }
  };

  const config = intensityMap[intensity];

  const getTransform = () => {
    let transform = 'translate(0, 0) rotate(0deg) scale(1)';

    if (isActive && active) {
      transform = `translate(0, ${config.lift * 1.5}px) rotate(${config.rotate * 1.5}deg) scale(${config.scale * 1.1})`;
    } else if ((isHovered && hover) || (isFocused && focus)) {
      transform = `translate(0, -${config.lift}px) rotate(${config.rotate}deg) scale(${config.scale})`;
    }

    return transform;
  };

  return (
    <div
      className={`icon-micro-rig transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{
        transform: getTransform(),
        transformOrigin: 'center center',
        willChange: 'transform'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

// Progress Dots with Radial Wipe
interface ProgressDotsProps {
  total: number;
  current: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function ProgressDotsRadial({
  total,
  current,
  size = 'md',
  color = '#8B5CF6',
  className = ''
}: ProgressDotsProps) {
  const sizeMap = {
    sm: { dot: 8, gap: 12 },
    md: { dot: 12, gap: 16 },
    lg: { dot: 16, gap: 20 }
  };

  const config = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: total }, (_, index) => {
        const isActive = index < current;
        const isCurrent = index === current - 1;

        return (
          <div
            key={index}
            className="relative"
            style={{
              width: config.dot,
              height: config.dot
            }}
          >
            {/* Base dot */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-500"
              style={{
                backgroundColor: isActive ? color : `${color}30`,
                transform: `scale(${isCurrent ? 1.2 : 1})`,
                opacity: isActive ? 1 : 0.4
              }}
            />

            {/* Radial wipe effect */}
            {isActive && (
              <svg
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `scale(${isCurrent ? 1.2 : 1})`,
                  transition: 'transform 500ms ease-out'
                }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r={config.dot / 2 - 1}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray={`${Math.PI * (config.dot - 2)}`}
                  strokeDashoffset={`${Math.PI * (config.dot - 2) * (1 - (index + 1) / current)}`}
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center',
                    transition: 'stroke-dashoffset 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.4))'
                  }}
                />
              </svg>
            )}

            {/* Pulse effect for current */}
            {isCurrent && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: color,
                  opacity: 0.3,
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Enhanced Button with All Micro-Interactions
interface SignatureButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  glassSweep?: boolean;
  iconRig?: boolean;
  className?: string;
  disabled?: boolean;
}

export function SignatureButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  glassSweep = true,
  iconRig = true,
  className = '',
  disabled = false
}: SignatureButtonProps) {
  const baseClasses = `
    relative overflow-hidden rounded-xl font-semibold
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
    ${magnetic ? 'magnetic-enhanced' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const ButtonComponent = (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );

  // Wrap with micro-interactions
  let wrappedButton = ButtonComponent;

  if (glassSweep) {
    wrappedButton = (
      <GlassLightSweep>
        {wrappedButton}
      </GlassLightSweep>
    );
  }

  if (iconRig) {
    wrappedButton = (
      <IconMicroRig>
        {wrappedButton}
      </IconMicroRig>
    );
  }

  return wrappedButton;
}

// CSS animations (to be added to globals.css)
export const microInteractionStyles = `
@keyframes glassSweepdiagonal {
  0% {
    transform: translate(-100%, -100%);
  }
  100% {
    transform: translate(200%, 200%);
  }
}

@keyframes glassSweephorizontal {
  0% {
    transform: translate(-100%, 0%);
  }
  100% {
    transform: translate(200%, 0%);
  }
}

@keyframes glassSweepvertical {
  0% {
    transform: translate(0%, -100%);
  }
  100% {
    transform: translate(0%, 200%);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.signature-cursor {
  mix-blend-mode: difference;
}

.icon-micro-rig:hover {
  filter: drop-shadow(0 4px 8px rgba(139, 92, 246, 0.2));
}

.magnetic-enhanced {
  will-change: transform;
}

/* Enhanced glass morphism */
.glass-panel {
  backdrop-filter: blur(16px) saturate(1.8);
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, opacity, background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
`;

// Export the provider as default and individual components as named exports
export { SignatureMicroInteractionsProvider as default };