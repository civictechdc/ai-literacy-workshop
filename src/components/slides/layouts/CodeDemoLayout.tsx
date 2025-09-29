import React from 'react';
import { SlideRendererProps } from '../../../types';
import SlideHeader from '../content/SlideHeader';
import SlideContent from '../content/SlideContent';
import InteractivePanel from '../InteractivePanel';
import CodeWindow from '../CodeWindow';

const CodeDemoLayout: React.FC<SlideRendererProps> = ({ slide, isActive: _isActive, onComplete: _onComplete }) => {
  return (
    <div className="slide-code-demo h-full flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Slide Header */}
      <SlideHeader title={slide.title} subtitle={slide.subtitle} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden gap-0">
        {/* Left side - Content */}
        <div className="flex-1 px-6 py-8 lg:px-10 lg:py-10 overflow-y-auto">
          <div className="max-w-3xl">
            <SlideContent content={slide.content} />
          </div>
        </div>

        {/* Right side - Code windows and interactive elements */}
        <div className="w-full lg:w-[45%] xl:w-[42%] bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 flex flex-col shadow-2xl border-t lg:border-t-0 lg:border-l border-slate-700">
          {/* Code Windows */}
          <div className="flex-1 p-6 overflow-y-auto">
            {slide.code_windows && slide.code_windows.length > 0 ? (
              <div className="space-y-6">
                {slide.code_windows.map((window) => (
                  <CodeWindow key={window.id} window={window} />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12 text-sm">
                <div className="text-4xl mb-4 opacity-30">{'</>'}</div>
                No code windows defined for this slide
              </div>
            )}
          </div>

          {/* Interactive Elements */}
          {slide.interactive_elements && slide.interactive_elements.length > 0 && (
            <div className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
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
