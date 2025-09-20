'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Light3D {
  id: string;
  position: { x: number; y: number; z: number };
  color: { r: number; g: number; b: number };
  intensity: number;
  type: 'directional' | 'point' | 'spot' | 'area';
  radius?: number;
  falloff?: number;
  direction?: { x: number; y: number; z: number };
  angle?: number;
  penumbra?: number;
  castShadows: boolean;
  dynamic: boolean;
}

interface Surface3D {
  id: string;
  element: HTMLElement;
  vertices: Array<{ x: number; y: number; z: number }>;
  normals: Array<{ x: number; y: number; z: number }>;
  uvs: Array<{ u: number; v: number }>;
  material: {
    albedo: { r: number; g: number; b: number };
    roughness: number;
    metallic: number;
    specular: number;
    emission: number;
  };
}

interface LightingResult {
  diffuse: { r: number; g: number; b: number };
  specular: { r: number; g: number; b: number };
  ambient: { r: number; g: number; b: number };
  occlusion: number;
  shadows: number;
}

interface Lighting3DConfig {
  enablePBR: boolean; // Physically Based Rendering
  enableGlobalIllumination: boolean;
  enableVolumetricLighting: boolean;
  shadowQuality: 'low' | 'medium' | 'high' | 'ultra';
  ambientIntensity: number;
  lightBounces: number;
  exposure: number;
  gamma: number;
  bloomThreshold: number;
  bloomIntensity: number;
}

interface Lighting3DProps {
  selector?: string;
  lights?: Light3D[];
  config?: Partial<Lighting3DConfig>;
  followMouse?: boolean;
  timeOfDay?: 'dawn' | 'day' | 'dusk' | 'night' | 'auto';
  className?: string;
  debug?: boolean;
}

