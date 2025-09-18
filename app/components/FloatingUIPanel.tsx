'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FloatingUIPosition {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  transform?: string;
}

interface FloatingUIStyle {
  background?: string;
  border?: string;
  borderRadius?: string;
  backdropFilter?: string;
  boxShadow?: string;
}

interface FloatingUIAnimation {
  float?: boolean;
  hover?: boolean;
  parallax?: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
}

interface FloatingUIPanelProps {
  children: React.ReactNode;
  position?: FloatingUIPosition;
  style?: FloatingUIStyle;
  animation?: FloatingUIAnimation;
  className?: string;
  width?: string | number;
  height?: string | number;
  zIndex?: number;
  interactive?: boolean;
  autoPosition?: boolean;
  delayMs?: number;
  visible?: boolean;
  glassEffect?: boolean;
  shadowIntensity?: 'light' | 'medium' | 'heavy';
}

export default function FloatingUIPanel({
  children,
  position = {},
  style = {},
  animation = { float: true, hover: true, parallax: false, intensity: 'medium' },
  className = '',
  width = 'auto',
  height = 'auto',
  zIndex = 10,
  interactive = true,
  autoPosition = false,
  delayMs = 0,
  visible = true,
  glassEffect = true,
  shadowIntensity = 'medium'
}: FloatingUIPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const componentId = React.useId();

  // Animation intensity mapping
  const intensityMap = {
    subtle: 0.3,
    medium: 0.6,
    strong: 1.0
  };

  const currentIntensity = intensityMap[animation.intensity || 'medium'];

  // Shadow intensity mapping - Enhanced with layered shadows
  const shadowMap = {
    light: '0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24), 0 2px 4px rgba(0, 0, 0, 0.08)',
    medium: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24), 0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.10)',
    heavy: '0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24), 0 8px 12px rgba(0, 0, 0, 0.20), 0 16px 24px rgba(0, 0, 0, 0.15), 0 24px 32px rgba(0, 0, 0, 0.08)'
  };

  // Default styles with glass effect
  const defaultStyle: FloatingUIStyle = {
    background: glassEffect
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    backdropFilter: glassEffect ? 'blur(16px) saturate(1.5)' : 'none',
    boxShadow: shadowMap[shadowIntensity]
  };

  // Merge styles
  const mergedStyle = { ...defaultStyle, ...style };

  // Floating animation
  useEffect(() => {
    if (!animation.float || !isMounted) return;

    const animate = () => {
      timeRef.current += 0.016; // ~60fps

      if (panelRef.current) {
        const floatOffset = Math.sin(timeRef.current * 0.8) * 3 * currentIntensity;
        const rotateOffset = Math.sin(timeRef.current * 0.5) * 0.5 * currentIntensity;

        panelRef.current.style.transform = `
          translateY(${floatOffset}px)
          rotateX(${rotateOffset}deg)
          rotateY(${rotateOffset * 0.5}deg)
          ${position.transform || ''}
        `;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animation.float, currentIntensity, isMounted, position.transform]);

  // Parallax effect
  useEffect(() => {
    if (!animation.parallax || !isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!panelRef.current) return;

      const rect = panelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / window.innerWidth;
      const deltaY = (e.clientY - centerY) / window.innerHeight;

      setMousePosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [animation.parallax, isMounted]);

  // Auto positioning logic
  useEffect(() => {
    if (!autoPosition || !isMounted || !panelRef.current) return;

    const panel = panelRef.current;
    const rect = panel.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Simple auto-positioning to keep panel in viewport
    let autoTop = position.top;
    let autoLeft = position.left;

    if (rect.right > viewportWidth) {
      autoLeft = viewportWidth - rect.width - 20;
    }
    if (rect.bottom > viewportHeight) {
      autoTop = viewportHeight - rect.height - 20;
    }
    if (rect.left < 0) {
      autoLeft = 20;
    }
    if (rect.top < 0) {
      autoTop = 20;
    }

    if (autoTop !== position.top || autoLeft !== position.left) {
      panel.style.top = typeof autoTop === 'number' ? `${autoTop}px` : autoTop || '';
      panel.style.left = typeof autoLeft === 'number' ? `${autoLeft}px` : autoLeft || '';
    }
  }, [autoPosition, isMounted, position.top, position.left]);

  // Visibility delay
  useEffect(() => {
    if (!visible) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [visible, delayMs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mouse event handlers
  const handleMouseEnter = () => {
    if (animation.hover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (animation.hover) {
      setIsHovered(false);
    }
  };

  // Calculate transform based on interactions
  const getTransform = () => {
    let transform = position.transform || '';

    if (animation.parallax && isMounted) {
      const parallaxX = mousePosition.x * 10 * currentIntensity;
      const parallaxY = mousePosition.y * 10 * currentIntensity;
      transform += ` translate3d(${parallaxX}px, ${parallaxY}px, 0)`;
    }

    if (animation.hover && isHovered) {
      const hoverScale = 1 + (0.05 * currentIntensity);
      const hoverY = -5 * currentIntensity;
      transform += ` scale(${hoverScale}) translateY(${hoverY}px)`;
    }

    return transform;
  };

  // Calculate position styles
  const getPositionStyle = (): React.CSSProperties => {
    const positionStyle: React.CSSProperties = {
      width,
      height,
      zIndex,
      position: 'absolute',
      ...mergedStyle
    };

    // Apply position properties
    Object.entries(position).forEach(([key, value]) => {
      if (key !== 'transform' && value !== undefined) {
        (positionStyle as Record<string, string>)[key] = typeof value === 'number' ? `${value}px` : value;
      }
    });

    return positionStyle;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={panelRef}
      className={`floating-ui-panel ${className} ${isVisible ? 'floating-ui-visible' : 'floating-ui-hidden'}`}
      style={{
        ...getPositionStyle(),
        transform: getTransform(),
        transition: `
          opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
          transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
          box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)
        `,
        opacity: isVisible ? 1 : 0,
        pointerEvents: interactive ? 'auto' : 'none',
        cursor: interactive ? 'default' : 'none',
        willChange: 'transform, opacity',
        // Enhanced glass effect
        ...(glassEffect && {
          background: `linear-gradient(135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%)`,
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }),
        // Enhanced shadows on hover
        ...(isHovered && {
          boxShadow: `
            ${shadowMap[shadowIntensity]},
            0 0 30px rgba(139, 92, 246, 0.1)
          `
        })
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Gradient overlay for depth */}
      {glassEffect && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 70%)`,
            borderRadius: mergedStyle.borderRadius
          }}
        />
      )}

      {/* Development info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute -top-6 left-0 text-xs text-white/70 bg-black/50 px-2 py-1 rounded">
          Panel | Float: {animation.float ? 'On' : 'Off'} | Hover: {isHovered ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
}

// Preset configurations for common use cases
export const FloatingPanelPresets = {
  card: {
    style: {
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid rgba(0, 0, 0, 0.1)'
    },
    animation: {
      float: true,
      hover: true,
      parallax: false,
      intensity: 'subtle' as const
    },
    shadowIntensity: 'light' as const
  },

  modal: {
    style: {
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    animation: {
      float: false,
      hover: true,
      parallax: false,
      intensity: 'medium' as const
    },
    shadowIntensity: 'heavy' as const,
    glassEffect: true
  },

  tooltip: {
    style: {
      borderRadius: '8px',
      background: 'rgba(0, 0, 0, 0.8)',
      border: 'none'
    },
    animation: {
      float: true,
      hover: false,
      parallax: false,
      intensity: 'subtle' as const
    },
    shadowIntensity: 'medium' as const,
    glassEffect: false
  },

  showcase: {
    style: {
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    animation: {
      float: true,
      hover: true,
      parallax: true,
      intensity: 'strong' as const
    },
    shadowIntensity: 'heavy' as const,
    glassEffect: true
  },

  sidebar: {
    style: {
      borderRadius: '16px 0 0 16px',
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    animation: {
      float: false,
      hover: false,
      parallax: false,
      intensity: 'subtle' as const
    },
    shadowIntensity: 'medium' as const,
    glassEffect: true
  }
};

// Quick preset component
interface FloatingPanelPresetProps extends Omit<FloatingUIPanelProps, keyof typeof FloatingPanelPresets.card> {
  preset: keyof typeof FloatingPanelPresets;
}

export function FloatingPanelPreset({ preset, children, ...props }: FloatingPanelPresetProps) {
  const presetConfig = FloatingPanelPresets[preset];

  return (
    <FloatingUIPanel
      {...presetConfig}
      {...props}
    >
      {children}
    </FloatingUIPanel>
  );
}

// Utility hook for managing multiple floating panels
export function useFloatingPanels() {
  const [panels, setPanels] = useState<Array<{
    id: string;
    visible: boolean;
    position: FloatingUIPosition;
  }>>([]);

  const showPanel = (id: string, position: FloatingUIPosition) => {
    setPanels(prev => [
      ...prev.filter(p => p.id !== id),
      { id, visible: true, position }
    ]);
  };

  const hidePanel = (id: string) => {
    setPanels(prev =>
      prev.map(p => p.id === id ? { ...p, visible: false } : p)
    );
  };

  const togglePanel = (id: string, position: FloatingUIPosition) => {
    setPanels(prev => {
      const existing = prev.find(p => p.id === id);
      if (existing) {
        return prev.map(p => p.id === id ? { ...p, visible: !p.visible } : p);
      } else {
        return [...prev, { id, visible: true, position }];
      }
    });
  };

  return {
    panels,
    showPanel,
    hidePanel,
    togglePanel
  };
}