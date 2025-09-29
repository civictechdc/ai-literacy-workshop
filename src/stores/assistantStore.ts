import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { SlideType } from '../../types';

export enum AssistantMode {
  MINI = 'mini',
  COMPACT = 'compact',
  FULL = 'full'
}

export enum AssistantPosition {
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left',
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left'
}

interface SlideActivity {
  slideId: number;
  timeSpent: number;
  lastVisited: Date;
  interactionCount: number;
  helpRequested: boolean;
  completed: boolean;
}

interface ProactivePrompt {
  id: string;
  slideId: number;
  trigger: 'time_threshold' | 'no_interaction' | 'slide_type' | 'workshop_start';
  message: string;
  actionText?: string;
  shown: boolean;
  dismissed: boolean;
}

interface QuickAction {
  id: string;
  text: string;
  prompt: string;
  emoji?: string;
  category: 'clarify' | 'example' | 'workshop' | 'concept';
}

interface AssistantState {
  // UI State
  isOpen: boolean;
  mode: AssistantMode;
  position: AssistantPosition;
  isMinimized: boolean;

  // Context Tracking
  currentSlideActivity: SlideActivity | null;
  slideActivities: Map<number, SlideActivity>;
  sessionStartTime: Date;
  totalHelpRequests: number;

  // Proactive Features
  proactivePrompts: ProactivePrompt[];
  lastProactiveCheck: Date;

  // Quick Actions
  contextualActions: QuickAction[];

  // API Key Management
  showApiKeyPrompt: boolean;
  hasValidatedApiKey: boolean;

  // Personalization
  userPreferences: {
    preferredExplanationStyle: 'beginner' | 'intermediate' | 'advanced';
    showProactivePrompts: boolean;
    preferredPosition: AssistantPosition;
  };

  // Actions
  openAssistant: (mode?: AssistantMode) => void;
  closeAssistant: () => void;
  setMode: (mode: AssistantMode) => void;
  setPosition: (position: AssistantPosition) => void;
  toggleMinimized: () => void;

  // Context Actions
  trackSlideVisit: (slideId: number, slideType: SlideType) => void;
  trackInteraction: (slideId: number) => void;
  markHelpRequested: (slideId: number) => void;
  markSlideCompleted: (slideId: number) => void;

  // Proactive Actions
  checkForProactivePrompts: (slideId: number, slideType: SlideType) => ProactivePrompt[];
  dismissPrompt: (promptId: string) => void;
  generateContextualActions: (slideId: number, slideType: SlideType) => QuickAction[];

  // API Key Actions
  showApiKeySetup: () => void;
  hideApiKeySetup: () => void;
  validateApiKey: () => void;

  // Analytics
  getEngagementMetrics: () => {
    totalTimeSpent: number;
    averageTimePerSlide: number;
    helpRequestRate: number;
    completionRate: number;
  };
}

const createSlideActivity = (slideId: number): SlideActivity => ({
  slideId,
  timeSpent: 0,
  lastVisited: new Date(),
  interactionCount: 0,
  helpRequested: false,
  completed: false
});

const generateProactivePrompts = (slideId: number, slideType: SlideType, activity: SlideActivity): ProactivePrompt[] => {
  const prompts: ProactivePrompt[] = [];

  // Time-based prompts
  if (activity.timeSpent > 120000 && !activity.helpRequested) { // 2 minutes
    prompts.push({
      id: `time-help-${slideId}`,
      slideId,
      trigger: 'time_threshold',
      message: "Taking your time with this slide? I'm here if you need any clarification!",
      actionText: "Ask for help",
      shown: false,
      dismissed: false
    });
  }

  // Workshop-specific prompts
  if (slideType === SlideType.WORKSHOP && activity.interactionCount === 0) {
    prompts.push({
      id: `workshop-start-${slideId}`,
      slideId,
      trigger: 'workshop_start',
      message: "Ready for the hands-on workshop? I can provide examples or guide you through the steps.",
      actionText: "Get guidance",
      shown: false,
      dismissed: false
    });
  }

  // Content slide prompts
  if (slideType === SlideType.CONTENT && activity.timeSpent < 30000) { // Less than 30 seconds
    prompts.push({
      id: `quick-skip-${slideId}`,
      slideId,
      trigger: 'no_interaction',
      message: "This slide covers important concepts. Want me to highlight the key points?",
      actionText: "Explain key points",
      shown: false,
      dismissed: false
    });
  }

  return prompts;
};

const generateQuickActions = (_slideId: number, slideType: SlideType): QuickAction[] => {
  const baseActions: QuickAction[] = [
    {
      id: 'clarify',
      text: 'Explain this',
      prompt: "I'm confused about this slide. Can you explain the key concepts in simpler terms?",
      emoji: '🤔',
      category: 'clarify'
    }
  ];

  switch (slideType) {
    case SlideType.WORKSHOP:
      return [
        ...baseActions,
        {
          id: 'workshop-example',
          text: 'Show example',
          prompt: "Can you show me an example of how to complete this workshop exercise?",
          emoji: '💡',
          category: 'workshop'
        },
        {
          id: 'workshop-hint',
          text: 'Give hint',
          prompt: "I'm stuck on this workshop. Can you give me a hint to get started?",
          emoji: '🔍',
          category: 'workshop'
        },
      ];

    case SlideType.CONTENT:
      return [
        ...baseActions,
        {
          id: 'real-example',
          text: 'Real example',
          prompt: "Can you give me a real-world example of how this concept applies?",
          emoji: '🌍',
          category: 'example'
        },
        {
          id: 'why-matters',
          text: 'Why matters?',
          prompt: "Why is this concept important for understanding AI?",
          emoji: '❓',
          category: 'concept'
        }
      ];

    case SlideType.QA:
      return [
        ...baseActions,
        {
          id: 'sample-questions',
          text: 'Sample questions',
          prompt: "What are some good questions I should be thinking about for this topic?",
          emoji: '❓',
          category: 'concept'
        },
        {
          id: 'key-takeaways',
          text: 'Key takeaways',
          prompt: "What are the most important points I should remember from this section?",
          emoji: '📝',
          category: 'concept'
        }
      ];

    default:
      return baseActions;
  }
};

