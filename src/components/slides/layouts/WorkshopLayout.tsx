import React from 'react';
import { SlideRendererProps } from '../../../types';
import SlideHeader from '../content/SlideHeader';
import SlideContent from '../content/SlideContent';
import InteractivePanel from '../InteractivePanel';

// Layout optimized for workshop activities
const WorkshopLayout: React.FC<SlideRendererProps> = ({ slide, isActive: _isActive }) => {
  return (
    <div className="slide-workshop h-full flex flex-col">
      {/* Slide Header */}
      <SlideHeader title={slide.title} subtitle={slide.subtitle} />

      {/* Main Content Area - Workshop style */}
      <div className="flex-1 grid grid-cols-3 gap-6 p-4">
        {/* Left Column - Instructions */}
        <div className="col-span-1">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 h-full">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Instructions</h3>
            <SlideContent content={slide.content} />
          </div>
        </div>

        {/* Center Column - Main Activity */}
        <div className="col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity</h3>
            <div className="text-center text-gray-500">
              Main activity area
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Elements */}
        <div className="col-span-1">
          {slide.interactive_elements && slide.interactive_elements.length > 0 ? (
            <InteractivePanel
              elements={slide.interactive_elements}
              slideId={slide.id}
            />
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                Interactive tools will appear here
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Workshop Timer */}
      {slide.timer_minutes && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <WorkshopTimer
            minutes={slide.timer_minutes}
            onComplete={onComplete}
          />
        </div>
      )}
    </div>
  );
};

// Timer component
const WorkshopTimer: React.FC<{ minutes: number; onComplete?: () => void }> = ({
  minutes,
  onComplete
}) => {
  const [timeLeft, setTimeLeft] = React.useState(minutes * 60);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((minutes * 60 - timeLeft) / (minutes * 60)) * 100;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-ai-blue to-ai-cyan transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">
          Workshop Time: {formatTime(timeLeft)}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-2 text-sm font-medium rounded ${
            isActive
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {isActive ? 'Pause Timer' : 'Start Workshop'}
        </button>
      </div>
    </div>
  );
};

export default WorkshopLayout;
