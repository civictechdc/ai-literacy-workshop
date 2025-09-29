import { useEffect } from 'react';
import { slidesDataOrdered } from '../slides-data';
import { usePresentationStore, startAutoSave } from './stores/presentationStore';
import PresentationShell from './components/PresentationShell';
import React from 'react';

function App() {
  const { initializeSlides, loadProgress } = usePresentationStore();

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize slides first
      initializeSlides(slidesDataOrdered);

      // Then load progress (which depends on slides being initialized)
      await loadProgress();

      // Start auto-save functionality
      startAutoSave();
    };

    initializeApp();

    // Cleanup on unmount
    return () => {
      // Note: In a real app, you'd want to call stopAutoSave here
      // but for simplicity, we'll let it run during the session
    };
  }, [initializeSlides, loadProgress, startAutoSave]);

  return (
    <div className="presentation-container min-h-screen">
      <PresentationShell />
    </div>
  );
}

export default App;