export const useAssistantStore = create<AssistantState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    isOpen: false,
    mode: AssistantMode.COMPACT,
    position: AssistantPosition.BOTTOM_RIGHT,
    isMinimized: false,

    currentSlideActivity: null,
    slideActivities: new Map(),
    sessionStartTime: new Date(),
    totalHelpRequests: 0,

    proactivePrompts: [],
    lastProactiveCheck: new Date(),

    contextualActions: [],

    showApiKeyPrompt: false,
    hasValidatedApiKey: false,

    userPreferences: {
      preferredExplanationStyle: 'intermediate',
      showProactivePrompts: true,
      preferredPosition: AssistantPosition.BOTTOM_RIGHT
    },

    // Actions
    openAssistant: (mode = AssistantMode.COMPACT) => {
      set({ isOpen: true, mode, isMinimized: false });
    },

    closeAssistant: () => {
      set({ isOpen: false, isMinimized: false });
    },

    setMode: (mode) => {
      set({ mode });
    },

    setPosition: (position) => {
      set({ position });
    },

    toggleMinimized: () => {
      set(state => ({ isMinimized: !state.isMinimized }));
    },

    // Context Actions
    trackSlideVisit: (slideId, slideType) => {
      const { slideActivities } = get();

      let activity = slideActivities.get(slideId);
      if (!activity) {
        activity = createSlideActivity(slideId);
        slideActivities.set(slideId, activity);
      }

      activity.lastVisited = new Date();

      // Generate contextual actions and proactive prompts
      const contextualActions = generateQuickActions(slideId, slideType);
      const newPrompts = generateProactivePrompts(slideId, slideType, activity);

      set({
        currentSlideActivity: activity,
        slideActivities: new Map(slideActivities),
        contextualActions,
        proactivePrompts: [...get().proactivePrompts, ...newPrompts]
      });
    },

    trackInteraction: (slideId) => {
      const { slideActivities } = get();
      const activity = slideActivities.get(slideId);

      if (activity) {
        activity.interactionCount += 1;
        set({ slideActivities: new Map(slideActivities) });
      }
    },

    markHelpRequested: (slideId) => {
      const { slideActivities, totalHelpRequests } = get();
      const activity = slideActivities.get(slideId);

      if (activity) {
        activity.helpRequested = true;
        set({
          slideActivities: new Map(slideActivities),
          totalHelpRequests: totalHelpRequests + 1
        });
      }
    },

    markSlideCompleted: (slideId) => {
      const { slideActivities } = get();
      const activity = slideActivities.get(slideId);

      if (activity) {
        activity.completed = true;
        set({ slideActivities: new Map(slideActivities) });
      }
    },

    // Proactive Actions
    checkForProactivePrompts: (slideId, _slideType) => {
      const { proactivePrompts, userPreferences } = get();

      if (!userPreferences.showProactivePrompts) {
        return [];
      }

      return proactivePrompts.filter(prompt =>
        prompt.slideId === slideId &&
        !prompt.shown &&
        !prompt.dismissed
      );
    },

    dismissPrompt: (promptId) => {
      const { proactivePrompts } = get();
      const updatedPrompts = proactivePrompts.map(prompt =>
        prompt.id === promptId
          ? { ...prompt, dismissed: true }
          : prompt
      );

      set({ proactivePrompts: updatedPrompts });
    },

    generateContextualActions: (slideId, slideType) => {
      return generateQuickActions(slideId, slideType);
    },

    // API Key Actions
    showApiKeySetup: () => {
      set({ showApiKeyPrompt: true });
    },

    hideApiKeySetup: () => {
      set({ showApiKeyPrompt: false });
    },

    validateApiKey: () => {
      // This would integrate with aiService to validate the key
      set({ hasValidatedApiKey: true, showApiKeyPrompt: false });
    },

    // Analytics
    getEngagementMetrics: () => {
      const { slideActivities, totalHelpRequests } = get();
      const activities = Array.from(slideActivities.values());

      const totalTimeSpent = activities.reduce((sum, activity) => sum + activity.timeSpent, 0);
      const averageTimePerSlide = activities.length > 0 ? totalTimeSpent / activities.length : 0;
      const completedSlides = activities.filter(activity => activity.completed).length;
      const completionRate = activities.length > 0 ? completedSlides / activities.length : 0;
      const helpRequestRate = activities.length > 0 ? totalHelpRequests / activities.length : 0;

      return {
        totalTimeSpent,
        averageTimePerSlide,
        helpRequestRate,
        completionRate
      };
    }
  }))
);

// Auto-track time spent on slides
let currentSlideTimer: ReturnType<typeof setInterval> | null = null;

export const startSlideTimeTracking = (slideId: number) => {
  if (currentSlideTimer) {
    clearInterval(currentSlideTimer);
  }

  currentSlideTimer = setInterval(() => {
    const { slideActivities } = useAssistantStore.getState();
    const activity = slideActivities.get(slideId);

    if (activity) {
      activity.timeSpent += 1000; // Add 1 second
      useAssistantStore.setState({
        slideActivities: new Map(slideActivities)
      });
    }
  }, 1000);
};

export const stopSlideTimeTracking = () => {
  if (currentSlideTimer) {
    clearInterval(currentSlideTimer);
    currentSlideTimer = null;
  }
};