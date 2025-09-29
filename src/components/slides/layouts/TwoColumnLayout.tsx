import React from 'react';
import { SlideRendererProps } from '../../../types';
import SlideHeader from '../content/SlideHeader';
import SlideContent from '../content/SlideContent';
import InteractivePanel from '../InteractivePanel';

const TwoColumnLayout: React.FC<SlideRendererProps> = ({ slide, isActive: _isActive }) => {
  return (
    <div className="slide-two-column h-full flex flex-col">
      {/* Slide Header */}
      <SlideHeader title={slide.title} subtitle={slide.subtitle} />

      {/* Main Content Area - Two Columns */}
      <div className="flex-1 grid grid-cols-2 gap-8 p-4">
        {/* Left Column - Content */}
        <div className="flex flex-col">
          <SlideContent content={slide.content} />
        </div>

        {/* Right Column - Interactive Elements */}
        <div className="flex flex-col">
          {slide.interactive_elements && slide.interactive_elements.length > 0 ? (
            <InteractivePanel
              elements={slide.interactive_elements}
              slideId={slide.id}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <p>Interactive elements will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default TwoColumnLayout;
