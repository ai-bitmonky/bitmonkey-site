'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SpatialLayer {
  id: string;
  depth: number;
  content: React.ReactNode;
  position: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  scale?: number;
  opacity?: number;
  blur?: number;
}

interface SpatialDesignProps {
  layers: SpatialLayer[];
  perspective?: number;
  className?: string;
  enableParallax?: boolean;
  enableDepthBlur?: boolean;
  enableResponsiveDepth?: boolean;
  maxDepth?: number;
}

export default function SpatialDesign({
  layers,
  perspective = 1000,
  className = '',
  enableParallax = true,
  enableDepthBlur = true,
  enableResponsiveDepth = true,
  maxDepth = 500
}: SpatialDesignProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsMounted(true);

    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);

    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  useEffect(() => {
    if (!enableParallax || !isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;

      setMousePosition({ x, y });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [enableParallax, isMounted]);

  // Calculate spatial transformations
  const calculateLayerTransform = (layer: SpatialLayer) => {
    const { position, rotation, scale, depth } = layer;

    // Base transform
    let transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`;

    // Add parallax effect based on depth and mouse position
    if (enableParallax && isMounted) {
      const parallaxStrength = Math.min(depth / maxDepth, 1) * 20;
      const parallaxX = mousePosition.x * parallaxStrength;
      const parallaxY = mousePosition.y * parallaxStrength;
      transform += ` translate3d(${parallaxX}px, ${parallaxY}px, 0px)`;
    }

    // Add rotation
    if (rotation) {
      transform += ` rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
    }

    // Add scale
    if (scale) {
      transform += ` scale(${scale})`;
    }

    // Add responsive depth scaling
    if (enableResponsiveDepth && viewportSize.width > 0) {
      const responsiveScale = Math.max(0.5, Math.min(1, viewportSize.width / 1200));
      transform += ` scale(${responsiveScale})`;
    }

    return transform;
  };

  // Calculate depth-based blur
  const calculateBlur = (depth: number) => {
    if (!enableDepthBlur) return 0;
    return Math.max(0, (depth / maxDepth) * 3);
  };

  // Calculate depth-based opacity
  const calculateOpacity = (layer: SpatialLayer) => {
    const baseOpacity = layer.opacity || 1;
    const depthOpacity = Math.max(0.1, 1 - (layer.depth / maxDepth) * 0.7);
    return baseOpacity * depthOpacity;
  };

  // Sort layers by depth (furthest first)
  const sortedLayers = [...layers].sort((a, b) => b.depth - a.depth);

  if (!isMounted) {
    return (
      <div className={`relative ${className}`} style={{ perspective }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full opacity-50" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Spatial Grid Background (Optional) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `perspective(${perspective}px) rotateX(60deg) translateZ(-100px)`
          }}
        />
      </div>

      {/* Spatial Layers */}
      {sortedLayers.map((layer) => {
        const blur = calculateBlur(layer.depth);
        const opacity = calculateOpacity(layer);
        const transform = calculateLayerTransform(layer);

        return (
          <div
            key={layer.id}
            className="absolute"
            style={{
              transform,
              opacity,
              filter: blur > 0 ? `blur(${blur}px)` : 'none',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              transition: enableParallax ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            {layer.content}
          </div>
        );
      })}

      {/* Depth Indicators (Development Helper) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 text-xs text-gray-500 bg-black/50 p-2 rounded">
          <div>Layers: {layers.length}</div>
          <div>Mouse: {mousePosition.x.toFixed(2)}, {mousePosition.y.toFixed(2)}</div>
          <div>Viewport: {viewportSize.width}x{viewportSize.height}</div>
        </div>
      )}
    </div>
  );
}

// Utility component for creating spatial layers
export const SpatialLayer: React.FC<{
  depth: number;
  x?: number;
  y?: number;
  z?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scale?: number;
  opacity?: number;
  children: React.ReactNode;
  className?: string;
}> = ({
  depth,
  x = 0,
  y = 0,
  z = 0,
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  scale = 1,
  opacity = 1,
  children,
  className = ''
}) => {
  return (
    <div
      className={`spatial-layer ${className}`}
      data-depth={depth}
      style={{
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg) scale(${scale})`,
        opacity,
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};

// Pre-built spatial layouts
export const SpatialLayoutPresets = {
  // Floating cards layout
  floatingCards: (items: React.ReactNode[]) =>
    items.map((item, index) => ({
      id: `card-${index}`,
      depth: index * 50 + 50,
      content: item,
      position: {
        x: (index % 3 - 1) * 200,
        y: Math.floor(index / 3) * 150,
        z: index * -30
      },
      rotation: {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        z: Math.random() * 5 - 2.5
      },
      scale: 1 - (index * 0.05),
      opacity: 1 - (index * 0.1)
    })),

  // Spiral layout
  spiral: (items: React.ReactNode[]) =>
    items.map((item, index) => {
      const angle = (index / items.length) * Math.PI * 4;
      const radius = 100 + index * 20;
      return {
        id: `spiral-${index}`,
        depth: index * 30,
        content: item,
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: index * -20
        },
        rotation: { x: 0, y: 0, z: angle * (180 / Math.PI) }
      };
    }),

  // Depth layers
  depthLayers: (items: React.ReactNode[]) =>
    items.map((item, index) => ({
      id: `layer-${index}`,
      depth: index * 100,
      content: item,
      position: { x: 0, y: 0, z: index * -50 },
      scale: 1 - (index * 0.1),
      opacity: 1 - (index * 0.15)
    }))
};