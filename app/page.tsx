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
  const contextNav = ['Overview', 'Capabilities', 'Case Studies', 'Contact'];
  const currentNav = contextSlug ? contextNav : baseNav;

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
        <div className="mx-auto max-w-7xl px-6">
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
                    onClick={() => {
                      if (item === 'Home') setContextSlug(null);
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
                      onClick={() => {
                        if (item === 'Home') setContextSlug(null);
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
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          {/* Left rail column (adds outer padding from the page edge) */}
          <div className="hidden lg:block lg:col-span-3">
            <aside className="sticky top-24 self-start pl-3 pr-2">
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
                  href="#services"
                  onClick={() => setContextSlug(null)}
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
                  href="#services"
                  onClick={() => setContextSlug(null)}
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
                  href="#services"
                  onClick={() => setContextSlug(null)}
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

          {/* Right hero */}
          <div className="relative lg:col-span-9 min-h-[80vh] rounded-3xl overflow-hidden bg-black bg-[url('/hero-poster.jpg')] bg-cover bg-center">
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
          {/* Services Section */}
          <section id="services" className="py-24 bg-gray-50">
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
          <section id="overview" className="py-24 bg-white">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden shadow">
                <img src={`/gifs/${contextSlug}-overview.gif`} alt="Overview" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4">Overview</h2>
                <p className="text-lg text-gray-600">High-level summary for {contextSlug?.replace(/-/g, ' ')}. Drop a GIF at <code>{`/public/gifs/${contextSlug}-overview.gif`}</code> to illustrate.</p>
              </div>
            </div>
          </section>
          <section id="capabilities" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden shadow">
                <img src={`/gifs/${contextSlug}-capabilities.gif`} alt="Capabilities" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4">Capabilities</h2>
                <p className="text-lg text-gray-600">What we deliver for {contextSlug?.replace(/-/g, ' ')}—architecture, tooling, and delivery approach.</p>
              </div>
            </div>
          </section>
          <section id="case-studies" className="py-24 bg-white">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden shadow">
                <img src={`/gifs/${contextSlug}-case-studies.gif`} alt="Case studies" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
                <p className="text-lg text-gray-600">Selected outcomes and impact metrics aligned to {contextSlug?.replace(/-/g, ' ')}.</p>
              </div>
            </div>
          </section>
          <section id="contact" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-4">Let&apos;s Talk</h2>
              <p className="text-lg text-gray-600 mb-8">Tell us about your {contextSlug?.replace(/-/g, ' ')} needs.</p>
              <a href="mailto:hello@avada.com" className="px-8 py-4 rounded-full bg-purple-600 text-white font-semibold inline-block">Email Us</a>
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