import React from 'react';
import { usePresentationStore } from '../stores/presentationStore';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const NavigationControls: React.FC = () => {
  const {
    currentSlideIndex,
    slides,
    previousSlide,
    nextSlide,
    resetPresentation
  } = usePresentationStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-30 h-12 flex items-center justify-center">
      <div className="flex items-center justify-center space-x-4 px-4 sm:px-6 lg:px-8">
          {/* Previous button */}
          <button
            onClick={previousSlide}
            disabled={currentSlideIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous slide (← or ↑)"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Reset button */}
          <button
            onClick={resetPresentation}
            disabled={currentSlideIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-100 border border-orange-300 rounded-md text-orange-700 hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Reset to first slide"
          >
            <RotateCcw className="h-5 w-5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Next button */}
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-ai-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Next slide (→, ↓, or spacebar)"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
    </div>
  );
};

export default NavigationControls;
