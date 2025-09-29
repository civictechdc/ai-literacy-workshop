import React from 'react';
import { SlideRendererProps } from '../../../types';
import SlideHeader from '../content/SlideHeader';
import SlideContent from '../content/SlideContent';
import InteractivePanel from '../InteractivePanel';

// Layout optimized for workshop activities
const WorkshopLayout: React.FC<SlideRendererProps> = ({ slide, isActive: _isActive }) => {
  return (
    <div className="slide-workshop h-full flex flex-col bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Slide Header */}
      <SlideHeader title={slide.title} subtitle={slide.subtitle} />

      {/* Main Content Area - Workshop style */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 lg:p-8 overflow-hidden">
        {/* Left Column - Instructions */}
        <div className="flex flex-col overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700">
              <SlideContent content={slide.content} />
            </div>
          </div>
        </div>

        {/* Center Column - Main Activity */}
        <div className="flex flex-col overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Activity Space</h3>
            </div>
            <div className="flex items-center justify-center h-[calc(100%-4rem)] text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-10">✍️</div>
                <p className="text-sm font-medium">Main activity area</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Elements */}
        <div className="flex flex-col overflow-y-auto">
          {slide.interactive_elements && slide.interactive_elements.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border-l-4 border-indigo-500 overflow-hidden h-full">
              <div className="p-6 pb-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Tools</h3>
                </div>
              </div>
              <div className="h-[calc(100%-5rem)] overflow-y-auto">
                <InteractivePanel
                  elements={slide.interactive_elements}
                  slideId={slide.id}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-2xl p-8 h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-5xl mb-4 opacity-10">🔧</div>
                <p className="text-sm font-medium">Interactive tools will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopLayout;
