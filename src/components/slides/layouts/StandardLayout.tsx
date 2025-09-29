import React from 'react';
import { SlideRendererProps } from '../../../types';
import SlideHeader from '../content/SlideHeader';
import SlideContent from '../content/SlideContent';
import InteractivePanel from '../InteractivePanel';
const StandardLayout: React.FC<SlideRendererProps> = ({ slide, isActive: _isActive }) => {
  const getImageFilename = (prompt: string) => {
    // Simple hash function to generate consistent filename from prompt
    let hash = 0;
    for (let i = 0; i < prompt.length; i++) {
      const char = prompt.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  };

  const slideImage = slide.image
    ? slide.image
    : slide.ai_image_prompt
    ? `/generated-images/${getImageFilename(slide.ai_image_prompt)}.png`
    : undefined;

  return (
    <div className="slide-standard h-full flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Slide Header */}
      <SlideHeader title={slide.title} subtitle={slide.subtitle} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Content */}
        <div className="flex-1 px-6 py-8 lg:px-12 lg:py-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <SlideContent content={slide.content} />
          </div>
        </div>

        {/* Right Sidebar - Only show if there are interactive elements or an image */}
        {(slide.interactive_elements && slide.interactive_elements.length > 0) || slideImage ? (
          <div className="w-full lg:w-[28rem] xl:w-[32rem] bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shadow-xl">
            {slide.interactive_elements && slide.interactive_elements.length > 0 ? (
              <div className="h-full overflow-y-auto">
                <InteractivePanel
                  elements={slide.interactive_elements}
                  slideId={slide.id}
                />
              </div>
            ) : slideImage ? (
              <div className="p-8 flex flex-col items-center justify-center h-full">
                <img
                  src={slideImage}
                  alt={slide.ai_image_prompt || slide.title || 'Slide image'}
                  className="max-w-full max-h-[500px] lg:max-h-[600px] object-contain rounded-xl shadow-2xl ring-1 ring-gray-200"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StandardLayout;
