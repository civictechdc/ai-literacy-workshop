import React, { useEffect } from 'react';
import { useCurrentSlide, usePresentationStore } from '../stores/presentationStore';
import NavigationHeader from './NavigationHeader';
import SlideRenderer from './slides/SlideRenderer';
import NavigationControls from './NavigationControls';
import ChatAssistant from './ChatAssistant';

const PresentationShell: React.FC = () => {
  const currentSlide = useCurrentSlide();
  const { nextSlide, previousSlide } = usePresentationStore();

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      if (event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLElement && event.target.contentEditable === 'true') {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          previousSlide();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
          event.preventDefault();
          nextSlide();
          break;
        case 'Home':
          event.preventDefault();
          usePresentationStore.getState().navigateToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          const totalSlides = usePresentationStore.getState().slides.length;
          usePresentationStore.getState().navigateToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, previousSlide]);

  if (!currentSlide) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ai-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <NavigationHeader />

      {/* Main Content Area */}
      <main className="flex-1 relative">
        {/* Slide Container - Full height available */}
        <div className="slide-container mx-auto h-full">
          <SlideRenderer
            slide={currentSlide}
            isActive={true}
            onComplete={() => {
              // Handle slide completion
              console.log('Slide completed:', currentSlide.id);
            }}
          />
        </div>

        {/* Navigation Controls */}
        <NavigationControls />

        {/* Chat Assistant */}
        <ChatAssistant />
      </main>
    </div>
  );
};

export default PresentationShell;
