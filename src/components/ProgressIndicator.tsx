import React from 'react';
import { usePresentationStore } from '../stores/presentationStore';
import { CheckCircle, Clock } from 'lucide-react';

const ProgressIndicator: React.FC = () => {
  const { overallProgress, currentSlideIndex, slides, slideProgress } = usePresentationStore();

  const currentSlide = slides[currentSlideIndex];
  const currentSlideProgress = slideProgress.get(currentSlideIndex) || { activitiesCompleted: [] };

  // Calculate workshop progress
  const workshopSlides = slides.filter(slide => slide.type === 'workshop');
  const completedWorkshops = workshopSlides.filter((_, index) => {
    const progress = slideProgress.get(slides.findIndex(s => s === workshopSlides[index]));
    return (progress?.activitiesCompleted?.length || 0) > 0;
  }).length;

  return (
    <div className="fixed top-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between text-sm">
          {/* Overall Progress */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-ai-blue to-ai-cyan h-2 rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="text-gray-600 font-medium">
                {overallProgress}% Complete
              </span>
            </div>

            {/* Workshop Progress */}
            <div className="flex items-center space-x-1 text-gray-500">
              <CheckCircle className="h-4 w-4" />
              <span>{completedWorkshops}/{workshopSlides.length} Workshops</span>
            </div>
          </div>

          {/* Current Slide Status */}
          <div className="flex items-center space-x-2">
            {currentSlide?.timer_minutes && (
              <div className="flex items-center space-x-1 text-amber-600">
                <Clock className="h-4 w-4" />
                <span>{currentSlide.timer_minutes} min</span>
              </div>
            )}

            {currentSlide?.progress_tracking && currentSlideProgress && (
              <div className="flex items-center space-x-1">
                {(currentSlideProgress.activitiesCompleted?.length || 0) > 0 ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                )}
                <span className="text-gray-600">
                  {currentSlideProgress.activitiesCompleted?.length || 0} activities completed
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
