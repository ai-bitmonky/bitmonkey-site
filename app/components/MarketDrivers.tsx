'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Lightbulb, Rocket, Target, Zap, Star, ArrowUpRight, Sparkles } from 'lucide-react';

interface Driver {
  id: string;
  title: string;
  description: string;
  opportunity: string;
  icon: React.ComponentType<any>;
  color: string;
  growth: string;
  marketSize: string;
  timeframe: string;
}

interface MarketDriversProps {
  className?: string;
}

export default function MarketDrivers({ className = '' }: MarketDriversProps) {
  const [activeDriver, setActiveDriver] = useState<string>('ai-revolution');
  const [isVisible, setIsVisible] = useState(false);
  const [opportunityMomentum, setOpportunityMomentum] = useState(0);
  const [sparklePositions, setSparklePositions] = useState<Array<{x: number, y: number, delay: number}>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate opportunity momentum
          const interval = setInterval(() => {
            setOpportunityMomentum(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                return 100;
              }
              return prev + 1.5;
            });
          }, 30);

          // Generate sparkle positions
          const sparkles = Array.from({ length: 15 }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 3
          }));
          setSparklePositions(sparkles);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const marketDrivers: Driver[] = [
    {
      id: 'ai-revolution',
      title: 'AI Revolution',
      description: 'Artificial Intelligence transforming every business function and creating new value streams',
      opportunity: 'Early AI adopters gain 15-25% competitive advantage',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500',
      growth: '+127%',
      marketSize: '$1.8T',
      timeframe: '2024-2030'
    },
    {
      id: 'cloud-first',
      title: 'Cloud-First Economy',
      description: 'Digital-native businesses outperforming traditional competitors through cloud agility',
      opportunity: 'Cloud-first companies scale 5x faster',
      icon: Rocket,
      color: 'from-blue-400 to-cyan-500',
      growth: '+89%',
      marketSize: '$832B',
      timeframe: '2024-2028'
    },
    {
      id: 'automation-boom',
      title: 'Intelligent Automation',
      description: 'Process automation eliminating manual work and creating operational excellence',
      opportunity: 'Automation reduces costs by 30-60%',
      icon: Zap,
      color: 'from-purple-400 to-pink-500',
      growth: '+156%',
      marketSize: '$596B',
      timeframe: '2024-2029'
    },
    {
      id: 'data-economy',
      title: 'Data Monetization',
      description: 'Organizations turning data into revenue streams and competitive intelligence',
      opportunity: 'Data-driven companies are 23x more profitable',
      icon: Target,
      color: 'from-green-400 to-blue-500',
      growth: '+73%',
      marketSize: '$385B',
      timeframe: '2024-2027'
    },
    {
      id: 'customer-experience',
      title: 'Experience Innovation',
      description: 'Customer experience becoming the primary competitive differentiator',
      opportunity: 'CX leaders grow revenue 4-8% faster',
      icon: Star,
      color: 'from-pink-400 to-red-500',
      growth: '+91%',
      marketSize: '$641B',
      timeframe: '2024-2026'
    },
    {
      id: 'sustainability-tech',
      title: 'Sustainable Technology',
      description: 'Green tech creating business value while meeting environmental requirements',
      opportunity: 'Sustainable tech market growing 3x faster',
      icon: Sparkles,
      color: 'from-emerald-400 to-green-500',
      growth: '+203%',
      marketSize: '$467B',
      timeframe: '2024-2030'
    }
  ];

  const currentDriver = marketDrivers.find(d => d.id === activeDriver) || marketDrivers[0];

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden ${className}`}
    >
      {/* Animated Background Opportunities */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Opportunity Sparkles */}
        {sparklePositions.map((sparkle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: '2s'
            }}
          />
        ))}

        {/* Success Flow Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
              style={{
                top: `${10 + i * 12}%`,
                left: '0%',
                right: '0%',
                opacity: 0.3,
                animation: `flowRight ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-green-500 mr-3 animate-bounce" />
              <span className="text-green-600 font-bold uppercase tracking-wider text-sm">
                Market Opportunities 2024+
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Trillion-Dollar
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Opportunity</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              While challenges create pressure, they also unlock unprecedented opportunities.
              Smart organizations are turning market disruption into competitive advantage.
            </p>
          </div>
        </div>

        {/* Opportunity Momentum Meter */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-green-200 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Market Opportunity Acceleration</h3>
            <p className="text-gray-600">Real-time visualization of expanding market opportunities</p>
          </div>

          <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 transition-all duration-100 ease-out"
              style={{ width: `${opportunityMomentum}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
              {Math.round(opportunityMomentum)}% Growth Potential
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Emerging</span>
            <span>Accelerating</span>
            <span>Peak Opportunity</span>
          </div>
        </div>

        {/* Interactive Driver Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {marketDrivers.map((driver) => (
            <button
              key={driver.id}
              onClick={() => setActiveDriver(driver.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                activeDriver === driver.id
                  ? `border-green-500 bg-gradient-to-br ${driver.color} text-white shadow-xl scale-105`
                  : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:shadow-lg'
              }`}
            >
              <driver.icon className={`w-8 h-8 mx-auto mb-2 ${
                activeDriver === driver.id ? 'text-white' : 'text-gray-600'
              }`} />
              <div className={`text-sm font-semibold ${
                activeDriver === driver.id ? 'text-white' : 'text-gray-800'
              }`}>
                {driver.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Driver Showcase */}
        <div className={`bg-gradient-to-br ${currentDriver.color} rounded-3xl p-8 md:p-12 text-white mb-16 transition-all duration-500 transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <currentDriver.icon className="w-16 h-16 text-white mr-4" />
                <div>
                  <h3 className="text-3xl font-bold mb-2">{currentDriver.title}</h3>
                  <div className="text-white/80 text-lg">{currentDriver.timeframe}</div>
                </div>
              </div>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {currentDriver.description}
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <div className="text-2xl font-bold text-white mb-2">Key Opportunity</div>
                <div className="text-white/90 text-lg">{currentDriver.opportunity}</div>
              </div>

              <div className="flex items-center text-white/80">
                <ArrowUpRight className="w-5 h-5 mr-2" />
                <span>Market Size: {currentDriver.marketSize} | Growth: {currentDriver.growth}</span>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-6xl font-bold text-white mb-4">{currentDriver.growth}</div>
                <div className="text-white/80 text-lg mb-4">Annual Growth Rate</div>
                <div className="text-4xl font-bold text-white mb-2">{currentDriver.marketSize}</div>
                <div className="text-white/80">Market Opportunity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Timeline */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Early Adopters</h4>
            <p className="text-gray-600">Capitalize on emerging opportunities before competition</p>
          </div>

          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Market Leaders</h4>
            <p className="text-gray-600">Establish dominant position in growing markets</p>
          </div>

          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Industry Shapers</h4>
            <p className="text-gray-600">Define standards and influence entire ecosystems</p>
          </div>
        </div>

        {/* Opportunity Call to Action */}
        <div className={`bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1200ms' }}>
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">The Window is Open, But Not Forever</h3>
            <p className="text-green-100 mb-8 max-w-3xl mx-auto text-lg">
              These market opportunities are time-sensitive. Early movers capture disproportionate value,
              while late adopters face higher costs and reduced returns. The question isn't whether to act—it's how quickly you can move.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-300 mb-2">10x</div>
                <div className="text-green-100 text-sm">ROI advantage for early technology adopters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold text-yellow-300 mb-2">18 months</div>
                <div className="text-green-100 text-sm">Average window before opportunity saturation</div>
              </div>
            </div>

            <div className="text-lg text-green-200 animate-pulse">
              ↓ Discover how we turn opportunities into competitive advantage
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flowRight {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes opportunityPulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        .animate-sparkle {
          animation: sparkleFloat 3s ease-in-out infinite;
        }

        .animate-opportunity-pulse {
          animation: opportunityPulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}