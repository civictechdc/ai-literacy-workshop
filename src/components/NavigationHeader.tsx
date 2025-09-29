import React, { useState } from 'react';
import { usePresentationStore } from '../stores/presentationStore';
import { BookOpen, Settings, Grid3X3 } from 'lucide-react';
import ApiKeySettings from './ApiKeySettings';
import SlideGallery from './SlideGallery';

const NavigationHeader: React.FC = () => {
  const { currentSlideIndex, slides } = usePresentationStore();
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [showSlideGallery, setShowSlideGallery] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 h-12 flex items-center">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          {/* Left side - Title and slide info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-ai-blue flex-shrink-0" />
              <h1 className="text-base font-semibold text-gray-900 leading-none">
                AI Literacy Workshop
              </h1>
            </div>
            <div className="text-sm text-gray-500 leading-none">
              {currentSlideIndex + 1} / {slides.length}
            </div>
          </div>

          {/* Right side - Gallery and Settings */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSlideGallery(true)}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="Slide Gallery"
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </button>
            <button
              onClick={() => setShowApiSettings(true)}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="API Settings"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">API Key</span>
            </button>
          </div>
        </div>
      </div>

      {/* API Key Settings Modal */}
      <ApiKeySettings
        isOpen={showApiSettings}
        onClose={() => setShowApiSettings(false)}
      />

      {/* Slide Gallery Modal */}
      <SlideGallery
        isOpen={showSlideGallery}
        onClose={() => setShowSlideGallery(false)}
      />
    </header>
  );
};

export default NavigationHeader;
