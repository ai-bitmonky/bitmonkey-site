'use client';

import { useState, useEffect } from 'react';
import {
  Menu, X, CheckCircle,
  Mail, Phone, MapPin, Github, Linkedin, Twitter,
  Instagram, Users, Code, Cloud,
  Target, Zap, Award, TrendingUp,
  Smartphone, Database, Shield, TestTube,
  Settings, Briefcase, Building, Map,
  Lock, GraduationCap, Server, Brain,
  Heart, Star, Eye, Send, Download,
  RefreshCw, Loader, Search, MoreHorizontal
} from 'lucide-react';
import ScrollAnimation from './components/ScrollAnimation';
import CursorEffects from './components/CursorEffects';
import GeometricAccent from './components/GeometricShapes';
import BentoGrid from './components/BentoGrid';
import TiltCard from './components/TiltCard';
import AnimatedCounter from './components/AnimatedCounter';
import InteractiveCaseStudy from './components/InteractiveCaseStudy';
import NeuroLoader from './components/NeuroLoader';
import ParametricLight from './components/ParametricLight';
import DataSculpture from './components/DataSculpture';
import SpatialDesign from './components/SpatialDesign';
import MagneticEffect from './components/MagneticEffect';
import MorphingIcon from './components/MorphingIcon';
import LiquidImageTransition from './components/LiquidImageTransition';
import AnimatedGradientMesh from './components/AnimatedGradientMesh';
import InteractiveConstellation from './components/InteractiveConstellation';
import FloatingUIPanel from './components/FloatingUIPanel';
import LiquidButton from './components/LiquidButton';
import AnimatedChart from './components/AnimatedChart';
import { ProgressRing, ProgressRingGroup } from './components/ProgressRing';
import { ShadowCard, ShadowShowcase } from './components/RealisticShadows';


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState<boolean>(false);

  // Top navigation items: base vs context (left-menu-selected) views
  const [contextSlug, setContextSlug] = useState<string | null>(null);


  // Initialize scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Don't unobserve so animations can retrigger if needed
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready after contextSlug change
    setTimeout(() => {
      // Reset any existing animations and observe all elements with scroll-animate class
      // Exclude dropdown elements to prevent interference
      const animateElements = document.querySelectorAll('.scroll-animate:not([data-dropdown])');
      animateElements.forEach((el) => {
        el.classList.remove('animate-in'); // Reset animation state
        observer.observe(el);

        // Check if element is already in view and trigger animation immediately
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
          setTimeout(() => {
            el.classList.add('animate-in');
          }, 100);
        }
      });
    }, 10);

    return () => observer.disconnect();
  }, [contextSlug]); // Re-run when contextSlug changes
  const baseNav = ['Home', 'Services', 'Portfolio', 'Resources', 'Why BitMonkey?'];

  const getContextNav = (slug: string | null) => {
    if (!slug) return baseNav;
    return ['Home', 'Overview', 'Capabilities', 'Case Studies', 'Contact'];
  };

  const currentNav = getContextNav(contextSlug);

  // Helper for left-menu click: simulate context section
  const handleLeftNav = (slug: string) => {
    setContextSlug(slug);
    // simulate new page (URL) but stay on SPA
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/services/${slug}`);
      const el = document.getElementById('home');
      if (el) {
        const yOffset = -100; // Height of fixed nav plus buffer
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  // Helper to handle service page navigation
  const handleServicePageNav = (serviceType: string) => {
    setContextSlug(serviceType);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/services/${serviceType}`);
      const el = document.getElementById('home');
      if (el) {
        const yOffset = -100; // Height of fixed nav plus buffer
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };


  return (
    <div className="min-h-screen bg-white">
      <CursorEffects />
      {/* Navigation */}
      <nav
        className="iridescent fixed top-0 w-full z-[60] transition-all duration-300 bg-white/95 backdrop-blur-md"
        style={{height: '88px', boxSizing: 'border-box', boxShadow: 'none'}}
      >
        <div className="mx-auto max-w-7xl px-6 h-full" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
          <div className="flex items-center justify-between h-full">
            {/* Brand */}
            <div className="flex items-center gap-3">
              {/* Logo placeholder */}
              <div className="w-16 h-16 rounded-lg flex items-center justify-center magnetic-pull hover-highlight click-ripple overflow-hidden">
                <img
                  src="/bitmonkey-logo.JPG"
                  alt="BitMonkey IT Services Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                  BitMonkey IT Services Pvt Ltd
                  <div className="word-swap text-sm text-purple-600 mt-1 flex items-center gap-2" style={{position: 'relative', height: '20px'}}>
                    <span className="word">Digital Innovation</span>
                    <span className="word">Tech Excellence</span>
                    <span className="word">Future Ready</span>
                    <div className="absolute -right-6">
                      <NeuroLoader type="brain-wave" size="sm" color="#7C3AED" speed="slow" />
                    </div>
                  </div>
                </h1>
                <p className="text-xs text-gray-500 mt-1">Friday, September 12 • New Delhi</p>

                <div className="flex items-center gap-3 mt-2 text-gray-600">
                  <button className="inline-flex items-center justify-center w-6 h-6 rounded-lg border hover:bg-gray-50 transition magnetic-button">
                    <MorphingIcon
                      fromIcon={MoreHorizontal}
                      toIcon={Search}
                      size={12}
                      trigger="hover"
                      speed="fast"
                      color="currentColor"
                    />
                  </button>
                  <a href="#" className="hover:text-gray-900 transition magnetic-button underline-reveal">
                    <MorphingIcon
                      fromIcon={Twitter}
                      toIcon={Heart}
                      size={12}
                      trigger="hover"
                      speed="normal"
                      color="currentColor"
                      glow={true}
                    />
                  </a>
                  <a href="#" className="hover:text-gray-900 transition magnetic-button underline-reveal">
                    <MorphingIcon
                      fromIcon={Instagram}
                      toIcon={Star}
                      size={12}
                      trigger="hover"
                      speed="normal"
                      color="currentColor"
                      glow={true}
                    />
                  </a>
                  <a href="#" className="hover:text-gray-900 transition magnetic-button underline-reveal">
                    <MorphingIcon
                      fromIcon={Github}
                      toIcon={Code}
                      size={12}
                      trigger="hover"
                      speed="normal"
                      color="currentColor"
                      glow={true}
                    />
                  </a>
                  <a href="#" className="hover:text-gray-900 transition magnetic-button underline-reveal">
                    <MorphingIcon
                      fromIcon={Linkedin}
                      toIcon={Users}
                      size={12}
                      trigger="hover"
                      speed="normal"
                      color="currentColor"
                      glow={true}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-8 desktop-menu">
              {currentNav.map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, '-');

                // Special handling for Services dropdown
                if (item === 'Services') {
                  return (
                    <div
                      key={item}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-all duration-300 flex items-center gap-1 hover:scale-105 active:scale-95 group magnetic-pull underline-reveal"
                        onClick={(e) => {
                          e.preventDefault();
                          setContextSlug(null);
                          // Wait for re-render before scrolling
                          setTimeout(() => {
                            const element = document.getElementById('our-services');
                            if (element) {
                              const elementPosition = element.offsetTop;
                              const contentStart = elementPosition + 80; // Minimal padding to show section start
                              const offsetPosition = contentStart - 80;
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }, 50);
                        }}
                      >
                        Services
                        <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Services Dropdown */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 transform -translate-x-[15%] mt-2 w-[1000px] bg-white/20 backdrop-blur-lg rounded-2xl shadow-realistic-xl border border-white/30 py-6 pl-6 pr-0 z-50 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none opacity-100 animate-in"
                          style={{
                            animation: 'fadeInUp 0.3s ease-out forwards'
                          }}>
                          <div className="grid gap-3" style={{gridTemplateColumns: '0.211fr 0.218fr 0.165fr'}}>

                            {/* Consulting Services - Left Column */}
                            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-realistic hover:bg-white/12 hover:shadow-realistic-lg shadow-transition hover:scale-105 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:to-indigo-500/5 before:rounded-xl before:pointer-events-none group">
                              <h3 className="text-base font-bold text-blue-900 mb-4 flex items-center gap-2 border-b border-white/30 pb-2 relative z-10 group-hover:text-blue-700 transition-colors duration-300">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                  <Briefcase className="w-4 h-4 text-white" />
                                </div>
                                Consulting Services
                              </h3>
                              <div className="space-y-1">
                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('digital-transformation');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Target className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Digital Transformation</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('enterprise-architecture');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Building className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Enterprise Architecture</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('digital-strategy-roadmaps');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Map className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Strategy & Roadmaps</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('governance');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Settings className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Governance</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('cloud-advisory');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Cloud className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Cloud Advisory</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('security-compliance');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Lock className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Security & Compliance</p>
                                  </div>
                                </button>
                              </div>
                            </div>

                            {/* Development Services - Center Column (Primary) */}
                            <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 shadow-realistic-lg hover:bg-white/20 hover:shadow-realistic-xl hover:scale-105 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:to-pink-500/10 before:rounded-xl before:pointer-events-none ring-2 ring-white/20 group">
                              <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2 border-b-2 border-white/40 pb-2 relative z-10 group-hover:text-purple-700 transition-colors duration-300">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-realistic group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                  <Code className="w-5 h-5 text-white" />
                                </div>
                                Development Services
                              </h3>
                              <div className="space-y-1">
                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('app-dev-modernization');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Code className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">App Dev & Modernization</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('cloud-engineering');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Cloud className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Cloud Engineering</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('ai-ml-automation');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Brain className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">AI-ML & Automation</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('data-analytics');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Database className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Data & Analytics</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('devsecops');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Shield className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">DevSecOps</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('quality-assurance');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <TestTube className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Quality Assurance</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('sre-operations');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Server className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">SRE & Operations</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('center-of-excellence');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Award className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Center of Excellence</p>
                                  </div>
                                </button>
                              </div>
                            </div>

                            {/* Training Services - Right Column */}
                            <div className="bg-white/8 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-realistic hover:bg-white/12 hover:shadow-realistic-lg shadow-transition hover:scale-105 transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/5 before:to-teal-500/5 before:rounded-xl before:pointer-events-none group">
                              <h3 className="text-base font-bold text-green-900 mb-4 flex items-center gap-2 border-b border-white/30 pb-2 relative z-10 group-hover:text-green-700 transition-colors duration-300">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                  <GraduationCap className="w-4 h-4 text-white" />
                                </div>
                                Training Services
                              </h3>
                              <div className="space-y-1">
                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('full-stack-developer');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Code className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Full-Stack Developer</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('devops-engineer');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Settings className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">DevOps Engineer</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('cloud-architect');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Cloud className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Cloud Architect</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('ai-ml-engineer');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <Brain className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">AI/ML Engineer</p>
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    setServicesDropdownOpen(false);
                                    handleLeftNav('certifications');
                                  }}
                                  className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-white/20 hover:backdrop-blur-lg hover:shadow-realistic hover:border-white/30 hover:scale-102 hover:translate-x-1 w-full text-left transition-all duration-300 relative z-10 group"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <GraduationCap className="w-3 h-3 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 underline-reveal">Certifications</p>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors magnetic-pull hover-highlight underline-reveal"
                    onClick={(e) => {
                      if (item === 'Home') {
                        e.preventDefault();
                        setContextSlug(null);
                        // Wait for re-render before scrolling to top
                        setTimeout(() => {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          });
                        }, 50);
                      } else if (item === 'Portfolio') {
                        e.preventDefault();
                        setContextSlug(null);
                        // Wait for re-render before scrolling
                        setTimeout(() => {
                          const element = document.getElementById('our-portfolio');
                          if (element) {
                            const elementPosition = element.offsetTop;
                            const contentStart = elementPosition + 80; // Minimal padding to show section start
                            const offsetPosition = contentStart - 80; // Account for nav height and positioning
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }, 50);
                      } else if (item === 'Resources') {
                        e.preventDefault();
                        setContextSlug(null);
                        // Wait for re-render before scrolling with multiple attempts
                        const scrollToCaseStudies = (attempts = 0) => {
                          const element = document.getElementById('case-studies');
                          if (element) {
                            console.log('Found case studies element at:', element.offsetTop);
                            const elementPosition = element.offsetTop;
                            const contentStart = elementPosition + 80; // Minimal padding to show section start
                            const offsetPosition = contentStart - 80; // Account for nav height and positioning
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          } else if (attempts < 5) {
                            console.log('Case studies element not found, retrying...', attempts + 1);
                            setTimeout(() => scrollToCaseStudies(attempts + 1), 100);
                          } else {
                            console.log('Case studies element not found after 5 attempts');
                          }
                        };
                        setTimeout(() => scrollToCaseStudies(), 100);
                      } else if (item === 'Why BitMonkey?') {
                        e.preventDefault();
                        setContextSlug(null);
                        // Wait for re-render before scrolling
                        setTimeout(() => {
                          const element = document.getElementById('why-bitmonkey');
                          if (element) {
                            const elementPosition = element.offsetTop;
                            const contentStart = elementPosition + 80; // Minimal padding to show section start
                            const offsetPosition = contentStart - 80; // Account for nav height and positioning
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }, 50);
                      } else if (contextSlug) {
                        // Handle navigation within context-specific pages
                        e.preventDefault();
                        if (item === 'Overview') {
                          // Scroll to top for Overview
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          });
                        } else {
                          const element = document.getElementById(id);
                          if (element) {
                            const elementPosition = element.offsetTop;
                            const contentStart = elementPosition + 80; // Minimal padding to show section start
                            const offsetPosition = contentStart - 80; // Account for nav height
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }
                      }
                    }}
                  >
                    {item}
                  </a>
                );
              })}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-900 morphing-container mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              <MorphingIcon
                fromIcon={Menu}
                toIcon={X}
                size={24}
                trigger="click"
                speed="fast"
                className="hover:text-purple-600 transition-colors"
              />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white rounded-lg shadow-realistic p-4">
              <div className="flex flex-col">
                {currentNav.map((item) => {
                  const id = item.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <a
                      key={item}
                      href={`#${id}`}
                      onClick={(e) => {
                        if (item === 'Home') {
                          e.preventDefault();
                          setContextSlug(null);
                          // Wait for re-render before scrolling to top
                          setTimeout(() => {
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth'
                            });
                          }, 50);
                        } else if (item === 'Services') {
                          e.preventDefault();
                          setContextSlug(null);
                          // Wait for re-render before scrolling
                          setTimeout(() => {
                            const element = document.getElementById('our-services');
                            if (element) {
                              const elementPosition = element.offsetTop;
                              const contentStart = elementPosition + 80; // Minimal padding to show section start
                              const offsetPosition = contentStart - 80; // Account for nav height and positioning
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }, 50);
                        } else if (item === 'Portfolio') {
                          e.preventDefault();
                          setContextSlug(null);
                          // Wait for re-render before scrolling
                          setTimeout(() => {
                            const element = document.getElementById('our-portfolio');
                            if (element) {
                              const elementPosition = element.offsetTop;
                              const contentStart = elementPosition + 80; // Minimal padding to show section start
                              const offsetPosition = contentStart - 80; // Account for nav height and positioning
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }, 50);
                        } else if (item === 'Resources') {
                          e.preventDefault();
                          setContextSlug(null);
                          setMobileMenuOpen(false);
                          // Wait for re-render before scrolling with multiple attempts
                          const scrollToCaseStudies = (attempts = 0) => {
                            const element = document.getElementById('case-studies');
                            if (element) {
                              console.log('Found case studies element at:', element.offsetTop);
                              const elementPosition = element.offsetTop;
                              const contentStart = elementPosition + 80; // Minimal padding to show section start
                              const offsetPosition = contentStart - 80; // Account for nav height and positioning
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            } else if (attempts < 5) {
                              console.log('Case studies element not found, retrying...', attempts + 1);
                              setTimeout(() => scrollToCaseStudies(attempts + 1), 100);
                            } else {
                              console.log('Case studies element not found after 5 attempts');
                            }
                          };
                          setTimeout(() => scrollToCaseStudies(), 100);
                        } else if (item === 'Why BitMonkey?') {
                          e.preventDefault();
                          setContextSlug(null);
                          // Wait for re-render before scrolling
                          setTimeout(() => {
                            const element = document.getElementById('why-bitmonkey');
                            if (element) {
                              const elementPosition = element.offsetTop;
                              const contentStart = elementPosition + 80; // Minimal padding to show section start
                              const offsetPosition = contentStart - 80; // Account for nav height and positioning
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }, 50);
                        } else if (contextSlug) {
                          // Handle navigation within context-specific pages
                          e.preventDefault();
                          if (item === 'Overview') {
                            // Scroll to top for Overview
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth'
                            });
                          } else {
                            const element = document.getElementById(id);
                            if (element) {
                              const elementPosition = element.offsetTop;
                              const contentStart = elementPosition + 80; // Minimal padding to show section start
                              const offsetPosition = contentStart - 80; // Account for nav height
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="py-2 text-gray-700 hover:text-purple-600 transition underline-reveal"
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <AnimatedGradientMesh
          colors={['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']}
          height="100vh"
          width="100vw"
          speed="slow"
          intensity="subtle"
          pattern="organic"
          direction="radial"
          blur={true}
          interactive={false}
          autoPlay={true}
          timeOfDay={true}
          className="opacity-30"
        />
      </div>

      {/* Interactive Constellation Layer */}
      <div className="fixed inset-0 -z-5 overflow-hidden">
        <InteractiveConstellation
          nodeCount={40}
          maxConnections={3}
          connectionDistance={140}
          cursorRadius={200}
          nodeSize={2}
          colors={{
            nodes: '#8B5CF6',
            connections: '#06B6D4',
            cursor: '#F59E0B'
          }}
          height="100vh"
          width="100vw"
          interactive={true}
          autoMove={true}
          pulseEffect={true}
          networkEffect={true}
          className="opacity-60"
        />
      </div>

    <section id="home" className="pt-[88px]"> 
        <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left rail column (adds outer padding from the page edge) */}
         <div className="hidden lg:block lg:col-span-3">

  <aside className="sticky self-start" style={{top: '88px'}}>
            <div className="flex flex-col gap-4">

              {/* Service quick menu: Development */}
              <div className="hologram-card cyber-glow bg-white/5 backdrop-blur-xl rounded-2xl p-5 md:p-6 relative w-full border border-white/30 shadow-realistic-xl hover:bg-white/10 hover:shadow-realistic-xl shadow-transition transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent before:rounded-2xl before:pointer-events-none after:absolute after:inset-[1px] after:bg-gradient-to-br after:from-purple-500/5 after:to-pink-500/5 after:rounded-2xl after:pointer-events-none magnetic-pull hover-highlight content-glow" style={{paddingLeft: '0.75rem'}}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setContextSlug('development-services');
                    if (typeof window !== 'undefined') {
                      window.history.pushState({}, '', '/services/development-services');
                      const el = document.getElementById('overview');
                      if (el) {
                        const yOffset = -100; // Height of fixed nav plus buffer
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-white/30 hover:text-purple-900 transition-colors w-full text-left relative z-10"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-purple-900 tracking-tight">Development</span>
                  <span className="text-xl md:text-2xl font-extrabold text-purple-900 tracking-tight">Services</span>
                </button>
                <ul className="divide-y divide-white/20">
                  <li><button onClick={() => handleLeftNav('app-dev-modernization')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-purple-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Code className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">App Dev & Modernization</span></button></li>
                  <li><button onClick={() => handleLeftNav('cloud-engineering')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-purple-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Cloud className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Cloud Engineering</span></button></li>
                  <li><button onClick={() => handleLeftNav('ai-ml-automation')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-purple-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Brain className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">AI-ML & Automation</span></button></li>
                  <li><button onClick={() => handleLeftNav('data-analytics')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-purple-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Database className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Data & Analytics</span></button></li>
                  <li><button onClick={() => handleLeftNav('devsecops')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-purple-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Shield className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">DevSecOps</span></button></li>
                  <li><button onClick={() => handleLeftNav('quality-assurance')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-purple-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><TestTube className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Quality Assurance</span></button></li>
                  <li><button onClick={() => handleLeftNav('sre-operations')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-purple-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Server className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">SRE & Operations</span></button></li>
                  <li><button onClick={() => handleLeftNav('center-of-excellence')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-purple-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Award className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Center Of Excellence</span></button></li>
                </ul>
              </div>

              {/* Service quick menu: Consulting */}
              <div className="hologram-card iridescent bg-white/5 backdrop-blur-xl rounded-2xl p-5 md:p-6 relative w-full border border-white/30 shadow-realistic-xl hover:bg-white/10 hover:shadow-realistic-xl shadow-transition transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent before:rounded-2xl before:pointer-events-none after:absolute after:inset-[1px] after:bg-gradient-to-br after:from-blue-500/5 after:to-indigo-500/5 after:rounded-2xl after:pointer-events-none magnetic-pull hover-highlight content-glow" style={{paddingLeft: '0.75rem'}}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicePageNav('consulting-services');
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-white/30 hover:text-blue-900 transition-colors w-full text-left relative z-10"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-blue-900 tracking-tight">Consulting</span>
                  <span className="text-xl md:text-2xl font-extrabold text-blue-900 tracking-tight">Services</span>
                </button>
                <ul className="divide-y divide-white/20">
                  <li><button onClick={() => handleLeftNav('digital-transformation')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-blue-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Target className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Digital Transformation</span></button></li>
                  <li><button onClick={() => handleLeftNav('enterprise-architecture')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-blue-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Building className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Enterprise Architecture</span></button></li>
                  <li><button onClick={() => handleLeftNav('digital-strategy-roadmaps')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-blue-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Map className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Digital Strategy & Roadmaps</span></button></li>
                  <li><button onClick={() => handleLeftNav('governance')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-blue-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Settings className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Governance</span></button></li>
                  <li><button onClick={() => handleLeftNav('cloud-advisory')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-blue-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Cloud className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Cloud Advisory</span></button></li>
                  <li><button onClick={() => handleLeftNav('security-compliance')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-blue-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Lock className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Security & Compliance</span></button></li>
                </ul>
              </div>

              {/* Service quick menu: Training */}
              <div className="hologram-card prism-effect bg-white/5 backdrop-blur-xl rounded-2xl p-5 md:p-6 relative w-full border border-white/30 shadow-realistic-xl hover:bg-white/10 hover:shadow-realistic-xl shadow-transition transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent before:rounded-2xl before:pointer-events-none after:absolute after:inset-[1px] after:bg-gradient-to-br after:from-green-500/5 after:to-teal-500/5 after:rounded-2xl after:pointer-events-none magnetic-pull hover-highlight content-glow" style={{paddingLeft: '0.75rem'}}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicePageNav('training-services');
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-white/30 hover:text-green-900 transition-colors w-full text-left relative z-10"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-green-900 tracking-tight">Training</span>
                  <span className="text-xl md:text-2xl font-extrabold text-green-900 tracking-tight">Services</span>
                </button>
                <ul className="divide-y divide-white/20">
                  <li><button onClick={() => handleLeftNav('full-stack-developer')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-green-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Code className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Full‑Stack Developer</span></button></li>
                  <li><button onClick={() => handleLeftNav('devops-engineer')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-green-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Settings className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">DevOps Engineer</span></button></li>
                  <li><button onClick={() => handleLeftNav('cloud-architect')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-green-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Cloud className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Cloud Architect</span></button></li>
                  <li><button onClick={() => handleLeftNav('ai-ml-engineer')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-green-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><Brain className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">AI/ML Engineer</span></button></li>
                  <li><button onClick={() => handleLeftNav('certifications')} className="flex items-center gap-2 p-3 text-base text-gray-900 hover:text-green-900 hover:bg-white/8 hover:scale-102 hover:translate-x-1 rounded-lg transition-all duration-300 relative z-10 w-full text-left group"><div className="w-5 h-5 bg-gradient-to-br from-green-500 to-teal-500 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"><GraduationCap className="w-3 h-3 text-white" /></div><span className="underline-reveal-text">Certifications</span></button></li>
                </ul>
              </div>
            </div>
            </aside>
          </div>

          {/* Right hero - changes based on context */}
          <div className="relative lg:col-span-9 min-h-[64vh] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-cover bg-center">

            {/* Neural loading overlay for video */}
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm transition-opacity duration-500" id="video-loader">
              <div className="text-center">
                <NeuroLoader type="neural-network" size="xl" color="#8B5CF6" speed="normal" />
                <p className="text-white/70 mt-4 text-sm font-medium" id="loader-text">Initializing Neural Interface...</p>
              </div>
            </div>
            <video
              className="absolute inset-0 w-full h-full object-cover z-10"
              autoPlay
              muted
              {...(!contextSlug && { loop: true })}
              playsInline
              preload="metadata"
              controls={false}
              key={contextSlug || 'default'}
              ref={(video) => {
                if (video) {
                  // Update loading text after 1.5 seconds
                  const textUpdateId = setTimeout(() => {
                    const loaderText = document.getElementById('loader-text');
                    if (loaderText) {
                      loaderText.textContent = 'Neural pathways synchronized...';
                    }
                  }, 1500);

                  // Auto-hide neural loader after 3 seconds regardless of video load status
                  const timeoutId = setTimeout(() => {
                    const loader = document.getElementById('video-loader');
                    if (loader && loader.style.display !== 'none') {
                      console.log('Auto-hiding neural loader after timeout');
                      loader.style.opacity = '0';
                      setTimeout(() => {
                        loader.style.display = 'none';
                      }, 500);
                    }
                  }, 3000);

                  video.addEventListener('loadeddata', () => {
                    console.log('Video loaded successfully');
                    // Clear timeouts since video loaded
                    clearTimeout(timeoutId);
                    clearTimeout(textUpdateId);
                    // Hide neural loader
                    const loader = document.getElementById('video-loader');
                    if (loader) {
                      loader.style.opacity = '0';
                      setTimeout(() => {
                        loader.style.display = 'none';
                      }, 500);
                    }
                    video.play().catch(e => {
                      console.error('Auto-play failed:', e);
                      // Show controls if autoplay fails
                      video.controls = true;
                    });
                  });

                  // Also handle video load errors
                  video.addEventListener('error', () => {
                    console.log('Video failed to load, hiding neural loader');
                    clearTimeout(timeoutId);
                    clearTimeout(textUpdateId);
                    const loader = document.getElementById('video-loader');
                    if (loader) {
                      loader.style.opacity = '0';
                      setTimeout(() => {
                        loader.style.display = 'none';
                      }, 500);
                    }
                  });
                }
              }}
              onError={(e) => {
                console.error('Video error:', e);
                // Show fallback background instead of hiding
                e.currentTarget.style.opacity = '0';
              }}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              <source src={
                // Development Services
                contextSlug === 'development-services' ? "/development.mp4" :
                contextSlug === 'app-dev-modernization' ? "/app-dev.mp4" :
                contextSlug === 'cloud-engineering' ? "/cloud-engineering.mp4" :
                contextSlug === 'ai-ml-automation' ? "/ai-ml.mp4" :
                contextSlug === 'data-analytics' ? "/services.mp4" :
                contextSlug === 'devsecops' ? "/devsecops.mp4" :
                contextSlug === 'quality-assurance' ? "/qa.mp4" :
                contextSlug === 'sre-operations' ? "/sre.mp4" :
                contextSlug === 'center-of-excellence' ? "/coe.mp4" :
                // Consulting Services
                contextSlug === 'consulting-services' ? "/consulting.mp4" :
                contextSlug === 'digital-transformation' ? "/digital-transformation.mp4" :
                contextSlug === 'enterprise-architecture' ? "/consulting.mp4" :
                contextSlug === 'digital-strategy-roadmaps' ? "/digital-strategy.mp4" :
                contextSlug === 'governance' ? "/governance.mp4" :
                contextSlug === 'cloud-advisory' ? "/cloud-advisory.mp4" :
                contextSlug === 'security-compliance' ? "/security-compliance.mp4" :
                // Training Services
                contextSlug === 'training-services' ? "/training.mp4" :
                contextSlug === 'full-stack-developer' ? "/fullstack.mp4" :
                contextSlug === 'devops-engineer' ? "/devops.mp4" :
                contextSlug === 'cloud-architect' ? "/cloud-architect.mp4" :
                contextSlug === 'ai-ml-engineer' ? "/ai-ml-engineer.mp4" :
                contextSlug === 'bootcamps' ? "/training.mp4" :
                contextSlug === 'certifications' ? "/certifications.mp4" :
                "/hero.mp4"
              } type="video/mp4" />
            </video>

            <GeometricAccent
              className="absolute inset-0 z-0"
              shapes={[
                { type: 'organic-blob', size: 'xl', color: 'rgba(147, 51, 234, 0.2)', position: 'top-left', animate: true },
                { type: 'liquid-drop', size: 'lg', color: 'rgba(79, 70, 229, 0.15)', position: 'top-right', animate: true },
                { type: 'neural-network', size: 'md', color: 'rgba(168, 85, 247, 0.18)', position: 'bottom-left', animate: true },
                { type: 'bio-membrane', size: 'xl', color: 'rgba(99, 102, 241, 0.12)', position: 'center', animate: true },
                { type: 'flowing-wave', size: 'lg', color: 'rgba(147, 51, 234, 0.16)', position: 'bottom-right', animate: true }
              ]}
            >
              <div></div>
            </GeometricAccent>

            {/* Parametric Light Effects */}
            <div className="absolute top-4 left-4 z-30">
              <ParametricLight type="spiral" size="md" color="#8B5CF6" speed="slow" intensity="subtle" glow={true} />
            </div>
            <div className="absolute top-4 right-4 z-30">
              <ParametricLight type="infinity" size="sm" color="#6366F1" speed="normal" intensity="medium" glow={true} />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              <ParametricLight type="rose" size="lg" color="#A855F7" speed="fast" intensity="bright" glow={true} trail={true} />
            </div>

          </div>
          </div> {/* end grid */}
        </div>   {/* end padded wrapper */}
      </section>

      {/* Sections */}
      {!contextSlug ? (
        <>
          {/* Spacer between Hero and Services */}
          <div className="h-10 bg-white"></div>

          {/* Our Services Section */}
          <section id="our-services" className="pt-48 pb-24 bg-white relative overflow-hidden" style={{marginTop: '2.4rem', marginBottom: '1.2rem'}}>
            <GeometricAccent
              shapes={[
                { type: 'circuit-pattern', size: 'xl', color: 'rgba(99, 102, 241, 0.08)', position: 'center', animate: true },
                { type: 'organic-blob', size: 'lg', color: 'rgba(99, 102, 241, 0.15)', position: 'top-left', animate: true },
                { type: 'flowing-wave', size: 'md', color: 'rgba(147, 51, 234, 0.18)', position: 'top-right', animate: true },
                { type: 'cell-structure', size: 'lg', color: 'rgba(79, 70, 229, 0.12)', position: 'bottom-left', animate: true },
                { type: 'coral-branch', size: 'sm', color: 'rgba(79, 70, 229, 0.16)', position: 'bottom-right', animate: true }
              ]}
            >
              {/* Parametric Light Effects for Services */}
              <div className="absolute top-8 right-8">
                <ParametricLight type="wave" size="md" color="#6366F1" speed="normal" intensity="medium" glow={true} />
              </div>
              <div className="absolute bottom-8 left-8">
                <ParametricLight type="lissajous" size="sm" color="#8B5CF6" speed="slow" intensity="subtle" glow={true} />
              </div>

              {/* Data Sculpture Effects for Services */}
              <div className="absolute top-1/4 left-12">
                <DataSculpture type="helix" size="md" color="#6366F1" speed="normal" intensity="medium" wireframe={true} />
              </div>
              <div className="absolute bottom-1/4 right-12">
                <DataSculpture type="cube" size="sm" color="#8B5CF6" speed="slow" intensity="subtle" particles={true} />
              </div>
            <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
                {/* Text Content - 30% */}
                <div className="lg:col-span-3 space-y-6 scroll-animate fade-in-left">
                  <div className="scroll-animate fade-in-up">
                    <span className="text-purple-600 font-bold uppercase tracking-wider hover:text-purple-700 hover:scale-105 transition-all duration-300 cursor-default inline-block typewriter" style={{fontSize: '2.2rem'}}>Our Services</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 hidden lg:block scroll-animate fade-in-up text-reveal" style={{fontSize: '1.75rem'}}>
                      <span className="highlight-reveal">Comprehensive Digital Solutions</span>
                    </h2>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed hidden lg:block scroll-animate fade-in-up">
                    We deliver end-to-end technology solutions that drive business transformation and accelerate growth.
                  </p>

                  <div className="space-y-4 scroll-animate fade-in-up">
                    <div
                      className="flex items-start gap-3 scroll-animate fade-in-up-delay-1000 hover-highlight magnetic-pull"
                    >
                      <div className="relative">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <div className="absolute -top-1 -right-1">
                          <NeuroLoader type="neural-network" size="sm" color="#10B981" speed="slow" />
                        </div>
                      </div>
                      <div className="w-full">
                        <h4 className="font-semibold text-gray-900">Development Services</h4>
                        <p className="text-sm text-gray-600">Modern applications with cutting-edge technologies</p>

                        {/* Mobile service menu - Bento Grid */}
                        <div className="lg:hidden mt-4 bg-gray-50 rounded-lg p-4 border">
                          <BentoGrid
                            items={[
                              {
                                id: 'app-dev',
                                title: 'App Development',
                                subtitle: 'Modernization',
                                icon: <Code className="w-4 h-4 text-white" />,
                                gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
                                onClick: () => handleLeftNav('app-dev-modernization'),
                                size: 'lg',
                                featured: true
                              },
                              {
                                id: 'cloud',
                                title: 'Cloud',
                                subtitle: 'Engineering',
                                icon: <Cloud className="w-3 h-3 text-white" />,
                                gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
                                onClick: () => handleLeftNav('cloud-engineering'),
                                size: 'sm'
                              },
                              {
                                id: 'ai-ml',
                                title: 'AI-ML',
                                subtitle: 'Automation',
                                icon: <Brain className="w-3 h-3 text-white" />,
                                gradient: 'bg-gradient-to-br from-green-500 to-teal-500',
                                onClick: () => handleLeftNav('ai-ml-automation'),
                                size: 'sm'
                              },
                              {
                                id: 'data',
                                title: 'Data',
                                subtitle: 'Analytics',
                                icon: <Database className="w-4 h-4 text-white" />,
                                gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
                                onClick: () => handleLeftNav('data-analytics'),
                                size: 'md'
                              },
                              {
                                id: 'devsecops',
                                title: 'DevSecOps',
                                subtitle: 'Security',
                                icon: <Shield className="w-3 h-3 text-white" />,
                                gradient: 'bg-gradient-to-br from-red-500 to-pink-500',
                                onClick: () => handleLeftNav('devsecops'),
                                size: 'sm'
                              },
                              {
                                id: 'qa',
                                title: 'Quality',
                                subtitle: 'Assurance',
                                icon: <TestTube className="w-3 h-3 text-white" />,
                                gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
                                onClick: () => handleLeftNav('quality-assurance'),
                                size: 'sm'
                              },
                              {
                                id: 'sre',
                                title: 'SRE',
                                subtitle: 'Operations',
                                icon: <Server className="w-3 h-3 text-white" />,
                                gradient: 'bg-gradient-to-br from-indigo-500 to-purple-500',
                                onClick: () => handleLeftNav('sre-operations'),
                                size: 'sm'
                              },
                              {
                                id: 'coe',
                                title: 'Center of Excellence',
                                subtitle: 'Best Practices',
                                icon: <Award className="w-4 h-4 text-white" />,
                                gradient: 'bg-gradient-to-br from-teal-500 to-blue-500',
                                onClick: () => handleLeftNav('center-of-excellence'),
                                size: 'md'
                              }
                            ]}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-start gap-3 hover-highlight magnetic-pull"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div className="w-full">
                        <h4 className="font-semibold text-gray-900">Consulting Services</h4>
                        <p className="text-sm text-gray-600">Strategic guidance for digital transformation</p>

                        {/* Mobile service menu */}
                        <div className="lg:hidden mt-4 bg-gray-50 rounded-lg p-4 border">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleLeftNav('digital-transformation')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                <Target className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Digital</h5>
                                <p className="text-xs text-gray-500">Transform</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('enterprise-architecture')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Building className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Enterprise</h5>
                                <p className="text-xs text-gray-500">Architecture</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('digital-strategy-roadmaps')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                <Map className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Strategy</h5>
                                <p className="text-xs text-gray-500">Roadmaps</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('governance')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <Settings className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Governance</h5>
                                <p className="text-xs text-gray-500">Framework</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('cloud-advisory')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <Cloud className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Cloud</h5>
                                <p className="text-xs text-gray-500">Advisory</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('security-compliance')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Lock className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Security</h5>
                                <p className="text-xs text-gray-500">Compliance</p>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-start gap-3 hover-highlight magnetic-pull"
                    >
                      <div className="relative">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <div className="absolute -top-1 -right-1">
                          <NeuroLoader type="brain-wave" size="sm" color="#059669" speed="normal" />
                        </div>
                      </div>
                      <div className="w-full">
                        <h4 className="font-semibold text-gray-900">Training Services</h4>
                        <p className="text-sm text-gray-600">Expert-led training programs and certifications</p>

                        {/* Mobile service menu */}
                        <div className="lg:hidden mt-4 bg-gray-50 rounded-lg p-4 border">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleLeftNav('full-stack-developer')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                <Code className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Full-Stack</h5>
                                <p className="text-xs text-gray-500">Developer</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('devops-engineer')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <Settings className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">DevOps</h5>
                                <p className="text-xs text-gray-500">Engineer</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('cloud-architect')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                <Cloud className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Cloud</h5>
                                <p className="text-xs text-gray-500">Architect</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('ai-ml-engineer')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 gradient-border gradient-border-hover"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">AI/ML</h5>
                                <p className="text-xs text-gray-500">Engineer</p>
                              </div>
                            </button>

                            <button
                              onClick={() => handleLeftNav('certifications')}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-purple-50 border col-span-2"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-4 h-4 text-white" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-gray-900 underline-reveal-text">Professional Certifications</h5>
                                <p className="text-xs text-gray-500">Industry-recognized credentials</p>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="hologram-button px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-realistic transition-all relative group overflow-hidden">
                      <span className="hologram-text" data-text="Explore Our Services">Explore Our Services</span>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <NeuroLoader type="neuron-fire" size="sm" color="#FFFFFF" speed="fast" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Morphing Image Content - 70% */}
                <div className="lg:col-span-7">
                  <TiltCard intensity="medium" className="w-full">
                    <div className="hologram-video relative rounded-3xl overflow-hidden shadow-realistic-xl bg-white card-3d-shadow gradient-border gradient-border-hover aspect-video">
                      <video
                        className="w-full h-full object-contain aspect-video"
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        poster="/services-poster.jpg"
                      >
                        <source src="/services.mp4" type="video/mp4" />
                        <div className="w-full h-96 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-semibold">
                          Services Video Placeholder
                        </div>
                      </video>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
            </GeometricAccent>
          </section>

          {/* Spacer between Services and Portfolio */}
          <div className="h-10 bg-gradient-to-b from-white to-gray-50"></div>

          {/* Our Portfolio Section */}
          <section id="our-portfolio" className="pt-48 pb-24 bg-gray-50 relative overflow-hidden" style={{marginTop: '2.4rem', marginBottom: '1.2rem'}}>
            <GeometricAccent
              shapes={[
                { type: 'liquid-drop', size: 'lg', color: 'rgba(168, 85, 247, 0.18)', position: 'top-right', animate: true },
                { type: 'neural-network', size: 'xl', color: 'rgba(59, 130, 246, 0.15)', position: 'bottom-left', animate: true },
                { type: 'bio-membrane', size: 'xl', color: 'rgba(99, 102, 241, 0.12)', position: 'center', animate: true },
                { type: 'organic-spiral', size: 'lg', color: 'rgba(147, 51, 234, 0.14)', position: 'top-left', animate: true },
                { type: 'flowing-wave', size: 'md', color: 'rgba(99, 102, 241, 0.16)', position: 'bottom-right', animate: true }
              ]}
            >
              {/* Parametric Light Effects for Portfolio */}
              <div className="absolute top-12 left-12">
                <ParametricLight type="helix" size="lg" color="#A855F7" speed="normal" intensity="bright" glow={true} trail={true} />
              </div>
              <div className="absolute bottom-12 right-12">
                <ParametricLight type="butterfly" size="md" color="#3B82F6" speed="fast" intensity="medium" glow={true} />
              </div>
              <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
                <ParametricLight type="orbit" size="sm" color="#6366F1" speed="slow" intensity="subtle" glow={true} />
              </div>

              {/* Data Sculpture Effects for Portfolio */}
              <div className="absolute top-8 left-8">
                <DataSculpture type="sphere" size="md" color="#A855F7" speed="fast" intensity="bright" wireframe={true} particles={true} />
              </div>
              <div className="absolute bottom-8 left-1/4">
                <DataSculpture type="pyramid" size="lg" color="#3B82F6" speed="normal" intensity="medium" wireframe={true} />
              </div>
              <div className="absolute top-1/3 right-8">
                <DataSculpture type="helix" size="sm" color="#6366F1" speed="slow" intensity="subtle" particles={true} />
              </div>
            <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
                {/* Text Content - 30% */}
                <div className="lg:col-span-3 space-y-6 scroll-animate fade-in-left">
                  <div>
                    <span className="text-purple-600 font-bold uppercase tracking-wider scroll-animate fade-in-up typewriter" style={{fontSize: '2.2rem'}}>Our Portfolio</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 scroll-animate fade-in-up" style={{fontSize: '1.75rem'}}>
                      <span className="highlight-reveal">Showcase of Excellence</span>
                    </h2>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed scroll-animate fade-in-up">
                    Explore our portfolio of successful digital transformations and innovative solutions across various industries.
                  </p>

                  <div className="space-y-4 scroll-animate fade-in-up-delay-1000">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <div className="absolute -top-1 -right-1">
                          <NeuroLoader type="synaptic" size="sm" color="#10B981" speed="slow" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Enterprise Solutions</h4>
                        <p className="text-sm text-gray-600">Large-scale applications for global organizations</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <div className="absolute -top-1 -right-1">
                          <NeuroLoader type="dendrite" size="sm" color="#059669" speed="normal" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Startup Innovations</h4>
                        <p className="text-sm text-gray-600">Cutting-edge solutions for emerging businesses</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <div className="absolute -top-1 -right-1">
                          <NeuroLoader type="neuron-fire" size="sm" color="#16A34A" speed="fast" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Digital Transformation</h4>
                        <p className="text-sm text-gray-600">Complete modernization of legacy systems</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Video Content - 70% */}
                <div className="lg:col-span-7 scroll-animate fade-in-right">
                  <TiltCard intensity="medium" className="w-full">
                    <div className="hologram-video hologram-border relative rounded-3xl overflow-hidden shadow-realistic-xl bg-white card-3d-shadow gradient-border gradient-border-hover">
                      <video
                        className="w-full h-full object-contain aspect-video"
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        poster="/portfolio-poster.jpg"
                      >
                        <source src="/portfolio.mp4" type="video/mp4" />
                        <div className="w-full h-96 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-semibold">
                          Portfolio Video Placeholder
                        </div>
                      </video>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
            </GeometricAccent>
          </section>

          {/* Spacer between Portfolio and Case Studies */}
          <div className="h-10 bg-gray-50"></div>

          {/* Interactive Case Study Galleries Section */}
          <section id="case-studies" className="pt-48 pb-24 bg-gray-50 relative overflow-hidden" style={{marginTop: '2.4rem', marginBottom: '1.2rem'}}>
            <GeometricAccent
              shapes={[
                { type: 'coral-branch', size: 'lg', color: 'rgba(168, 85, 247, 0.18)', position: 'top-left', animate: true },
                { type: 'organic-blob', size: 'md', color: 'rgba(59, 130, 246, 0.15)', position: 'bottom-right', animate: true },
                { type: 'cell-structure', size: 'xl', color: 'rgba(147, 51, 234, 0.12)', position: 'center', animate: true }
              ]}
            >
            <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
              <div className="text-center mb-16">
                <span className="text-purple-600 font-bold uppercase tracking-wider scroll-animate fade-in-up typewriter" style={{fontSize: '2.2rem'}}>Resources</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 scroll-animate fade-in-up" style={{fontSize: '1.75rem'}}>
                  <span className="highlight-reveal">Interactive Case Studies</span>
                </h2>
              </div>
              <InteractiveCaseStudy caseStudies={[
                {
                  id: 'ecommerce-redesign',
                  title: 'E-commerce Platform Redesign',
                  client: 'TechStore Plus',
                  category: 'Web Design',
                  summary: 'Complete UI/UX overhaul resulting in 40% increase in conversions',
                  beforeImage: '/portfolio/ecommerce-before.jpg',
                  afterImage: '/portfolio/ecommerce-after.jpg',
                  steps: [
                    {
                      title: 'Research & Analysis',
                      description: 'Conducted user research and competitive analysis to identify pain points',
                      metrics: [
                        { label: 'User Interviews', value: '24', color: 'text-blue-600' },
                        { label: 'Competitors Analyzed', value: '8', color: 'text-green-600' },
                        { label: 'Pain Points Identified', value: '12', color: 'text-red-600' }
                      ]
                    },
                    {
                      title: 'Design System Creation',
                      description: 'Built a comprehensive design system with reusable components',
                      metrics: [
                        { label: 'Components Created', value: '45', color: 'text-purple-600' },
                        { label: 'Color Variations', value: '18', color: 'text-indigo-600' },
                        { label: 'Typography Scales', value: '6', color: 'text-pink-600' }
                      ]
                    },
                    {
                      title: 'Implementation & Testing',
                      description: 'Developed responsive interface with extensive A/B testing',
                      metrics: [
                        { label: 'Pages Redesigned', value: '23', color: 'text-orange-600' },
                        { label: 'A/B Tests Run', value: '15', color: 'text-cyan-600' },
                        { label: 'Performance Score', value: '94', color: 'text-green-600' }
                      ]
                    }
                  ],
                  results: [
                    { metric: 'Conversion Rate', value: '+40%', improvement: '2.1% to 2.9%' },
                    { metric: 'Page Load Speed', value: '+65%', improvement: '4.2s to 1.5s' },
                    { metric: 'User Satisfaction', value: '+85%', improvement: '3.2/5 to 4.7/5' }
                  ]
                },
                {
                  id: 'mobile-app-development',
                  title: 'Mobile App Development',
                  client: 'FitTrack Pro',
                  category: 'Mobile',
                  summary: 'Custom fitness tracking app with real-time analytics',
                  beforeImage: '/portfolio/mobile-before.jpg',
                  afterImage: '/portfolio/mobile-after.jpg',
                  steps: [
                    {
                      title: 'Requirements Gathering',
                      description: 'Defined feature set and technical requirements with stakeholders',
                      metrics: [
                        { label: 'Features Defined', value: '32', color: 'text-blue-600' },
                        { label: 'User Stories', value: '68', color: 'text-green-600' },
                        { label: 'Technical Specs', value: '15', color: 'text-purple-600' }
                      ]
                    },
                    {
                      title: 'Development & Integration',
                      description: 'Built native iOS/Android apps with cloud synchronization',
                      metrics: [
                        { label: 'API Endpoints', value: '28', color: 'text-orange-600' },
                        { label: 'Database Tables', value: '12', color: 'text-cyan-600' },
                        { label: 'Third-party Integrations', value: '7', color: 'text-pink-600' }
                      ]
                    },
                    {
                      title: 'Launch & Optimization',
                      description: 'App store deployment with continuous performance monitoring',
                      metrics: [
                        { label: 'Beta Testers', value: '150', color: 'text-indigo-600' },
                        { label: 'Bug Fixes', value: '23', color: 'text-red-600' },
                        { label: 'Performance Optimizations', value: '8', color: 'text-green-600' }
                      ]
                    }
                  ],
                  results: [
                    { metric: 'App Store Rating', value: '4.8/5', improvement: 'New launch' },
                    { metric: 'Daily Active Users', value: '12K+', improvement: 'Month 1' },
                    { metric: 'User Retention', value: '78%', improvement: '30-day retention' }
                  ]
                },
                {
                  id: 'enterprise-dashboard',
                  title: 'Enterprise Analytics Dashboard',
                  client: 'DataCorp Solutions',
                  category: 'Web App',
                  summary: 'Real-time business intelligence platform with advanced visualizations',
                  beforeImage: '/portfolio/dashboard-before.jpg',
                  afterImage: '/portfolio/dashboard-after.jpg',
                  steps: [
                    {
                      title: 'Data Architecture Design',
                      description: 'Designed scalable data pipeline and storage solution',
                      metrics: [
                        { label: 'Data Sources', value: '18', color: 'text-blue-600' },
                        { label: 'Processing Speed', value: '10x', color: 'text-green-600' },
                        { label: 'Storage Efficiency', value: '60%', color: 'text-purple-600' }
                      ]
                    },
                    {
                      title: 'Dashboard Development',
                      description: 'Built interactive charts and real-time monitoring tools',
                      metrics: [
                        { label: 'Chart Types', value: '15', color: 'text-orange-600' },
                        { label: 'Real-time Metrics', value: '45', color: 'text-cyan-600' },
                        { label: 'Custom Widgets', value: '22', color: 'text-pink-600' }
                      ]
                    },
                    {
                      title: 'Security & Deployment',
                      description: 'Enterprise-grade security implementation and cloud deployment',
                      metrics: [
                        { label: 'Security Audits', value: '3', color: 'text-red-600' },
                        { label: 'Compliance Standards', value: '5', color: 'text-indigo-600' },
                        { label: 'Uptime SLA', value: '99.9%', color: 'text-green-600' }
                      ]
                    }
                  ],
                  results: [
                    { metric: 'Data Processing Time', value: '-80%', improvement: '2 hours to 24 minutes' },
                    { metric: 'Decision Making Speed', value: '+120%', improvement: 'Real-time insights' },
                    { metric: 'Operational Efficiency', value: '+45%', improvement: 'Automated reporting' }
                  ]
                }
              ]} />
            </div>
            </GeometricAccent>
          </section>

          {/* Why BitMonkey Section */}
          <section id="why-bitmonkey" className="pt-32 pb-24 bg-white relative overflow-hidden" style={{marginTop: '4rem'}}>
            {/* Parametric Light Effects for Why BitMonkey */}
            <div className="absolute top-8 left-8">
              <ParametricLight type="wave" size="lg" color="#8B5CF6" speed="slow" intensity="medium" glow={true} />
            </div>
            <div className="absolute bottom-8 right-8">
              <ParametricLight type="spiral" size="md" color="#6366F1" speed="normal" intensity="bright" glow={true} trail={true} />
            </div>

            {/* Data Sculpture Effects for Why BitMonkey */}
            <div className="absolute top-1/3 left-1/4">
              <DataSculpture type="cube" size="lg" color="#8B5CF6" speed="slow" intensity="medium" wireframe={true} particles={true} />
            </div>
            <div className="absolute bottom-1/3 right-1/4">
              <DataSculpture type="sphere" size="md" color="#6366F1" speed="normal" intensity="bright" wireframe={true} />
            </div>
            <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
                {/* Text Content - 30% */}
                <div className="lg:col-span-3 space-y-6 scroll-animate fade-in-left">
                  <div>
                    <span className="text-purple-600 font-bold uppercase tracking-wider scroll-animate fade-in-up typewriter" style={{fontSize: '2.2rem'}}>Why Choose Us</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 scroll-animate fade-in-up" style={{fontSize: '1.75rem'}}>
                      <span className="highlight-reveal">Why BitMonkey?</span>
                    </h2>
                  </div>

                  <div className="space-y-4 scroll-animate fade-in-up-delay-1000">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Customer-Centric & Data-Driven</h4>
                        <p className="text-sm text-gray-600">Next-gen tech stack for rapid outcomes</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">API-First Architecture</h4>
                        <p className="text-sm text-gray-600">Microservices/serverless for scalability</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Multi/Hybrid-Cloud Ready</h4>
                        <p className="text-sm text-gray-600">Reliable scaling across cloud environments</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Automation-First DevSecOps</h4>
                        <p className="text-sm text-gray-600">Automated pipelines with built-in security</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Security & Quality Built-In</h4>
                        <p className="text-sm text-gray-600">Day-one security with governance frameworks</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Center of Excellence (COE)</h4>
                        <p className="text-sm text-gray-600">Tools, accelerators, and best practices</p>
                      </div>
                    </div>
                  </div>

                  {/* Neural Processing Indicator */}
                  <div className="flex items-center justify-center mb-4 pt-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <NeuroLoader type="brain-wave" size="sm" color="#6B7280" speed="normal" />
                      <span>Processing Analytics...</span>
                      <NeuroLoader type="neural-network" size="sm" color="#6B7280" speed="fast" />
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4 scroll-animate fade-in-up-delay-1200">
                    <AnimatedCounter
                      value={500}
                      suffix="+"
                      label="Projects Completed"
                      color="text-purple-600"
                      bgGradient="bg-gradient-to-br from-purple-50 to-pink-50"
                      duration={2500}
                    />
                    <AnimatedCounter
                      value={95}
                      suffix="%"
                      label="Client Satisfaction"
                      color="text-blue-600"
                      bgGradient="bg-gradient-to-br from-blue-50 to-indigo-50"
                      showProgress={true}
                      progressMax={100}
                      duration={2000}
                    />
                    <AnimatedCounter
                      value={15}
                      suffix="+"
                      label="Years Experience"
                      color="text-green-600"
                      bgGradient="bg-gradient-to-br from-green-50 to-teal-50"
                      duration={1800}
                    />
                    <AnimatedCounter
                      value={24}
                      suffix="/7"
                      label="Support Available"
                      color="text-orange-600"
                      bgGradient="bg-gradient-to-br from-orange-50 to-red-50"
                      duration={1500}
                    />
                  </div>

                </div>

                {/* Video Content - 70% */}
                <div className="lg:col-span-7">
                  <TiltCard intensity="medium" className="w-full">
                    <div className="hologram-video cyber-glow relative rounded-3xl overflow-hidden shadow-realistic-xl bg-white card-3d-shadow gradient-border gradient-border-hover">
                      <video
                        className="w-full h-full object-contain aspect-video"
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        poster="/why-bitmonkey-poster.jpg"
                      >
                        <source src="/why-bitmonkey.mp4" type="video/mp4" />
                        <div className="w-full h-96 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-semibold">
                          Why BitMonkey Video Placeholder
                        </div>
                      </video>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
          </section>

          {/* UI Innovation Showcase Section */}
          <section id="ui-showcase" className="pt-32 pb-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden" style={{marginTop: '4rem'}}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-blue-100/50"></div>

            {/* Parametric Light Effects */}
            <div className="absolute top-12 left-12">
              <ParametricLight type="helix" size="xl" color="#8B5CF6" speed="slow" intensity="bright" glow={true} trail={true} />
            </div>
            <div className="absolute bottom-12 right-12">
              <ParametricLight type="spiral" size="lg" color="#06B6D4" speed="normal" intensity="medium" glow={true} />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
              <div className="text-center mb-16">
                <span className="text-purple-600 font-bold uppercase tracking-wider scroll-animate fade-in-up typewriter" style={{fontSize: '2.2rem'}}>UI Innovation</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 scroll-animate fade-in-up" style={{fontSize: '1.75rem'}}>
                  <span className="highlight-reveal">Floating Interface Showcase</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto scroll-animate fade-in-up-delay-500">
                  Experience cutting-edge UI components with 3D depth, glass morphism effects, and intelligent positioning.
                  These floating panels demonstrate advanced interface design capabilities.
                </p>
              </div>

              {/* Showcase Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                {/* Description Side */}
                <div className="space-y-6 scroll-animate fade-in-left">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Glass Morphism Design</h4>
                        <p className="text-sm text-gray-600">Advanced backdrop-filter effects with gradient overlays creating premium depth perception</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Intelligent Positioning</h4>
                        <p className="text-sm text-gray-600">Smart viewport detection with responsive breakpoints and auto-positioning algorithms</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Interactive Animations</h4>
                        <p className="text-sm text-gray-600">Floating motion, hover effects, and parallax movement with performance optimization</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Strategic Content</h4>
                        <p className="text-sm text-gray-600">Live metrics, system status, tech stack indicators, and engagement prompts</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="text-sm text-gray-500 italic">
                      Move your cursor around the panels to experience magnetic attraction and interactive effects
                    </div>
                  </div>
                </div>

                {/* Interactive Demo Area */}
                <div className="relative min-h-[500px] scroll-animate fade-in-right">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-100/80 rounded-3xl border border-gray-200 backdrop-blur-sm"></div>

                  {/* Floating UI Panels - Moved from global positioning to this section */}

                  {/* Status Panel - Top Right of Demo Area */}
                  <MagneticEffect strength={0.4} range={120}>
                    <FloatingUIPanel
                      position={{ top: 20, right: 20 }}
                      width={240}
                      height={110}
                      zIndex={20}
                      delayMs={800}
                      glassEffect={true}
                      shadowIntensity="medium"
                      animation={{ float: true, hover: true, parallax: false, intensity: 'subtle' }}
                    >
                      <div className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-gray-700">System Status</span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Performance</span>
                            <span className="text-green-600 font-medium">Optimal</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Availability</span>
                            <span className="text-green-600 font-medium">99.9%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Response</span>
                            <span className="text-green-600 font-medium">&lt;200ms</span>
                          </div>
                        </div>
                      </div>
                    </FloatingUIPanel>
                  </MagneticEffect>

                  {/* Quick Stats Panel - Top Left of Demo Area */}
                  <MagneticEffect strength={0.5} range={140}>
                    <FloatingUIPanel
                      position={{ top: 20, left: 20 }}
                      width={220}
                      height={130}
                      zIndex={20}
                      delayMs={1200}
                      glassEffect={true}
                      shadowIntensity="medium"
                      animation={{ float: true, hover: true, parallax: false, intensity: 'medium' }}
                    >
                      <div className="p-3">
                        <h3 className="text-xs font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-3 h-3 text-purple-600" />
                          Live Metrics
                        </h3>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between items-center">
                            <span>Projects</span>
                            <span className="font-bold text-purple-600">500+</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Satisfaction</span>
                            <span className="font-bold text-green-600">98%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Technologies</span>
                            <span className="font-bold text-blue-600">50+</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-1 rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>
                      </div>
                    </FloatingUIPanel>
                  </MagneticEffect>

                  {/* Tech Stack Indicator - Bottom Right of Demo Area */}
                  <MagneticEffect strength={0.3} range={100}>
                    <FloatingUIPanel
                      position={{ bottom: 20, right: 20 }}
                      width={180}
                      height={90}
                      zIndex={20}
                      delayMs={1600}
                      glassEffect={true}
                      shadowIntensity="light"
                      animation={{ float: true, hover: true, parallax: true, intensity: 'subtle' }}
                    >
                      <div className="p-3">
                        <div className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          Active Stack
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">React</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Node.js</span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">AWS</span>
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">Docker</span>
                        </div>
                      </div>
                    </FloatingUIPanel>
                  </MagneticEffect>

                  {/* Notification Panel - Bottom Left of Demo Area */}
                  <MagneticEffect strength={0.4} range={110}>
                    <FloatingUIPanel
                      position={{ bottom: 20, left: 20 }}
                      width={200}
                      height={70}
                      zIndex={15}
                      delayMs={2000}
                      glassEffect={true}
                      shadowIntensity="medium"
                      animation={{ float: true, hover: true, parallax: false, intensity: 'medium' }}
                    >
                      <div className="p-2 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-800">Ready to Connect</div>
                          <div className="text-xs text-gray-600">Let&apos;s build together</div>
                        </div>
                      </div>
                    </FloatingUIPanel>
                  </MagneticEffect>

                  {/* Center Info Panel - Appears on hover */}
                  <MagneticEffect strength={0.6} range={160}>
                    <FloatingUIPanel
                      position={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                      width={160}
                      height={60}
                      zIndex={25}
                      delayMs={2400}
                      glassEffect={true}
                      shadowIntensity="heavy"
                      animation={{ float: true, hover: true, parallax: true, intensity: 'strong' }}
                    >
                      <div className="p-3 text-center">
                        <div className="text-xs font-semibold text-gray-800 mb-1">UI Innovation</div>
                        <div className="text-xs text-gray-600">Magnetic & Interactive</div>
                      </div>
                    </FloatingUIPanel>
                  </MagneticEffect>
                </div>
              </div>

              {/* Liquid Buttons Showcase */}
              <div className="text-center mb-16 scroll-animate fade-in-up">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Interactive Button Effects</h3>
                <p className="text-gray-600 mb-8">Experience magnetic liquid button interactions with ripple, mercury, and morphing effects that respond to your cursor</p>

                {/* Button Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Ripple Effect Button */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-realistic shadow-transition">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Ripple Effect</h4>
                    <MagneticEffect strength={0.4} range={100}>
                      <LiquidButton
                        variant="primary"
                        size="md"
                        liquidEffect="ripple"
                        intensity="medium"
                        glowEffect={true}
                        onClick={() => console.log('Ripple clicked!')}
                      >
                        Click for Ripples
                      </LiquidButton>
                    </MagneticEffect>
                    <p className="text-xs text-gray-500 mt-2">Magnetic liquid ripple animation</p>
                  </div>

                  {/* Mercury Effect Button */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-realistic shadow-transition">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Mercury Effect</h4>
                    <MagneticEffect strength={0.5} range={110}>
                      <LiquidButton
                        variant="accent"
                        size="md"
                        liquidEffect="mercury"
                        intensity="strong"
                        glowEffect={false}
                        onClick={() => console.log('Mercury clicked!')}
                      >
                        Liquid Mercury
                      </LiquidButton>
                    </MagneticEffect>
                    <p className="text-xs text-gray-500 mt-2">Magnetic mercury-like morphing</p>
                  </div>

                  {/* Blob Effect Button */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-realistic shadow-transition">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Blob Effect</h4>
                    <MagneticEffect strength={0.6} range={120}>
                      <LiquidButton
                        variant="gradient"
                        size="md"
                        liquidEffect="blob"
                        intensity="strong"
                        glowEffect={true}
                        onClick={() => console.log('Blob clicked!')}
                      >
                        Organic Blob
                      </LiquidButton>
                    </MagneticEffect>
                    <p className="text-xs text-gray-500 mt-2">Magnetic organic blob morphing</p>
                  </div>

                  {/* Wave Effect Button */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-realistic shadow-transition">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Wave Effect</h4>
                    <MagneticEffect strength={0.4} range={105}>
                      <LiquidButton
                        variant="secondary"
                        size="md"
                        liquidEffect="wave"
                        intensity="medium"
                        glowEffect={false}
                        onClick={() => console.log('Wave clicked!')}
                      >
                        Wave Motion
                      </LiquidButton>
                    </MagneticEffect>
                    <p className="text-xs text-gray-500 mt-2">Magnetic wave animation sweep</p>
                  </div>

                  {/* Deform Effect Button */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-realistic shadow-transition">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Deform Effect</h4>
                    <MagneticEffect strength={0.3} range={95}>
                      <LiquidButton
                        variant="primary"
                        size="md"
                        liquidEffect="deform"
                        intensity="subtle"
                        glowEffect={false}
                        onClick={() => console.log('Deform clicked!')}
                      >
                        Shape Deform
                      </LiquidButton>
                    </MagneticEffect>
                    <p className="text-xs text-gray-500 mt-2">Magnetic shape deformation</p>
                  </div>

                  {/* Ghost with Morph Effect Button */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-realistic shadow-transition">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Morph Effect</h4>
                    <MagneticEffect strength={0.45} range={115}>
                      <LiquidButton
                        variant="ghost"
                        size="md"
                        liquidEffect="morph"
                        intensity="medium"
                        glowEffect={false}
                        onClick={() => console.log('Morph clicked!')}
                      >
                        Border Morph
                      </LiquidButton>
                    </MagneticEffect>
                    <p className="text-xs text-gray-500 mt-2">Magnetic border morphing</p>
                  </div>
                </div>

                {/* CTA Section with Large Liquid Button */}
                <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-realistic-lg shadow-transition">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Ready to Experience Liquid Interactions?</h4>
                  <p className="text-gray-600 mb-6">Enhance your user interface with cutting-edge liquid button effects</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <MagneticEffect strength={0.7} range={150}>
                      <LiquidButton
                        variant="gradient"
                        size="xl"
                        liquidEffect="blob"
                        intensity="strong"
                        glowEffect={true}
                        onClick={() => console.log('Main CTA clicked!')}
                      >
                        Get Started Today
                      </LiquidButton>
                    </MagneticEffect>
                    <MagneticEffect strength={0.5} range={130}>
                      <LiquidButton
                        variant="ghost"
                        size="lg"
                        liquidEffect="ripple"
                        intensity="medium"
                        glowEffect={false}
                        onClick={() => console.log('Secondary CTA clicked!')}
                      >
                        Learn More
                      </LiquidButton>
                    </MagneticEffect>
                  </div>
                </div>
              </div>

              {/* Animated Charts Showcase */}
              <div className="mt-16 scroll-animate fade-in-up">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Data Visualization</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Beautifully animated charts that bring your data to life with smooth transitions and engaging visual effects</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Performance Metrics Bar Chart */}
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Performance Metrics</h4>
                    <AnimatedChart
                      type="bar"
                      data={[
                        { label: 'Speed', value: 95, color: 'text-blue-600' },
                        { label: 'Quality', value: 98, color: 'text-green-600' },
                        { label: 'UX', value: 92, color: 'text-purple-600' },
                        { label: 'SEO', value: 89, color: 'text-orange-600' }
                      ]}
                      width={300}
                      height={240}
                      className="mx-auto"
                    />
                  </div>

                  {/* Technology Stack Pie Chart */}
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Technology Distribution</h4>
                    <AnimatedChart
                      type="pie"
                      data={[
                        { label: 'React', value: 35, color: 'text-blue-600' },
                        { label: 'Node.js', value: 25, color: 'text-green-600' },
                        { label: 'TypeScript', value: 20, color: 'text-purple-600' },
                        { label: 'AWS', value: 20, color: 'text-orange-600' }
                      ]}
                      width={280}
                      height={220}
                      className="mx-auto"
                    />
                  </div>

                  {/* Growth Trends Line Chart */}
                  <div className="text-center md:col-span-2 lg:col-span-1">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Growth Trajectory</h4>
                    <AnimatedChart
                      type="line"
                      data={[
                        { label: 'Q1', value: 65, color: 'text-blue-600' },
                        { label: 'Q2', value: 78, color: 'text-green-600' },
                        { label: 'Q3', value: 85, color: 'text-purple-600' },
                        { label: 'Q4', value: 95, color: 'text-orange-600' }
                      ]}
                      width={280}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500 italic">Charts animate on scroll with staggered timing for enhanced visual impact</p>
                </div>
              </div>

              {/* Progress Rings Showcase */}
              <div className="mt-16 scroll-animate fade-in-up">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress Indicators</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Circular progress rings with smooth animations and customizable styling for tracking completion and performance metrics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Individual Progress Rings */}
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Project Completion</h4>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-realistic shadow-transition border border-white/20">
                      <ProgressRing
                        progress={87}
                        size={120}
                        color="#8B5CF6"
                        label="Complete"
                        subtitle="On Schedule"
                        glowEffect={true}
                        className="mx-auto"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Code Quality</h4>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-realistic shadow-transition border border-white/20">
                      <ProgressRing
                        progress={95}
                        size={120}
                        color="#10B981"
                        label="Excellent"
                        subtitle="Tests Passing"
                        glowEffect={true}
                        className="mx-auto"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Performance Score</h4>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-realistic shadow-transition border border-white/20">
                      <ProgressRing
                        progress={92}
                        size={120}
                        color="#F59E0B"
                        label="Optimized"
                        subtitle="Fast Loading"
                        glowEffect={true}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Progress Ring Groups */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ProgressRingGroup
                    title="Development Metrics"
                    description="Key performance indicators for project health"
                    size={90}
                    rings={[
                      { progress: 78, label: "Code Coverage", color: "#8B5CF6" },
                      { progress: 91, label: "Build Success", color: "#10B981" },
                      { progress: 85, label: "Deploy Rate", color: "#3B82F6" },
                      { progress: 88, label: "Uptime", color: "#F59E0B" }
                    ]}
                  />

                  <ProgressRingGroup
                    title="Team Performance"
                    description="Collaborative metrics and productivity indicators"
                    size={90}
                    rings={[
                      { progress: 94, label: "Satisfaction", color: "#06B6D4" },
                      { progress: 82, label: "Velocity", color: "#8B5CF6" },
                      { progress: 89, label: "Quality", color: "#10B981" },
                      { progress: 76, label: "Innovation", color: "#F59E0B" }
                    ]}
                  />
                </div>

                <div className="text-center mt-8">
                  <p className="text-sm text-gray-500 italic">Progress rings animate on scroll with smooth easing and glow effects</p>
                </div>
              </div>

              {/* Realistic Shadows Showcase */}
              <div className="mt-16 scroll-animate fade-in-up">
                <ShadowShowcase
                  title="Realistic Shadow Effects"
                  description="Advanced shadow systems with layered depth, color variations, and interactive hover states for authentic material design"
                  className="px-4"
                />
              </div>

              {/* Technical Details */}
              <div className="mt-16 text-center scroll-animate fade-in-up">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Implementation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-realistic shadow-transition">
                      <div className="text-purple-600 font-medium mb-2">React + TypeScript</div>
                      <p className="text-gray-600">Modern component architecture with full type safety</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-realistic shadow-transition">
                      <div className="text-blue-600 font-medium mb-2">CSS Transforms</div>
                      <p className="text-gray-600">Hardware-accelerated 3D effects and animations</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-realistic shadow-transition">
                      <div className="text-green-600 font-medium mb-2">Performance</div>
                      <p className="text-gray-600">RequestAnimationFrame with viewport optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </>
      ) : (
        <>
          {/* Context-specific sections - replace home content */}
          {/* Individual Development Service Pages */}
          {contextSlug === 'app-dev-modernization' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider typewriter" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4"><span className="highlight-reveal">App Development & Modernization</span></h2>
                  <p className="text-lg text-gray-600">Transform your business with modern application development and legacy system modernization</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Custom web application development with React, Angular, and Vue.js</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Enterprise backend solutions with Node.js, .NET, and Java</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cross-platform mobile app development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Legacy system migration and modernization</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />API development and integration</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Progressive Web Apps (PWAs)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Technologies We Use</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Frontend</h4>
                        <p className="text-sm text-gray-600">React, Angular, Vue.js, TypeScript, Next.js</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Backend</h4>
                        <p className="text-sm text-gray-600">Node.js, .NET Core, Java Spring, Python</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Mobile</h4>
                        <p className="text-sm text-gray-600">React Native, Flutter, Ionic</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Database</h4>
                        <p className="text-sm text-gray-600">MongoDB, PostgreSQL, MySQL, Redis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'cloud-engineering' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Cloud Engineering</h2>
                  <p className="text-lg text-gray-600">Build scalable, resilient cloud infrastructure and platform engineering solutions</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cloud architecture design and implementation</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Container orchestration with Kubernetes</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Serverless computing and microservices</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Infrastructure as Code (IaC)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Auto-scaling and load balancing</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cost optimization strategies</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Cloud Platforms</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">Amazon Web Services</h4>
                        <p className="text-sm text-gray-600">EC2, EKS, Lambda, S3, RDS, CloudFormation</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">Microsoft Azure</h4>
                        <p className="text-sm text-gray-600">AKS, Functions, Storage, SQL Database, ARM Templates</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">Google Cloud Platform</h4>
                        <p className="text-sm text-gray-600">GKE, Cloud Functions, Cloud Storage, BigQuery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'ai-ml-automation' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4"><span className="glitch" data-text="AI-ML & Automation">AI-ML & Automation</span></h2>
                  <p className="text-lg text-gray-600">Harness the power of artificial intelligence and machine learning for intelligent automation</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Custom machine learning model development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Intelligent process automation (RPA)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Natural language processing solutions</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Computer vision and image recognition</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Predictive analytics and forecasting</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />MLOps and model deployment</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">AI/ML Technologies</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Frameworks</h4>
                        <p className="text-sm text-gray-600">TensorFlow, PyTorch, Scikit-learn, OpenAI</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Languages</h4>
                        <p className="text-sm text-gray-600">Python, R, Julia, Scala</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Automation</h4>
                        <p className="text-sm text-gray-600">UiPath, Automation Anywhere, Power Automate</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Deployment</h4>
                        <p className="text-sm text-gray-600">MLflow, Kubeflow, Docker, Kubernetes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'data-analytics' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Data & Analytics</h2>
                  <p className="text-lg text-gray-600">Transform your data into actionable insights with advanced analytics and business intelligence</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Data warehouse design and implementation</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />ETL/ELT pipeline development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Business intelligence dashboards</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Real-time streaming analytics</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Data governance and quality</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Advanced analytics and reporting</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Data Technologies</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">Analytics</h4>
                        <p className="text-sm text-gray-600">Tableau, Power BI, Looker, QlikView</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">Big Data</h4>
                        <p className="text-sm text-gray-600">Hadoop, Spark, Kafka, Elasticsearch</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">Databases</h4>
                        <p className="text-sm text-gray-600">PostgreSQL, MongoDB, Snowflake, BigQuery</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">Processing</h4>
                        <p className="text-sm text-gray-600">Apache Airflow, dbt, Fivetran, Stitch</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'devsecops' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">DevSecOps</h2>
                  <p className="text-lg text-gray-600">Integrate security into every stage of your development lifecycle</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Secure CI/CD pipeline implementation</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Automated security testing and scanning</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Container security and compliance</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Infrastructure security automation</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Security monitoring and alerting</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Compliance automation (SOX, HIPAA, PCI)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Security Tools</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">SAST/DAST</h4>
                        <p className="text-sm text-gray-600">SonarQube, Checkmarx, Veracode, OWASP ZAP</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">Container</h4>
                        <p className="text-sm text-gray-600">Twistlock, Aqua, Falco, OPA Gatekeeper</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">Infrastructure</h4>
                        <p className="text-sm text-gray-600">Terraform, Ansible, Chef, CloudFormation</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">Monitoring</h4>
                        <p className="text-sm text-gray-600">Splunk, ELK Stack, Prometheus, Grafana</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'quality-assurance' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Quality Assurance</h2>
                  <p className="text-lg text-gray-600">Ensure software quality with comprehensive testing strategies and automation</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Test automation framework development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Performance and load testing</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />API and integration testing</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Mobile app testing (iOS/Android)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Security and penetration testing</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />User acceptance testing coordination</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Testing Tools</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">Automation</h4>
                        <p className="text-sm text-gray-600">Selenium, Cypress, Playwright, Appium</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">Performance</h4>
                        <p className="text-sm text-gray-600">JMeter, K6, LoadRunner, Gatling</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">API Testing</h4>
                        <p className="text-sm text-gray-600">Postman, REST Assured, SoapUI</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">Management</h4>
                        <p className="text-sm text-gray-600">TestRail, Jira, Azure DevOps, Allure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'sre-operations' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">SRE & Operations</h2>
                  <p className="text-lg text-gray-600">Ensure system reliability, performance, and operational excellence</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Site reliability engineering practices</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />24/7 system monitoring and alerting</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Incident response and resolution</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Performance optimization and tuning</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Capacity planning and scaling</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Disaster recovery and business continuity</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Operations Tools</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Monitoring</h4>
                        <p className="text-sm text-gray-600">Prometheus, Grafana, Datadog, New Relic</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Logging</h4>
                        <p className="text-sm text-gray-600">ELK Stack, Fluentd, Splunk, Loki</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Incident</h4>
                        <p className="text-sm text-gray-600">PagerDuty, Opsgenie, VictorOps</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Automation</h4>
                        <p className="text-sm text-gray-600">Ansible, Puppet, Chef, Terraform</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'center-of-excellence' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Center Of Excellence</h2>
                  <p className="text-lg text-gray-600">Accelerate innovation with our comprehensive COE framework, tools, and best practices</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Standardized development frameworks and accelerators</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Reusable component libraries and design systems</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Best practice documentation and knowledge sharing</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Automated code quality and security standards</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cross-team collaboration and mentoring programs</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Innovation labs and proof-of-concept development</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">COE Components</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Frameworks</h4>
                        <p className="text-sm text-gray-600">Standardized development, testing, and deployment frameworks</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Accelerators</h4>
                        <p className="text-sm text-gray-600">Pre-built solutions, templates, and starter kits</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Tools</h4>
                        <p className="text-sm text-gray-600">Automated testing, deployment, and monitoring tools</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Standards</h4>
                        <p className="text-sm text-gray-600">Coding standards, security guidelines, and best practices</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Knowledge Base</h4>
                        <p className="text-sm text-gray-600">Documentation, tutorials, and training materials</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Innovation</h4>
                        <p className="text-sm text-gray-600">Research labs, POCs, and emerging technology adoption</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white p-8 rounded-2xl shadow-realistic mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">COE Benefits</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                        <TrendingUp className="w-8 h-8" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Faster Delivery</h4>
                      <p className="text-sm text-gray-600">Reduce development time by 40-60% with reusable components</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                        <Award className="w-8 h-8" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Higher Quality</h4>
                      <p className="text-sm text-gray-600">Consistent quality through standardized practices and tools</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                        <Users className="w-8 h-8" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Knowledge Sharing</h4>
                      <p className="text-sm text-gray-600">Cross-team collaboration and continuous learning culture</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'development-services' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16 scroll-animate fade-in-up">
                  <span className="text-purple-600 font-bold uppercase tracking-wider scroll-animate fade-in-up" style={{fontSize: '2.2rem'}}>Our Capabilities</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4 scroll-animate fade-in-up">Development Services Portfolio</h2>
                  <p className="text-lg text-gray-600 scroll-animate fade-in-up">Comprehensive development solutions across modern technology stacks</p>
                </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* App Dev & Modernization */}
                <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1000" style={{paddingLeft: '2.5rem'}}>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">App Dev & Modernization</h3>
                  <p className="text-gray-600 mb-4">Modern application development and legacy system modernization</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• React/Angular/Vue.js</li>
                    <li>• Node.js/.NET/Java</li>
                    <li>• Mobile App Development</li>
                    <li>• Legacy Migration</li>
                  </ul>
                </div>

                {/* Cloud Engineering */}
                <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1200" style={{paddingLeft: '2.5rem'}}>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Cloud Engineering</h3>
                  <p className="text-gray-600 mb-4">Scalable cloud infrastructure and platform engineering</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• AWS/Azure/GCP</li>
                    <li>• Kubernetes/Docker</li>
                    <li>• Serverless Architecture</li>
                    <li>• Infrastructure as Code</li>
                  </ul>
                </div>

                {/* AI-ML & Automation */}
                <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1400" style={{paddingLeft: '2.5rem'}}>
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-yellow-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI-ML & Automation</h3>
                  <p className="text-gray-600 mb-4">Intelligent automation and machine learning solutions</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Machine Learning Models</li>
                    <li>• Process Automation</li>
                    <li>• AI Integration</li>
                    <li>• Predictive Analytics</li>
                  </ul>
                </div>

                {/* Data & Analytics */}
                <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1600" style={{paddingLeft: '2.5rem'}}>
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Data & Analytics</h3>
                  <p className="text-gray-600 mb-4">Advanced data engineering and business intelligence</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Data Warehousing</li>
                    <li>• ETL/ELT Pipelines</li>
                    <li>• Business Intelligence</li>
                    <li>• Real-time Analytics</li>
                  </ul>
                </div>

                {/* DevSecOps & SRE */}
                <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1800" style={{paddingLeft: '2.5rem'}}>
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">DevSecOps & SRE</h3>
                  <p className="text-gray-600 mb-4">Secure development, deployment, and site reliability engineering</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• CI/CD Pipelines</li>
                    <li>• Security Scanning</li>
                    <li>• System Monitoring</li>
                    <li>• Incident Response</li>
                    <li>• Performance Optimization</li>
                    <li>• Capacity Planning</li>
                  </ul>
                </div>

                {/* Quality Assurance */}
                <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-2000" style={{paddingLeft: '2.5rem'}}>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
                  <p className="text-gray-600 mb-4">Comprehensive testing and quality assurance</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Automated Testing</li>
                    <li>• Performance Testing</li>
                    <li>• Security Testing</li>
                    <li>• User Acceptance Testing</li>
                  </ul>
                </div>

                </div>
              </div>
            </section>
          )}

          {contextSlug === 'consulting-services' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16 scroll-animate fade-in-up">
                  <span className="text-purple-600 font-bold uppercase tracking-wider scroll-animate fade-in-up" style={{fontSize: '2.2rem'}}>Our Capabilities</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4 scroll-animate fade-in-up">Consulting Services Portfolio</h2>
                  <p className="text-lg text-gray-600 scroll-animate fade-in-up">Strategic guidance for digital transformation and business innovation</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Digital Transformation */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1000" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Digital Transformation</h3>
                    <p className="text-gray-600 mb-4">End-to-end transformation strategy and execution</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Transformation Roadmaps</li>
                      <li>• Change Management</li>
                      <li>• Process Optimization</li>
                      <li>• Technology Adoption</li>
                    </ul>
                  </div>

                  {/* Enterprise Architecture */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1200" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Enterprise Architecture</h3>
                    <p className="text-gray-600 mb-4">Scalable and sustainable system architecture design</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• System Design</li>
                      <li>• Integration Strategy</li>
                      <li>• Scalability Planning</li>
                      <li>• Technology Standards</li>
                    </ul>
                  </div>

                  {/* Digital Strategy & Roadmaps */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1400" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-yellow-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Digital Strategy & Roadmaps</h3>
                    <p className="text-gray-600 mb-4">Strategic planning and implementation roadmaps</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Strategic Planning</li>
                      <li>• Technology Roadmaps</li>
                      <li>• Investment Planning</li>
                      <li>• ROI Analysis</li>
                    </ul>
                  </div>

                  {/* Governance */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1600" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Governance</h3>
                    <p className="text-gray-600 mb-4">IT governance and compliance frameworks</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• IT Governance</li>
                      <li>• Risk Management</li>
                      <li>• Compliance Frameworks</li>
                      <li>• Policy Development</li>
                    </ul>
                  </div>

                  {/* Cloud Advisory */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Cloud className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Cloud Advisory</h3>
                    <p className="text-gray-600 mb-4">Cloud strategy and migration consulting</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Cloud Strategy</li>
                      <li>• Migration Planning</li>
                      <li>• Cost Optimization</li>
                      <li>• Vendor Selection</li>
                    </ul>
                  </div>

                  {/* Security & Compliance */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Security & Compliance</h3>
                    <p className="text-gray-600 mb-4">Comprehensive security strategy and compliance</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Security Assessment</li>
                      <li>• Compliance Audits</li>
                      <li>• Risk Assessment</li>
                      <li>• Security Frameworks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Individual Consulting Service Pages */}
          {contextSlug === 'digital-transformation' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Digital Transformation</h2>
                  <p className="text-lg text-gray-600">Lead your organization through comprehensive digital transformation initiatives</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Digital transformation roadmap development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Change management and cultural transformation</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Process optimization and automation</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Technology adoption strategies</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Digital capabilities assessment</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />ROI measurement and success metrics</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Transformation Areas</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Customer Experience</h4>
                        <p className="text-sm text-gray-600">Digital channels, personalization, omnichannel strategies</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Operations</h4>
                        <p className="text-sm text-gray-600">Process automation, workflow optimization, efficiency gains</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Business Model</h4>
                        <p className="text-sm text-gray-600">New revenue streams, digital products, platform strategies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'enterprise-architecture' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Enterprise Architecture</h2>
                  <p className="text-lg text-gray-600">Design scalable, future-ready enterprise architecture solutions</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Enterprise architecture design and planning</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />System integration strategy and execution</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Application portfolio optimization</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Technology standards and governance</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Scalability and performance planning</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Legacy system modernization strategy</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Architecture Frameworks</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">TOGAF</h4>
                        <p className="text-sm text-gray-600">Enterprise architecture framework</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">Zachman</h4>
                        <p className="text-sm text-gray-600">Architecture modeling framework</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">DoDAF</h4>
                        <p className="text-sm text-gray-600">Department of Defense framework</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">SABSA</h4>
                        <p className="text-sm text-gray-600">Security architecture methodology</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'digital-strategy-roadmaps' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Digital Strategy & Roadmaps</h2>
                  <p className="text-lg text-gray-600">Develop comprehensive digital strategies and implementation roadmaps</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Digital strategy formulation and planning</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Technology roadmap development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Investment prioritization and planning</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Market analysis and competitive intelligence</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />ROI analysis and business case development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Implementation milestone planning</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Strategic Focus Areas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Innovation</h4>
                        <p className="text-sm text-gray-600">Emerging technologies, R&D planning</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Growth</h4>
                        <p className="text-sm text-gray-600">Market expansion, new capabilities</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Efficiency</h4>
                        <p className="text-sm text-gray-600">Cost optimization, process improvement</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Risk</h4>
                        <p className="text-sm text-gray-600">Risk mitigation, compliance planning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'governance' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Governance</h2>
                  <p className="text-lg text-gray-600">Establish robust IT governance and compliance frameworks</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />IT governance framework design</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Risk management and assessment</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Compliance framework development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Policy and procedure development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Audit and assurance programs</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Decision-making governance structures</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Governance Standards</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">COBIT</h4>
                        <p className="text-sm text-gray-600">IT management and governance</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">ITIL</h4>
                        <p className="text-sm text-gray-600">IT service management</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">ISO 27001</h4>
                        <p className="text-sm text-gray-600">Information security management</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">SOX</h4>
                        <p className="text-sm text-gray-600">Financial compliance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'cloud-advisory' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Cloud Advisory</h2>
                  <p className="text-lg text-gray-600">Strategic cloud consulting and migration advisory services</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cloud strategy development and planning</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cloud migration assessment and roadmap</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Multi-cloud and hybrid cloud strategies</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cloud cost optimization and FinOps</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Vendor selection and negotiation support</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cloud governance and security frameworks</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Cloud Platforms</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">AWS Advisory</h4>
                        <p className="text-sm text-gray-600">Architecture, migration, cost optimization</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">Azure Advisory</h4>
                        <p className="text-sm text-gray-600">Strategy, implementation, hybrid solutions</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">Google Cloud Advisory</h4>
                        <p className="text-sm text-gray-600">Data analytics, AI/ML, infrastructure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'security-compliance' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Expertise</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Security & Compliance</h2>
                  <p className="text-lg text-gray-600">Comprehensive security strategy and regulatory compliance consulting</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Security assessment and gap analysis</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Compliance framework implementation</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Risk assessment and mitigation strategies</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Security architecture design</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Incident response planning</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Security awareness and training programs</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Compliance Standards</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">SOX</h4>
                        <p className="text-sm text-gray-600">Sarbanes-Oxley compliance</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">HIPAA</h4>
                        <p className="text-sm text-gray-600">Healthcare data protection</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">PCI DSS</h4>
                        <p className="text-sm text-gray-600">Payment card security</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">GDPR</h4>
                        <p className="text-sm text-gray-600">Data privacy compliance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'training-services' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16 scroll-animate fade-in-up">
                  <span className="text-purple-600 font-bold uppercase tracking-wider scroll-animate fade-in-up" style={{fontSize: '2.2rem'}}>Our Capabilities</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4 scroll-animate fade-in-up">Training Services Portfolio</h2>
                  <p className="text-lg text-gray-600 scroll-animate fade-in-up">Expert-led training programs and professional certifications</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Full Stack Developer */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1000" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Code className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Full Stack Developer</h3>
                    <p className="text-gray-600 mb-4">Complete web development training from frontend to backend</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• React/Angular/Vue.js</li>
                      <li>• Node.js/Python/Java</li>
                      <li>• Database Design</li>
                      <li>• API Development</li>
                    </ul>
                  </div>

                  {/* DevOps Engineer */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow scroll-animate fade-in-up-delay-1200" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">DevOps Engineer</h3>
                    <p className="text-gray-600 mb-4">Infrastructure automation and deployment pipelines</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• CI/CD Pipelines</li>
                      <li>• Docker/Kubernetes</li>
                      <li>• Infrastructure as Code</li>
                      <li>• Monitoring & Logging</li>
                    </ul>
                  </div>

                  {/* Cloud Architect */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-yellow-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Cloud className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Cloud Architect</h3>
                    <p className="text-gray-600 mb-4">Design and implement scalable cloud solutions</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• AWS/Azure/GCP</li>
                      <li>• Cloud Architecture</li>
                      <li>• Cost Optimization</li>
                      <li>• Security Best Practices</li>
                    </ul>
                  </div>

                  {/* AI/ML Engineer */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">AI/ML Engineer</h3>
                    <p className="text-gray-600 mb-4">Machine learning and artificial intelligence development</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• Machine Learning</li>
                      <li>• Deep Learning</li>
                      <li>• Data Science</li>
                      <li>• MLOps</li>
                    </ul>
                  </div>

                  {/* Bootcamps */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Bootcamps</h3>
                    <p className="text-gray-600 mb-4">Intensive coding bootcamps for rapid skill development</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• 12-week Programs</li>
                      <li>• Project-based Learning</li>
                      <li>• Job Placement Support</li>
                      <li>• Industry Mentorship</li>
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div className="bg-white p-8 rounded-2xl shadow-realistic hover:shadow-realistic-lg shadow-transition transition-shadow" style={{paddingLeft: '2.5rem'}}>
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-white mb-6">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Certifications</h3>
                    <p className="text-gray-600 mb-4">Industry-recognized professional certifications</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• AWS Certifications</li>
                      <li>• Microsoft Azure</li>
                      <li>• Google Cloud</li>
                      <li>• Kubernetes (CKA/CKAD)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Individual Training Service Pages */}
          {contextSlug === 'full-stack-developer' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Training Program</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Full-Stack Developer</h2>
                  <p className="text-lg text-gray-600">Master modern web development from frontend to backend with our comprehensive training program</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What You&apos;ll Learn</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Frontend development with React, Angular, and Vue.js</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Backend development with Node.js, Python, and Java</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Database design and management (SQL and NoSQL)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />RESTful API development and integration</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Version control with Git and collaboration tools</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Deployment and DevOps fundamentals</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Program Details</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Duration: 16 weeks</h4>
                        <p className="text-sm text-gray-600">Full-time intensive program with hands-on projects</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Format: Hybrid</h4>
                        <p className="text-sm text-gray-600">Online lectures + in-person labs and mentoring</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-purple-600 mb-2">Projects: 5 Portfolio Projects</h4>
                        <p className="text-sm text-gray-600">Build real-world applications for your portfolio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'devops-engineer' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Training Program</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">DevOps Engineer</h2>
                  <p className="text-lg text-gray-600">Become proficient in DevOps practices, automation, and infrastructure management</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What You&apos;ll Learn</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />CI/CD pipeline design and implementation</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Containerization with Docker and Kubernetes</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Infrastructure as Code (Terraform, Ansible)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cloud platforms (AWS, Azure, GCP)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Monitoring and logging solutions</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Security and compliance in DevOps</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Certification Path</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">AWS DevOps</h4>
                        <p className="text-sm text-gray-600">Prepare for AWS DevOps Professional certification</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">Kubernetes (CKA)</h4>
                        <p className="text-sm text-gray-600">Certified Kubernetes Administrator</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-blue-600 mb-2">Docker</h4>
                        <p className="text-sm text-gray-600">Docker Certified Associate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'cloud-architect' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Training Program</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Cloud Architect</h2>
                  <p className="text-lg text-gray-600">Design and implement scalable cloud solutions across major cloud platforms</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What You&apos;ll Learn</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cloud architecture design principles</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Multi-cloud and hybrid cloud strategies</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Security and compliance in the cloud</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Cost optimization and FinOps</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Disaster recovery and business continuity</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Performance optimization and scaling</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Certification Tracks</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">AWS Solutions Architect</h4>
                        <p className="text-sm text-gray-600">Professional level certification</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Azure Solutions Architect</h4>
                        <p className="text-sm text-gray-600">Expert level certification</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-green-600 mb-2">Google Cloud Architect</h4>
                        <p className="text-sm text-gray-600">Professional Cloud Architect</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'ai-ml-engineer' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Training Program</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">AI/ML Engineer</h2>
                  <p className="text-lg text-gray-600">Master machine learning and artificial intelligence technologies</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">What You&apos;ll Learn</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Machine learning algorithms and techniques</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Deep learning and neural networks</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Natural language processing (NLP)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Computer vision and image processing</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />MLOps and model deployment</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Data engineering for ML</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Technology Stack</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">Python</h4>
                        <p className="text-sm text-gray-600">Core ML/AI programming language</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">TensorFlow</h4>
                        <p className="text-sm text-gray-600">Deep learning framework</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">PyTorch</h4>
                        <p className="text-sm text-gray-600">Research-focused ML framework</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-indigo-600 mb-2">Kubernetes</h4>
                        <p className="text-sm text-gray-600">ML model orchestration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'bootcamps' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Training Program</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Intensive Coding Bootcamps</h2>
                  <p className="text-lg text-gray-600">Accelerated learning programs designed for career transition and skill advancement</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Bootcamp Programs</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />12-week intensive full-stack development</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />8-week data science and analytics</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />10-week DevOps and cloud engineering</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />14-week AI/ML specialization</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />6-week cybersecurity fundamentals</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Career placement assistance included</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Support & Benefits</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">Industry Mentorship</h4>
                        <p className="text-sm text-gray-600">1-on-1 guidance from industry professionals</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">Job Placement</h4>
                        <p className="text-sm text-gray-600">85% job placement rate within 6 months</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-red-600 mb-2">Portfolio Development</h4>
                        <p className="text-sm text-gray-600">Build 3-5 production-ready projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {contextSlug === 'certifications' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Certification Programs</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Industry-Recognized Certifications</h2>
                  <p className="text-lg text-gray-600">Prepare for and achieve top industry certifications with expert guidance</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Available Certifications</h3>
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />AWS Solutions Architect (Associate & Professional)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Microsoft Azure Architect Expert</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Google Cloud Professional Architect</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Certified Kubernetes Administrator (CKA)</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />CISSP and CompTIA Security+</li>
                      <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />Project Management Professional (PMP)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Preparation Features</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">95% Pass Rate</h4>
                        <p className="text-sm text-gray-600">Industry-leading exam pass rates</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">Practice Exams</h4>
                        <p className="text-sm text-gray-600">Unlimited practice tests and mock exams</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-orange-600 mb-2">Expert Instructors</h4>
                        <p className="text-sm text-gray-600">Certified professionals as instructors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Case Studies Section - Dynamic based on service type */}
          <section id="case-studies" className="pt-48 pb-24 bg-gray-50 relative overflow-hidden" style={{marginTop: '2.4rem', marginBottom: '1.2rem'}}>
            <GeometricAccent
              shapes={[
                { type: 'dots', size: 'lg', color: 'rgba(168, 85, 247, 0.05)', position: 'top-left', animate: true },
                { type: 'circle', size: 'md', color: 'rgba(59, 130, 246, 0.03)', position: 'bottom-right', animate: true }
              ]}
            >
            <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
              <div className="text-center mb-16">
                <span className="text-purple-600 font-bold uppercase tracking-wider scroll-animate fade-in-up typewriter" style={{fontSize: '2.2rem'}}>Case Studies</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 scroll-animate fade-in-up" style={{fontSize: '1.75rem'}}>
                  <span className="highlight-reveal">Interactive Project Showcases</span>
                </h2>
              </div>
              <InteractiveCaseStudy caseStudies={[
                {
                  id: 'ecommerce-redesign',
                  title: 'E-commerce Platform Redesign',
                  client: 'TechStore Plus',
                  category: 'Web Design',
                  summary: 'Complete UI/UX overhaul resulting in 40% increase in conversions',
                  beforeImage: '/portfolio/ecommerce-before.jpg',
                  afterImage: '/portfolio/ecommerce-after.jpg',
                  steps: [
                    {
                      title: 'Research & Analysis',
                      description: 'Conducted user research and competitive analysis to identify pain points',
                      metrics: [
                        { label: 'User Interviews', value: '24', color: 'text-blue-600' },
                        { label: 'Competitors Analyzed', value: '8', color: 'text-green-600' },
                        { label: 'Pain Points Identified', value: '12', color: 'text-red-600' }
                      ]
                    },
                    {
                      title: 'Design System Creation',
                      description: 'Built a comprehensive design system with reusable components',
                      metrics: [
                        { label: 'Components Created', value: '45', color: 'text-purple-600' },
                        { label: 'Color Variations', value: '18', color: 'text-indigo-600' },
                        { label: 'Typography Scales', value: '6', color: 'text-pink-600' }
                      ]
                    },
                    {
                      title: 'Implementation & Testing',
                      description: 'Developed responsive interface with extensive A/B testing',
                      metrics: [
                        { label: 'Pages Redesigned', value: '23', color: 'text-orange-600' },
                        { label: 'A/B Tests Run', value: '15', color: 'text-cyan-600' },
                        { label: 'Performance Score', value: '94', color: 'text-green-600' }
                      ]
                    }
                  ],
                  results: [
                    { metric: 'Conversion Rate', value: '+40%', improvement: '2.1% to 2.9%' },
                    { metric: 'Page Load Speed', value: '+65%', improvement: '4.2s to 1.5s' },
                    { metric: 'User Satisfaction', value: '+85%', improvement: '3.2/5 to 4.7/5' }
                  ]
                },
                {
                  id: 'mobile-app-development',
                  title: 'Mobile App Development',
                  client: 'FitTrack Pro',
                  category: 'Mobile',
                  summary: 'Custom fitness tracking app with real-time analytics',
                  beforeImage: '/portfolio/mobile-before.jpg',
                  afterImage: '/portfolio/mobile-after.jpg',
                  steps: [
                    {
                      title: 'Requirements Gathering',
                      description: 'Defined feature set and technical requirements with stakeholders',
                      metrics: [
                        { label: 'Features Defined', value: '32', color: 'text-blue-600' },
                        { label: 'User Stories', value: '68', color: 'text-green-600' },
                        { label: 'Technical Specs', value: '15', color: 'text-purple-600' }
                      ]
                    },
                    {
                      title: 'Development & Integration',
                      description: 'Built native iOS/Android apps with cloud synchronization',
                      metrics: [
                        { label: 'API Endpoints', value: '28', color: 'text-orange-600' },
                        { label: 'Database Tables', value: '12', color: 'text-cyan-600' },
                        { label: 'Third-party Integrations', value: '7', color: 'text-pink-600' }
                      ]
                    },
                    {
                      title: 'Launch & Optimization',
                      description: 'App store deployment with continuous performance monitoring',
                      metrics: [
                        { label: 'Beta Testers', value: '150', color: 'text-indigo-600' },
                        { label: 'Bug Fixes', value: '23', color: 'text-red-600' },
                        { label: 'Performance Optimizations', value: '8', color: 'text-green-600' }
                      ]
                    }
                  ],
                  results: [
                    { metric: 'App Store Rating', value: '4.8/5', improvement: 'New launch' },
                    { metric: 'Daily Active Users', value: '12K+', improvement: 'Month 1' },
                    { metric: 'User Retention', value: '78%', improvement: '30-day retention' }
                  ]
                },
                {
                  id: 'enterprise-dashboard',
                  title: 'Enterprise Analytics Dashboard',
                  client: 'DataCorp Solutions',
                  category: 'Web App',
                  summary: 'Real-time business intelligence platform with advanced visualizations',
                  beforeImage: '/portfolio/dashboard-before.jpg',
                  afterImage: '/portfolio/dashboard-after.jpg',
                  steps: [
                    {
                      title: 'Data Architecture Design',
                      description: 'Designed scalable data pipeline and storage solution',
                      metrics: [
                        { label: 'Data Sources', value: '18', color: 'text-blue-600' },
                        { label: 'Processing Speed', value: '10x', color: 'text-green-600' },
                        { label: 'Storage Efficiency', value: '60%', color: 'text-purple-600' }
                      ]
                    },
                    {
                      title: 'Dashboard Development',
                      description: 'Built interactive charts and real-time monitoring tools',
                      metrics: [
                        { label: 'Chart Types', value: '15', color: 'text-orange-600' },
                        { label: 'Real-time Metrics', value: '45', color: 'text-cyan-600' },
                        { label: 'Custom Widgets', value: '22', color: 'text-pink-600' }
                      ]
                    },
                    {
                      title: 'Security & Deployment',
                      description: 'Enterprise-grade security implementation and cloud deployment',
                      metrics: [
                        { label: 'Security Audits', value: '3', color: 'text-red-600' },
                        { label: 'Compliance Standards', value: '5', color: 'text-indigo-600' },
                        { label: 'Uptime SLA', value: '99.9%', color: 'text-green-600' }
                      ]
                    }
                  ],
                  results: [
                    { metric: 'Data Processing Time', value: '-80%', improvement: '2 hours to 24 minutes' },
                    { metric: 'Decision Making Speed', value: '+120%', improvement: 'Real-time insights' },
                    { metric: 'Operational Efficiency', value: '+45%', improvement: 'Automated reporting' }
                  ]
                }
              ]} />
            </div>
            </GeometricAccent>
          </section>


          {/* Contact Section - Dynamic based on service type */}
          <section id="contact" className="pt-80 pb-24 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white relative overflow-hidden" style={{marginTop: '4rem'}}>
            <GeometricAccent
              shapes={[
                { type: 'blob', size: 'xl', color: 'rgba(255, 255, 255, 0.08)', position: 'top-left', animate: true },
                { type: 'circuit-pattern', size: 'xl', color: 'rgba(255, 255, 255, 0.03)', position: 'center', animate: true, opacity: 0.4 },
                { type: 'geometric-grid', size: 'lg', color: 'rgba(255, 255, 255, 0.04)', position: 'top-right', animate: true, opacity: 0.6 },
                { type: 'hexagon', size: 'md', color: 'rgba(255, 255, 255, 0.06)', position: 'bottom-left', animate: true },
                { type: 'diagonal-lines', size: 'lg', color: 'rgba(255, 255, 255, 0.02)', position: 'bottom-right', animate: true, opacity: 0.7 }
              ]}
            >
              {/* Parametric Light Effects for Contact */}
              <div className="absolute top-16 left-16">
                <ParametricLight type="infinity" size="xl" color="#FFFFFF" speed="slow" intensity="bright" glow={true} trail={true} />
              </div>
              <div className="absolute bottom-16 right-16">
                <ParametricLight type="rose" size="lg" color="#FBBF24" speed="normal" intensity="medium" glow={true} />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <ParametricLight type="butterfly" size="md" color="#F472B6" speed="fast" intensity="subtle" glow={true} />
              </div>

              {/* Data Sculpture Effects for Contact */}
              <div className="absolute top-1/4 left-1/4">
                <DataSculpture type="pyramid" size="xl" color="#FFFFFF" speed="slow" intensity="bright" wireframe={true} particles={true} />
              </div>
              <div className="absolute bottom-1/4 right-1/4">
                <DataSculpture type="cube" size="lg" color="#FBBF24" speed="normal" intensity="medium" wireframe={true} />
              </div>
              <div className="absolute top-2/3 right-1/3">
                <DataSculpture type="helix" size="md" color="#F472B6" speed="fast" intensity="subtle" particles={true} />
              </div>
            <div className="container mx-auto max-w-7xl px-6 text-center" style={{marginLeft: '1rem', marginRight: '1rem'}}>
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 text-white/90">
                {contextSlug === 'development-services' && "Let&apos;s discuss your development services project needs"}
                {contextSlug === 'consulting-services' && "Let&apos;s explore your digital transformation opportunities"}
                {contextSlug === 'training-services' && "Let&apos;s design a training program for your team"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@avada.com" className="px-8 py-4 rounded-full bg-white text-purple-600 font-semibold hover:shadow-realistic-xl transition-all underline-reveal gradient-border gradient-border-hover relative group overflow-hidden">
                  <span className="relative z-10">
                    {contextSlug === 'development-services' && 'Start Your Project'}
                    {contextSlug === 'consulting-services' && 'Schedule Consultation'}
                    {contextSlug === 'training-services' && 'Explore Training'}
                  </span>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <NeuroLoader type="synaptic" size="sm" color="#7C3AED" speed="fast" />
                  </div>
                </a>
                <button
                  onClick={() => setContextSlug(null)}
                  className="px-8 py-4 rounded-full border-2 border-white bg-transparent text-white font-semibold hover:bg-white hover:text-purple-600 transition-all gradient-border gradient-border-hover relative group overflow-hidden"
                >
                  <span className="relative z-10">Back to Home</span>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <NeuroLoader type="brain-wave" size="sm" color="#7C3AED" speed="normal" />
                  </div>
                </button>
              </div>
            </div>
            </GeometricAccent>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 relative overflow-hidden">
        <GeometricAccent
          shapes={[
            { type: 'mesh-grid', size: 'xl', color: 'rgba(99, 102, 241, 0.05)', position: 'center', animate: true, opacity: 0.3 },
            { type: 'circuit-pattern', size: 'lg', color: 'rgba(147, 51, 234, 0.04)', position: 'top-left', animate: true, opacity: 0.4 },
            { type: 'geometric-grid', size: 'md', color: 'rgba(79, 70, 229, 0.06)', position: 'top-right', animate: true, opacity: 0.5 },
            { type: 'dots', size: 'sm', color: 'rgba(168, 85, 247, 0.07)', position: 'bottom-left', animate: true },
            { type: 'diagonal-lines', size: 'lg', color: 'rgba(59, 130, 246, 0.03)', position: 'bottom-right', animate: true, opacity: 0.6 }
          ]}
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center text-gray-400">
              <p>&copy; 2024 BitMonkey IT Services Pvt Ltd. All rights reserved.</p>
            </div>
          </div>
        </GeometricAccent>
      </footer>
    </div>
  );
}