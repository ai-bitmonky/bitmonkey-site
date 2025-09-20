'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface DepthMap {
  x: number;
  y: number;
  depth: number;
  normal: { x: number; y: number; z: number };
  curvature: number;
  occlusion: number;
}

interface LightSource {
  x: number;
  y: number;
  z: number;
  intensity: number;
  color: string;
  type: 'directional' | 'point' | 'ambient';
  radius?: number;
}

interface AmbientOcclusionConfig {
  samples: number;
  radius: number;
  intensity: number;
  falloff: number;
  bias: number;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  enableEdgeHighlights: boolean;
  enableCreviceShadows: boolean;
  adaptiveLighting: boolean;
}

interface AmbientOcclusionProps {
  target?: string; // CSS selector for target elements
  config?: Partial<AmbientOcclusionConfig>;
  lightSources?: LightSource[];
  className?: string;
  debug?: boolean;
}

export default function AmbientOcclusion({
  target = '.ao-enhanced',
  config = {},
  lightSources = [],
  className = '',
  debug = false
}: AmbientOcclusionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const depthCanvasRef = useRef<HTMLCanvasElement>(null);
  const occlusionCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [targetElements, setTargetElements] = useState<HTMLElement[]>([]);
  const depthMapRef = useRef<DepthMap[]>([]);
  const timeRef = useRef(0);

  // Default configuration
  const defaultConfig: AmbientOcclusionConfig = {
    samples: 16,
    radius: 50,
    intensity: 1.0,
    falloff: 2.0,
    bias: 0.05,
    quality: 'medium',
    enableEdgeHighlights: true,
    enableCreviceShadows: true,
    adaptiveLighting: true
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Quality-based settings
  const qualitySettings = {
    low: { samples: 8, radius: 30, resolution: 0.5 },
    medium: { samples: 16, radius: 50, resolution: 0.75 },
    high: { samples: 32, radius: 70, resolution: 1.0 },
    ultra: { samples: 64, radius: 100, resolution: 1.0 }
  };

  const settings = qualitySettings[finalConfig.quality];

  // Default light sources
  const defaultLights: LightSource[] = [
    {
      x: window.innerWidth * 0.3,
      y: window.innerHeight * 0.2,
      z: 200,
      intensity: 1.2,
      color: '#ffffff',
      type: 'directional'
    },
    {
      x: window.innerWidth * 0.7,
      y: window.innerHeight * 0.8,
      z: 150,
      intensity: 0.8,
      color: '#e6f3ff',
      type: 'point',
      radius: 300
    },
    {
      x: 0,
      y: 0,
      z: 0,
      intensity: 0.3,
      color: '#f0f0f0',
      type: 'ambient'
    }
  ];

  const lights = lightSources.length > 0 ? lightSources : defaultLights;

  useEffect(() => {
    setIsMounted(true);

    // Find target elements
    const elements = Array.from(document.querySelectorAll(target)) as HTMLElement[];
    setTargetElements(elements);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target]);

  // Generate depth map from DOM elements
  const generateDepthMap = useCallback((elements: HTMLElement[]): DepthMap[] => {
    const depthMap: DepthMap[] = [];

    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const computedStyle = getComputedStyle(element);

      // Extract depth information from various CSS properties
      const zIndex = parseInt(computedStyle.zIndex) || 0;
      const transform = computedStyle.transform;
      const boxShadow = computedStyle.boxShadow;
      const borderRadius = parseFloat(computedStyle.borderRadius) || 0;

      // Parse transform matrix for translateZ
      let translateZ = 0;
      if (transform && transform !== 'none') {
        const matrix = transform.match(/matrix3d\(([^)]+)\)/);
        if (matrix) {
          const values = matrix[1].split(',');
          translateZ = parseFloat(values[14]) || 0;
        }
      }

      // Calculate element depth based on multiple factors
      const baseDepth = zIndex * 10 + translateZ;

      // Generate depth points across the element surface
      const resolution = Math.max(1, Math.floor(rect.width / 20));

      for (let x = 0; x < rect.width; x += resolution) {
        for (let y = 0; y < rect.height; y += resolution) {
          const worldX = rect.left + x;
          const worldY = rect.top + y;

          // Calculate surface normal based on element properties
          const distanceFromCenter = Math.sqrt(
            Math.pow((x - rect.width / 2) / (rect.width / 2), 2) +
            Math.pow((y - rect.height / 2) / (rect.height / 2), 2)
          );

          // Create curved surface based on border radius
          const curvature = borderRadius > 0 ?
            Math.max(0, 1 - distanceFromCenter) * (borderRadius / 20) : 0;

          const surfaceDepth = baseDepth + curvature * 20;

          // Calculate surface normal
          const normalX = borderRadius > 0 ? (x - rect.width / 2) / rect.width : 0;
          const normalY = borderRadius > 0 ? (y - rect.height / 2) / rect.height : 0;
          const normalZ = Math.sqrt(Math.max(0, 1 - normalX * normalX - normalY * normalY));

          depthMap.push({
            x: worldX,
            y: worldY,
            depth: surfaceDepth,
            normal: { x: normalX, y: normalY, z: normalZ },
            curvature: curvature,
            occlusion: 0 // Will be calculated later
          });
        }
      }
    });

    return depthMap;
  }, []);

  // Calculate ambient occlusion for each point
  const calculateAmbientOcclusion = useCallback((depthMap: DepthMap[]): DepthMap[] => {
    return depthMap.map(point => {
      let occlusion = 0;
      let sampleCount = 0;

      // Sample points in a hemisphere around the current point
      for (let i = 0; i < settings.samples; i++) {
        const angle = (i / settings.samples) * Math.PI * 2;
        const elevation = Math.random() * Math.PI * 0.5; // Hemisphere

        const sampleRadius = finalConfig.radius * (0.1 + Math.random() * 0.9);

        const sampleX = point.x + Math.cos(angle) * Math.cos(elevation) * sampleRadius;
        const sampleY = point.y + Math.sin(angle) * Math.cos(elevation) * sampleRadius;
        const sampleZ = point.depth + Math.sin(elevation) * sampleRadius;

        // Find nearby points to check for occlusion
        const nearbyPoints = depthMap.filter(p => {
          const distance = Math.sqrt(
            Math.pow(p.x - sampleX, 2) +
            Math.pow(p.y - sampleY, 2)
          );
          return distance < sampleRadius && p.depth > sampleZ;
        });

        if (nearbyPoints.length > 0) {
          // Calculate occlusion based on depth difference
          const maxDepthDiff = Math.max(...nearbyPoints.map(p => p.depth - sampleZ));
          const occlusionStrength = Math.min(1, maxDepthDiff / finalConfig.radius);
          occlusion += occlusionStrength;
        }

        sampleCount++;
      }

      const finalOcclusion = Math.pow(occlusion / sampleCount, finalConfig.falloff);

      return {
        ...point,
        occlusion: Math.min(1, finalOcclusion * finalConfig.intensity)
      };
    });
  }, [finalConfig, settings.samples]);

  // Calculate lighting contribution
  const calculateLighting = useCallback((point: DepthMap, lights: LightSource[]): number => {
    let totalLight = 0;

    lights.forEach(light => {
      if (light.type === 'ambient') {
        totalLight += light.intensity;
        return;
      }

      const lightX = light.x;
      const lightY = light.y;
      const lightZ = light.z;

      const dx = lightX - point.x;
      const dy = lightY - point.y;
      const dz = lightZ - point.depth;

      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (light.type === 'point' && light.radius && distance > light.radius) {
        return;
      }

      // Normalize light direction
      const lightDirX = dx / distance;
      const lightDirY = dy / distance;
      const lightDirZ = dz / distance;

      // Calculate dot product with surface normal
      const dotProduct = Math.max(0,
        point.normal.x * lightDirX +
        point.normal.y * lightDirY +
        point.normal.z * lightDirZ
      );

      // Calculate attenuation
      let attenuation = 1;
      if (light.type === 'point') {
        attenuation = Math.max(0, 1 - (distance / (light.radius || 100)));
      }

      totalLight += dotProduct * light.intensity * attenuation;
    });

    return Math.min(2, totalLight);
  }, []);

  // Edge detection for highlights
  const detectEdges = useCallback((depthMap: DepthMap[]): DepthMap[] => {
    if (!finalConfig.enableEdgeHighlights) return depthMap;

    return depthMap.map(point => {
      // Sample surrounding points for edge detection
      const surroundingPoints = depthMap.filter(p => {
        const distance = Math.sqrt(
          Math.pow(p.x - point.x, 2) +
          Math.pow(p.y - point.y, 2)
        );
        return distance > 0 && distance < 30;
      });

      if (surroundingPoints.length === 0) return point;

      // Calculate depth gradient
      const avgDepth = surroundingPoints.reduce((sum, p) => sum + p.depth, 0) / surroundingPoints.length;
      const depthDifference = Math.abs(point.depth - avgDepth);

      // Edge strength based on depth gradient
      const edgeStrength = Math.min(1, depthDifference / 20);

      return {
        ...point,
        edgeStrength
      } as DepthMap & { edgeStrength: number };
    });
  }, [finalConfig.enableEdgeHighlights]);

  // Render the ambient occlusion effect
  const renderAmbientOcclusion = useCallback((ctx: CanvasRenderingContext2D, depthMap: DepthMap[]) => {
    const canvas = ctx.canvas;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create image data for pixel manipulation
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    depthMap.forEach(point => {
      const x = Math.floor(point.x * settings.resolution);
      const y = Math.floor(point.y * settings.resolution);

      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;

      const index = (y * canvas.width + x) * 4;

      // Calculate lighting
      const lighting = calculateLighting(point, lights);
      const edgePoint = point as DepthMap & { edgeStrength?: number };
      const edgeHighlight = edgePoint.edgeStrength || 0;

      // Base ambient occlusion
      const ao = 1 - point.occlusion;

      // Combine lighting with ambient occlusion
      const finalLighting = Math.min(1, (lighting * ao) + (edgeHighlight * 0.3));

      // Crevice shadows (enhanced occlusion in deep areas)
      let creviceShadow = 0;
      if (finalConfig.enableCreviceShadows && point.occlusion > 0.7) {
        creviceShadow = (point.occlusion - 0.7) * 0.5;
      }

      const finalValue = Math.max(0, Math.min(1, finalLighting - creviceShadow));

      // Apply to RGB channels with slight color temperature variation
      const r = Math.floor(finalValue * 255);
      const g = Math.floor(finalValue * 255 * 0.98); // Slightly cooler
      const b = Math.floor(finalValue * 255 * 0.96);
      const a = Math.floor(Math.min(255, (1 - ao + edgeHighlight) * 180)); // Semi-transparent

      data[index] = r;     // Red
      data[index + 1] = g; // Green
      data[index + 2] = b; // Blue
      data[index + 3] = a; // Alpha
    });

    // Apply the image data
    ctx.putImageData(imageData, 0, 0);

    // Apply blur for softer shadows
    ctx.filter = 'blur(1px)';
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
    ctx.globalCompositeOperation = 'source-over';
  }, [calculateLighting, lights, finalConfig, settings.resolution]);

  // Render debug visualization
  const renderDebug = useCallback((ctx: CanvasRenderingContext2D, depthMap: DepthMap[]) => {
    if (!debug) return;

    ctx.globalAlpha = 0.8;

    // Draw depth map points
    depthMap.forEach(point => {
      const hue = (point.depth / 100) % 360;
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
      ctx.fillRect(point.x - 1, point.y - 1, 2, 2);

      // Draw normal vectors
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(
        point.x + point.normal.x * 20,
        point.y + point.normal.y * 20
      );
      ctx.stroke();
    });

    // Draw light sources
    lights.forEach((light, index) => {
      if (light.type === 'ambient') return;

      ctx.fillStyle = light.color;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(light.x, light.y, 10, 0, Math.PI * 2);
      ctx.fill();

      if (light.radius) {
        ctx.strokeStyle = light.color;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    ctx.globalAlpha = 1;
  }, [debug, lights]);

  // Animation loop
  const animate = useCallback(() => {
    if (!canvasRef.current || targetElements.length === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth * settings.resolution;
    canvas.height = window.innerHeight * settings.resolution;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(settings.resolution, settings.resolution);

    timeRef.current += 0.016;

    // Update adaptive lighting
    if (finalConfig.adaptiveLighting) {
      const mouseX = window.innerWidth * 0.5; // Could be mouse position
      const mouseY = window.innerHeight * 0.5;

      // Update primary light position
      if (lights[0]) {
        lights[0].x = mouseX + Math.sin(timeRef.current * 0.5) * 100;
        lights[0].y = mouseY + Math.cos(timeRef.current * 0.3) * 50;
      }
    }

    // Generate depth map
    const depthMap = generateDepthMap(targetElements);

    // Calculate ambient occlusion
    const occludedMap = calculateAmbientOcclusion(depthMap);

    // Detect edges
    const finalMap = detectEdges(occludedMap);

    // Store for external access
    depthMapRef.current = finalMap;

    // Render
    renderAmbientOcclusion(ctx, finalMap);
    renderDebug(ctx, finalMap);

    animationRef.current = requestAnimationFrame(animate);
  }, [
    targetElements,
    settings.resolution,
    finalConfig.adaptiveLighting,
    lights,
    generateDepthMap,
    calculateAmbientOcclusion,
    detectEdges,
    renderAmbientOcclusion,
    renderDebug
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
    <div className={`fixed inset-0 pointer-events-none z-30 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.6
        }}
      />
      {debug && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded text-xs">
          <div>AO Samples: {settings.samples}</div>
          <div>Quality: {finalConfig.quality}</div>
          <div>Target Elements: {targetElements.length}</div>
          <div>Depth Points: {depthMapRef.current.length}</div>
        </div>
      )}
    </div>
  );
}

// Hook for easy configuration
export function useAmbientOcclusion(config?: Partial<AmbientOcclusionConfig>) {
  const [aoConfig, setAoConfig] = useState<Partial<AmbientOcclusionConfig>>(config || {});

  const updateConfig = useCallback((newConfig: Partial<AmbientOcclusionConfig>) => {
    setAoConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  return {
    config: aoConfig,
    updateConfig
  };
}

export type { AmbientOcclusionConfig, LightSource };