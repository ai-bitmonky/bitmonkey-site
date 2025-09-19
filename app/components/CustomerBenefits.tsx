'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Shield, Zap, Target, Award, DollarSign, Clock, Users, BarChart3, Lightbulb, Star, ArrowUpRight, CheckCircle, Rocket, Building } from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  impact: string;
  icon: React.ComponentType<any>;
  color: string;
  metrics: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  category: 'financial' | 'operational' | 'strategic' | 'competitive';
}

interface CustomerBenefitsProps {
  className?: string;
}

export default function CustomerBenefits({ className = '' }: CustomerBenefitsProps) {
  const [activeBenefit, setActiveBenefit] = useState<string>('revenue-growth');
  const [isVisible, setIsVisible] = useState(false);
  const [valueAccumulation, setValueAccumulation] = useState(0);
  const [benefitParticles, setBenefitParticles] = useState<Array<{x: number, y: number, delay: number, size: number, color: string}>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate value accumulation
          const interval = setInterval(() => {
            setValueAccumulation(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                return 100;
              }
              return prev + 1.8;
            });
          }, 35);

          // Generate benefit particles
          const particles = Array.from({ length: 30 }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            size: 2 + Math.random() * 4,
            color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)]
          }));
          setBenefitParticles(particles);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const customerBenefits: Benefit[] = [
    {
      id: 'revenue-growth',
      title: 'Accelerated Revenue Growth',
      description: 'Digital transformation directly impacts your bottom line through new revenue streams, improved efficiency, and market expansion opportunities',
      impact: 'Generate 25-40% more revenue within 12 months',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      metrics: {
        primary: '+340% ROI',
        secondary: '25-40% Revenue↑',
        tertiary: '< 12 months'
      },
      category: 'financial'
    },
    {
      id: 'operational-efficiency',
      title: 'Operational Excellence',
      description: 'Streamlined processes, automated workflows, and intelligent systems that eliminate waste and maximize productivity across your organization',
      impact: 'Reduce operational costs by 30-60% while improving quality',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      metrics: {
        primary: '60% Cost↓',
        secondary: '5x Productivity',
        tertiary: '24/7 Automation'
      },
      category: 'operational'
    },
    {
      id: 'competitive-advantage',
      title: 'Sustainable Competitive Edge',
      description: 'Stay ahead of market disruption with cutting-edge technology implementations that differentiate your business and capture market share',
      impact: 'Establish market leadership in your industry segment',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      metrics: {
        primary: '3x Faster',
        secondary: 'Market Leader',
        tertiary: 'Future-Ready'
      },
      category: 'competitive'
    },
    {
      id: 'risk-mitigation',
      title: 'Enterprise-Grade Security',
      description: 'Comprehensive cybersecurity framework protecting your data, systems, and reputation while ensuring regulatory compliance',
      impact: 'Eliminate 95% of security vulnerabilities and compliance risks',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      metrics: {
        primary: '95% Secure',
        secondary: 'Zero Breaches',
        tertiary: '100% Compliant'
      },
      category: 'operational'
    },
    {
      id: 'scalability-freedom',
      title: 'Unlimited Scalability',
      description: 'Cloud-native architecture that grows with your business, handling demand spikes and geographic expansion without infrastructure constraints',
      impact: 'Scale operations 10x without proportional cost increases',
      icon: Rocket,
      color: 'from-indigo-500 to-purple-500',
      metrics: {
        primary: '10x Scale',
        secondary: 'Global Reach',
        tertiary: 'No Limits'
      },
      category: 'strategic'
    },
    {
      id: 'customer-experience',
      title: 'Exceptional Customer Experience',
      description: 'AI-powered personalization, omnichannel presence, and seamless interactions that increase customer satisfaction and loyalty',
      impact: 'Achieve 90%+ customer satisfaction and 40% higher retention',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      metrics: {
        primary: '90% Satisfaction',
        secondary: '40% Retention↑',
        tertiary: 'AI-Powered'
      },
      category: 'strategic'
    }
  ];

  const currentBenefit = customerBenefits.find(b => b.id === activeBenefit) || customerBenefits[0];

  const categoryColors = {
    financial: 'from-green-500 to-emerald-600',
    operational: 'from-blue-500 to-cyan-600',
    strategic: 'from-purple-500 to-pink-600',
    competitive: 'from-orange-500 to-red-600'
  };

  const impactMetrics = [
    { label: 'Average ROI Delivered', value: '340%', description: 'Return on investment within first year', icon: DollarSign },
    { label: 'Implementation Success Rate', value: '98%', description: 'Projects delivered on-time and on-budget', icon: Target },
    { label: 'Client Satisfaction Score', value: '4.9/5', description: 'Consistently exceptional client feedback', icon: Star },
    { label: 'Long-term Partnership Rate', value: '89%', description: 'Clients choose ongoing strategic partnerships', icon: Users }
  ];

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden ${className}`}
    >
      {/* Animated Background Benefits Flow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Benefit Particles */}
        {benefitParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animationDuration: '4s'
            }}
          />
        ))}

        {/* Value Flow Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
              style={{
                top: `${10 + i * 12}%`,
                left: '0%',
                right: '0%',
                opacity: 0.4,
                animation: `flowValue ${3.5 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`
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
              <BarChart3 className="w-8 h-8 text-green-500 mr-3 animate-bounce" />
              <span className="text-green-600 font-bold uppercase tracking-wider text-sm">
                Measurable Business Value
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transformational
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Results</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our clients don't just implement technology—they achieve breakthrough business results.
              Here's the measurable value you can expect from partnering with BitMonkey.
            </p>
          </div>
        </div>

        {/* Value Accumulation Meter */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-green-200 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Value Accumulation</h3>
            <p className="text-gray-600">Real-time visualization of compounding business benefits</p>
          </div>

          <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 transition-all duration-100 ease-out"
              style={{ width: `${valueAccumulation}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
              {Math.round(valueAccumulation)}% Value Realization
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Initial Investment</span>
            <span>Positive ROI</span>
            <span>Exponential Returns</span>
          </div>
        </div>

        {/* Benefit Categories Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {customerBenefits.map((benefit) => (
            <button
              key={benefit.id}
              onClick={() => setActiveBenefit(benefit.id)}
              className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
                activeBenefit === benefit.id
                  ? `border-green-500 bg-gradient-to-br ${benefit.color} text-white shadow-xl scale-105`
                  : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:shadow-lg'
              }`}
            >
              <benefit.icon className={`w-8 h-8 mx-auto mb-2 ${
                activeBenefit === benefit.id ? 'text-white' : 'text-gray-600 group-hover:text-green-600'
              } transition-colors duration-300`} />
              <div className={`text-sm font-semibold text-center ${
                activeBenefit === benefit.id ? 'text-white' : 'text-gray-800'
              }`}>
                {benefit.title.split(' ').slice(0, 2).join(' ')}
              </div>
            </button>
          ))}
        </div>

        {/* Active Benefit Showcase */}
        <div className={`bg-gradient-to-br ${currentBenefit.color} rounded-3xl p-8 md:p-12 text-white mb-16 transition-all duration-500 transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <currentBenefit.icon className="w-16 h-16 text-white mr-4" />
                <div>
                  <h3 className="text-3xl font-bold mb-2">{currentBenefit.title}</h3>
                  <div className="text-white/80 text-lg uppercase tracking-wide">{currentBenefit.category} Impact</div>
                </div>
              </div>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {currentBenefit.description}
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <div className="text-2xl font-bold text-white mb-2">Key Impact</div>
                <div className="text-white/90 text-lg">{currentBenefit.impact}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">{currentBenefit.metrics.primary}</div>
                <div className="text-white/80">Primary Metric</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{currentBenefit.metrics.secondary}</div>
                  <div className="text-white/80 text-sm">Growth</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{currentBenefit.metrics.tertiary}</div>
                  <div className="text-white/80 text-sm">Timeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          {impactMetrics.map((metric, index) => (
            <div key={metric.label} className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <metric.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-lg font-semibold text-gray-800 mb-2">{metric.label}</div>
              <div className="text-sm text-gray-600">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Success Stories Preview */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">FinTech Startup</div>
                <div className="text-green-600 text-sm">Series A to IPO</div>
              </div>
            </div>
            <div className="text-gray-700 mb-4">Scaled from 10K to 10M users with our cloud architecture and AI-powered fraud detection system.</div>
            <div className="flex items-center text-green-600 font-semibold">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>1000x user growth</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Healthcare Network</div>
                <div className="text-blue-600 text-sm">Digital Transformation</div>
              </div>
            </div>
            <div className="text-gray-700 mb-4">Reduced patient wait times by 70% and improved care coordination across 50+ facilities.</div>
            <div className="flex items-center text-blue-600 font-semibold">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>70% efficiency gain</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Manufacturing Giant</div>
                <div className="text-purple-600 text-sm">Industry 4.0</div>
              </div>
            </div>
            <div className="text-gray-700 mb-4">Achieved 45% cost reduction through IoT-enabled predictive maintenance and smart automation.</div>
            <div className="flex items-center text-purple-600 font-semibold">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>45% cost reduction</span>
            </div>
          </div>
        </div>

        {/* Value Guarantee */}
        <div className={`bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1200ms' }}>
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Our Value Guarantee</h3>
            <p className="text-green-100 mb-8 max-w-3xl mx-auto text-lg">
              We're so confident in our ability to deliver transformational results that we guarantee measurable ROI
              within 12 months, or we'll work with you at no additional cost until you achieve your goals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">ROI Guarantee</div>
                <div className="text-green-100 text-sm">Measurable returns within 12 months or continued support at no cost</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">Delivery Promise</div>
                <div className="text-green-100 text-sm">On-time, on-budget delivery with transparent milestone tracking</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">Excellence Standard</div>
                <div className="text-green-100 text-sm">World-class quality with continuous optimization and support</div>
              </div>
            </div>

            <div className="text-lg text-green-200 animate-pulse">
              ↓ Ready to transform your business? Let's discuss your vision
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flowValue {
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

        @keyframes benefitPulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .animate-benefit-pulse {
          animation: benefitPulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}