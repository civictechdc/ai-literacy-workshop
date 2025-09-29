import React from 'react';
import { SlideRendererProps } from '../../../types';
import SlideHeader from '../content/SlideHeader';
import SlideContent from '../content/SlideContent';
import InteractivePanel from '../InteractivePanel';
import CodeWindow from '../CodeWindow';

const CodeDemoLayout: React.FC<SlideRendererProps> = ({ slide, isActive: _isActive, onComplete: _onComplete }) => {
  return (
    <div className="slide-code-demo h-full flex flex-col">
      {/* Slide Header */}
      <SlideHeader title={slide.title} subtitle={slide.subtitle} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left side - Content */}
        <div className="flex-1 p-4 border-r border-gray-200 overflow-y-auto">
          <SlideContent content={slide.content} />
        </div>

        {/* Right side - Code windows and interactive elements */}
        <div className="basis-5/12 min-w-[18rem] max-w-xl bg-gray-900 flex flex-col border-l border-gray-800">
          {/* Code Windows */}
          <div className="flex-1 p-4 overflow-y-auto">
            {slide.code_windows && slide.code_windows.length > 0 ? (
              <div className="space-y-4">
                {slide.code_windows.map((window) => (
                  <CodeWindow key={window.id} window={window} />
                ))}
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                No code windows defined for this slide
              </div>
            )}
          </div>

          {/* Interactive Elements */}
          {slide.interactive_elements && slide.interactive_elements.length > 0 && (
            <div className="border-t border-gray-700 bg-gray-900/95">
              <InteractivePanel
                elements={slide.interactive_elements}
                slideId={slide.id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeDemoLayout;
