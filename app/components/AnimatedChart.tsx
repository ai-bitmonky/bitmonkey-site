'use client';

import React, { useEffect, useState, useRef } from 'react';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface AnimatedChartProps {
  data: DataPoint[];
  type?: 'bar' | 'line' | 'pie';
  height?: number;
  width?: number;
  animationDuration?: number;
  className?: string;
}

export const AnimatedChart: React.FC<AnimatedChartProps> = ({
  data,
  type = 'bar',
  height = 200,
  width = 300,
  animationDuration = 1500,
  className = ''
}) => {
  const [animated, setAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setAnimated(true);
          }, 200);
        }
      },
      { threshold: 0.1 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    // Fallback to ensure animation triggers
    const fallbackTimer = setTimeout(() => {
      setAnimated(true);
    }, 3000);

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (type === 'bar') {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
      <div
        ref={chartRef}
        className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-realistic shadow-transition border border-white/20 ${className}`}
        style={{ width, height }}
      >
        <div className="flex items-end gap-3 h-full pb-12">
          {data.map((item, index) => (
            <div key={item.label} className="flex flex-col items-center flex-1">
              <div
                className="w-full min-w-[40px] rounded-t-lg transition-all ease-out relative overflow-hidden shadow-realistic-sm"
                style={{
                  height: animated ? `${Math.max(20, (item.value / maxValue) * 120)}px` : '0px',
                  minHeight: animated ? '20px' : '0px',
                  backgroundColor: item.color.replace('text-', '').includes('purple') ? '#8B5CF6' :
                                   item.color.replace('text-', '').includes('blue') ? '#3B82F6' :
                                   item.color.replace('text-', '').includes('green') ? '#10B981' :
                                   item.color.replace('text-', '').includes('orange') ? '#F59E0B' :
                                   item.color.replace('text-', '').includes('red') ? '#EF4444' : '#6B7280',
                  transitionDuration: '2000ms',
                  transitionDelay: `${index * 400}ms`,
                  transform: animated ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'bottom'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/40"></div>
                {animated && (
                  <div className="absolute inset-0 bg-white/40 animate-pulse"></div>
                )}
                {/* Value display on bar */}
                <div
                  className="absolute top-2 left-0 right-0 text-center text-white font-bold text-xs drop-shadow-md"
                  style={{
                    opacity: animated ? 1 : 0,
                    transitionDelay: `${index * 400 + 1000}ms`,
                    transition: 'opacity 500ms ease-out'
                  }}
                >
                  {item.value}%
                </div>
              </div>
              <span
                className="text-xs mt-3 text-gray-800 text-center font-medium transition-all duration-500"
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: `${index * 400 + 1200}ms`
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'line') {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * (width - 60),
      y: height - 60 - ((item.value / maxValue) * (height - 80))
    }));

    const pathLength = points.reduce((acc, point, index) => {
      if (index === 0) return 0;
      const prevPoint = points[index - 1];
      return acc + Math.sqrt(Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2));
    }, 0);

    return (
      <div
        ref={chartRef}
        className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-realistic shadow-transition border border-white/20 ${className}`}
        style={{ width, height }}
      >
        <svg width={width - 32} height={height - 32} className="overflow-visible">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>

          <polyline
            points={points.map(p => `${p.x + 20},${p.y + 20}`).join(' ')}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: animated ? 0 : pathLength,
              transition: 'stroke-dashoffset 2000ms ease-out',
              transitionDelay: '300ms'
            }}
          />

          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x + 20}
                cy={point.y + 20}
                r="5"
                fill="white"
                stroke="#8B5CF6"
                strokeWidth="3"
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'scale(1)' : 'scale(0)',
                  transformOrigin: 'center',
                  transition: 'all 0.8s ease-out',
                  transitionDelay: `${index * 200 + 1200}ms`
                }}
              />
              <text
                x={point.x + 20}
                y={height - 25}
                textAnchor="middle"
                className="text-xs fill-gray-700 font-medium"
                style={{
                  opacity: animated ? 1 : 0,
                  transition: 'opacity 0.5s ease-out',
                  transitionDelay: `${index * 200 + 1600}ms`
                }}
              >
                {data[index].label}
              </text>
              <text
                x={point.x + 20}
                y={point.y + 15}
                textAnchor="middle"
                className="text-xs font-bold fill-gray-900"
                style={{
                  opacity: animated ? 1 : 0,
                  transition: 'opacity 0.5s ease-out',
                  transitionDelay: `${index * 200 + 1800}ms`
                }}
              >
                {data[index].value}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;
    const radius = Math.min(width, height) / 2 - 50;
    const centerX = (width - 32) / 2;
    const centerY = (height - 60) / 2;

    return (
      <div
        ref={chartRef}
        className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-realistic shadow-transition border border-white/20 ${className}`}
        style={{ width, height }}
      >
        <svg width={width - 32} height={height - 60}>
          <defs>
            {data.map((item, index) => (
              <linearGradient key={index} id={`pieGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={
                  item.color.includes('purple') ? '#A855F7' :
                  item.color.includes('blue') ? '#3B82F6' :
                  item.color.includes('green') ? '#10B981' :
                  item.color.includes('orange') ? '#F59E0B' :
                  item.color.includes('red') ? '#EF4444' : '#6B7280'
                } />
                <stop offset="100%" stopColor={
                  item.color.includes('purple') ? '#7C3AED' :
                  item.color.includes('blue') ? '#1D4ED8' :
                  item.color.includes('green') ? '#047857' :
                  item.color.includes('orange') ? '#D97706' :
                  item.color.includes('red') ? '#DC2626' : '#4B5563'
                } />
              </linearGradient>
            ))}
          </defs>

          {data.map((item, index) => {
            const angle = (item.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            const x1 = centerX + Math.cos((startAngle * Math.PI) / 180) * radius;
            const y1 = centerY + Math.sin((startAngle * Math.PI) / 180) * radius;
            const x2 = centerX + Math.cos((endAngle * Math.PI) / 180) * radius;
            const y2 = centerY + Math.sin((endAngle * Math.PI) / 180) * radius;

            const largeArc = angle > 180 ? 1 : 0;

            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');

            currentAngle += angle;

            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={`url(#pieGradient${index})`}
                  stroke="white"
                  strokeWidth="3"
                  style={{
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                    transformOrigin: `${centerX}px ${centerY}px`,
                    transition: 'all 1200ms ease-out',
                    transitionDelay: `${index * 300}ms`
                  }}
                />
              </g>
            );
          })}

          {data.map((item, index) => {
            const angle = data.slice(0, index).reduce((sum, d) => sum + d.value, 0) / total * 360 +
                         (item.value / total * 360) / 2 - 90;
            const labelRadius = radius * 0.6;
            const x = centerX + Math.cos((angle * Math.PI) / 180) * labelRadius;
            const y = centerY + Math.sin((angle * Math.PI) / 180) * labelRadius;

            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold fill-white drop-shadow-sm"
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'scale(1)' : 'scale(0)',
                  transition: 'all 0.6s ease-out',
                  transitionDelay: `${index * 300 + 1000}ms`
                }}
              >
                {item.value}%
              </text>
            );
          })}
        </svg>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs bg-white/50 rounded-full px-2 py-1"
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.5s ease-out',
                transitionDelay: `${index * 150 + 1400}ms`
              }}
            >
              <div
                className="w-3 h-3 rounded-full shadow-sm"
                style={{
                  backgroundColor: item.color.includes('purple') ? '#8B5CF6' :
                                   item.color.includes('blue') ? '#3B82F6' :
                                   item.color.includes('green') ? '#10B981' :
                                   item.color.includes('orange') ? '#F59E0B' :
                                   item.color.includes('red') ? '#EF4444' : '#6B7280'
                }}
              ></div>
              <span className="text-gray-800 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default AnimatedChart;