'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Rocket, Target, Clock, CheckCircle, ArrowRight, Star, Zap,
  TrendingUp, Shield, Award, Phone, Mail, Calendar, MessageCircle,
  Sparkles, Users, BarChart3, Lightbulb
} from 'lucide-react';

interface EnhancedCallToActionProps {
  className?: string;
  contextSlug?: string | null;
  onContextChange?: (slug: string | null) => void;
}

export default function EnhancedCallToAction({
  className = '',
  contextSlug = null,
  onContextChange
}: EnhancedCallToActionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [urgencyMomentum, setUrgencyMomentum] = useState(0);
  const [activeActionType, setActiveActionType] = useState<string>('consultation');
  const [actionParticles, setActionParticles] = useState<Array<{x: number, y: number, delay: number, size: number, type: string}>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate urgency momentum
          const interval = setInterval(() => {
            setUrgencyMomentum(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                return 100;
              }
              return prev + 2.5;
            });
          }, 30);

          // Generate action particles
          const particles = Array.from({ length: 40 }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 6,
            size: 2 + Math.random() * 5,
            type: ['rocket', 'star', 'spark', 'success'][Math.floor(Math.random() * 4)]
          }));
          setActionParticles(particles);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const actionTypes = [
    {
      id: 'consultation',
      title: 'Strategic Consultation',
      description: 'Free 60-minute strategy session to map your transformation journey',
      icon: Lightbulb,
      color: 'from-blue-500 to-cyan-500',
      value: 'Free ($500 value)',
      cta: 'Book Free Consultation',
      urgency: 'Limited slots available this month'
    },
    {
      id: 'assessment',
      title: 'Digital Readiness Assessment',
      description: 'Comprehensive analysis of your current tech stack and transformation potential',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      value: '48-hour turnaround',
      cta: 'Get Assessment',
      urgency: 'Next 5 assessments include implementation roadmap'
    },
    {
      id: 'demo',
      title: 'Custom Solution Demo',
      description: 'Live demonstration of how our solutions address your specific challenges',
      icon: Target,
      color: 'from-green-500 to-teal-500',
      value: 'Personalized preview',
      cta: 'Schedule Demo',
      urgency: 'See immediate ROI potential for your business'
    },
    {
      id: 'pilot',
      title: 'Pilot Project',
      description: 'Risk-free proof of concept to validate transformation impact',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      value: '30-day pilot',
      cta: 'Start Pilot',
      urgency: 'Q1 2025 pilot slots filling fast'
    }
  ];

  const currentAction = actionTypes.find(action => action.id === activeActionType) || actionTypes[0];

  const transformationBenefits = [
    'Industry-leading 340% ROI within 12 months',
    '98% project success rate with on-time delivery',
    'Zero-risk approach with satisfaction guarantee',
    'Expert team with 15+ years of transformation experience'
  ];

  const urgencyFactors = [
    { label: 'Market Opportunity Window', status: 'Closing in 18 months', color: 'text-red-400' },
    { label: 'Early Adopter Advantage', status: '10x ROI vs late movers', color: 'text-yellow-400' },
    { label: 'Competitive Pressure', status: 'Increasing daily', color: 'text-orange-400' },
    { label: 'Technology Evolution', status: 'Accelerating rapidly', color: 'text-red-400' }
  ];

  const getParticleColor = (type: string) => {
    switch (type) {
      case 'rocket': return '#3b82f6';
      case 'star': return '#f59e0b';
      case 'spark': return '#10b981';
      case 'success': return '#8b5cf6';
      default: return '#6366f1';
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden ${className}`}
    >
      {/* Animated Background Action Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Action Particles */}
        {actionParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: getParticleColor(particle.type),
              animationDelay: `${particle.delay}s`,
              animationDuration: '4s'
            }}
          />
        ))}

        {/* Success Flow Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              style={{
                top: `${5 + i * 10}%`,
                left: '0%',
                right: '0%',
                opacity: 0.3,
                animation: `flowSuccess ${4 + i * 0.3}s ease-in-out infinite`,
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
              <Rocket className="w-8 h-8 text-blue-400 mr-3 animate-bounce" />
              <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">
                Take Action Now
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Your Digital
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Transformation</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Starts Today</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              You've seen the challenges, the opportunities, and our proven approach.
              The market window is open, but it won't stay that way forever.
              Choose how you want to begin your transformation journey.
            </p>
          </div>
        </div>

        {/* Urgency Momentum Meter */}
        <div className={`bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-red-500/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Market Urgency Index</h3>
            <p className="text-gray-400">Real-time pressure to act on digital transformation</p>
          </div>

          <div className="relative w-full h-8 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 transition-all duration-100 ease-out"
              style={{ width: `${urgencyMomentum}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
              {Math.round(urgencyMomentum)}% Critical Action Window
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {urgencyFactors.map((factor, index) => (
              <div key={factor.label} className="text-center">
                <div className="text-sm text-gray-400">{factor.label}</div>
                <div className={`text-sm font-semibold ${factor.color}`}>{factor.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {actionTypes.map((action, index) => (
            <button
              key={action.id}
              onClick={() => setActiveActionType(action.id)}
              className={`group p-6 rounded-xl border-2 transition-all duration-300 ${
                activeActionType === action.id
                  ? `border-blue-400 bg-gradient-to-br ${action.color} text-white shadow-2xl scale-105`
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-blue-500 hover:shadow-xl'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <action.icon className={`w-12 h-12 mx-auto mb-4 ${
                activeActionType === action.id ? 'text-white' : 'text-gray-400 group-hover:text-blue-400'
              } transition-colors duration-300`} />
              <div className="text-center">
                <div className={`text-lg font-bold mb-2 ${
                  activeActionType === action.id ? 'text-white' : 'text-gray-200'
                }`}>
                  {action.title}
                </div>
                <div className="text-sm opacity-80">{action.value}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Action Showcase */}
        <div className={`bg-gradient-to-br ${currentAction.color} rounded-3xl p-8 md:p-12 text-white mb-16 transition-all duration-500 transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <currentAction.icon className="w-16 h-16 text-white mr-4" />
                <div>
                  <h3 className="text-3xl font-bold mb-2">{currentAction.title}</h3>
                  <div className="text-white/80 text-lg">{currentAction.value}</div>
                </div>
              </div>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {currentAction.description}
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <div className="flex items-center text-yellow-300 mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-bold">Limited Time</span>
                </div>
                <div className="text-white/90">{currentAction.urgency}</div>
              </div>

              <div className="flex gap-4">
                <a
                  href="mailto:hello@bitmonkey.in"
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-2xl transition-all flex items-center group"
                >
                  {currentAction.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:+1234567890"
                  className="px-8 py-4 border-2 border-white bg-transparent rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6">Why Act Now?</h4>
              <div className="space-y-4">
                {transformationBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Multiple Contact Options */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Email Us</h4>
            <p className="text-gray-400 mb-4">Get detailed project proposal within 24 hours</p>
            <a href="mailto:hello@bitmonkey.in" className="text-blue-400 hover:text-blue-300 font-semibold">
              hello@bitmonkey.in
            </a>
          </div>

          <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Call Direct</h4>
            <p className="text-gray-400 mb-4">Speak with our transformation experts immediately</p>
            <a href="tel:+1234567890" className="text-green-400 hover:text-green-300 font-semibold">
              +91 (XXX) XXX-XXXX
            </a>
          </div>

          <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Book Meeting</h4>
            <p className="text-gray-400 mb-4">Schedule a strategic consultation call</p>
            <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold">
              Schedule Now
            </a>
          </div>
        </div>

        {/* Final Urgency Message */}
        <div className={`text-center bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-pulse" />
            <span className="text-yellow-400 font-bold uppercase tracking-wider">
              Limited Time Opportunity
            </span>
            <Sparkles className="w-8 h-8 text-yellow-400 ml-3 animate-pulse" />
          </div>

          <h3 className="text-3xl font-bold text-white mb-4">
            Don't Let Your Competitors Get There First
          </h3>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Every day you delay is a day your competitors gain ground. The businesses that act now will
            dominate tomorrow's markets. The question isn't whether to transform—it's whether you'll lead or follow.
          </p>

          <div className="text-6xl font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent mb-4 animate-pulse">
            18 Months
          </div>

          <div className="text-lg text-gray-400">
            Average window before market opportunity saturation
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flowSuccess {
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

        @keyframes urgencyPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        .animate-urgency-pulse {
          animation: urgencyPulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}