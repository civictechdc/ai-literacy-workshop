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
    <div className="slide-standard h-full flex flex-col">
      {/* Slide Header */}
      <div>
        <SlideHeader title={slide.title} subtitle={slide.subtitle} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Content */}
        <div className="flex-1 px-8 py-4">
          <SlideContent content={slide.content} />
        </div>

        {/* Right Sidebar - Only show if there are interactive elements or an image */}
        {(slide.interactive_elements && slide.interactive_elements.length > 0) || slideImage ? (
          <div className="w-96 backdrop-blur-sm bg-white/90">
            {slide.interactive_elements && slide.interactive_elements.length > 0 ? (
              <InteractivePanel
                elements={slide.interactive_elements}
                slideId={slide.id}
              />
            ) : slideImage ? (
              <div className="p-4 flex flex-col items-center justify-center h-full">
                <img
                  src={slideImage}
                  alt={slide.title || 'Slide image'}
                  className="max-w-full max-h-[1400px] object-contain rounded-lg shadow-lg"
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
