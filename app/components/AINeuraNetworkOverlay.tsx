'use client';

import React, { useEffect, useRef, useState } from 'react';

interface NeuralNode {
  id: string;
  x: number;
  y: number;
  label: string;
  connections: string[];
  activity: number;
  lastFire: number;
  pulseStrength: number;
  color: string;
}

interface NeuralConnection {
  from: string;
  to: string;
  strength: number;
  active: boolean;
  pulsePosition: number;
  lastActivation: number;
}

interface AINeuraNetworkOverlayProps {
  words?: string[];
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  autoPlay?: boolean;
}

const AINeuraNetworkOverlay: React.FC<AINeuraNetworkOverlayProps> = ({
  words = ['AI&ML', 'Cloud', 'API&Microservices', 'DevSecOps', 'Cybersecurity', 'Big Data & IOT', 'Blockchain'],
  className = '',
  intensity = 'medium',
  autoPlay = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Map<string, NeuralNode>>(new Map());
  const connectionsRef = useRef<NeuralConnection[]>([]);
  const [isActive, setIsActive] = useState(autoPlay);
  const [nodesReady, setNodesReady] = useState(false);
  const [nodePositions, setNodePositions] = useState<Record<string, {x: number, y: number, color: string}>>({});

  // Configuration based on intensity
  const config = {
    low: { fireRate: 2000, connectionDensity: 0.3, pulseSpeed: 0.02, glowIntensity: 0.6 },
    medium: { fireRate: 1500, connectionDensity: 0.5, pulseSpeed: 0.03, glowIntensity: 0.8 },
    high: { fireRate: 1000, connectionDensity: 0.7, pulseSpeed: 0.04, glowIntensity: 1.0 }
  }[intensity];

  // Initialize neural network
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Initialize nodes
    const initializeNodes = () => {
      nodesRef.current.clear();
      connectionsRef.current = [];

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const colors = [
        '#64B5F6', // Light Blue
        '#81C784', // Light Green
        '#FFB74D', // Orange
        '#F06292', // Pink
        '#BA68C8', // Purple
        '#4FC3F7', // Cyan
        '#A5D6A7'  // Light Green
      ];

      // Position nodes in a network layout with better spacing
      words.forEach((word, index) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Use a larger radius to prevent overlap and ensure visibility
        const radius = Math.min(canvasWidth, canvasHeight) * 0.3; // Increased from 0.175 to 0.3
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        // Add slight offset to starting angle for better distribution
        const angle = (index / words.length) * 2 * Math.PI + (Math.PI / (words.length * 2));

        // Create primary nodes in a circle with better spacing
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const node: NeuralNode = {
          id: word,
          x,
          y,
          label: word,
          connections: [],
          activity: 0,
          lastFire: 0,
          pulseStrength: 0,
          color: colors[index % colors.length]
        };

        nodesRef.current.set(word, node);
      });

      // Update node positions for labels
      const positions: Record<string, {x: number, y: number, color: string}> = {};
      nodesRef.current.forEach((node, key) => {
        positions[key] = {
          x: (node.x / canvasWidth) * 100,
          y: (node.y / canvasHeight) * 100,
          color: node.color
        };
      });
      setNodePositions(positions);
      setNodesReady(true);

      // Create connections between all nodes (fully connected network)
      const nodeIds = Array.from(nodesRef.current.keys());

      // Create connections from each node to every other node
      for (let i = 0; i < nodeIds.length; i++) {
        for (let j = i + 1; j < nodeIds.length; j++) {
          const fromId = nodeIds[i];
          const toId = nodeIds[j];

          const fromNode = nodesRef.current.get(fromId)!;
          const toNode = nodesRef.current.get(toId)!;

          // Add to connections list
          fromNode.connections.push(toId);
          toNode.connections.push(fromId);

          // Create bidirectional connections
          const connection1: NeuralConnection = {
            from: fromId,
            to: toId,
            strength: Math.random() * 0.5 + 0.5,
            active: false,
            pulsePosition: 0,
            lastActivation: 0
          };

          const connection2: NeuralConnection = {
            from: toId,
            to: fromId,
            strength: Math.random() * 0.5 + 0.5,
            active: false,
            pulsePosition: 0,
            lastActivation: 0
          };

          connectionsRef.current.push(connection1, connection2);
        }
      }
    };

    // Animation loop
    const animate = (timestamp: number) => {
      if (!isActive) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections
      connectionsRef.current.forEach(connection => {
        const fromNode = nodesRef.current.get(connection.from);
        const toNode = nodesRef.current.get(connection.to);

        if (!fromNode || !toNode) return;

        // Random firing
        if (timestamp - connection.lastActivation > config.fireRate + Math.random() * config.fireRate) {
          connection.active = true;
          connection.pulsePosition = 0;
          connection.lastActivation = timestamp;
          fromNode.activity = 1;
          fromNode.lastFire = timestamp;
        }

        // Draw connection line
        const alpha = connection.active ? connection.strength * config.glowIntensity : 0.2;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = `rgba(100, 181, 246, ${alpha})`;
        ctx.lineWidth = connection.active ? 2 : 1;
        ctx.stroke();

        // Draw pulse along connection
        if (connection.active) {
          connection.pulsePosition += config.pulseSpeed;

          if (connection.pulsePosition <= 1) {
            const pulseX = fromNode.x + (toNode.x - fromNode.x) * connection.pulsePosition;
            const pulseY = fromNode.y + (toNode.y - fromNode.y) * connection.pulsePosition;

            // Pulse particle
            const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            gradient.addColorStop(0.5, 'rgba(100, 181, 246, 0.7)');
            gradient.addColorStop(1, 'rgba(100, 181, 246, 0)');

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Spark effect
            for (let i = 0; i < 3; i++) {
              const sparkX = pulseX + (Math.random() - 0.5) * 6;
              const sparkY = pulseY + (Math.random() - 0.5) * 6;

              ctx.beginPath();
              ctx.arc(sparkX, sparkY, 1, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8})`;
              ctx.fill();
            }
          } else {
            connection.active = false;
            connection.pulsePosition = 0;
            // Activate target node
            toNode.activity = 1;
            toNode.lastFire = timestamp;
          }
        }
      });

      // Update and draw nodes
      nodesRef.current.forEach(node => {
        // Decay activity
        if (timestamp - node.lastFire > 500) {
          node.activity *= 0.95;
        }

        // Node glow effect
        const glowSize = 15 + node.activity * 10;
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        glowGradient.addColorStop(0, `${node.color}${Math.floor(node.activity * 255).toString(16).padStart(2, '0')}`);
        glowGradient.addColorStop(0.7, `${node.color}40`);
        glowGradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core node
        const nodeSize = 4 + node.activity * 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Neural firing effect
        if (node.activity > 0.7) {
          for (let i = 0; i < 5; i++) {
            const sparkAngle = (Math.PI * 2 * i) / 5 + timestamp * 0.01;
            const sparkDist = 12 + Math.sin(timestamp * 0.02 + i) * 4;
            const sparkX = node.x + Math.cos(sparkAngle) * sparkDist;
            const sparkY = node.y + Math.sin(sparkAngle) * sparkDist;

            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${node.activity})`;
            ctx.fill();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initializeNodes();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [words, isActive, intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Word labels overlay */}
      {nodesReady && (
        <div className="absolute inset-0">
          {Object.entries(nodePositions).map(([word, position]) => (
            <div
              key={word}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <span
                className={`text-white text-sm font-bold px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/40 shadow-lg ${className.includes('nav-neural') ? 'nav-label' : ''}`}
                style={{
                  textShadow: `0 0 6px ${position.color}, 0 0 12px ${position.color}, 0 1px 3px rgba(0,0,0,0.8)`,
                  boxShadow: `0 0 18px ${position.color}60, 0 0 30px ${position.color}30, 0 5px 14px rgba(0,0,0,0.6)`,
                  color: '#ffffff',
                  fontSize: className.includes('nav-neural') ? '7px' : '11px', // Smaller font for nav
                  fontWeight: '600',
                  letterSpacing: '0.35px',
                  padding: className.includes('nav-neural') ? '2px 6px' : '8px 12px', // Smaller padding for nav
                  whiteSpace: 'nowrap'
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Control button - hidden when in nav bar */}
      {className.includes('z-30') && (
        <button
          onClick={() => setIsActive(!isActive)}
          className="absolute top-4 right-4 z-50 px-3 py-1 text-xs bg-black/40 backdrop-blur-sm text-white rounded-full border border-white/30 hover:bg-black/60 transition-all shadow-lg"
        >
          {isActive ? 'Pause' : 'Play'} Neural Net
        </button>
      )}
    </div>
  );
};

export default AINeuraNetworkOverlay;