'use client';

import React from 'react';

interface AIArtPatternProps {
  type: 'neural-network' | 'circuit-board' | 'data-flow' | 'cloud-architecture' | 'ml-pipeline' | 'blockchain-grid';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'subtle' | 'medium' | 'strong';
  animate?: boolean;
  className?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function AIArtPattern({
  type,
  size = 'md',
  intensity = 'medium',
  animate = true,
  className = '',
  colors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4'
  }
}: AIArtPatternProps) {
  const sizeMap = {
    sm: { width: 200, height: 150 },
    md: { width: 400, height: 300 },
    lg: { width: 600, height: 450 },
    xl: { width: 800, height: 600 }
  };

  const intensityMap = {
    subtle: 0.3,
    medium: 0.6,
    strong: 0.9
  };

  const { width, height } = sizeMap[size];
  const opacity = intensityMap[intensity];

  const renderNeuralNetwork = () => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="neural-network">
      <defs>
        <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
          <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Neural nodes */}
      {Array.from({ length: 12 }, (_, i) => (
        <circle
          key={`node-${i}`}
          cx={50 + (i % 4) * 120}
          cy={50 + Math.floor(i / 4) * 100}
          r={8 + Math.random() * 4}
          fill="url(#neuralGrad)"
          filter="url(#glow)"
          className={animate ? "pulse-node" : ""}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}

      {/* Neural connections */}
      {Array.from({ length: 20 }, (_, i) => {
        const x1 = 50 + Math.random() * (width - 100);
        const y1 = 50 + Math.random() * (height - 100);
        const x2 = 50 + Math.random() * (width - 100);
        const y2 = 50 + Math.random() * (height - 100);
        return (
          <line
            key={`connection-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={colors.primary}
            strokeWidth="1"
            strokeOpacity="0.4"
            className={animate ? "flow-line" : ""}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        );
      })}
    </svg>
  );

  const renderCircuitBoard = () => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="circuit-board">
      <defs>
        <pattern id="circuitPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none" stroke={colors.primary} strokeWidth="0.5" strokeOpacity="0.3"/>
          <circle cx="20" cy="20" r="2" fill={colors.accent} opacity="0.7"/>
        </pattern>
      </defs>

      <rect width={width} height={height} fill="url(#circuitPattern)" opacity="0.4"/>

      {/* Circuit traces */}
      {Array.from({ length: 15 }, (_, i) => (
        <path
          key={`trace-${i}`}
          d={`M${Math.random() * width},${Math.random() * height} Q${Math.random() * width},${Math.random() * height} ${Math.random() * width},${Math.random() * height}`}
          stroke={colors.secondary}
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.5"
          className={animate ? "trace-flow" : ""}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  );

  const renderDataFlow = () => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="data-flow">
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0" />
          <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Data streams */}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={`stream-${i}`}>
          <path
            d={`M0,${50 + i * 35} Q${width/2},${25 + i * 35} ${width},${50 + i * 35}`}
            stroke="url(#flowGrad)"
            strokeWidth="3"
            fill="none"
            className={animate ? "data-stream" : ""}
            style={{ animationDelay: `${i * 0.4}s` }}
          />
          {/* Data particles */}
          {Array.from({ length: 5 }, (_, j) => (
            <circle
              key={`particle-${i}-${j}`}
              r="2"
              fill={colors.accent}
              className={animate ? "data-particle" : ""}
              style={{ animationDelay: `${i * 0.4 + j * 0.1}s` }}
            >
              <animateMotion dur="3s" repeatCount="indefinite">
                <path d={`M0,${50 + i * 35} Q${width/2},${25 + i * 35} ${width},${50 + i * 35}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
      ))}
    </svg>
  );

  const renderCloudArchitecture = () => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="cloud-architecture">
      {/* Cloud layers */}
      {Array.from({ length: 6 }, (_, i) => (
        <g key={`cloud-${i}`} className={animate ? "float-cloud" : ""} style={{ animationDelay: `${i * 0.5}s` }}>
          <ellipse
            cx={100 + (i % 3) * 150}
            cy={80 + Math.floor(i / 3) * 120}
            rx={60 + Math.random() * 20}
            ry={30 + Math.random() * 10}
            fill={colors.primary}
            opacity="0.2"
          />
          <ellipse
            cx={120 + (i % 3) * 150}
            cy={70 + Math.floor(i / 3) * 120}
            rx={40 + Math.random() * 15}
            ry={20 + Math.random() * 8}
            fill={colors.secondary}
            opacity="0.3"
          />
        </g>
      ))}

      {/* Connection lines between clouds */}
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={`cloud-connection-${i}`}
          x1={100 + Math.random() * (width - 200)}
          y1={80 + Math.random() * (height - 160)}
          x2={100 + Math.random() * (width - 200)}
          y2={80 + Math.random() * (height - 160)}
          stroke={colors.accent}
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="5,5"
          className={animate ? "dash-flow" : ""}
        />
      ))}
    </svg>
  );

  const renderMLPipeline = () => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="ml-pipeline">
      {/* Pipeline stages */}
      {['Data', 'Process', 'Train', 'Deploy'].map((stage, i) => (
        <g key={`stage-${i}`}>
          <rect
            x={50 + i * 150}
            y={height/2 - 30}
            width={100}
            height={60}
            rx="10"
            fill={colors.primary}
            fillOpacity="0.3"
            stroke={colors.secondary}
            strokeWidth="2"
            className={animate ? "pulse-stage" : ""}
            style={{ animationDelay: `${i * 0.6}s` }}
          />
          <text
            x={100 + i * 150}
            y={height/2 + 5}
            textAnchor="middle"
            fill={colors.secondary}
            fontSize="12"
            fontWeight="600"
          >
            {stage}
          </text>
          {i < 3 && (
            <path
              d={`M${150 + i * 150},${height/2} L${200 + i * 150},${height/2}`}
              stroke={colors.accent}
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
              className={animate ? "flow-arrow" : ""}
              style={{ animationDelay: `${i * 0.6 + 0.3}s` }}
            />
          )}
        </g>
      ))}

      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={colors.accent} />
        </marker>
      </defs>
    </svg>
  );

  const renderBlockchainGrid = () => (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="blockchain-grid">
      {/* Blockchain blocks */}
      {Array.from({ length: 20 }, (_, i) => (
        <g key={`block-${i}`}>
          <rect
            x={(i % 5) * 80 + 20}
            y={Math.floor(i / 5) * 80 + 20}
            width={60}
            height={60}
            rx="8"
            fill={colors.primary}
            fillOpacity="0.4"
            stroke={colors.secondary}
            strokeWidth="1"
            className={animate ? "block-pulse" : ""}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
          {/* Hash visualization */}
          {Array.from({ length: 3 }, (_, j) => (
            <line
              key={`hash-${i}-${j}`}
              x1={(i % 5) * 80 + 30}
              y1={Math.floor(i / 5) * 80 + 35 + j * 8}
              x2={(i % 5) * 80 + 70}
              y2={Math.floor(i / 5) * 80 + 35 + j * 8}
              stroke={colors.accent}
              strokeWidth="1"
              strokeOpacity="0.6"
            />
          ))}
        </g>
      ))}

      {/* Connection chains */}
      {Array.from({ length: 15 }, (_, i) => (
        <line
          key={`chain-${i}`}
          x1={80 + (i % 4) * 80}
          y1={50 + Math.floor(i / 4) * 80}
          x2={100 + (i % 4) * 80}
          y2={50 + Math.floor(i / 4) * 80}
          stroke={colors.secondary}
          strokeWidth="2"
          strokeOpacity="0.7"
          className={animate ? "chain-link" : ""}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </svg>
  );

  const renderPattern = () => {
    switch (type) {
      case 'neural-network':
        return renderNeuralNetwork();
      case 'circuit-board':
        return renderCircuitBoard();
      case 'data-flow':
        return renderDataFlow();
      case 'cloud-architecture':
        return renderCloudArchitecture();
      case 'ml-pipeline':
        return renderMLPipeline();
      case 'blockchain-grid':
        return renderBlockchainGrid();
      default:
        return renderNeuralNetwork();
    }
  };

  return (
    <div className={`ai-art-pattern ${className}`} style={{ opacity }}>
      {renderPattern()}

      <style jsx>{`
        .ai-art-pattern {
          position: relative;
          overflow: hidden;
        }

        @keyframes pulse-node {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes flow-line {
          0% { stroke-dasharray: 0, 100; }
          100% { stroke-dasharray: 100, 0; }
        }

        @keyframes trace-flow {
          0% { stroke-dasharray: 0, 20; stroke-dashoffset: 0; }
          100% { stroke-dasharray: 20, 0; stroke-dashoffset: -20; }
        }

        @keyframes data-stream {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }

        @keyframes float-cloud {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes dash-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -10; }
        }

        @keyframes pulse-stage {
          0%, 100% { fill-opacity: 0.3; }
          50% { fill-opacity: 0.6; }
        }

        @keyframes flow-arrow {
          0% { stroke-width: 2; opacity: 0.5; }
          50% { stroke-width: 4; opacity: 1; }
          100% { stroke-width: 2; opacity: 0.5; }
        }

        @keyframes block-pulse {
          0%, 100% { fill-opacity: 0.4; }
          50% { fill-opacity: 0.7; }
        }

        @keyframes chain-link {
          0%, 100% { stroke-opacity: 0.5; }
          50% { stroke-opacity: 1; }
        }

        .pulse-node { animation: pulse-node 2s ease-in-out infinite; }
        .flow-line { animation: flow-line 3s ease-in-out infinite; }
        .trace-flow { animation: trace-flow 4s linear infinite; }
        .data-stream { animation: data-stream 3s ease-in-out infinite; }
        .data-particle { animation: none; }
        .float-cloud { animation: float-cloud 4s ease-in-out infinite; }
        .dash-flow { animation: dash-flow 2s linear infinite; }
        .pulse-stage { animation: pulse-stage 2s ease-in-out infinite; }
        .flow-arrow { animation: flow-arrow 2s ease-in-out infinite; }
        .block-pulse { animation: block-pulse 2s ease-in-out infinite; }
        .chain-link { animation: chain-link 2s ease-in-out infinite; }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .pulse-node,
          .flow-line,
          .trace-flow,
          .data-stream,
          .float-cloud,
          .dash-flow,
          .pulse-stage,
          .flow-arrow,
          .block-pulse,
          .chain-link {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}