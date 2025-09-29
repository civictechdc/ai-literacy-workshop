import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
  Slide,
  SlideProgress,
  PresentationConfig
} from '../../types';
import persistenceService from '../services/persistenceService';

interface PresentationState {
  // Core state
  slides: Slide[];
  currentSlideIndex: number;
  presentationConfig: PresentationConfig;

  // Workshop state
  completedActivities: Set<string>;
  workshopResults: Map<string, any>;
  participantNotes: Map<number, string>;

  // Interactive state
  codeWindows: Map<string, CodeWindowState>;
  interactiveElements: Map<string, InteractiveElementState>;

  // Navigation state
  navigationHistory: number[];
  bookmarks: Set<number>;

  // Progress tracking
  slideProgress: Map<number, SlideProgress>;
  overallProgress: number;

  // UI state
  isFullscreen: boolean;
  sidebarOpen: boolean;

  // Actions
  initializeSlides: (slides: Slide[]) => void;
  navigateToSlide: (index: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  completeActivity: (activityId: string, result?: any) => void;
  updateCodeWindow: (windowId: string, code: string) => void;
  updateInteractiveElement: (elementId: string, state: any) => void;
  addParticipantNote: (slideId: number, note: string) => void;
  toggleBookmark: (slideId: number) => void;
  saveProgress: () => void;
  loadProgress: () => Promise<void>;
  resetPresentation: () => void;
  updateOverallProgress: () => void;
}

interface CodeWindowState {
  code: string;
  output?: string;
  isExecuting: boolean;
  lastExecuted?: Date;
}

interface InteractiveElementState {
  completed: boolean;
  data: any;
  lastUpdated: Date;
}

const defaultConfig: PresentationConfig = {
  workshop_mode: true,
  allow_participant_notes: true,
  progress_tracking: true,
  qa_integration: true,
  live_polling: false
};

export const usePresentationStore = create<PresentationState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    slides: [],
    currentSlideIndex: 0,
    presentationConfig: defaultConfig,
    completedActivities: new Set(),
    workshopResults: new Map(),
    participantNotes: new Map(),
    codeWindows: new Map(),
    interactiveElements: new Map(),
    navigationHistory: [],
    bookmarks: new Set(),
    slideProgress: new Map(),
    overallProgress: 0,
    isFullscreen: false,
    sidebarOpen: false,

    // Actions
    initializeSlides: (slides: Slide[]) => {
      set({ slides });

      // Initialize code windows and interactive elements for each slide
      const codeWindows = new Map<string, CodeWindowState>();
      const interactiveElements = new Map<string, InteractiveElementState>();

      slides.forEach(slide => {
        if (slide.code_windows) {
          slide.code_windows.forEach(window => {
            codeWindows.set(window.id, {
              code: window.initial_code || '',
              isExecuting: false
            });
          });
        }

        if (slide.interactive_elements) {
          slide.interactive_elements.forEach(element => {
            // Only track completion for actual InteractiveElement objects, not display strings
            if (typeof element === 'object' && element.id) {
              interactiveElements.set(element.id, {
                completed: false,
                data: {},
                lastUpdated: new Date()
              });
            }
          });
        }
      });

      set({ codeWindows, interactiveElements });
    },

    navigateToSlide: (index: number) => {
      const { slides, currentSlideIndex, navigationHistory } = get();

      if (index >= 0 && index < slides.length) {
        const newHistory = [...navigationHistory, currentSlideIndex];
        set({
          currentSlideIndex: index,
          navigationHistory: newHistory.slice(-10) // Keep last 10 entries
        });

        // Update progress tracking
        const slideProgress = new Map(get().slideProgress);
        const progress = slideProgress.get(index) || {
          visited: false,
          timeSpent: 0,
          activitiesCompleted: [],
          notesAdded: false,
          requiredCompletion: slides[index].requires_completion || false
        };

        progress.visited = true;
        slideProgress.set(index, progress);
        set({ slideProgress });

        // Persist navigation immediately so refresh restores the latest slide
        // (auto-save runs every 30s, but navigation should be durable instantly)
        try {
          get().saveProgress();
        } catch (e) {
          // Non-fatal: persistence has its own fallbacks
          console.warn('Save on navigate failed, will retry via auto-save:', e);
        }
      }
    },

