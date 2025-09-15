'use client';

import { useState } from 'react';
import {
  Menu, X, CheckCircle,
  Mail, Phone, MapPin, Github, Linkedin, Twitter,
  Instagram, Users, Code, Cloud,
  Target, Zap, Award, TrendingUp
} from 'lucide-react';


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);


  // Top navigation items: base vs context (left-menu-selected) views
  const [contextSlug, setContextSlug] = useState<string | null>(null);
  const baseNav = ['Home', 'Services', 'Portfolio', 'Resources'];

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
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to handle service page navigation
  const handleServicePageNav = (serviceType: string) => {
    setContextSlug(serviceType);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/services/${serviceType}`);
      const el = document.getElementById('home');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-[60] transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg py-4"
      >
        <div className="mx-auto max-w-7xl px-6" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              {/* Logo placeholder */}
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BM</span>
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                BitMonkey IT Services Pvt Ltd
              </h1>
            </div>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-8">
              {currentNav.map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, '-');
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                    onClick={(e) => {
                      if (item === 'Home') {
                        setContextSlug(null);
                      } else if (item === 'Services') {
                        e.preventDefault();
                        setContextSlug(null);
                        const element = document.getElementById('our-services');
                        if (element) {
                          const elementPosition = element.offsetTop;
                          const offsetPosition = elementPosition - 80; // Account for nav height and positioning
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      } else if (item === 'Portfolio') {
                        e.preventDefault();
                        setContextSlug(null);
                        const element = document.getElementById('our-portfolio');
                        if (element) {
                          const elementPosition = element.offsetTop;
                          const offsetPosition = elementPosition - 80; // Account for nav height and positioning
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
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
                            const offsetPosition = elementPosition - 80; // Account for nav height
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
              className="lg:hidden text-gray-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex flex-col">
                {currentNav.map((item) => {
                  const id = item.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <a
                      key={item}
                      href={`#${id}`}
                      onClick={(e) => {
                        if (item === 'Home') {
                          setContextSlug(null);
                        } else if (item === 'Services') {
                          e.preventDefault();
                          setContextSlug(null);
                          const element = document.getElementById('our-services');
                          if (element) {
                            const elementPosition = element.offsetTop;
                            const offsetPosition = elementPosition - 80; // Account for nav height and positioning
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        } else if (item === 'Portfolio') {
                          e.preventDefault();
                          setContextSlug(null);
                          const element = document.getElementById('our-portfolio');
                          if (element) {
                            const elementPosition = element.offsetTop;
                            const offsetPosition = elementPosition - 80; // Account for nav height and positioning
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
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
                              const offsetPosition = elementPosition - 80; // Account for nav height
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            }
                          }
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="py-2 text-gray-700 hover:text-purple-600 transition"
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

      {/* Hero Section */}
      {/* Hero Section (Avada-style split layout) */}
    <section id="home" className={contextSlug ? "pt-32 lg:pt-40" : "pt-28 lg:pt-32"}> 
        <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left rail column (adds outer padding from the page edge) */}
         <div className="hidden lg:block lg:col-span-3">

  <aside className="sticky top-24 self-start">
            <div className="flex flex-col gap-4">
              {/* Identity card */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
                <h2 className="text-lg font-extrabold leading-tight">BitMonkey IT<br />Services Pvt Ltd</h2>
                <p className="text-sm text-gray-500 mt-2">Friday, September 12<br />New Delhi</p>

                <div className="flex items-center gap-4 mt-6 text-gray-600">
                  <button className="inline-flex items-center justify-center w-10 h-10 rounded-xl border hover:bg-gray-50 transition">
                    <Menu className="w-5 h-5" />
                  </button>
                  <a href="#" className="hover:text-gray-900 transition"><Twitter className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-gray-900 transition"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-gray-900 transition"><Github className="w-5 h-5" /></a>
                  <a href="#" className="hover:text-gray-900 transition"><Linkedin className="w-5 h-5" /></a>
                </div>
              </div>

              {/* Service quick menu: Development */}
              <div className="bg-gray-100 rounded-2xl p-5 md:p-6 relative w-full" style={{paddingLeft: '0.75rem'}}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setContextSlug('development-services');
                    if (typeof window !== 'undefined') {
                      window.history.pushState({}, '', '/services/development-services');
                      const el = document.getElementById('overview');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors w-full text-left"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Development</span>
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                </button>
                <ul className="divide-y divide-gray-300/70">
                  <li><button onClick={() => handleLeftNav('app-dev-modernization')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">App Dev &amp; Modernization</button></li>
                  <li><button onClick={() => handleLeftNav('cloud-engineering')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Cloud Engineering</button></li>
                  <li><button onClick={() => handleLeftNav('ai-ml-automation')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">AI-ML &amp; Automation</button></li>
                  <li><button onClick={() => handleLeftNav('data-analytics')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Data &amp; Analytics</button></li>
                  <li><button onClick={() => handleLeftNav('devsecops')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">DevSecOps</button></li>
                  <li><button onClick={() => handleLeftNav('quality-assurance')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Quality Assurance</button></li>
                  <li><button onClick={() => handleLeftNav('sre-operations')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">SRE &amp; Operations</button></li>
                </ul>
              </div>

              {/* Service quick menu: Consulting */}
              <div className="bg-indigo-50 rounded-2xl p-5 md:p-6 relative w-full" style={{paddingLeft: '0.75rem'}}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicePageNav('consulting-services');
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors w-full text-left"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Consulting</span>
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                </button>
                <ul className="divide-y divide-gray-300/70">
                  <li><button onClick={() => handleLeftNav('digital-transformation')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Digital Transformation</button></li>
                  <li><button onClick={() => handleLeftNav('enterprise-architecture')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Enterprise Architecture</button></li>
                  <li><button onClick={() => handleLeftNav('digital-strategy-roadmaps')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Digital Strategy &amp; Roadmaps</button></li>
                  <li><button onClick={() => handleLeftNav('governance')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Governance</button></li>
                  <li><button onClick={() => handleLeftNav('cloud-advisory')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Cloud Advisory</button></li>
                  <li><button onClick={() => handleLeftNav('security-compliance')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Security &amp; Compliance</button></li>
                </ul>
              </div>

              {/* Service quick menu: Training */}
              <div className="bg-rose-50 rounded-2xl p-5 md:p-6 relative w-full" style={{paddingLeft: '0.75rem'}}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleServicePageNav('training-services');
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors w-full text-left"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Training</span>
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                </button>
                <ul className="divide-y divide-gray-300/70">
                  <li><button onClick={() => handleLeftNav('full-stack-developer')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Full‑Stack Developer</button></li>
                  <li><button onClick={() => handleLeftNav('devops-engineer')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">DevOps Engineer</button></li>
                  <li><button onClick={() => handleLeftNav('cloud-architect')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Cloud Architect</button></li>
                  <li><button onClick={() => handleLeftNav('ai-ml-engineer')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">AI/ML Engineer</button></li>
                  <li><button onClick={() => handleLeftNav('bootcamps')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Bootcamps</button></li>
                  <li><button onClick={() => handleLeftNav('certifications')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Certifications</button></li>
                </ul>
              </div>
            </div>
            </aside>
          </div>

          {/* Right hero - changes based on context */}
          <div className="relative lg:col-span-9 min-h-[80vh] rounded-3xl overflow-hidden bg-white bg-cover bg-center">
            <video
              className="absolute inset-0 w-full h-full object-contain"
              autoPlay
              muted
              playsInline
              preload="auto"
              poster={contextSlug === 'development-services' ? "/development-poster.jpg" :
                     contextSlug === 'consulting-services' ? "/consulting-poster.jpg" :
                     contextSlug === 'training-services' ? "/training-poster.jpg" : "/hero-poster.jpg"}
              key={contextSlug || 'default'}
            >
              <source src={contextSlug === 'development-services' ? "/development.mp4" :
                          contextSlug === 'consulting-services' ? "/consulting.mp4" :
                          contextSlug === 'training-services' ? "/training.mp4" : "/hero.mp4"} type="video/mp4" />
            </video>

          </div>
          </div> {/* end grid */}
        </div>   {/* end padded wrapper */}
      </section>

      {/* Sections */}
      {!contextSlug ? (
        <>
          {/* Our Services Section */}
          <section id="our-services" className="pt-32 pb-24 bg-white" style={{marginTop: '4rem'}}>
            <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
                {/* Text Content - 30% */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Services</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6" style={{fontSize: '1.75rem'}}>
                      Comprehensive Digital Solutions
                    </h2>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    We deliver end-to-end technology solutions that drive business transformation and accelerate growth.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Development Services</h4>
                        <p className="text-sm text-gray-600">Modern applications with cutting-edge technologies</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Consulting Services</h4>
                        <p className="text-sm text-gray-600">Strategic guidance for digital transformation</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Training Services</h4>
                        <p className="text-sm text-gray-600">Expert-led training programs and certifications</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all">
                      Explore Our Services
                    </button>
                  </div>
                </div>

                {/* Video Content - 70% */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
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
                </div>
              </div>
            </div>
          </section>

          {/* Our Portfolio Section */}
          <section id="our-portfolio" className="pt-32 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
            <div className="container mx-auto max-w-7xl" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
                {/* Text Content - 30% */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Portfolio</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6" style={{fontSize: '1.75rem'}}>
                      Showcase of Excellence
                    </h2>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    Explore our portfolio of successful digital transformations and innovative solutions across various industries.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Enterprise Solutions</h4>
                        <p className="text-sm text-gray-600">Large-scale applications for global organizations</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Startup Innovations</h4>
                        <p className="text-sm text-gray-600">Cutting-edge solutions for emerging businesses</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Digital Transformation</h4>
                        <p className="text-sm text-gray-600">Complete modernization of legacy systems</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all">
                      View All Projects
                    </button>
                  </div>
                </div>

                {/* Video Content - 70% */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
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
                </div>
              </div>
            </div>
          </section>

        </>
      ) : (
        <>
          {/* Context-specific sections - replace home content */}
          {contextSlug === 'development-services' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Capabilities</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Development Services Portfolio</h2>
                  <p className="text-lg text-gray-600">Comprehensive development solutions across modern technology stacks</p>
                </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* App Dev & Modernization */}
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Capabilities</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Consulting Services Portfolio</h2>
                  <p className="text-lg text-gray-600">Strategic guidance for digital transformation and business innovation</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Digital Transformation */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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

          {contextSlug === 'training-services' && (
            <section id="capabilities" className="pt-80 pb-24 bg-gray-50" style={{marginTop: '4rem'}}>
              <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <div className="text-center mb-16">
                  <span className="text-purple-600 font-bold uppercase tracking-wider" style={{fontSize: '2.2rem'}}>Our Capabilities</span>
                  <h2 className="text-4xl font-bold mb-4 mt-4">Training Services Portfolio</h2>
                  <p className="text-lg text-gray-600">Expert-led training programs and professional certifications</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Full Stack Developer */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" style={{paddingLeft: '2.5rem'}}>
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

          {/* Case Studies Section - Dynamic based on service type */}
          <section id="case-studies" className="pt-80 pb-24 bg-white" style={{marginTop: '4rem'}}>
            <div className="container mx-auto max-w-7xl px-6" style={{marginLeft: '1rem', marginRight: '1rem'}}>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
                <p className="text-lg text-gray-600">
                  {contextSlug === 'development-services' && 'Success stories from development services projects'}
                  {contextSlug === 'consulting-services' && 'Strategic transformations and consulting successes'}
                  {contextSlug === 'training-services' && 'Training program outcomes and career transformations'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {contextSlug === 'development-services' && (
                  <>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-4">Fortune 500 Transformation</h3>
                      <p className="text-gray-700 mb-6">Modernized legacy systems for a major financial institution, resulting in 40% performance improvement and $2M annual savings.</p>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">40%</div>
                          <div className="text-sm text-gray-600">Performance Gain</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">$2M</div>
                          <div className="text-sm text-gray-600">Annual Savings</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-4">Startup Scale Success</h3>
                      <p className="text-gray-700 mb-6">Built scalable architecture that supported 10x user growth for a fast-growing SaaS platform.</p>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">10x</div>
                          <div className="text-sm text-gray-600">User Growth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">99.9%</div>
                          <div className="text-sm text-gray-600">Uptime</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {contextSlug === 'consulting-services' && (
                  <>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-4">Enterprise Digital Transformation</h3>
                      <p className="text-gray-700 mb-6">Led comprehensive digital transformation for a retail giant, achieving 50% operational efficiency improvement and $5M cost reduction.</p>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">50%</div>
                          <div className="text-sm text-gray-600">Efficiency Gain</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">$5M</div>
                          <div className="text-sm text-gray-600">Cost Reduction</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-4">Cloud Migration Strategy</h3>
                      <p className="text-gray-700 mb-6">Designed and executed cloud migration strategy for a healthcare provider, reducing infrastructure costs by 60%.</p>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">60%</div>
                          <div className="text-sm text-gray-600">Cost Reduction</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">3 months</div>
                          <div className="text-sm text-gray-600">Migration Time</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {contextSlug === 'training-services' && (
                  <>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-4">Corporate Upskilling Program</h3>
                      <p className="text-gray-700 mb-6">Trained 200+ developers for a tech company&apos;s digital transformation, with 95% completion rate and 80% internal promotions.</p>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">200+</div>
                          <div className="text-sm text-gray-600">Developers Trained</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">95%</div>
                          <div className="text-sm text-gray-600">Completion Rate</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                      <h3 className="text-2xl font-bold mb-4">Career Transition Bootcamp</h3>
                      <p className="text-gray-700 mb-6">Helped 150+ professionals transition to tech careers through our intensive bootcamp, with 85% job placement rate.</p>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">150+</div>
                          <div className="text-sm text-gray-600">Career Transitions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">85%</div>
                          <div className="text-sm text-gray-600">Job Placement</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Contact Section - Dynamic based on service type */}
          <section id="contact" className="pt-80 pb-24 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white" style={{marginTop: '4rem'}}>
            <div className="container mx-auto max-w-7xl px-6 text-center" style={{marginLeft: '1rem', marginRight: '1rem'}}>
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 text-white/90">
                {contextSlug === 'development-services' && "Let&apos;s discuss your development services project needs"}
                {contextSlug === 'consulting-services' && "Let&apos;s explore your digital transformation opportunities"}
                {contextSlug === 'training-services' && "Let&apos;s design a training program for your team"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@avada.com" className="px-8 py-4 rounded-full bg-white text-purple-600 font-semibold hover:shadow-2xl transition-all">
                  {contextSlug === 'development-services' && 'Start Your Project'}
                  {contextSlug === 'consulting-services' && 'Schedule Consultation'}
                  {contextSlug === 'training-services' && 'Explore Training'}
                </a>
                <button
                  onClick={() => setContextSlug(null)}
                  className="px-8 py-4 rounded-full border-2 border-white bg-transparent text-white font-semibold hover:bg-white hover:text-purple-600 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">BitMonkey IT Services Pvt Ltd</h3>
              <p className="text-gray-400">Creating digital excellence since 2014</p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-white transition">Consulting</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Team</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@avada.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  New Delhi, India
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BitMonkey IT Services Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}