'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, Globe, Shield, Brain, Cloud } from 'lucide-react';

interface TrendData {
  id: string;
  title: string;
  growth: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  delay: number;
}

interface IndustryLandscapeProps {
  className?: string;
}

export default function IndustryLandscape({ className = '' }: IndustryLandscapeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateStats(true), 500);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('industry-landscape');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const industryTrends: TrendData[] = [
    {
      id: 'ai-adoption',
      title: 'AI Adoption',
      growth: '+73%',
      description: 'Enterprise AI implementation accelerating across industries',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      delay: 0
    },
    {
      id: 'cloud-migration',
      title: 'Cloud Migration',
      growth: '+68%',
      description: 'Organizations moving to cloud-first architectures',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      delay: 200
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      growth: '+89%',
      description: 'Businesses digitizing operations and customer experiences',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      delay: 400
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Investment',
      growth: '+82%',
      description: 'Security spending rising with digital footprint expansion',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      delay: 600
    },
    {
      id: 'remote-infrastructure',
      title: 'Remote Infrastructure',
      growth: '+91%',
      description: 'Hybrid work models driving infrastructure modernization',
      icon: Globe,
      color: 'from-green-500 to-teal-500',
      delay: 800
    },
    {
      id: 'automation',
      title: 'Process Automation',
      growth: '+76%',
      description: 'Intelligent automation transforming business operations',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500',
      delay: 1000
    }
  ];

  const marketStats = [
    { label: 'Global IT Spending', value: '$4.6T', change: '+8.2%', description: '2024 projected growth' },
    { label: 'Digital Transformation Market', value: '$1.3T', change: '+16.3%', description: 'Annual growth rate' },
    { label: 'Cloud Services Market', value: '$591B', change: '+20.4%', description: 'Market expansion' },
    { label: 'AI Software Market', value: '$251B', change: '+25.2%', description: 'Fastest growing segment' }
  ];

  return (
    <section
      id="industry-landscape"
      className={`py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4 block">
              Industry Landscape 2024
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Digital Transformation
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Era</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Technology is reshaping every industry. Organizations that embrace digital transformation
              today will lead tomorrow's markets. Here's what's driving this unprecedented change.
            </p>
          </div>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {marketStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg transition-all duration-700 ${
                animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-green-600 font-semibold text-sm mb-2">{stat.change}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Trends Grid */}
        <div>
          <h3 className={`text-2xl font-bold text-center text-gray-900 mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Key Technology Trends Shaping Business
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryTrends.map((trend) => (
              <div
                key={trend.id}
                className={`group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-700 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${trend.delay}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${trend.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${trend.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <trend.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {trend.title}
                    </h4>
                    <span className={`text-2xl font-bold bg-gradient-to-r ${trend.color} bg-clip-text text-transparent`}>
                      {trend.growth}
                    </span>
                  </div>

                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {trend.description}
                  </p>

                  {/* Growth Indicator */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                      <span>Year-over-year growth</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-br group-hover:${trend.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1200ms' }}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Lead the Digital Revolution?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Don't let your competition get ahead. These trends represent both challenges and opportunities.
              The question isn't whether to transform—it's how quickly you can adapt.
            </p>
            <div className="text-sm text-blue-200">
              ↓ Discover how we help businesses navigate these challenges
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        /* Custom gradient border effect */
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .border-gradient {
          background: linear-gradient(var(--angle), transparent, currentColor, transparent);
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          to {
            --angle: 360deg;
          }
        }
      `}</style>
    </section>
  );
}