    nextSlide: () => {
      const { currentSlideIndex, slides } = get();
      if (currentSlideIndex < slides.length - 1) {
        get().navigateToSlide(currentSlideIndex + 1);
      }
    },

    previousSlide: () => {
      const { currentSlideIndex } = get();
      if (currentSlideIndex > 0) {
        get().navigateToSlide(currentSlideIndex - 1);
      }
    },

    completeActivity: (activityId: string, result?: any) => {
      const { completedActivities, workshopResults, currentSlideIndex } = get();

      const newCompleted = new Set(completedActivities);
      newCompleted.add(activityId);

      const newResults = new Map(workshopResults);
      if (result) {
        newResults.set(activityId, result);
      }

      set({
        completedActivities: newCompleted,
        workshopResults: newResults
      });

      // Update slide progress
      const slideProgress = new Map(get().slideProgress);
      const progress = slideProgress.get(currentSlideIndex) || {
        visited: true,
        timeSpent: 0,
        activitiesCompleted: [],
        notesAdded: false,
        requiredCompletion: false
      };

      if (!progress.activitiesCompleted.includes(activityId)) {
        progress.activitiesCompleted.push(activityId);
      }

      slideProgress.set(currentSlideIndex, progress);
      set({ slideProgress });

      // Update overall progress
      get().updateOverallProgress();
    },

    updateCodeWindow: (windowId: string, code: string) => {
      const codeWindows = new Map(get().codeWindows);
      const windowState = codeWindows.get(windowId);

      if (windowState) {
        codeWindows.set(windowId, {
          ...windowState,
          code,
          lastExecuted: new Date()
        });
        set({ codeWindows });
      }
    },

    updateInteractiveElement: (elementId: string, data: any) => {
      const interactiveElements = new Map(get().interactiveElements);
      const elementState = interactiveElements.get(elementId);

      if (elementState) {
        interactiveElements.set(elementId, {
          ...elementState,
          data: { ...elementState.data, ...data },
          lastUpdated: new Date()
        });
        set({ interactiveElements });
      }
    },

    addParticipantNote: async (slideId: number, note: string) => {
      const participantNotes = new Map(get().participantNotes);
      participantNotes.set(slideId, note);
      set({ participantNotes });

      // Update slide progress
      const slideProgress = new Map(get().slideProgress);
      const progress = slideProgress.get(slideId) || {
        visited: true,
        timeSpent: 0,
        activitiesCompleted: [],
        notesAdded: false,
        requiredCompletion: false
      };

      progress.notesAdded = true;
      slideProgress.set(slideId, progress);
      set({ slideProgress });

      // Persist notes
      try {
        await persistenceService.saveNotes(slideId, note);
      } catch (error) {
        console.error('Failed to save notes:', error);
      }
    },

    toggleBookmark: (slideId: number) => {
      const bookmarks = new Set(get().bookmarks);
      if (bookmarks.has(slideId)) {
        bookmarks.delete(slideId);
      } else {
        bookmarks.add(slideId);
      }
      set({ bookmarks });
    },

    saveProgress: async () => {
      const state = get();
      const progressData = {
        currentSlideIndex: state.currentSlideIndex,
        completedActivities: Array.from(state.completedActivities),
        workshopResults: Object.fromEntries(state.workshopResults),
        participantNotes: Object.fromEntries(state.participantNotes),
        slideProgress: Object.fromEntries(state.slideProgress),
        codeWindows: Object.fromEntries(state.codeWindows),
        interactiveElements: Object.fromEntries(state.interactiveElements),
        bookmarks: Array.from(state.bookmarks),
        timestamp: Date.now()
      };

      try {
        await persistenceService.saveProgress(progressData);
        console.log('Progress saved successfully');
      } catch (error) {
        console.error('Failed to save progress:', error);
        // Fallback to localStorage
        localStorage.setItem('presentation-progress', JSON.stringify(progressData));
      }
    },

