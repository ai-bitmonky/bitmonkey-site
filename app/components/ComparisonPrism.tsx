'use client';

import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle, XCircle, TrendingUp, Zap, Clock, Shield, Users, Target } from 'lucide-react';

interface DifferentiatorMetric {
  category: string;
  traditional: {
    label: string;
    value: number;
    unit: string;
    description: string;
  };
  bitmonkey: {
    label: string;
    value: number;
    unit: string;
    description: string;
  };
  icon: React.ReactNode;
  advantage: string;
}

const ComparisonPrism: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [particlesGenerated, setParticlesGenerated] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  const differentiatorMetrics: DifferentiatorMetric[] = [
    {
      category: "Delivery Speed",
      traditional: {
        label: "Traditional Delivery",
        value: 18,
        unit: "months",
        description: "Waterfall methodology with lengthy planning phases"
      },
      bitmonkey: {
        label: "BitMonkey Delivery",
        value: 6,
        unit: "months",
        description: "Agile sprints with continuous delivery pipeline"
      },
      icon: <Clock className="w-6 h-6" />,
      advantage: "3x Faster Time-to-Market"
    },
    {
      category: "Cost Efficiency",
      traditional: {
        label: "Traditional Budget",
        value: 100,
        unit: "%",
        description: "Fixed scope with change order overruns"
      },
      bitmonkey: {
        label: "BitMonkey Budget",
        value: 65,
        unit: "%",
        description: "Iterative development with value-based prioritization"
      },
      icon: <TrendingUp className="w-6 h-6" />,
      advantage: "35% Cost Reduction"
    },
    {
      category: "Quality Assurance",
      traditional: {
        label: "Manual Testing",
        value: 75,
        unit: "% coverage",
        description: "End-to-end testing in final phases"
      },
      bitmonkey: {
        label: "Automated Testing",
        value: 95,
        unit: "% coverage",
        description: "Continuous testing with AI-powered validation"
      },
      icon: <Shield className="w-6 h-6" />,
      advantage: "20% Higher Quality Score"
    },
    {
      category: "Scalability",
      traditional: {
        label: "Monolithic Architecture",
        value: 10,
        unit: "x scale",
        description: "Vertical scaling with performance bottlenecks"
      },
      bitmonkey: {
        label: "Microservices Architecture",
        value: 100,
        unit: "x scale",
        description: "Horizontal scaling with cloud-native design"
      },
      icon: <Zap className="w-6 h-6" />,
      advantage: "10x Better Scalability"
    },
    {
      category: "Team Efficiency",
      traditional: {
        label: "Siloed Teams",
        value: 60,
        unit: "% productivity",
        description: "Departmental boundaries with handoff delays"
      },
      bitmonkey: {
        label: "Cross-functional Teams",
        value: 90,
        unit: "% productivity",
        description: "Integrated teams with shared accountability"
      },
      icon: <Users className="w-6 h-6" />,
      advantage: "50% Productivity Boost"
    },
    {
      category: "Innovation Rate",
      traditional: {
        label: "Annual Releases",
        value: 1,
        unit: "releases/year",
        description: "Big bang releases with extended cycles"
      },
      bitmonkey: {
        label: "Continuous Deployment",
        value: 24,
        unit: "releases/year",
        description: "Incremental features with rapid iteration"
      },
      icon: <Target className="w-6 h-6" />,
      advantage: "24x More Innovation"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setParticlesGenerated(true), 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (portalRef.current) {
      observer.observe(portalRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveMetric(prev => (prev + 1) % differentiatorMetrics.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible, differentiatorMetrics.length]);

  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${25 + Math.random() * 10}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      );
    }
    return particles;
  };

  const LiquidMetricBar: React.FC<{
    value: number;
    maxValue: number;
    isActive: boolean;
    isBitMonkey: boolean;
    delay: number;
  }> = ({ value, maxValue, isActive, isBitMonkey, delay }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
      if (isActive) {
        const timer = setTimeout(() => {
          setAnimatedValue(value);
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [isActive, value, delay]);

    const percentage = (animatedValue / maxValue) * 100;

    return (
      <div className="relative w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className={`liquid-bar h-full transition-all duration-2000 ease-out relative ${
            isBitMonkey
              ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500'
              : 'bg-gray-400'
          }`}
          style={{
            width: `${percentage}%`,
            transform: isActive ? 'scale(1)' : 'scale(0)',
            transformOrigin: 'left center'
          }}
        >
          {isBitMonkey && isActive && (
            <div className="aurora-effect absolute inset-0 opacity-60"></div>
          )}
          <div className="crystallization-effect absolute inset-0 opacity-0 animate-crystallize"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                        animate-liquid-flow opacity-0 group-hover:opacity-100"></div>
      </div>
    );
  };

  const AdvantageRay: React.FC<{ isActive: boolean; delay: number }> = ({ isActive, delay }) => (
    <div
      className={`advantage-ray transition-all duration-1000 ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
      style={{
        animationDelay: `${delay}ms`,
        transform: 'scaleY(0)',
        transformOrigin: 'bottom'
      }}
    >
      <div className="ray-beam"></div>
      <div className="ray-glow"></div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        .portal-split {
          position: relative;
          overflow: hidden;
        }

        .portal-split::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom,
            transparent 0%,
            #8b5cf6 20%,
            #06b6d4 50%,
            #8b5cf6 80%,
            transparent 100%);
          transform: translateX(-50%);
          box-shadow: 0 0 20px #8b5cf6, 0 0 40px #06b6d4;
          animation: portal-pulse 2s ease-in-out infinite;
          z-index: 10;
        }

        @keyframes portal-pulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.05); }
        }

        .traditional-side {
          position: relative;
          background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
          filter: grayscale(100%) contrast(0.8);
        }

        .traditional-side::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(90deg, rgba(75,85,99,0.3) 1px, transparent 1px),
            linear-gradient(rgba(75,85,99,0.3) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }

        .bitmonkey-side {
          position: relative;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%);
        }

        .bitmonkey-side::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(147,51,234,0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(59,130,246,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #6b7280;
          border-radius: 2px;
          animation: particle-transform linear infinite;
          z-index: 5;
        }

        @keyframes particle-transform {
          0% {
            transform: translateX(0) scale(1);
            background: #6b7280;
            border-radius: 2px;
          }
          50% {
            transform: translateX(25vw) scale(1.2) rotateY(180deg);
            background: linear-gradient(45deg, #8b5cf6, #06b6d4);
            border-radius: 50%;
          }
          100% {
            transform: translateX(50vw) scale(0.8);
            background: linear-gradient(45deg, #06b6d4, #10b981);
            border-radius: 50%;
          }
        }

        .liquid-bar {
          position: relative;
          overflow: hidden;
        }

        .liquid-bar::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          animation: liquid-wave 2s ease-in-out infinite;
        }

        @keyframes liquid-wave {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        .aurora-effect {
          background: linear-gradient(45deg,
            rgba(147,51,234,0.4) 0%,
            rgba(59,130,246,0.4) 25%,
            rgba(16,185,129,0.4) 50%,
            rgba(59,130,246,0.4) 75%,
            rgba(147,51,234,0.4) 100%);
          background-size: 200% 200%;
          animation: aurora-flow 3s ease-in-out infinite;
        }

        @keyframes aurora-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .crystallization-effect {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.8) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.8) 1.5px, transparent 1.5px);
          background-size: 20px 20px, 15px 15px, 25px 25px;
          animation: crystallize 1.5s ease-out forwards;
        }

        @keyframes crystallize {
          0% { opacity: 0; transform: scale(0.8); }
          70% { opacity: 0.8; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(1); }
        }

        .advantage-ray {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 4px;
          height: 100px;
          transform-origin: bottom center;
        }

        .ray-beam {
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, #8b5cf6 0%, transparent 100%);
          animation: ray-intensity 2s ease-in-out infinite;
        }

        .ray-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #8b5cf6 0%, transparent 100%);
          filter: blur(8px);
          opacity: 0.6;
        }

        @keyframes ray-intensity {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.5); }
        }

        .transition-vortex {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          transform: translate(-50%, -50%);
          background: conic-gradient(from 0deg, transparent, #8b5cf6, transparent, #06b6d4, transparent);
          border-radius: 50%;
          animation: vortex-spin 3s linear infinite;
          opacity: 0.3;
          z-index: 15;
        }

        @keyframes vortex-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <section id="differentiators" className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-purple-400 font-bold uppercase tracking-wider text-sm mb-4 block">
              Section 7
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Differentiators</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the transformation through our comparison prism—witness how BitMonkey's approach
              fundamentally reshapes digital transformation outcomes.
            </p>
          </div>

          {/* Main Comparison Portal */}
          <div ref={portalRef} className="portal-split min-h-[600px] rounded-2xl overflow-hidden mb-12 relative">
            {/* Particle Container */}
            <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none z-5">
              {particlesGenerated && generateParticles()}
            </div>

            {/* Transition Vortex */}
            <div className="transition-vortex"></div>

            <div className="grid grid-cols-2 h-full">
              {/* Traditional Side */}
              <div className="traditional-side p-8 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">Traditional Approach</h3>
                  <p className="text-gray-400">Rigid • Static • Limited</p>
                </div>

                <div className="space-y-6">
                  {differentiatorMetrics[activeMetric] && (
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                      <div className="flex items-center mb-4">
                        <div className="text-gray-400 mr-3">
                          {differentiatorMetrics[activeMetric].icon}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-300">
                          {differentiatorMetrics[activeMetric].traditional.label}
                        </h4>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-baseline mb-2">
                          <span className="text-3xl font-bold text-gray-300">
                            {differentiatorMetrics[activeMetric].traditional.value}
                          </span>
                          <span className="text-gray-400 ml-2">
                            {differentiatorMetrics[activeMetric].traditional.unit}
                          </span>
                        </div>
                        <LiquidMetricBar
                          value={differentiatorMetrics[activeMetric].traditional.value}
                          maxValue={Math.max(
                            differentiatorMetrics[activeMetric].traditional.value,
                            differentiatorMetrics[activeMetric].bitmonkey.value
                          )}
                          isActive={isVisible}
                          isBitMonkey={false}
                          delay={500}
                        />
                      </div>

                      <p className="text-sm text-gray-400">
                        {differentiatorMetrics[activeMetric].traditional.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* BitMonkey Side */}
              <div className="bitmonkey-side p-8 flex flex-col justify-center relative">
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">BitMonkey Approach</h3>
                  <p className="text-purple-300">Organic • Dynamic • Scalable</p>
                </div>

                <div className="space-y-6">
                  {differentiatorMetrics[activeMetric] && (
                    <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm relative group">
                      <AdvantageRay isActive={isVisible} delay={1500} />

                      <div className="flex items-center mb-4">
                        <div className="text-purple-400 mr-3">
                          {differentiatorMetrics[activeMetric].icon}
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          {differentiatorMetrics[activeMetric].bitmonkey.label}
                        </h4>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-baseline mb-2">
                          <span className="text-3xl font-bold text-white">
                            {differentiatorMetrics[activeMetric].bitmonkey.value}
                          </span>
                          <span className="text-purple-300 ml-2">
                            {differentiatorMetrics[activeMetric].bitmonkey.unit}
                          </span>
                        </div>
                        <LiquidMetricBar
                          value={differentiatorMetrics[activeMetric].bitmonkey.value}
                          maxValue={Math.max(
                            differentiatorMetrics[activeMetric].traditional.value,
                            differentiatorMetrics[activeMetric].bitmonkey.value
                          )}
                          isActive={isVisible}
                          isBitMonkey={true}
                          delay={1000}
                        />
                      </div>

                      <p className="text-sm text-purple-200">
                        {differentiatorMetrics[activeMetric].bitmonkey.description}
                      </p>

                      <div className="mt-4 p-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg border border-purple-400/30">
                        <div className="flex items-center">
                          <Target className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-sm font-medium text-green-400">
                            {differentiatorMetrics[activeMetric].advantage}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Metric Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {differentiatorMetrics.map((metric, index) => (
              <button
                key={index}
                onClick={() => setActiveMetric(index)}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  index === activeMetric
                    ? 'bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-purple-400/50 shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/30 border-gray-600/30 hover:border-purple-400/30'
                }`}
              >
                <div className="text-center">
                  <div className={`mb-2 flex justify-center ${index === activeMetric ? 'text-purple-400' : 'text-gray-400'}`}>
                    {metric.icon}
                  </div>
                  <div className={`text-sm font-medium ${index === activeMetric ? 'text-white' : 'text-gray-300'}`}>
                    {metric.category}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                The BitMonkey Advantage
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">3x</div>
                  <div className="text-purple-100 text-sm">Faster Delivery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">35%</div>
                  <div className="text-purple-100 text-sm">Cost Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-purple-100 text-sm">Quality Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24x</div>
                  <div className="text-purple-100 text-sm">More Innovation</div>
                </div>
              </div>
              <button className="mt-6 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                See Our Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComparisonPrism;