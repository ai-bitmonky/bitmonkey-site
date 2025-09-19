'use client';

import React, { useState } from 'react';
import {
  GlassLightSweep,
  IconMicroRig,
  ProgressDotsRadial,
  SignatureButton
} from './SignatureMicroInteractions';
import {
  Zap,
  Star,
  Heart,
  Target,
  Sparkles,
  ArrowRight,
  Download,
  Play
} from 'lucide-react';

export default function MicroInteractionsShowcase() {
  const [progressStep, setProgressStep] = useState(3);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Signature
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Micro-Interactions</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Premium feel for CTAs, enhanced glass morphism, animated icons, and better progress indicators
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          {/* Magnetic Cursor Demo */}
          <GlassLightSweep className="glass-panel p-8 rounded-2xl">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enhanced Magnetic Cursor</h3>
              <p className="text-gray-600 mb-6">Move your cursor near these buttons to feel the magnetic attraction</p>

              <div className="space-y-4">
                <SignatureButton
                  variant="primary"
                  className="magnetic-enhanced w-full"
                  magnetic={true}
                  glassSweep={true}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Primary Action
                </SignatureButton>

                <SignatureButton
                  variant="secondary"
                  className="magnetic-enhanced w-full"
                  magnetic={true}
                  glassSweep={true}
                >
                  <Star className="w-5 h-5 mr-2" />
                  Secondary Action
                </SignatureButton>
              </div>
            </div>
          </GlassLightSweep>

          {/* Glass Light Sweep Demo */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Glass Light Sweep</h3>

            <GlassLightSweep
              triggerOnHover={true}
              direction="diagonal"
              intensity="medium"
              className="glass-panel p-6 rounded-xl"
            >
              <div className="text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">Diagonal Sweep</h4>
                <p className="text-sm text-gray-600">Hover to see the light sweep</p>
              </div>
            </GlassLightSweep>

            <GlassLightSweep
              triggerOnHover={true}
              direction="horizontal"
              intensity="strong"
              className="glass-panel p-6 rounded-xl"
            >
              <div className="text-center">
                <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">Horizontal Sweep</h4>
                <p className="text-sm text-gray-600">Enhanced glass morphism</p>
              </div>
            </GlassLightSweep>
          </div>

          {/* Icon Micro-Rigs Demo */}
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Icon Micro-Rigs</h3>
            <p className="text-gray-600 mb-6 text-center text-sm">6° rotate + 2px lift on hover</p>

            <div className="grid grid-cols-3 gap-4">
              <IconMicroRig intensity="medium" className="flex flex-col items-center p-4 bg-white/50 rounded-lg">
                <Sparkles className="w-8 h-8 text-purple-500 mb-2" />
                <span className="text-xs font-medium">Magic</span>
              </IconMicroRig>

              <IconMicroRig intensity="strong" className="flex flex-col items-center p-4 bg-white/50 rounded-lg">
                <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                <span className="text-xs font-medium">Power</span>
              </IconMicroRig>

              <IconMicroRig intensity="subtle" className="flex flex-col items-center p-4 bg-white/50 rounded-lg">
                <Star className="w-8 h-8 text-blue-500 mb-2" />
                <span className="text-xs font-medium">Star</span>
              </IconMicroRig>
            </div>
          </div>

        </div>

        {/* Progress Dots Demo */}
        <div className="glass-panel p-8 rounded-2xl mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Progress Dots with Radial Wipe</h3>
            <p className="text-gray-600 mb-6">Better than current scroll progress indicators</p>

            <div className="flex justify-center mb-8">
              <ProgressDotsRadial
                total={5}
                current={progressStep}
                size="lg"
                color="#8B5CF6"
              />
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setProgressStep(Math.max(1, progressStep - 1))}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={progressStep <= 1}
              >
                Previous
              </button>
              <button
                onClick={() => setProgressStep(Math.min(5, progressStep + 1))}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                disabled={progressStep >= 5}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">Experience the Premium Feel</h3>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Every interaction has been carefully crafted to provide tactile feedback and visual delight.
            These micro-interactions make your interface feel alive and responsive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignatureButton
              variant="primary"
              size="lg"
              className="magnetic-enhanced bg-white text-purple-900 hover:bg-gray-100"
              magnetic={true}
              glassSweep={true}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Component
              <ArrowRight className="w-5 h-5 ml-2" />
            </SignatureButton>

            <SignatureButton
              variant="ghost"
              size="lg"
              className="magnetic-enhanced border-white text-white hover:bg-white/10"
              magnetic={true}
              glassSweep={true}
            >
              <Play className="w-5 h-5 mr-2" />
              View Demo
            </SignatureButton>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Enhanced Magnetic Attraction</h4>
            <p className="text-gray-600">Buttons and interactive elements now have intelligent gravity fields that attract your cursor for premium UX feel.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Glass Light Sweeps</h4>
            <p className="text-gray-600">Dynamic light sweeps enhance your existing glass morphism effects with smooth directional animations.</p>
          </div>
        </div>

      </div>
    </section>
  );
}