'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Zap,
  Shield
} from 'lucide-react';

interface BenefitMetric {
  id: string;
  title: string;
  description: string;
  percentage: number;
  value: string;
  impact: string;
  icon: React.ReactNode;
  color: string;
  category: 'financial' | 'operational' | 'strategic';
}

const ValueAurora: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const [growthAnimationActive, setGrowthAnimationActive] = useState(false);
  const auroraRef = useRef<HTMLDivElement>(null);
  const vortexRef = useRef<HTMLDivElement>(null);

  const benefitMetrics: BenefitMetric[] = [
    {
      id: "roi-increase",
      title: "ROI Amplification",
      description: "Accelerated return on technology investments through strategic optimization",
      percentage: 340,
      value: "$2.4M",
      impact: "Annual savings through efficiency gains",
      icon: <DollarSign className="w-6 h-6" />,
      color: "#f59e0b",
      category: "financial"
    },
    {
      id: "time-reduction",
      title: "Time to Market",
      description: "Dramatically reduced development cycles with agile methodologies",
      percentage: 65,
      value: "8 months",
      impact: "Faster product launches",
      icon: <Clock className="w-6 h-6" />,
      color: "#10b981",
      category: "operational"
    },
    {
      id: "productivity-boost",
      title: "Team Productivity",
      description: "Enhanced developer velocity through modern tooling and practices",
      percentage: 85,
      value: "12x",
      impact: "Deployment frequency increase",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#8b5cf6",
      category: "operational"
    },
    {
      id: "quality-improvement",
      title: "Quality Assurance",
      description: "Reduced bugs and improved user satisfaction through automated testing",
      percentage: 92,
      value: "99.9%",
      impact: "System uptime reliability",
      icon: <Shield className="w-6 h-6" />,
      color: "#06b6d4",
      category: "operational"
    },
    {
      id: "scalability-gain",
      title: "Infrastructure Scalability",
      description: "Auto-scaling capabilities handling traffic spikes effortlessly",
      percentage: 1000,
      value: "10M+",
      impact: "Concurrent users supported",
      icon: <Zap className="w-6 h-6" />,
      color: "#ef4444",
      category: "strategic"
    },
    {
      id: "innovation-velocity",
      title: "Innovation Rate",
      description: "Accelerated feature development and market responsiveness",
      percentage: 220,
      value: "3.2x",
      impact: "Feature delivery acceleration",
      icon: <Target className="w-6 h-6" />,
      color: "#f97316",
      category: "strategic"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setGrowthAnimationActive(true), 800);
        }
      },
      { threshold: 0.3 }
    );

    if (auroraRef.current) {
      observer.observe(auroraRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveMetric(prev => (prev + 1) % benefitMetrics.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible, benefitMetrics.length]);

  const ValueParticle: React.FC<{
    symbol: string;
    delay: number;
    color: string;
    x: number;
    y: number;
  }> = ({ symbol, delay, color, x, y }) => (
    <div
      className="value-particle"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        color,
        animationDelay: `${delay}s`
      }}
    >
      {symbol}
    </div>
  );

  const PercentagePlasma: React.FC<{
    percentage: number;
    isActive: boolean;
    color: string;
  }> = ({ percentage, isActive, color }) => {
    const plasmaIntensity = isActive ? 1 : 0.3;

    return (
      <div className="percentage-plasma" style={{ '--plasma-color': color } as React.CSSProperties}>
        <div
          className="plasma-field"
          style={{
            opacity: plasmaIntensity,
            '--intensity': plasmaIntensity
          } as React.CSSProperties}
        >
          <div className="plasma-core">
            <span className="percentage-value">{percentage}%</span>
          </div>
          <div className="plasma-waves">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="plasma-wave" style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const OrganicGrowthChart: React.FC<{
    value: number;
    maxValue: number;
    isActive: boolean;
    color: string;
    label: string;
  }> = ({ value, maxValue, isActive, color, label }) => {
    const height = isActive ? (value / maxValue) * 100 : 0;

    return (
      <div className="organic-growth-container">
        <div className="growth-chart">
          <div
            className="growth-bar"
            style={{
              height: `${height}%`,
              backgroundColor: color,
              '--growth-color': color
            } as React.CSSProperties}
          >
            <div className="growth-branches">
              {Array.from({ length: Math.floor(height / 20) }, (_, i) => (
                <div
                  key={i}
                  className="growth-branch"
                  style={{
                    bottom: `${(i + 1) * 20}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="chart-label">{label}</div>
      </div>
    );
  };

  const CompoundWave: React.FC<{
    centerX: number;
    centerY: number;
    delay: number;
    color: string;
  }> = ({ centerX, centerY, delay, color }) => (
    <div
      className="compound-wave"
      style={{
        left: `${centerX}%`,
        top: `${centerY}%`,
        '--wave-color': color,
        animationDelay: `${delay}s`
      } as React.CSSProperties}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="wave-ring"
          style={{ animationDelay: `${delay + i * 0.3}s` }}
        />
      ))}
    </div>
  );

  const generateValueParticles = () => {
    const symbols = ['$', '%', '↑', '⚡', '★', '◆'];
    const particles = [];

    for (let i = 0; i < 30; i++) {
      particles.push(
        <ValueParticle
          key={i}
          symbol={symbols[Math.floor(Math.random() * symbols.length)]}
          delay={Math.random() * 5}
          color={benefitMetrics[Math.floor(Math.random() * benefitMetrics.length)].color}
          x={Math.random() * 100}
          y={60 + Math.random() * 40}
        />
      );
    }

    return particles;
  };

  const generateCompoundWaves = () => {
    const positions = [
      { x: 20, y: 30 },
      { x: 50, y: 25 },
      { x: 80, y: 35 },
      { x: 35, y: 60 },
      { x: 65, y: 55 }
    ];

    return positions.map((pos, i) => (
      <CompoundWave
        key={i}
        centerX={pos.x}
        centerY={pos.y}
        delay={i * 0.8}
        color={benefitMetrics[i % benefitMetrics.length].color}
      />
    ));
  };

  return (
    <>
      <style jsx>{`
        .value-aurora {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%);
          overflow: hidden;
        }

        .golden-hour-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 70% 20%,
            rgba(251, 191, 36, 0.15) 0%,
            rgba(245, 158, 11, 0.1) 30%,
            rgba(217, 119, 6, 0.05) 60%,
            transparent 100%
          );
          pointer-events: none;
        }

        .roi-vortex {
          position: absolute;
          top: 20%;
          left: 50%;
          width: 300px;
          height: 300px;
          transform: translateX(-50%);
          animation: vortex-rotation 20s linear infinite;
        }

        .vortex-core {
          position: absolute;
          inset: 50px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(251, 191, 36, 0.6),
            transparent,
            rgba(245, 158, 11, 0.8),
            transparent,
            rgba(217, 119, 6, 0.6),
            transparent
          );
          animation: vortex-spin 8s linear infinite;
        }

        .vortex-numbers {
          position: absolute;
          inset: 0;
        }

        .vortex-number {
          position: absolute;
          color: #fbbf24;
          font-weight: bold;
          font-size: 14px;
          opacity: 0.8;
          animation: spiral-outward 6s ease-out infinite;
        }

        @keyframes vortex-rotation {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }

        @keyframes vortex-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes spiral-outward {
          0% {
            transform: scale(0.5) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }

        .percentage-plasma {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto;
        }

        .plasma-field {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            var(--plasma-color, #fbbf24) 0%,
            transparent 70%
          );
          opacity: 0.3;
          transition: opacity 0.8s ease;
        }

        .plasma-core {
          position: absolute;
          inset: 20px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.9) 0%,
            var(--plasma-color, #fbbf24) 50%,
            transparent 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        .percentage-value {
          font-size: 18px;
          font-weight: bold;
          color: white;
          text-shadow: 0 0 10px var(--plasma-color, #fbbf24);
        }

        .plasma-waves {
          position: absolute;
          inset: 0;
        }

        .plasma-wave {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--plasma-color, #fbbf24);
          opacity: 0;
          animation: plasma-pulse 3s ease-out infinite;
        }

        @keyframes plasma-pulse {
          0% {
            opacity: 0.8;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.8);
          }
        }

        .organic-growth-container {
          position: relative;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }

        .growth-chart {
          position: relative;
          width: 40px;
          height: 160px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
        }

        .growth-bar {
          position: absolute;
          bottom: 0;
          width: 100%;
          border-radius: 20px;
          background: var(--growth-color, #10b981);
          transition: height 2s cubic-bezier(0.23, 1, 0.320, 1);
          box-shadow: 0 0 20px var(--growth-color, #10b981);
        }

        .growth-branches {
          position: absolute;
          inset: 0;
        }

        .growth-branch {
          position: absolute;
          width: 20px;
          height: 2px;
          background: var(--growth-color, #10b981);
          left: -10px;
          opacity: 0;
          animation: branch-grow 1s ease-out forwards;
        }

        .growth-branch:nth-child(odd) {
          left: 40px;
        }

        @keyframes branch-grow {
          0% {
            opacity: 0;
            width: 0;
          }
          100% {
            opacity: 0.8;
            width: 20px;
          }
        }

        .chart-label {
          margin-top: 10px;
          font-size: 12px;
          color: #d1d5db;
          text-align: center;
        }

        .value-particle {
          position: absolute;
          font-size: 16px;
          font-weight: bold;
          opacity: 0;
          animation: particle-float 8s ease-out infinite;
          pointer-events: none;
        }

        @keyframes particle-float {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          10% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
          }
          90% {
            opacity: 0.8;
            transform: translateY(-200px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-300px) scale(0.8);
          }
        }

        .compound-wave {
          position: absolute;
          width: 10px;
          height: 10px;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .wave-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--wave-color, #fbbf24);
          opacity: 0;
          animation: wave-expand 4s ease-out infinite;
        }

        @keyframes wave-expand {
          0% {
            opacity: 0.8;
            transform: scale(0);
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: scale(20);
          }
        }

        .benefit-card {
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
          position: relative;
          overflow: hidden;
        }

        .benefit-card.active {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(251, 191, 36, 0.5);
          box-shadow: 0 20px 40px rgba(251, 191, 36, 0.2);
        }

        .benefit-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg,
            transparent 0%,
            rgba(251, 191, 36, 0.1) 50%,
            transparent 100%);
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .benefit-card.active::before {
          opacity: 1;
        }

        .bloom-effect {
          filter: blur(1px) brightness(1.2);
          transition: filter 0.6s ease;
        }

        .metric-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          position: relative;
        }

        .metric-icon::after {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--icon-color, #fbbf24) 0%, transparent 70%);
          opacity: 0.3;
          z-index: -1;
        }
      `}</style>

      <section
        ref={auroraRef}
        id="benefits"
        className="value-aurora py-24 relative"
      >
        {/* Golden Hour Atmospheric Overlay */}
        <div className="golden-hour-overlay"></div>

        {/* ROI Vortex */}
        <div ref={vortexRef} className="roi-vortex">
          <div className="vortex-core"></div>
          <div className="vortex-numbers">
            {benefitMetrics.map((metric, index) => (
              <div
                key={metric.id}
                className="vortex-number"
                style={{
                  left: `${50 + 40 * Math.cos(index * 1.618 * 2 * Math.PI / benefitMetrics.length)}%`,
                  top: `${50 + 40 * Math.sin(index * 1.618 * 2 * Math.PI / benefitMetrics.length)}%`,
                  animationDelay: `${index * 0.5}s`
                }}
              >
                {metric.percentage}%
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-4 block">
              Section 9
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bloom-effect">
              Value <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Aurora</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the transformative power of our solutions through a living constellation of value,
              where benefits spiral outward in perfect harmony and compound effects create lasting impact.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefitMetrics.map((metric, index) => (
              <div
                key={metric.id}
                className={`benefit-card ${index === activeMetric ? 'active' : ''}`}
                style={{ '--icon-color': metric.color } as React.CSSProperties}
              >
                <div
                  className="metric-icon"
                  style={{ backgroundColor: `${metric.color}20`, border: `2px solid ${metric.color}` }}
                >
                  <div style={{ color: metric.color }}>
                    {metric.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{metric.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{metric.description}</p>

                {/* Percentage Plasma */}
                <div className="mb-4">
                  <PercentagePlasma
                    percentage={metric.percentage}
                    isActive={index === activeMetric}
                    color={metric.color}
                  />
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.impact}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Organic Growth Charts */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Growth Trajectory</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              {benefitMetrics.slice(0, 4).map((metric, index) => (
                <OrganicGrowthChart
                  key={metric.id}
                  value={metric.percentage}
                  maxValue={1000}
                  isActive={growthAnimationActive}
                  color={metric.color}
                  label={metric.title}
                />
              ))}
            </div>
          </div>

          {/* Summary Impact */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                Compound Value Creation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">340%</div>
                  <div className="text-amber-100 text-sm">ROI Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">$2.4M</div>
                  <div className="text-amber-100 text-sm">Annual Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">85%</div>
                  <div className="text-amber-100 text-sm">Productivity Gain</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-amber-100 text-sm">Reliability</div>
                </div>
              </div>
              <button className="mt-6 bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                Calculate Your ROI
              </button>
            </div>
          </div>
        </div>

        {/* Value Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {isVisible && generateValueParticles()}
        </div>

        {/* Compound Effect Waves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {isVisible && generateCompoundWaves()}
        </div>
      </section>
    </>
  );
};

export default ValueAurora;