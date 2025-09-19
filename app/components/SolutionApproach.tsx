'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Lightbulb, Target, Zap, Users, BarChart3, Rocket, Star, Layers } from 'lucide-react';

interface MethodologyStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  deliverables: string[];
  timeline: string;
  value: string;
}

interface SolutionApproachProps {
  className?: string;
}

export default function SolutionApproach({ className = '' }: SolutionApproachProps) {
  const [activeStep, setActiveStep] = useState<string>('discover');
  const [isVisible, setIsVisible] = useState(false);
  const [progressFlow, setProgressFlow] = useState(0);
  const [flowParticles, setFlowParticles] = useState<Array<{x: number, y: number, delay: number, size: number}>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate progress flow
          const interval = setInterval(() => {
            setProgressFlow(prev => {
              if (prev >= 100) {
                clearInterval(interval);
                return 100;
              }
              return prev + 1.2;
            });
          }, 40);

          // Generate flow particles
          const particles = Array.from({ length: 25 }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 4,
            size: 2 + Math.random() * 3
          }));
          setFlowParticles(particles);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const methodologySteps: MethodologyStep[] = [
    {
      id: 'discover',
      title: 'Discovery & Analysis',
      description: 'Deep dive into your business challenges, current infrastructure, and growth objectives to identify transformation opportunities',
      icon: Lightbulb,
      color: 'from-blue-500 to-cyan-500',
      deliverables: ['Business Process Audit', 'Technology Assessment', 'Gap Analysis Report', 'Roadmap Strategy'],
      timeline: '1-2 weeks',
      value: 'Clear understanding of current state and transformation potential'
    },
    {
      id: 'design',
      title: 'Strategic Design',
      description: 'Architect comprehensive solutions that align with your business goals while ensuring scalability and future-proofing',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      deliverables: ['Solution Architecture', 'Technical Specifications', 'Integration Plan', 'Risk Assessment'],
      timeline: '2-3 weeks',
      value: 'Detailed blueprint for transformation success'
    },
    {
      id: 'develop',
      title: 'Agile Development',
      description: 'Build robust, scalable solutions using cutting-edge technologies and industry best practices with continuous feedback loops',
      icon: Zap,
      color: 'from-green-500 to-teal-500',
      deliverables: ['MVP Development', 'Quality Assurance', 'Performance Testing', 'Security Validation'],
      timeline: '4-12 weeks',
      value: 'Production-ready solutions that exceed expectations'
    },
    {
      id: 'deploy',
      title: 'Seamless Deployment',
      description: 'Execute smooth rollouts with minimal disruption, comprehensive testing, and immediate support for operational excellence',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      deliverables: ['Production Deployment', 'User Training', 'Go-Live Support', 'Performance Monitoring'],
      timeline: '1-2 weeks',
      value: 'Zero-downtime transition to enhanced capabilities'
    },
    {
      id: 'optimize',
      title: 'Continuous Optimization',
      description: 'Monitor, measure, and enhance performance while providing ongoing support and strategic guidance for sustained growth',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      deliverables: ['Performance Analytics', 'Optimization Reports', 'Strategic Consulting', '24/7 Support'],
      timeline: 'Ongoing',
      value: 'Sustained competitive advantage and continuous improvement'
    }
  ];

  const currentStep = methodologySteps.find(step => step.id === activeStep) || methodologySteps[0];

  const successMetrics = [
    { label: 'Methodology Success Rate', value: '98%', description: 'Proven track record of successful implementations' },
    { label: 'Average ROI Delivered', value: '340%', description: 'Return on investment within 12 months' },
    { label: 'Client Satisfaction', value: '4.9/5', description: 'Consistently exceptional client feedback' },
    { label: 'On-Time Delivery', value: '96%', description: 'Projects completed within agreed timelines' }
  ];

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden ${className}`}
    >
      {/* Animated Background Solution Flow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Success Flow Particles */}
        {flowParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute bg-blue-400 rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '3s'
            }}
          />
        ))}

        {/* Progress Flow Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              style={{
                top: `${15 + i * 15}%`,
                left: '0%',
                right: '0%',
                opacity: 0.4,
                animation: `flowRight ${4 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
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
              <Layers className="w-8 h-8 text-blue-500 mr-3 animate-bounce" />
              <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                Proven Methodology
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Strategic
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Approach</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              From initial discovery to ongoing optimization, our battle-tested methodology
              ensures predictable success and maximum ROI for every transformation initiative.
            </p>
          </div>
        </div>

        {/* Progress Flow Visualization */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-blue-200 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Transformation Progress Flow</h3>
            <p className="text-gray-600">Real-time visualization of our systematic approach to success</p>
          </div>

          <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-600 transition-all duration-100 ease-out"
              style={{ width: `${progressFlow}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
              {Math.round(progressFlow)}% Success Confidence
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Discovery</span>
            <span>Development</span>
            <span>Deployment</span>
            <span>Success</span>
          </div>
        </div>

        {/* Interactive Methodology Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {methodologySteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-500 ${
                activeStep === step.id
                  ? `border-blue-500 bg-gradient-to-br ${step.color} text-white shadow-2xl scale-105`
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-lg'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <step.icon className={`w-12 h-12 mx-auto mb-4 ${
                  activeStep === step.id ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                } transition-colors duration-300`} />
                <div className="text-sm font-bold mb-2">{step.title}</div>
                <div className="text-xs opacity-80">{step.timeline}</div>
              </div>

              {/* Step Number */}
              <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                activeStep === step.id
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-500 text-white'
              }`}>
                {index + 1}
              </div>

              {/* Connection Line */}
              {index < methodologySteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-blue-300 transform -translate-y-1/2">
                  <ArrowRight className="w-4 h-4 text-blue-400 -mt-2" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Active Step Detailed View */}
        <div className={`bg-gradient-to-br ${currentStep.color} rounded-3xl p-8 md:p-12 text-white mb-16 transition-all duration-500 transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <currentStep.icon className="w-16 h-16 text-white mr-4" />
                <div>
                  <h3 className="text-3xl font-bold mb-2">{currentStep.title}</h3>
                  <div className="text-white/80 text-lg">{currentStep.timeline}</div>
                </div>
              </div>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {currentStep.description}
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <div className="text-2xl font-bold text-white mb-2">Key Value</div>
                <div className="text-white/90 text-lg">{currentStep.value}</div>
              </div>
            </div>

            <div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-white mb-6">Deliverables</h4>
                <div className="grid grid-cols-1 gap-4">
                  {currentStep.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center text-white/90">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          {successMetrics.map((metric, index) => (
            <div key={metric.label} className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="text-lg font-semibold text-gray-800 mb-2">{metric.label}</div>
              <div className="text-sm text-gray-600">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Methodology Benefits */}
        <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1200ms' }}>
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Why Our Methodology Works</h3>
            <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg">
              Our systematic approach combines industry best practices with innovative thinking,
              ensuring every project delivers measurable business value while minimizing risk and maximizing ROI.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">Expert Team</div>
                <div className="text-blue-100 text-sm">15+ years average experience in digital transformation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-12 h-12 text-green-300 mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">Proven Process</div>
                <div className="text-blue-100 text-sm">Refined through 100+ successful implementations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Rocket className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                <div className="text-xl font-bold text-white mb-2">Continuous Innovation</div>
                <div className="text-blue-100 text-sm">Latest technologies and industry best practices</div>
              </div>
            </div>

            <div className="text-lg text-blue-200 animate-pulse">
              ↓ See our methodology in action through our services
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

        @keyframes methodologyPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        .animate-methodology-pulse {
          animation: methodologyPulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}