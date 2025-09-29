import React from 'react';
import { SlideRendererProps } from '../../../types';
import SlideHeader from '../content/SlideHeader';
import SlideContent from '../content/SlideContent';
import InteractivePanel from '../InteractivePanel';

const TwoColumnLayout: React.FC<SlideRendererProps> = ({ slide, isActive: _isActive }) => {
  return (
    <div className="slide-two-column h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Slide Header */}
      <SlideHeader title={slide.title} subtitle={slide.subtitle} />

      {/* Main Content Area - Two Columns */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12 overflow-hidden">
        {/* Left Column - Content */}
        <div className="flex flex-col overflow-y-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <SlideContent content={slide.content} />
          </div>
        </div>

        {/* Right Column - Interactive Elements */}
        <div className="flex flex-col overflow-y-auto">
          {slide.interactive_elements && slide.interactive_elements.length > 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <InteractivePanel
                elements={slide.interactive_elements}
                slideId={slide.id}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-6 opacity-20">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Interactive elements will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