    loadProgress: async () => {
      try {
        // Initialize persistence service
        await persistenceService.init();

        // Try to load from IndexedDB first
        let progressData = await persistenceService.loadProgress();

        // Fallback to localStorage if IndexedDB fails or returns null
        if (!progressData) {
          const saved = localStorage.getItem('presentation-progress');
          if (saved) {
            progressData = JSON.parse(saved);
          }
        }

        if (progressData) {
          // Validate and sanitize the loaded data
          const { slides } = get();
          let validatedSlideIndex = 0;

          // Ensure currentSlideIndex is valid for the current slides array
          if (progressData.currentSlideIndex !== undefined &&
              typeof progressData.currentSlideIndex === 'number' &&
              progressData.currentSlideIndex >= 0 &&
              progressData.currentSlideIndex < slides.length) {
            validatedSlideIndex = progressData.currentSlideIndex;
          } else {
            console.warn(`Invalid slide index ${progressData.currentSlideIndex}, defaulting to 0`);
          }

          set({
            currentSlideIndex: validatedSlideIndex,
            completedActivities: new Set(progressData.completedActivities || []),
            workshopResults: new Map(Object.entries(progressData.workshopResults || {})),
            participantNotes: new Map(Object.entries(progressData.participantNotes || {}).map(([k, v]) => [parseInt(k), v as string])),
            slideProgress: new Map(Object.entries(progressData.slideProgress || {}).map(([k, v]) => [parseInt(k), v as SlideProgress])),
            codeWindows: new Map(Object.entries(progressData.codeWindows || {})),
            interactiveElements: new Map(Object.entries(progressData.interactiveElements || {})),
            bookmarks: new Set(progressData.bookmarks || [])
          });

          console.log('Progress loaded successfully:', {
            savedSlideIndex: progressData.currentSlideIndex,
            validatedSlideIndex,
            totalSlides: slides.length,
            slideTitle: slides[validatedSlideIndex]?.title || 'Unknown'
          });
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    },

    resetPresentation: () => {
      set({
        currentSlideIndex: 0,
        completedActivities: new Set(),
        workshopResults: new Map(),
        participantNotes: new Map(),
        slideProgress: new Map(),
        overallProgress: 0,
        navigationHistory: [],
        bookmarks: new Set()
      });

      // Clear all persisted data (IndexedDB + localStorage) so reload starts fresh
      try {
        persistenceService.clearAllData();
      } catch (e) {
        // Best-effort fallback to localStorage clear
        localStorage.removeItem('presentation-progress');
      }
    },

    // Helper function to update overall progress
    updateOverallProgress: () => {
      const { slides, slideProgress } = get();

      const totalRequiredSlides = slides.filter(slide => slide.requires_completion).length;
      const completedRequiredSlides = slides
        .filter(slide => slide.requires_completion)
        .filter(slide => {
          const progress = slideProgress.get(slide.id - 1);
          return progress?.requiredCompletion && (progress.activitiesCompleted?.length || 0) > 0;
        }).length;

      const progress = totalRequiredSlides > 0
        ? (completedRequiredSlides / totalRequiredSlides) * 100
        : 0;

      set({ overallProgress: Math.round(progress) });
    }
  }))
);

// Selectors for computed values
export const useCurrentSlide = () => {
  const slides = usePresentationStore(state => state.slides);
  const currentIndex = usePresentationStore(state => state.currentSlideIndex);
  return slides[currentIndex];
};

export const useSlideProgress = (slideId: number) => {
  return usePresentationStore(state => state.slideProgress.get(slideId));
};

export const useCodeWindow = (windowId: string) => {
  return usePresentationStore(state => state.codeWindows.get(windowId));
};

export const useInteractiveElement = (elementId: string) => {
  return usePresentationStore(state => state.interactiveElements.get(elementId));
};

export const useCodeWindowSelector = (windowId: string) => {
  return usePresentationStore(state => state.codeWindows.get(windowId));
};

// Auto-save functionality
let autoSaveInterval: ReturnType<typeof setInterval> | null = null;

export const startAutoSave = () => {
  if (autoSaveInterval) return;

  autoSaveInterval = setInterval(() => {
    usePresentationStore.getState().saveProgress();
  }, 30000); // Save every 30 seconds
};

export const stopAutoSave = () => {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
    autoSaveInterval = null;
  }
};
