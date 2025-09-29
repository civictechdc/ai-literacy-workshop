import React from 'react';
import { usePresentationStore } from '../stores/presentationStore';
import { X, Play } from 'lucide-react';
import { Slide } from '../../types';

interface SlideGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SlidePreviewProps {
  slide: Slide;
  index: number;
  isCurrent: boolean;
  onClick: () => void;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({ slide, index, isCurrent, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
        ${isCurrent
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
    >
      {/* Slide number badge */}
      <div className={`
        absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
        ${isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
      `}>
        {index + 1}
      </div>

      {/* Current slide indicator */}
      {isCurrent && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 text-blue-600">
          <Play className="h-3 w-3 fill-current" />
          <span className="text-xs font-medium">Current</span>
        </div>
      )}

      {/* Slide content preview */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
          {slide.title}
        </h3>
        {slide.subtitle && (
          <p className="text-xs text-gray-600 line-clamp-1 mb-2">
            {slide.subtitle}
          </p>
        )}
        {slide.content.description && (
          <p className="text-xs text-gray-500 line-clamp-2">
            {slide.content.description}
          </p>
        )}
      </div>

      {/* Slide type indicator */}
      <div className="absolute bottom-2 right-2">
        <span className={`
          inline-block px-2 py-1 text-xs rounded-full font-medium
          ${slide.type === 'title' ? 'bg-purple-100 text-purple-700' :
            slide.type === 'workshop' ? 'bg-green-100 text-green-700' :
            slide.type === 'qa' ? 'bg-orange-100 text-orange-700' :
            'bg-blue-100 text-blue-700'
          }
        `}>
          {slide.type}
        </span>
      </div>
    </div>
  );
};

const SlideGallery: React.FC<SlideGalleryProps> = ({ isOpen, onClose }) => {
  const { slides, currentSlideIndex, navigateToSlide } = usePresentationStore();

  const handleSlideClick = (index: number) => {
    navigateToSlide(index);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Slide Gallery</h2>
            <p className="text-sm text-gray-600">
              Select a slide to jump to ({slides.length} slides total)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Slide grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {slides.map((slide, index) => (
              <SlidePreview
                key={slide.id}
                slide={slide}
                index={index}
                isCurrent={index === currentSlideIndex}
                onClick={() => handleSlideClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Footer with current slide info */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Currently viewing: <span className="font-semibold text-gray-900">
                Slide {currentSlideIndex + 1} - {slides[currentSlideIndex]?.title}
              </span>
            </div>
            <div className="text-gray-500">
              Use keyboard shortcuts or click slides to navigate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideGallery;
