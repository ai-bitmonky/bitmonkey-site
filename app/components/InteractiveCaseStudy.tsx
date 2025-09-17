'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface CaseStudyStep {
  title: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  metrics?: { label: string; value: string; color: string }[];
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  beforeImage: string;
  afterImage: string;
  steps: CaseStudyStep[];
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
}

interface InteractiveCaseStudyProps {
  caseStudies: CaseStudy[];
}

export default function InteractiveCaseStudy({ caseStudies }: InteractiveCaseStudyProps) {
  const [activeStudy, setActiveStudy] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [dragPosition, setDragPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentStudy = caseStudies[activeStudy];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleDrag(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDrag(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setDragPosition(percentage);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setDragPosition(percentage);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging]);

  const nextStudy = () => {
    setActiveStudy((prev) => (prev + 1) % caseStudies.length);
    setActiveStep(0);
    setDragPosition(50);
  };

  const prevStudy = () => {
    setActiveStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    setActiveStep(0);
    setDragPosition(50);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Case Study Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              onClick={() => {
                setActiveStudy(index);
                setActiveStep(0);
                setDragPosition(50);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                index === activeStudy
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {study.category}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevStudy}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextStudy}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold mb-2">{currentStudy.title}</h3>
          <p className="text-lg text-gray-600 mb-1">{currentStudy.client}</p>
          <p className="text-gray-500">{currentStudy.summary}</p>
        </div>

        <div
          ref={sliderRef}
          className="relative w-full h-96 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border-4 border-white shadow-2xl"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ userSelect: 'none' }}
        >
          {/* Before Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentStudy.beforeImage})`,
              clipPath: `polygon(0 0, ${dragPosition}% 0, ${dragPosition}% 100%, 0 100%)`
            }}
          />

          {/* After Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentStudy.afterImage})`,
              clipPath: `polygon(${dragPosition}% 0, 100% 0, 100% 100%, ${dragPosition}% 100%)`
            }}
          />

          {/* Drag Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-grab active:cursor-grabbing"
            style={{ left: `${dragPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
            Before
          </div>
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
            After
          </div>
        </div>

        {/* Instructions */}
        <p className="text-center text-gray-500 mt-4 text-sm">
          Drag the slider to compare before and after
        </p>
      </div>

      {/* Process Timeline */}
      <div className="mb-12">
        <h4 className="text-2xl font-bold mb-6 text-center">Project Journey</h4>

        {/* Timeline Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-4 bg-gray-100 rounded-lg p-1">
            {currentStudy.steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  index === activeStep
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Step {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h5 className="text-xl font-bold mb-2">{currentStudy.steps[activeStep].title}</h5>
            <p className="text-gray-600">{currentStudy.steps[activeStep].description}</p>
          </div>

          {/* Step Metrics */}
          {currentStudy.steps[activeStep].metrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentStudy.steps[activeStep].metrics!.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg">
                  <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h4 className="text-2xl font-bold mb-6 text-center">Key Results</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentStudy.results.map((result, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{result.value}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{result.metric}</div>
              <div className="text-sm text-green-600 flex items-center justify-center gap-1">
                <ArrowRight className="w-4 h-4" />
                {result.improvement}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}