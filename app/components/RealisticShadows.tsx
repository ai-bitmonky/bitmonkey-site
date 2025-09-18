'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ShadowCardProps {
  children: React.ReactNode;
  shadowType?: 'soft' | 'hard' | 'multiple' | 'long' | 'neumorphism' | 'colored' | 'inner';
  intensity?: 'subtle' | 'medium' | 'strong';
  color?: string;
  className?: string;
  animated?: boolean;
  hoverEffect?: boolean;
}

export const ShadowCard: React.FC<ShadowCardProps> = ({
  children,
  shadowType = 'soft',
  intensity = 'medium',
  color = 'black',
  className = '',
  animated = true,
  hoverEffect = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [animated]);

  const getShadowStyles = () => {
    const baseIntensity = intensity === 'subtle' ? 0.6 : intensity === 'medium' ? 1 : 1.4;
    const hoverMultiplier = isHovered && hoverEffect ? 1.5 : 1;
    const finalIntensity = baseIntensity * hoverMultiplier;

    const colorOpacity = (alpha: number) => {
      if (color === 'black') return `rgba(0, 0, 0, ${alpha * finalIntensity})`;
      if (color === 'purple') return `rgba(139, 92, 246, ${alpha * finalIntensity})`;
      if (color === 'blue') return `rgba(59, 130, 246, ${alpha * finalIntensity})`;
      if (color === 'green') return `rgba(16, 185, 129, ${alpha * finalIntensity})`;
      if (color === 'orange') return `rgba(245, 158, 11, ${alpha * finalIntensity})`;
      return `rgba(0, 0, 0, ${alpha * finalIntensity})`;
    };

    switch (shadowType) {
      case 'soft':
        return {
          boxShadow: `
            0 1px 3px ${colorOpacity(0.12)},
            0 1px 2px ${colorOpacity(0.24)},
            0 4px 8px ${colorOpacity(0.15)},
            0 8px 16px ${colorOpacity(0.1)}
          `
        };

      case 'hard':
        return {
          boxShadow: `
            0 4px 6px ${colorOpacity(0.4)},
            0 2px 4px ${colorOpacity(0.3)},
            0 8px 12px ${colorOpacity(0.25)}
          `
        };

      case 'multiple':
        return {
          boxShadow: `
            0 1px 1px ${colorOpacity(0.15)},
            0 2px 2px ${colorOpacity(0.15)},
            0 4px 4px ${colorOpacity(0.15)},
            0 8px 8px ${colorOpacity(0.15)},
            0 16px 16px ${colorOpacity(0.15)}
          `
        };

      case 'long':
        return {
          boxShadow: `
            0 8px 16px ${colorOpacity(0.25)},
            0 16px 32px ${colorOpacity(0.15)},
            0 32px 64px ${colorOpacity(0.1)}
          `
        };

      case 'neumorphism':
        return {
          boxShadow: `
            ${finalIntensity * 8}px ${finalIntensity * 8}px ${finalIntensity * 16}px ${colorOpacity(0.2)},
            -${finalIntensity * 8}px -${finalIntensity * 8}px ${finalIntensity * 16}px rgba(255, 255, 255, ${finalIntensity * 0.7})
          `,
          background: 'linear-gradient(145deg, #f0f0f0, #cacaca)'
        };

      case 'colored':
        return {
          boxShadow: `
            0 4px 8px ${colorOpacity(0.3)},
            0 8px 16px ${colorOpacity(0.2)},
            0 16px 32px ${colorOpacity(0.1)},
            0 0 0 1px ${colorOpacity(0.05)}
          `
        };

      case 'inner':
        return {
          boxShadow: `
            inset 0 2px 4px ${colorOpacity(0.3)},
            inset 0 4px 8px ${colorOpacity(0.2)},
            0 1px 2px ${colorOpacity(0.1)}
          `
        };

      default:
        return {};
    }
  };

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-500 ease-out ${className}`}
      style={{
        ...getShadowStyles(),
        transform: isVisible
          ? `translateY(0) scale(1) ${isHovered && hoverEffect ? 'translateY(-4px)' : ''}`
          : 'translateY(20px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: animated ? '200ms' : '0ms'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

interface ShadowShowcaseProps {
  title?: string;
  description?: string;
  className?: string;
}

export const ShadowShowcase: React.FC<ShadowShowcaseProps> = ({
  title = "Realistic Shadow Effects",
  description = "Experience depth and dimension with layered shadow systems",
  className = ''
}) => {
  const shadowExamples = [
    {
      type: 'soft' as const,
      title: 'Soft Shadow',
      description: 'Multiple layers create natural depth',
      color: 'black',
      content: '✨ Gentle & Natural'
    },
    {
      type: 'hard' as const,
      title: 'Hard Shadow',
      description: 'Sharp, defined edges for contrast',
      color: 'black',
      content: '⚡ Bold & Defined'
    },
    {
      type: 'multiple' as const,
      title: 'Layered Shadow',
      description: 'Multiple shadow layers for depth',
      color: 'purple',
      content: '🎭 Multi-layered'
    },
    {
      type: 'long' as const,
      title: 'Long Shadow',
      description: 'Extended shadows for floating effect',
      color: 'blue',
      content: '🚀 Floating Effect'
    },
    {
      type: 'neumorphism' as const,
      title: 'Neumorphism',
      description: 'Soft UI with raised appearance',
      color: 'black',
      content: '🎯 Soft UI'
    },
    {
      type: 'colored' as const,
      title: 'Colored Shadow',
      description: 'Vibrant shadows with brand colors',
      color: 'green',
      content: '🌈 Colorful'
    }
  ];

  return (
    <div className={`${className}`}>
      {title && (
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shadowExamples.map((example, index) => (
          <div key={example.type} className="text-center">
            <h4 className="text-sm font-medium text-gray-800 mb-4">{example.title}</h4>
            <ShadowCard
              shadowType={example.type}
              color={example.color}
              intensity="medium"
              hoverEffect={true}
              animated={true}
              className="bg-white rounded-xl p-6 cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center h-24">
                <div className="text-2xl font-bold text-gray-700 mb-2">
                  {example.content}
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {example.description}
                </p>
              </div>
            </ShadowCard>
          </div>
        ))}
      </div>

      {/* Interactive Demo */}
      <div className="mt-12">
        <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">Interactive Shadow Demo</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Floating Card Demo */}
          <ShadowCard
            shadowType="multiple"
            color="purple"
            intensity="strong"
            hoverEffect={true}
            className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h5 className="text-lg font-semibold text-gray-900 mb-2">Design Element</h5>
              <p className="text-gray-600 text-sm">Hover to see enhanced shadow depth</p>
            </div>
          </ShadowCard>

          {/* Neumorphism Demo */}
          <ShadowCard
            shadowType="neumorphism"
            intensity="medium"
            hoverEffect={true}
            className="rounded-2xl p-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center shadow-inner">
                <span className="text-gray-600 text-xl">⚪</span>
              </div>
              <h5 className="text-lg font-semibold text-gray-700 mb-2">Neumorphic UI</h5>
              <p className="text-gray-500 text-sm">Soft, tactile interface design</p>
            </div>
          </ShadowCard>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 italic">
          Shadows animate on scroll and respond to hover interactions for enhanced user experience
        </p>
      </div>
    </div>
  );
};

export default ShadowCard;