export default function Lighting3D({
  selector = '.lit-3d',
  lights = [],
  config = {},
  followMouse = true,
  timeOfDay = 'auto',
  className = '',
  debug = false
}: Lighting3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const depthBufferRef = useRef<Float32Array | undefined>(undefined);
  const normalBufferRef = useRef<Float32Array | undefined>(undefined);
  const lightingBufferRef = useRef<Float32Array | undefined>(undefined);
  const animationRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [surfaces, setSurfaces] = useState<Surface3D[]>([]);
  const [activeLights, setActiveLights] = useState<Light3D[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const defaultConfig: Lighting3DConfig = {
    enablePBR: true,
    enableGlobalIllumination: false,
    enableVolumetricLighting: true,
    shadowQuality: 'medium',
    ambientIntensity: 0.2,
    lightBounces: 2,
    exposure: 1.0,
    gamma: 2.2,
    bloomThreshold: 0.8,
    bloomIntensity: 0.3
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Default lighting setup based on time of day
  const getTimeBasedLights = useCallback((time: string): Light3D[] => {
    const baseIntensity = time === 'night' ? 0.3 : time === 'dusk' ? 0.6 : 1.0;

    const timeBasedLights: Light3D[] = [
      {
        id: 'sun',
        position: { x: 0.5, y: time === 'night' ? -0.2 : 0.8, z: 1 },
        color: time === 'night' ? { r: 0.4, g: 0.4, b: 0.8 } :
               time === 'dusk' ? { r: 1.0, g: 0.6, b: 0.4 } :
               { r: 1.0, g: 0.95, b: 0.9 },
        intensity: baseIntensity,
        type: 'directional',
        direction: { x: 0.3, y: -0.5, z: -0.8 },
        castShadows: true,
        dynamic: false
      },
      {
        id: 'sky',
        position: { x: 0, y: 1, z: 0 },
        color: time === 'night' ? { r: 0.1, g: 0.1, b: 0.3 } :
               { r: 0.5, g: 0.7, b: 1.0 },
        intensity: finalConfig.ambientIntensity,
        type: 'area',
        radius: 1000,
        castShadows: false,
        dynamic: false
      }
    ];

    if (followMouse) {
      timeBasedLights.push({
        id: 'cursor',
        position: { x: 0.5, y: 0.5, z: 0.3 },
        color: { r: 1.0, g: 1.0, b: 1.0 },
        intensity: 0.8,
        type: 'point',
        radius: 300,
        falloff: 2.0,
        castShadows: true,
        dynamic: true
      });
    }

    return timeBasedLights;
  }, [followMouse, finalConfig.ambientIntensity]);

  useEffect(() => {
    setIsMounted(true);

    // Initialize lighting based on time of day
    const currentTime = timeOfDay === 'auto' ?
      (() => {
        const hour = new Date().getHours();
        if (hour < 6) return 'night';
        if (hour < 12) return 'dawn';
        if (hour < 18) return 'day';
        if (hour < 21) return 'dusk';
        return 'night';
      })() : timeOfDay;

    const initialLights = lights.length > 0 ? lights : getTimeBasedLights(currentTime);
    setActiveLights(initialLights);

    // Track mouse for dynamic lighting
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };

    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (followMouse) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [lights, timeOfDay, followMouse, getTimeBasedLights]);

  // Convert DOM elements to 3D surfaces
  const generateSurfaces = useCallback((): Surface3D[] => {
    const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];

    return elements.map((element, index) => {
      const rect = element.getBoundingClientRect();
      const computedStyle = getComputedStyle(element);

      // Extract 3D transformation data
      const transform = computedStyle.transform;
      let translateZ = 0;
      let rotateX = 0;
      let rotateY = 0;
      let rotateZ = 0;

      if (transform && transform !== 'none') {
        const matrix3d = transform.match(/matrix3d\(([^)]+)\)/);
        if (matrix3d) {
          const values = matrix3d[1].split(',').map(v => parseFloat(v.trim()));
          translateZ = values[14] || 0;
        }

        const rotateXMatch = transform.match(/rotateX\(([^)]+)\)/);
        if (rotateXMatch) rotateX = parseFloat(rotateXMatch[1]) * Math.PI / 180;

        const rotateYMatch = transform.match(/rotateY\(([^)]+)\)/);
        if (rotateYMatch) rotateY = parseFloat(rotateYMatch[1]) * Math.PI / 180;

        const rotateZMatch = transform.match(/rotateZ\(([^)]+)\)/);
        if (rotateZMatch) rotateZ = parseFloat(rotateZMatch[1]) * Math.PI / 180;
      }

      // Create quad vertices for the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;

      const vertices = [
        { x: centerX - halfWidth, y: centerY - halfHeight, z: translateZ },
        { x: centerX + halfWidth, y: centerY - halfHeight, z: translateZ },
        { x: centerX + halfWidth, y: centerY + halfHeight, z: translateZ },
        { x: centerX - halfWidth, y: centerY + halfHeight, z: translateZ }
      ];

      // Apply rotations
      vertices.forEach(vertex => {
        // Translate to origin, rotate, translate back
        const x = vertex.x - centerX;
        const y = vertex.y - centerY;
        const z = vertex.z;

        // Rotate around X
        const y1 = y * Math.cos(rotateX) - z * Math.sin(rotateX);
        const z1 = y * Math.sin(rotateX) + z * Math.cos(rotateX);

        // Rotate around Y
        const x2 = x * Math.cos(rotateY) + z1 * Math.sin(rotateY);
        const z2 = -x * Math.sin(rotateY) + z1 * Math.cos(rotateY);

        // Rotate around Z
        const x3 = x2 * Math.cos(rotateZ) - y1 * Math.sin(rotateZ);
        const y3 = x2 * Math.sin(rotateZ) + y1 * Math.cos(rotateZ);

        vertex.x = x3 + centerX;
        vertex.y = y3 + centerY;
        vertex.z = z2;
      });

      // Calculate surface normal
      const v1 = {
        x: vertices[1].x - vertices[0].x,
        y: vertices[1].y - vertices[0].y,
        z: vertices[1].z - vertices[0].z
      };
      const v2 = {
        x: vertices[2].x - vertices[0].x,
        y: vertices[2].y - vertices[0].y,
        z: vertices[2].z - vertices[0].z
      };

      // Cross product for normal
      const normal = {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
      };

      // Normalize
      const normalLength = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
      if (normalLength > 0) {
        normal.x /= normalLength;
        normal.y /= normalLength;
        normal.z /= normalLength;
      }

      const normals = [normal, normal, normal, normal];

      // UV coordinates
      const uvs = [
        { u: 0, v: 0 },
        { u: 1, v: 0 },
        { u: 1, v: 1 },
        { u: 0, v: 1 }
      ];

      // Extract material properties from CSS
      const backgroundColor = computedStyle.backgroundColor;
      const opacity = parseFloat(computedStyle.opacity) || 1;

      // Parse background color
      let albedo = { r: 0.5, g: 0.5, b: 0.5 };
      if (backgroundColor && backgroundColor !== 'transparent') {
        const rgbMatch = backgroundColor.match(/rgba?\(([^)]+)\)/);
        if (rgbMatch) {
          const values = rgbMatch[1].split(',').map(v => parseFloat(v.trim()));
          albedo = {
            r: values[0] / 255,
            g: values[1] / 255,
            b: values[2] / 255
          };
        }
      }

      // Estimate material properties
      const boxShadow = computedStyle.boxShadow;
      const isGlossy = boxShadow !== 'none' || computedStyle.background.includes('gradient');

      return {
        id: `surface-${index}`,
        element,
        vertices,
        normals,
        uvs,
        material: {
          albedo,
          roughness: isGlossy ? 0.1 : 0.8,
          metallic: 0.0,
          specular: isGlossy ? 0.9 : 0.1,
          emission: opacity < 1 ? 0.1 : 0.0
        }
      };
    });
  }, [selector]);

  // Calculate lighting for a surface point
  const calculateLighting = useCallback((
    position: { x: number; y: number; z: number },
    normal: { x: number; y: number; z: number },
    material: Surface3D['material'],
    lights: Light3D[]
  ): LightingResult => {
    let diffuse = { r: 0, g: 0, b: 0 };
    let specular = { r: 0, g: 0, b: 0 };
    let ambient = { r: finalConfig.ambientIntensity, g: finalConfig.ambientIntensity, b: finalConfig.ambientIntensity };

    lights.forEach(light => {
      let lightDir = { x: 0, y: 0, z: 0 };
      let lightIntensity = light.intensity;
      let attenuation = 1;

      // Calculate light direction and attenuation
      if (light.type === 'directional') {
        lightDir = light.direction || { x: 0, y: -1, z: 0 };
      } else if (light.type === 'point' || light.type === 'spot') {
        const dx = light.position.x * window.innerWidth - position.x;
        const dy = light.position.y * window.innerHeight - position.y;
        const dz = light.position.z - position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        lightDir = { x: dx / distance, y: dy / distance, z: dz / distance };

        if (light.radius && distance > 0) {
          attenuation = Math.max(0, 1 - Math.pow(distance / light.radius, light.falloff || 2));
        }

        // Spot light cone
        if (light.type === 'spot' && light.direction && light.angle) {
          const spotDir = light.direction;
          const cosAngle = -(lightDir.x * spotDir.x + lightDir.y * spotDir.y + lightDir.z * spotDir.z);
          const spotFactor = Math.max(0, (cosAngle - Math.cos(light.angle)) / (1 - Math.cos(light.angle)));
          attenuation *= spotFactor;
        }
      }

      // Lambertian diffuse
      const ndotl = Math.max(0, normal.x * lightDir.x + normal.y * lightDir.y + normal.z * lightDir.z);

      if (ndotl > 0) {
        const lightColor = {
          r: light.color.r * lightIntensity * attenuation * ndotl,
          g: light.color.g * lightIntensity * attenuation * ndotl,
          b: light.color.b * lightIntensity * attenuation * ndotl
        };

        diffuse.r += lightColor.r * material.albedo.r;
        diffuse.g += lightColor.g * material.albedo.g;
        diffuse.b += lightColor.b * material.albedo.b;

        // Blinn-Phong specular
        if (finalConfig.enablePBR && material.specular > 0) {
          const viewDir = { x: 0, y: 0, z: 1 }; // Assume camera looking down Z
          const halfDir = {
            x: (lightDir.x + viewDir.x) / 2,
            y: (lightDir.y + viewDir.y) / 2,
            z: (lightDir.z + viewDir.z) / 2
          };

          const halfLength = Math.sqrt(halfDir.x * halfDir.x + halfDir.y * halfDir.y + halfDir.z * halfDir.z);
          if (halfLength > 0) {
            halfDir.x /= halfLength;
            halfDir.y /= halfLength;
            halfDir.z /= halfLength;
          }

          const ndoth = Math.max(0, normal.x * halfDir.x + normal.y * halfDir.y + normal.z * halfDir.z);
          const shininess = (1 - material.roughness) * 128;
          const specularStrength = Math.pow(ndoth, shininess) * material.specular;

          specular.r += lightColor.r * specularStrength;
          specular.g += lightColor.g * specularStrength;
          specular.b += lightColor.b * specularStrength;
        }
      }
    });

    return {
      diffuse,
      specular,
      ambient,
      occlusion: 0, // Will be calculated separately
      shadows: 0    // Will be calculated separately
    };
  }, [finalConfig.enablePBR, finalConfig.ambientIntensity]);

  // Render lighting to canvas
  const renderLighting = useCallback((ctx: CanvasRenderingContext2D, surfaces: Surface3D[], lights: Light3D[]) => {
    const canvas = ctx.canvas;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    // Update dynamic lights
    const updatedLights = lights.map(light => {
      if (light.dynamic && light.id === 'cursor') {
        return {
          ...light,
          position: {
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            z: light.position.z
          }
        };
      }
      return light;
    });

    surfaces.forEach(surface => {
      const rect = surface.element.getBoundingClientRect();

      // Render surface with lighting
      for (let x = Math.floor(rect.left); x < Math.ceil(rect.right); x += 2) {
        for (let y = Math.floor(rect.top); y < Math.ceil(rect.bottom); y += 2) {
          if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

          // Interpolate surface properties at this pixel
          const u = (x - rect.left) / rect.width;
          const v = (y - rect.top) / rect.height;

          // Get surface position and normal (simplified)
          const position = {
            x: x,
            y: y,
            z: surface.vertices[0].z // Simplified
          };

          const normal = surface.normals[0]; // Simplified

          // Calculate lighting
          const lighting = calculateLighting(position, normal, surface.material, updatedLights);

          // Combine lighting components
          const finalColor = {
            r: Math.min(1, lighting.diffuse.r + lighting.specular.r + lighting.ambient.r),
            g: Math.min(1, lighting.diffuse.g + lighting.specular.g + lighting.ambient.g),
            b: Math.min(1, lighting.diffuse.b + lighting.specular.b + lighting.ambient.b)
          };

          // Apply exposure and gamma correction
          finalColor.r = Math.pow(1 - Math.exp(-finalColor.r * finalConfig.exposure), 1 / finalConfig.gamma);
          finalColor.g = Math.pow(1 - Math.exp(-finalColor.g * finalConfig.exposure), 1 / finalConfig.gamma);
          finalColor.b = Math.pow(1 - Math.exp(-finalColor.b * finalConfig.exposure), 1 / finalConfig.gamma);

          const index = (y * canvas.width + x) * 4;

          // Write to image data
          data[index] = Math.floor(finalColor.r * 255);     // Red
          data[index + 1] = Math.floor(finalColor.g * 255); // Green
          data[index + 2] = Math.floor(finalColor.b * 255); // Blue
          data[index + 3] = 100; // Alpha (semi-transparent overlay)
        }
      }
    });

    ctx.putImageData(imageData, 0, 0);

    // Add volumetric lighting effects
    if (finalConfig.enableVolumetricLighting) {
      updatedLights.forEach(light => {
        if (light.type === 'point' || light.type === 'spot') {
          const lightX = light.position.x * canvas.width;
          const lightY = light.position.y * canvas.height;

          // Create volumetric light rays
          const gradient = ctx.createRadialGradient(
            lightX, lightY, 0,
            lightX, lightY, light.radius || 200
          );

          gradient.addColorStop(0, `rgba(${Math.floor(light.color.r * 255)}, ${Math.floor(light.color.g * 255)}, ${Math.floor(light.color.b * 255)}, 0.15)`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = gradient;
          ctx.globalCompositeOperation = 'screen';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = 'source-over';
        }
      });
    }
  }, [calculateLighting, finalConfig]);

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

    timeRef.current += 0.016;

    // Generate current surfaces
    const currentSurfaces = generateSurfaces();
    setSurfaces(currentSurfaces);

    // Render lighting
    renderLighting(ctx, currentSurfaces, activeLights);

    animationRef.current = requestAnimationFrame(animate);
  }, [generateSurfaces, renderLighting, activeLights]);

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
    <div className={`fixed inset-0 pointer-events-none z-25 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          mixBlendMode: 'overlay',
          opacity: 0.7
        }}
      />
      {debug && (
        <div className="absolute top-40 left-4 bg-black bg-opacity-70 text-white p-3 rounded text-xs space-y-1">
          <div>3D Lighting System</div>
          <div>Surfaces: {surfaces.length}</div>
          <div>Lights: {activeLights.length}</div>
          <div>PBR: {finalConfig.enablePBR ? 'ON' : 'OFF'}</div>
          <div>GI: {finalConfig.enableGlobalIllumination ? 'ON' : 'OFF'}</div>
          <div>Volumetric: {finalConfig.enableVolumetricLighting ? 'ON' : 'OFF'}</div>
          <div>Time: {timeOfDay}</div>
        </div>
      )}
    </div>
  );
}

export type { Lighting3DConfig, Light3D, Surface3D, LightingResult };