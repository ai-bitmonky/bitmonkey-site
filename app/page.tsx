'use client';

import { useState, useEffect } from 'react';
import { 
  Menu, X, Play, ShoppingCart, ArrowRight, CheckCircle, 
  Star, Mail, Phone, MapPin, Github, Linkedin, Twitter, 
  Instagram, ChevronDown, Users, Code, Palette, Cloud,
  Target, Zap, Award, TrendingUp
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image?: string;
  gradient: string;
}

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export default function Home() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services: Service[] = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      icon: <Code className="w-6 h-6" />,
      features: ['React/Next.js', 'TypeScript', 'Node.js', 'API Integration']
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love',
      icon: <Palette className="w-6 h-6" />,
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable infrastructure for modern applications',
      icon: <Cloud className="w-6 h-6" />,
      features: ['AWS/Azure', 'Docker/K8s', 'CI/CD', 'Monitoring']
    },
    {
      title: 'Consulting',
      description: 'Strategic guidance for digital transformation',
      icon: <Target className="w-6 h-6" />,
      features: ['Tech Strategy', 'Architecture', 'Best Practices', 'Training']
    }
  ];

  const projects: Project[] = [
    { id: 1, title: 'FinTech Platform', category: 'Finance', description: 'Modern banking solution', gradient: 'from-purple-600 to-pink-600' },
    { id: 2, title: 'E-Commerce Hub', category: 'Retail', description: 'Next-gen shopping experience', gradient: 'from-blue-600 to-purple-600' },
    { id: 3, title: 'Healthcare Portal', category: 'Medical', description: 'Telemedicine platform', gradient: 'from-teal-600 to-blue-600' },
    { id: 4, title: 'AI Dashboard', category: 'Analytics', description: 'Real-time insights', gradient: 'from-orange-600 to-red-600' },
    { id: 5, title: 'Social App', category: 'Social', description: 'Community platform', gradient: 'from-pink-600 to-rose-600' },
    { id: 6, title: 'EdTech System', category: 'Education', description: 'Learning management', gradient: 'from-green-600 to-teal-600' }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "They transformed our entire digital presence. The results exceeded all expectations.",
      author: "Sarah Chen",
      role: "CEO",
      company: "TechStart Inc.",
      rating: 5
    },
    {
      id: 2,
      text: "Exceptional team with deep technical expertise and creative vision.",
      author: "Michael Rodriguez",
      role: "CTO",
      company: "Innovation Labs",
      rating: 5
    },
    {
      id: 3,
      text: "The best technology partner we've ever worked with. Highly recommended!",
      author: "Emily Johnson",
      role: "Product Manager",
      company: "Digital Corp",
      rating: 5
    }
  ];

  // Top navigation items: base vs context (left-menu-selected) views
  const [contextSlug, setContextSlug] = useState<string | null>(null);
  const baseNav = ['Home', 'Services', 'Portfolio', 'Resources'];

  const getContextNav = (slug: string | null) => {
    if (!slug) return baseNav;
    const serviceName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return ['Overview', 'Capabilities', 'Case Studies', 'Contact'];
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-[60] transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg py-4"
      >
        <div className="mx-auto max-w-7xl px-6" style={{paddingLeft: '1rem', paddingRight: '0.5rem'}}>
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Avada
              </h1>
              <span className="text-2xl font-light text-gray-800">
                Portfolio
              </span>
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
    <section id="home" className="pt-28 lg:pt-32"> 
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left rail column (adds outer padding from the page edge) */}
         <div className="hidden lg:block lg:col-span-3">

  <aside className="sticky top-24 self-start" style={{marginLeft: '1rem'}}>
            <div className="flex flex-col gap-4">
              {/* Identity card */}
              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
                <h2 className="text-2xl font-extrabold leading-tight">Avada<br />Portfolio</h2>
                <p className="text-sm text-gray-500 mt-2">Friday, September 12<br />New York City</p>

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
              <div className="bg-gray-100 rounded-2xl p-5 md:p-6 relative w-full">
                <a
                  href="#development-services"
                  onClick={(e) => {
                    e.preventDefault();
                    setContextSlug(null);
                    document.getElementById('development-services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Development</span>
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                </a>
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
              <div className="bg-indigo-50 rounded-2xl p-5 md:p-6 relative w-full">
                <a
                  href="#consulting-services"
                  onClick={(e) => {
                    e.preventDefault();
                    setContextSlug(null);
                    document.getElementById('consulting-services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Consulting</span>
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                </a>
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
              <div className="bg-rose-50 rounded-2xl p-5 md:p-6 relative w-full">
                <a
                  href="#training-services"
                  onClick={(e) => {
                    e.preventDefault();
                    setContextSlug(null);
                    document.getElementById('training-services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors"
                >
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Training</span>
                  <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                </a>
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

          {/* Right hero */}
          <div className="relative lg:col-span-9 min-h-[80vh] rounded-3xl overflow-hidden bg-black bg-[url('/hero-poster.jpg')] bg-cover bg-center" style={{marginRight: '0.5rem'}}>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/hero-poster.jpg"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute z-10 top-6 md:top-10 left-6 md:left-10 right-6 md:right-10 text-white">
              <p className="text-2xl md:text-4xl font-semibold max-w-3xl leading-tight">
                Your digital transformation journey partner.
              </p>
            </div>
          </div>
          </div> {/* end grid */}
        </div>   {/* end padded wrapper */}
      </section>

      {/* Sections */}
      {!contextSlug ? (
        <>
          {/* Our Services Section */}
          <section id="our-services" className="pt-80 pb-24 bg-white" style={{marginTop: '4rem'}}>
            <div className="container mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
                {/* Text Content - 30% */}
                <div className="lg:col-span-3 space-y-6" style={{marginLeft: '1rem'}}>
                  <div>
                    <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
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
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black" style={{marginRight: '0.5rem'}}>
                    <video
                      className="w-full h-full object-cover aspect-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      poster="/services-poster.jpg"
                    >
                      <source src="/services.mp4" type="video/mp4" />
                      <div className="w-full h-96 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-semibold">
                        Services Video Placeholder
                      </div>
                    </video>

                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Development Services Section */}
          <section id="development-services" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Development</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Development Services</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Building modern applications with cutting-edge technologies
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedService(idx)}
                    className={`bg-white p-8 rounded-2xl cursor-pointer transition-all ${
                      selectedService === idx
                        ? 'shadow-2xl scale-105 border-2 border-purple-600'
                        : 'shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Consulting Services Section */}
          <section id="consulting-services" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Consulting</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Consulting Services</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Strategic guidance for digital transformation and technology adoption
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Digital Strategy</h3>
                  <p className="text-gray-600 mb-4">Comprehensive digital transformation roadmaps</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Technology Advisory</h3>
                  <p className="text-gray-600 mb-4">Expert guidance on technology choices and architecture</p>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Process Optimization</h3>
                  <p className="text-gray-600 mb-4">Streamline workflows and improve efficiency</p>
                </div>
              </div>
            </div>
          </section>

          {/* Training Services Section */}
          <section id="training-services" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Training</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Training Services</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Upskill your team with cutting-edge technology training programs
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Development Bootcamps</h3>
                  <p className="text-gray-600 mb-4">Intensive training in modern development practices</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Cloud Certifications</h3>
                  <p className="text-gray-600 mb-4">AWS, Azure, and GCP certification programs</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Leadership Training</h3>
                  <p className="text-gray-600 mb-4">Tech leadership and team management skills</p>
                </div>
              </div>
            </div>
          </section>

          {/* Original Services Section */}
          <section id="services" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">What We Do</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Our Services</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Comprehensive solutions tailored to elevate your digital presence
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedService(idx)}
                    className={`bg-white p-8 rounded-2xl cursor-pointer transition-all ${
                      selectedService === idx 
                        ? 'shadow-2xl scale-105 border-2 border-purple-600' 
                        : 'shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Our Work</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Featured Projects</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Showcasing our best digital experiences that merge creativity with functionality
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => setActiveProject(project.id)}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <div className={`h-64 bg-gradient-to-br ${project.gradient} transform group-hover:scale-110 transition-transform duration-500`}></div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                          <p className="mb-4">{project.category}</p>
                          <button className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-black transition">
                            View Project
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section id="resources" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden shadow">
                {/* Drop your GIF at /public/resources.gif */}
                <img src="/resources.gif" alt="Resources" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4">Resources</h2>
                <p className="text-lg text-gray-600">Guides, playbooks, and demos to help you plan, build, and ship.</p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">What Clients Say</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-xl mb-12 text-white/90">Let&apos;s create something extraordinary together</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:shadow-2xl transition-all">
                  Get Free Consultation
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
                  View More Projects
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Context-specific sections shown when a left menu item is chosen */}
          <section id="overview" className="pt-28 lg:pt-32 pb-24 bg-white">
            <div className="container mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left rail - keep the same side menu */}
                <div className="hidden lg:block lg:col-span-3">
                  <aside className="sticky top-24 self-start" style={{marginLeft: '1rem'}}>
                    <div className="flex flex-col gap-4">
                      {/* Identity card */}
                      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
                        <h2 className="text-2xl font-extrabold leading-tight">Avada<br />Portfolio</h2>
                        <p className="text-sm text-gray-500 mt-2">Friday, September 12<br />New York City</p>
                      </div>

                      {/* Service quick menu: Development */}
                      <div className="bg-gray-100 rounded-2xl p-5 md:p-6 relative w-full">
                        <a
                          href="#development-services"
                          onClick={(e) => {
                            e.preventDefault();
                            setContextSlug(null);
                            document.getElementById('development-services')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors"
                        >
                          <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Development</span>
                          <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                        </a>
                        <ul className="divide-y divide-gray-300/70">
                          <li><button onClick={() => handleLeftNav('app-dev-modernization')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">App Dev &amp; Modernization</button></li>
                          <li><button onClick={() => handleLeftNav('api-microservices')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">API &amp; Microservices</button></li>
                          <li><button onClick={() => handleLeftNav('cloud-devsecops')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Cloud &amp; DevSecOps</button></li>
                          <li><button onClick={() => handleLeftNav('data-ai-analytics')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Data, AI &amp; Analytics</button></li>
                          <li><button onClick={() => handleLeftNav('qa-testing')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">QA &amp; Testing</button></li>
                        </ul>
                      </div>

                      {/* Service quick menu: Consulting */}
                      <div className="bg-indigo-50 rounded-2xl p-5 md:p-6 relative w-full">
                        <a
                          href="#consulting-services"
                          onClick={(e) => {
                            e.preventDefault();
                            setContextSlug(null);
                            document.getElementById('consulting-services')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors"
                        >
                          <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Consulting</span>
                          <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                        </a>
                        <ul className="divide-y divide-gray-300/70">
                          <li><button onClick={() => handleLeftNav('app-dev-modernization')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">App Dev &amp; Modernization</button></li>
                          <li><button onClick={() => handleLeftNav('api-microservices')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">API &amp; Microservices</button></li>
                          <li><button onClick={() => handleLeftNav('cloud-devsecops')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Cloud &amp; DevSecOps</button></li>
                          <li><button onClick={() => handleLeftNav('data-ai-analytics')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Data, AI &amp; Analytics</button></li>
                          <li><button onClick={() => handleLeftNav('qa-testing')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">QA &amp; Testing</button></li>
                        </ul>
                      </div>

                      {/* Service quick menu: Training */}
                      <div className="bg-rose-50 rounded-2xl p-5 md:p-6 relative w-full">
                        <a
                          href="#training-services"
                          onClick={(e) => {
                            e.preventDefault();
                            setContextSlug(null);
                            document.getElementById('training-services')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex items-baseline justify-start gap-3 mb-2 pb-2 border-b border-gray-300/70 hover:text-purple-700 transition-colors"
                        >
                          <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Training</span>
                          <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Services</span>
                        </a>
                        <ul className="divide-y divide-gray-300/70">
                          <li><button onClick={() => handleLeftNav('app-dev-modernization')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">App Dev &amp; Modernization</button></li>
                          <li><button onClick={() => handleLeftNav('api-microservices')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">API &amp; Microservices</button></li>
                          <li><button onClick={() => handleLeftNav('cloud-devsecops')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Cloud &amp; DevSecOps</button></li>
                          <li><button onClick={() => handleLeftNav('data-ai-analytics')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">Data, AI &amp; Analytics</button></li>
                          <li><button onClick={() => handleLeftNav('qa-testing')} className="w-full text-left block py-3 text-base hover:text-purple-700 hover:underline">QA &amp; Testing</button></li>
                        </ul>
                      </div>
                    </div>
                  </aside>
                </div>

                {/* Right content area */}
                <div className="relative lg:col-span-9" style={{marginRight: '0.5rem'}}>
                  <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <div className="mb-8">
                      <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Service Overview</span>
                      <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                        {contextSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h1>
                      <p className="text-xl text-gray-600">
                        Comprehensive solutions tailored for {contextSlug?.replace(/-/g, ' ')} needs.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">What We Deliver</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span>Strategic planning and roadmap development</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span>Technical architecture and design</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span>Implementation and deployment</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <span>Ongoing support and maintenance</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Accelerated time to market</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Reduced development costs</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Scalable and maintainable solutions</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Expert guidance and best practices</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="capabilities" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Our Capabilities</h2>
                <p className="text-lg text-gray-600">What we deliver for {contextSlug?.replace(/-/g, ' ')} projects</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Technical Excellence</h3>
                  <p className="text-gray-600">Cutting-edge technologies and proven methodologies</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Expert Team</h3>
                  <p className="text-gray-600">Experienced professionals with deep domain knowledge</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-yellow-600 rounded-xl flex items-center justify-center text-white mb-6">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Proven Results</h3>
                  <p className="text-gray-600">Track record of successful project deliveries</p>
                </div>
              </div>
            </div>
          </section>

          <section id="case-studies" className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
                <p className="text-lg text-gray-600">Success stories from {contextSlug?.replace(/-/g, ' ')} projects</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
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
              </div>
            </div>
          </section>

          <section id="contact" className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 text-white/90">Let's discuss your {contextSlug?.replace(/-/g, ' ')} project needs</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@avada.com" className="px-8 py-4 rounded-full bg-white text-purple-600 font-semibold hover:shadow-2xl transition-all">
                  Start Your Project
                </a>
                <button
                  onClick={() => setContextSlug(null)}
                  className="px-8 py-4 rounded-full border-2 border-white bg-transparent text-white font-semibold hover:bg-white hover:text-purple-600 transition-all"
                >
                  Back to Services
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
              <h3 className="text-2xl font-bold mb-4">Avada Portfolio</h3>
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
                  New York, NY
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Avada Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}