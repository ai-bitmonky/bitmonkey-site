'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, TrendingDown, Clock, DollarSign, Users, Shield, Zap, Target } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  impact: string;
  icon: React.ComponentType<any>;
  color: string;
  severity: 'high' | 'medium' | 'critical';
  stats: string;
}

interface CustomerChallengesProps {
  className?: string;
}

export default function CustomerChallenges({ className = '' }: CustomerChallengesProps) {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [problemIntensity, setProblemIntensity] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate problem intensity over time
          const interval = setInterval(() => {
            setProblemIntensity(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                return 100;
              }
              return prev + 2;
            });
          }, 50);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const challenges: Challenge[] = [
    {
      id: 'legacy-systems',
      title: 'Legacy System Bottlenecks',
      description: 'Outdated infrastructure slowing innovation and increasing operational costs',
      impact: 'productivity-loss',
      icon: Clock,
      color: 'from-red-500 to-orange-500',
      severity: 'critical',
      stats: '67% slower processes'
    },
    {
      id: 'security-vulnerabilities',
      title: 'Cybersecurity Gaps',
      description: 'Increasing cyber threats exposing sensitive data and business operations',
      impact: 'financial-risk',
      icon: Shield,
      color: 'from-red-600 to-red-500',
      severity: 'critical',
      stats: '$4.45M avg breach cost'
    },
    {
      id: 'skill-shortage',
      title: 'Digital Skills Gap',
      description: 'Lack of technical expertise limiting digital transformation initiatives',
      impact: 'competitive-lag',
      icon: Users,
      color: 'from-orange-500 to-yellow-500',
      severity: 'high',
      stats: '87% report skill gaps'
    },
    {
      id: 'scalability-issues',
      title: 'Scalability Constraints',
      description: 'Infrastructure unable to handle growth and peak demand efficiently',
      impact: 'lost-revenue',
      icon: TrendingDown,
      color: 'from-yellow-500 to-red-500',
      severity: 'high',
      stats: '34% revenue impact'
    },
    {
      id: 'integration-complexity',
      title: 'System Integration Chaos',
      description: 'Disconnected systems creating data silos and operational inefficiencies',
      impact: 'operational-cost',
      icon: Zap,
      color: 'from-purple-500 to-red-500',
      severity: 'medium',
      stats: '23% higher costs'
    },
    {
      id: 'compliance-pressure',
      title: 'Regulatory Compliance Burden',
      description: 'Evolving regulations creating compliance complexity and operational overhead',
      impact: 'legal-risk',
      icon: Target,
      color: 'from-blue-500 to-purple-500',
      severity: 'medium',
      stats: '156% compliance costs up'
    }
  ];

  const getSeverityIntensity = (severity: string) => {
    switch (severity) {
      case 'critical': return 1.0;
      case 'high': return 0.7;
      case 'medium': return 0.4;
      default: return 0.2;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden ${className}`}
    >
      {/* Animated Background Problems */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Problem Intensity Visualization */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 transition-opacity duration-2000"
          style={{ opacity: problemIntensity / 200 }}
        />

        {/* Floating Problem Indicators */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-3 animate-pulse" />
              <span className="text-red-600 font-bold uppercase tracking-wider text-sm">
                Critical Business Challenges
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Hidden Costs of
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> Inaction</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              While technology advances rapidly, many organizations struggle with critical challenges
              that compound daily. Each day of delay multiplies the cost of eventual transformation.
            </p>
          </div>
        </div>

        {/* Problem Intensity Meter */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-red-200 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Risk Accumulation</h3>
            <p className="text-gray-600">Real-time visualization of mounting operational challenges</p>
          </div>

          <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 transition-all duration-100 ease-out"
              style={{ width: `${problemIntensity}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
              {problemIntensity}% Risk Level
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Manageable</span>
            <span>Concerning</span>
            <span>Critical</span>
          </div>
        </div>

        {/* Interactive Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className={`group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } ${
                activeChallenge === challenge.id ? 'ring-4 ring-red-500/30 scale-105' : ''
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveChallenge(challenge.id)}
              onMouseLeave={() => setActiveChallenge(null)}
            >
              {/* Severity Indicator */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${challenge.color}`} />

              {/* Problem Pulse Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${challenge.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                style={{
                  animation: activeChallenge === challenge.id ? 'pulse 2s ease-in-out infinite' : 'none',
                  opacity: activeChallenge === challenge.id ? getSeverityIntensity(challenge.severity) * 0.1 : 0
                }}
              />

              {/* Icon with Morphing Effect */}
              <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${challenge.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <challenge.icon className="w-8 h-8 text-white" />

                {/* Warning Ring */}
                {challenge.severity === 'critical' && (
                  <div className="absolute -inset-2 border-2 border-red-500 rounded-xl animate-ping opacity-50" />
                )}
              </div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                    {challenge.title}
                  </h4>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    challenge.severity === 'critical' ? 'bg-red-100 text-red-700' :
                    challenge.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {challenge.severity.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors">
                  {challenge.description}
                </p>

                {/* Impact Statistics */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Business Impact</span>
                  <span className={`text-lg font-bold bg-gradient-to-r ${challenge.color} bg-clip-text text-transparent`}>
                    {challenge.stats}
                  </span>
                </div>
              </div>

              {/* Hover Morphing Border */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                   style={{ animation: activeChallenge === challenge.id ? 'borderMorph 3s ease-in-out infinite' : 'none' }} />
            </div>
          ))}
        </div>

        {/* Pain Point Accumulation Visualization */}
        <div className={`bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1400ms' }}>
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">The Compound Effect of Digital Debt</h3>
            <p className="text-red-100 mb-8 max-w-3xl mx-auto text-lg">
              These challenges don't exist in isolation. They compound exponentially, creating a cycle of
              increasing costs, security risks, and competitive disadvantage. Every month of delay makes
              transformation more expensive and complex.
            </p>

            {/* Cost Multiplication Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-300 mb-2">+$2.3M</div>
                <div className="text-red-100 text-sm">Average annual cost of delayed modernization</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-300 mb-2">73%</div>
                <div className="text-red-100 text-sm">Increase in transformation complexity per year</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-300 mb-2">89%</div>
                <div className="text-red-100 text-sm">Of delayed projects exceed budget significantly</div>
              </div>
            </div>

            <div className="text-lg text-red-200 animate-pulse">
              ↓ But there's a better way forward
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes borderMorph {
          0%, 100% {
            border-radius: 16px;
            transform: scale(1);
          }
          25% {
            border-radius: 32px 16px 32px 16px;
            transform: scale(1.02);
          }
          50% {
            border-radius: 16px 32px 16px 32px;
            transform: scale(1.01);
          }
          75% {
            border-radius: 32px 16px 32px 16px;
            transform: scale(1.02);
          }
        }

        @keyframes problemPulse {
          0%, 100% {
            opacity: 0.05;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.02);
          }
        }

        .animate-problem-pulse {
          animation: problemPulse 2s ease-in-out infinite;
        }

        /* Enhanced floating effect */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-1deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}