'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface DepthLayer {
  id: string;
  element: HTMLElement;
  depth: number;
  parallax: number;
  shadows: ShadowMap[];
  highlights: HighlightMap[];
  occlusion: number;
}

interface ShadowMap {
  x: number;
  y: number;
  intensity: number;
  softness: number;
  color: string;
  direction: { x: number; y: number };
}

interface HighlightMap {
  x: number;
  y: number;
  intensity: number;
  size: number;
  color: string;
  glowRadius: number;
}

interface CrevicePoint {
  x: number;
  y: number;
  depth: number;
  darkness: number;
  neighbors: CrevicePoint[];
}

interface DepthLayersConfig {
  enableCreviceShadows: boolean;
  enableEdgeHighlights: boolean;
  enableContactShadows: boolean;
  shadowIntensity: number;
  highlightIntensity: number;
  lightPosition: { x: number; y: number; z: number };
  ambientLight: number;
  quality: 'performance' | 'balanced' | 'quality';
}

interface DepthLayersProps {
  selector?: string;
  config?: Partial<DepthLayersConfig>;
  className?: string;
  debug?: boolean;
}

export default function DepthLayers({
  selector = '.depth-enhanced',
  config = {},
  className = '',
  debug = false
}: DepthLayersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shadowCanvasRef = useRef<HTMLCanvasElement>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [depthLayers, setDepthLayers] = useState<DepthLayer[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const defaultConfig: DepthLayersConfig = {
    enableCreviceShadows: true,
    enableEdgeHighlights: true,
    enableContactShadows: true,
    shadowIntensity: 0.8,
    highlightIntensity: 0.6,
    lightPosition: { x: 0.3, y: 0.2, z: 1 },
    ambientLight: 0.4,
    quality: 'balanced'
  };

  const finalConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    setIsMounted(true);

    // Track mouse for dynamic lighting
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Analyze DOM elements for depth information
  const analyzeDepthLayers = useCallback((): DepthLayer[] => {
    const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];

    return elements.map((element, index) => {
      const rect = element.getBoundingClientRect();
      const computedStyle = getComputedStyle(element);

      // Extract depth cues from CSS properties
      const zIndex = parseInt(computedStyle.zIndex) || 0;
      const boxShadow = computedStyle.boxShadow;
      const borderRadius = parseFloat(computedStyle.borderRadius) || 0;
      const transform = computedStyle.transform;

      // Parse transform for 3D information
      let translateZ = 0;
      let rotateX = 0;
      let rotateY = 0;

      if (transform && transform !== 'none') {
        const matrix3d = transform.match(/matrix3d\(([^)]+)\)/);
        if (matrix3d) {
          const values = matrix3d[1].split(',').map(v => parseFloat(v.trim()));
          translateZ = values[14] || 0;
        }

        const rotateXMatch = transform.match(/rotateX\(([^)]+)\)/);
        if (rotateXMatch) {
          rotateX = parseFloat(rotateXMatch[1]);
        }

        const rotateYMatch = transform.match(/rotateY\(([^)]+)\)/);
        if (rotateYMatch) {
          rotateY = parseFloat(rotateYMatch[1]);
        }
      }

      // Calculate effective depth
      const baseDepth = zIndex * 100 + translateZ;
      const depthFromShadow = boxShadow !== 'none' ? 50 : 0;
      const depthFromRotation = Math.abs(rotateX) + Math.abs(rotateY);

      const totalDepth = baseDepth + depthFromShadow + depthFromRotation;

      return {
        id: `layer-${index}`,
        element,
        depth: totalDepth,
        parallax: Math.min(10, totalDepth / 50),
        shadows: [],
        highlights: [],
        occlusion: 0
      };
    });
  }, [selector]);

  // Generate crevice shadows for deep areas
  const generateCreviceShadows = useCallback((layer: DepthLayer): ShadowMap[] => {
    if (!finalConfig.enableCreviceShadows) return [];

    const shadows: ShadowMap[] = [];
    const rect = layer.element.getBoundingClientRect();
    const computedStyle = getComputedStyle(layer.element);
    const borderRadius = parseFloat(computedStyle.borderRadius) || 0;

    // Analyze element geometry for crevices
    const crevicePoints: CrevicePoint[] = [];

    // Corners and edges are natural crevice locations
    const corners = [
      { x: rect.left, y: rect.top },
      { x: rect.right, y: rect.top },
      { x: rect.right, y: rect.bottom },
      { x: rect.left, y: rect.bottom }
    ];

    corners.forEach((corner, index) => {
      // Skip rounded corners for crevice shadows
      if (borderRadius > 10) return;

      const nextCorner = corners[(index + 1) % corners.length];
      const prevCorner = corners[(index + 3) % corners.length];

      // Calculate internal angle
      const angle1 = Math.atan2(nextCorner.y - corner.y, nextCorner.x - corner.x);
      const angle2 = Math.atan2(prevCorner.y - corner.y, prevCorner.x - corner.x);
      const internalAngle = Math.abs(angle2 - angle1);

      // Acute angles create deeper crevices
      if (internalAngle < Math.PI * 0.75) {
        const creviceDepth = (Math.PI * 0.75 - internalAngle) / (Math.PI * 0.75);

        crevicePoints.push({
          x: corner.x,
          y: corner.y,
          depth: layer.depth + creviceDepth * 100,
          darkness: creviceDepth * finalConfig.shadowIntensity,
          neighbors: []
        });
      }
    });

    // Create shadows for crevice points
    crevicePoints.forEach(point => {
      const lightDir = {
        x: mouseRef.current.x - point.x,
        y: mouseRef.current.y - point.y
      };
      const lightDistance = Math.sqrt(lightDir.x * lightDir.x + lightDir.y * lightDir.y);

      // Normalize light direction
      lightDir.x /= lightDistance;
      lightDir.y /= lightDistance;

      // Shadow cast away from light
      const shadowDir = { x: -lightDir.x, y: -lightDir.y };

      shadows.push({
        x: point.x + shadowDir.x * 5,
        y: point.y + shadowDir.y * 5,
        intensity: point.darkness * (1 - Math.min(1, lightDistance / 500)),
        softness: 3 + point.depth / 50,
        color: '#1a1a1a',
        direction: shadowDir
      });
    });

    return shadows;
  }, [finalConfig.enableCreviceShadows, finalConfig.shadowIntensity]);

  // Generate edge highlights
  const generateEdgeHighlights = useCallback((layer: DepthLayer): HighlightMap[] => {
    if (!finalConfig.enableEdgeHighlights) return [];

    const highlights: HighlightMap[] = [];
    const rect = layer.element.getBoundingClientRect();
    const computedStyle = getComputedStyle(layer.element);
    const borderRadius = parseFloat(computedStyle.borderRadius) || 0;

    // Light position relative to element
    const lightX = mouseRef.current.x;
    const lightY = mouseRef.current.y;
    const lightZ = 200;

    // Calculate element center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Light vector to element
    const lightToElement = {
      x: centerX - lightX,
      y: centerY - lightY,
      z: layer.depth - lightZ
    };

    // Normalize
    const lightDistance = Math.sqrt(
      lightToElement.x * lightToElement.x +
      lightToElement.y * lightToElement.y +
      lightToElement.z * lightToElement.z
    );

    lightToElement.x /= lightDistance;
    lightToElement.y /= lightDistance;
    lightToElement.z /= lightDistance;

    // Generate highlights on edges facing the light
    const edgePoints = [
      // Top edge
      { x: rect.left + rect.width * 0.25, y: rect.top, normal: { x: 0, y: -1, z: 0 } },
      { x: rect.left + rect.width * 0.75, y: rect.top, normal: { x: 0, y: -1, z: 0 } },
      // Right edge
      { x: rect.right, y: rect.top + rect.height * 0.25, normal: { x: 1, y: 0, z: 0 } },
      { x: rect.right, y: rect.top + rect.height * 0.75, normal: { x: 1, y: 0, z: 0 } },
      // Bottom edge
      { x: rect.left + rect.width * 0.75, y: rect.bottom, normal: { x: 0, y: 1, z: 0 } },
      { x: rect.left + rect.width * 0.25, y: rect.bottom, normal: { x: 0, y: 1, z: 0 } },
      // Left edge
      { x: rect.left, y: rect.top + rect.height * 0.75, normal: { x: -1, y: 0, z: 0 } },
      { x: rect.left, y: rect.top + rect.height * 0.25, normal: { x: -1, y: 0, z: 0 } }
    ];

    edgePoints.forEach(edge => {
      // Calculate dot product with light direction
      const dotProduct = Math.max(0,
        edge.normal.x * (-lightToElement.x) +
        edge.normal.y * (-lightToElement.y) +
        edge.normal.z * (-lightToElement.z)
      );

      if (dotProduct > 0.3) {
        const intensity = dotProduct * finalConfig.highlightIntensity *
          (1 - Math.min(1, lightDistance / 800));

        highlights.push({
          x: edge.x,
          y: edge.y,
          intensity: intensity,
          size: 2 + layer.depth / 100,
          color: '#ffffff',
          glowRadius: 8 + intensity * 12
        });
      }
    });

    return highlights;
  }, [finalConfig.enableEdgeHighlights, finalConfig.highlightIntensity]);

  // Generate contact shadows between elements
  const generateContactShadows = useCallback((layers: DepthLayer[]): ShadowMap[] => {
    if (!finalConfig.enableContactShadows) return [];

    const contactShadows: ShadowMap[] = [];

    layers.forEach((layer, index) => {
      const rect = layer.element.getBoundingClientRect();

      // Find elements below this one
      const elementsBelow = layers.filter(otherLayer =>
        otherLayer.depth < layer.depth - 20
      );

      elementsBelow.forEach(belowLayer => {
        const belowRect = belowLayer.element.getBoundingClientRect();

        // Check if elements overlap in 2D space
        const overlapX = Math.max(0, Math.min(rect.right, belowRect.right) - Math.max(rect.left, belowRect.left));
        const overlapY = Math.max(0, Math.min(rect.bottom, belowRect.bottom) - Math.max(rect.top, belowRect.top));

        if (overlapX > 0 && overlapY > 0) {
          // Calculate contact shadow
          const depthDiff = layer.depth - belowLayer.depth;
          const shadowIntensity = Math.min(0.6, depthDiff / 200) * finalConfig.shadowIntensity;

          // Shadow position slightly offset from the upper element
          const shadowX = Math.max(rect.left, belowRect.left) + overlapX / 2;
          const shadowY = Math.max(rect.top, belowRect.top) + overlapY / 2;

          contactShadows.push({
            x: shadowX,
            y: shadowY + 3, // Slight offset
            intensity: shadowIntensity,
            softness: Math.min(20, depthDiff / 10),
            color: '#000000',
            direction: { x: 0, y: 1 }
          });
        }
      });
    });

    return contactShadows;
  }, [finalConfig.enableContactShadows, finalConfig.shadowIntensity]);

  // Render shadows
  const renderShadows = useCallback((ctx: CanvasRenderingContext2D, shadows: ShadowMap[]) => {
    shadows.forEach(shadow => {
      ctx.save();

      // Create radial gradient for soft shadows
      const gradient = ctx.createRadialGradient(
        shadow.x, shadow.y, 0,
        shadow.x, shadow.y, shadow.softness
      );

      const shadowColor = shadow.color === '#000000' ?
        `rgba(0, 0, 0, ${shadow.intensity})` :
        shadow.color.replace(')', `, ${shadow.intensity})`);

      gradient.addColorStop(0, shadowColor);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = 'multiply';

      // Draw shadow
      ctx.beginPath();
      ctx.arc(shadow.x, shadow.y, shadow.softness, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }, []);

  // Render highlights
  const renderHighlights = useCallback((ctx: CanvasRenderingContext2D, highlights: HighlightMap[]) => {
    highlights.forEach(highlight => {
      ctx.save();

      // Create radial gradient for glow
      const gradient = ctx.createRadialGradient(
        highlight.x, highlight.y, 0,
        highlight.x, highlight.y, highlight.glowRadius
      );

      gradient.addColorStop(0, `rgba(255, 255, 255, ${highlight.intensity})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${highlight.intensity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = 'screen';

      // Draw highlight
      ctx.beginPath();
      ctx.arc(highlight.x, highlight.y, highlight.glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner bright spot
      ctx.fillStyle = `rgba(255, 255, 255, ${highlight.intensity * 0.8})`;
      ctx.beginPath();
      ctx.arc(highlight.x, highlight.y, highlight.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    if (!canvasRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Analyze current depth layers
    const currentLayers = analyzeDepthLayers();

    // Generate all shadow and highlight effects
    const allShadows: ShadowMap[] = [];
    const allHighlights: HighlightMap[] = [];

    currentLayers.forEach(layer => {
      // Generate crevice shadows
      const creviceShadows = generateCreviceShadows(layer);
      allShadows.push(...creviceShadows);

      // Generate edge highlights
      const edgeHighlights = generateEdgeHighlights(layer);
      allHighlights.push(...edgeHighlights);
    });

    // Generate contact shadows
    const contactShadows = generateContactShadows(currentLayers);
    allShadows.push(...contactShadows);

    // Render effects
    renderShadows(ctx, allShadows);
    renderHighlights(ctx, allHighlights);

    // Update state for external access
    setDepthLayers(currentLayers);

    animationRef.current = requestAnimationFrame(animate);
  }, [
    analyzeDepthLayers,
    generateCreviceShadows,
    generateEdgeHighlights,
    generateContactShadows,
    renderShadows,
    renderHighlights
  ]);

  useEffect(() => {
    if (!isMounted) return;

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, animate]);

  if (!isMounted) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-20 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          mixBlendMode: 'normal',
          opacity: 0.8
        }}
      />
      {debug && (
        <div className="absolute top-20 left-4 bg-black bg-opacity-70 text-white p-3 rounded text-xs space-y-1">
          <div>Depth Layers: {depthLayers.length}</div>
          <div>Mouse: ({mouseRef.current.x}, {mouseRef.current.y})</div>
          <div>Crevice Shadows: {finalConfig.enableCreviceShadows ? 'ON' : 'OFF'}</div>
          <div>Edge Highlights: {finalConfig.enableEdgeHighlights ? 'ON' : 'OFF'}</div>
          <div>Contact Shadows: {finalConfig.enableContactShadows ? 'ON' : 'OFF'}</div>
        </div>
      )}
    </div>
  );
}

export type { DepthLayersConfig, DepthLayer, ShadowMap, HighlightMap };