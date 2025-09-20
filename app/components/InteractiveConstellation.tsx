'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
  alpha: number;
  energy: number;
  lastConnected: number;
}

interface Connection {
  from: Node;
  to: Node;
  strength: number;
  alpha: number;
  distance: number;
}

interface InteractiveConstellationProps {
  nodeCount?: number;
  maxConnections?: number;
  connectionDistance?: number;
  cursorRadius?: number;
  animationSpeed?: number;
  nodeSize?: number;
  colors?: {
    nodes: string;
    connections: string;
    cursor: string;
  };
  width?: string | number;
  height?: string | number;
  className?: string;
  interactive?: boolean;
  autoMove?: boolean;
  pulseEffect?: boolean;
  networkEffect?: boolean;
}

export default function InteractiveConstellation({
  nodeCount = 50,
  maxConnections = 3,
  connectionDistance = 150,
  cursorRadius = 200,
  animationSpeed = 0.02,
  nodeSize = 2,
  colors = {
    nodes: '#8B5CF6',
    connections: '#06B6D4',
    cursor: '#F59E0B'
  },
  width = '100%',
  height = '100vh',
  className = '',
  interactive = true,
  autoMove = true,
  pulseEffect = true,
  networkEffect = true
}: InteractiveConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const timeRef = useRef(0);

  // Initialize nodes
  const initializeNodes = useCallback((canvasWidth: number, canvasHeight: number) => {
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node: Node = {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        targetX: Math.random() * canvasWidth,
        targetY: Math.random() * canvasHeight,
        size: nodeSize + Math.random() * nodeSize,
        alpha: 0.3 + Math.random() * 0.7,
        energy: Math.random(),
        lastConnected: 0
      };
      nodes.push(node);
    }

    nodesRef.current = nodes;
  }, [nodeCount, nodeSize]);

  // Calculate connections between nodes
  const calculateConnections = useCallback(() => {
    const connections: Connection[] = [];
    const nodes = nodesRef.current;

    for (let i = 0; i < nodes.length; i++) {
      const nodeConnections: Connection[] = [];

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const connection: Connection = {
            from: nodes[i],
            to: nodes[j],
            strength: 1 - (distance / connectionDistance),
            alpha: Math.max(0, 1 - (distance / connectionDistance)),
            distance
          };
          nodeConnections.push(connection);
        }
      }

      // Sort by strength and take only the strongest connections
      nodeConnections.sort((a, b) => b.strength - a.strength);
      connections.push(...nodeConnections.slice(0, maxConnections));
    }

    connectionsRef.current = connections;
  }, [connectionDistance, maxConnections]);

  // Update node positions and behavior
  const updateNodes = useCallback((canvasWidth: number, canvasHeight: number, deltaTime: number) => {
    const nodes = nodesRef.current;
    const mouse = mouseRef.current;

    nodes.forEach((node, index) => {
      // Auto movement
      if (autoMove) {
        // Drift towards target
        const targetDx = node.targetX - node.x;
        const targetDy = node.targetY - node.y;
        const targetDistance = Math.sqrt(targetDx * targetDx + targetDy * targetDy);

        if (targetDistance < 20) {
          node.targetX = Math.random() * canvasWidth;
          node.targetY = Math.random() * canvasHeight;
        }

        node.vx += targetDx * 0.0001;
        node.vy += targetDy * 0.0001;
      }

      // Mouse interaction
      if (interactive && mouse.isActive) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < cursorRadius) {
          const force = (1 - distance / cursorRadius) * 0.03;
          node.vx += dx * force * deltaTime;
          node.vy += dy * force * deltaTime;
          node.energy = Math.min(1, node.energy + 0.02);
          node.lastConnected = timeRef.current;
        }
      }

      // Apply velocity
      node.x += node.vx * deltaTime * 60;
      node.y += node.vy * deltaTime * 60;

      // Damping
      node.vx *= 0.98;
      node.vy *= 0.98;

      // Boundary collision with soft bounce
      if (node.x < 0 || node.x > canvasWidth) {
        node.vx *= -0.8;
        node.x = Math.max(0, Math.min(canvasWidth, node.x));
      }
      if (node.y < 0 || node.y > canvasHeight) {
        node.vy *= -0.8;
        node.y = Math.max(0, Math.min(canvasHeight, node.y));
      }

      // Energy decay
      node.energy *= 0.99;

      // Pulse effect
      if (pulseEffect) {
        node.size = nodeSize + Math.sin(timeRef.current * 0.002 + index * 0.1) * nodeSize * 0.3;
      }
    });
  }, [interactive, autoMove, cursorRadius, pulseEffect, nodeSize]);

  // Render constellation
  const render = useCallback((ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const connections = connectionsRef.current;
    const nodes = nodesRef.current;
    const mouse = mouseRef.current;

    // Draw connections
    connections.forEach(connection => {
      const { from, to, alpha, strength } = connection;

      // Enhanced alpha based on node energy and network effects
      let connectionAlpha = alpha * 0.6;
      if (networkEffect) {
        connectionAlpha *= Math.max(from.energy, to.energy) * 2;
        connectionAlpha = Math.min(connectionAlpha, 0.8);
      }

      if (connectionAlpha > 0.05) {
        ctx.strokeStyle = `${colors.connections}${Math.floor(connectionAlpha * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = strength * 2;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Add glow effect for strong connections
        if (strength > 0.7 && networkEffect) {
          ctx.strokeStyle = `${colors.connections}${Math.floor(connectionAlpha * 0.3 * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = strength * 6;
          ctx.stroke();
        }
      }
    });

    // Draw cursor influence area
    if (interactive && mouse.isActive) {
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, cursorRadius
      );
      gradient.addColorStop(0, `${colors.cursor}10`);
      gradient.addColorStop(0.5, `${colors.cursor}05`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - cursorRadius, mouse.y - cursorRadius, cursorRadius * 2, cursorRadius * 2);
    }

    // Draw nodes
    nodes.forEach(node => {
      const { x, y, size, alpha, energy } = node;

      // Base node
      const nodeAlpha = Math.max(0.3, alpha + energy * 0.5);
      ctx.fillStyle = `${colors.nodes}${Math.floor(nodeAlpha * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Energy glow
      if (energy > 0.3 && networkEffect) {
        const glowSize = size + energy * size * 3;
        const glowAlpha = energy * 0.4;
        ctx.fillStyle = `${colors.nodes}${Math.floor(glowAlpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Recently connected highlight
      if (timeRef.current - node.lastConnected < 1000) {
        const highlightAlpha = 1 - (timeRef.current - node.lastConnected) / 1000;
        ctx.fillStyle = `${colors.cursor}${Math.floor(highlightAlpha * 0.6 * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [colors, interactive, cursorRadius, networkEffect]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    const currentTime = Date.now();
    const deltaTime = Math.min((currentTime - timeRef.current) / 1000, 0.016); // Cap at 60fps
    timeRef.current = currentTime;

    updateNodes(canvasWidth, canvasHeight, deltaTime);
    calculateConnections();
    render(ctx, canvasWidth, canvasHeight);

    animationRef.current = requestAnimationFrame(animate);
  }, [updateNodes, calculateConnections, render, isVisible]);

  // Mouse event handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true
    };
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isActive = false;
  }, []);

  // Setup canvas and start animation
  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    ctx.scale(dpr, dpr);

    // Initialize constellation
    initializeNodes(rect.width, rect.height);
    calculateConnections();

    // Start animation
    timeRef.current = Date.now();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, initializeNodes, calculateConnections, animate]);

  // Handle resize
  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      ctx.scale(dpr, dpr);

      // Reinitialize for new dimensions
      initializeNodes(rect.width, rect.height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted, initializeNodes]);

  // Visibility observer for performance
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const canvas = canvasRef.current;
    if (canvas) {
      observer.observe(canvas);
    }

    return () => {
      if (canvas) {
        observer.unobserve(canvas);
      }
    };
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className={`constellation-loading ${className}`}
        style={{ width, height }}
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 animate-pulse flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`constellation-container relative ${className}`}
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: interactive ? 'crosshair' : 'default',
          background: 'transparent'
        }}
      />

      {/* Development info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded">
          Nodes: {nodeCount} | Interactive: {interactive ? 'Yes' : 'No'} | Visible: {isVisible ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
}

// Preset configurations for different use cases
export const ConstellationPresets = {
  subtle: {
    nodeCount: 30,
    maxConnections: 2,
    connectionDistance: 120,
    cursorRadius: 150,
    nodeSize: 1.5,
    colors: {
      nodes: '#E5E7EB',
      connections: '#D1D5DB',
      cursor: '#8B5CF6'
    },
    pulseEffect: false,
    networkEffect: false
  },

  dynamic: {
    nodeCount: 60,
    maxConnections: 4,
    connectionDistance: 180,
    cursorRadius: 250,
    nodeSize: 2.5,
    colors: {
      nodes: '#8B5CF6',
      connections: '#06B6D4',
      cursor: '#F59E0B'
    },
    pulseEffect: true,
    networkEffect: true
  },

  tech: {
    nodeCount: 40,
    maxConnections: 3,
    connectionDistance: 140,
    cursorRadius: 200,
    nodeSize: 2,
    colors: {
      nodes: '#10B981',
      connections: '#06B6D4',
      cursor: '#8B5CF6'
    },
    pulseEffect: true,
    networkEffect: true
  },

  minimal: {
    nodeCount: 20,
    maxConnections: 2,
    connectionDistance: 100,
    cursorRadius: 120,
    nodeSize: 1,
    colors: {
      nodes: '#374151',
      connections: '#6B7280',
      cursor: '#9CA3AF'
    },
    pulseEffect: false,
    networkEffect: false
  }
};

// Quick preset component
interface ConstellationPresetProps extends Omit<InteractiveConstellationProps, keyof typeof ConstellationPresets.dynamic> {
  preset: keyof typeof ConstellationPresets;
}

export function ConstellationPreset({ preset, ...props }: ConstellationPresetProps) {
  const presetConfig = ConstellationPresets[preset];

  return (
    <InteractiveConstellation
      {...presetConfig}
      {...props}
    />
  );
}