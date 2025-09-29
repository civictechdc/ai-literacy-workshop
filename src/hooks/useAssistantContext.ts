import { useEffect, useCallback } from 'react';
import { useAssistantStore, startSlideTimeTracking, stopSlideTimeTracking, AssistantMode } from '../stores/assistantStore';
import { usePresentationStore } from '../stores/presentationStore';
import { SlideType } from '../../types';

export interface AssistantContextData {
  // Current slide context
  currentSlideId: number;
  currentSlideType: SlideType;
  isWorkshopSlide: boolean;

  // User behavior insights
  timeOnCurrentSlide: number;
  hasRequestedHelp: boolean;
  interactionCount: number;

  // Proactive features
  shouldShowProactivePrompt: boolean;
  availablePrompts: Array<{
    id: string;
    message: string;
    actionText?: string;
  }>;

  // Quick actions
  contextualActions: Array<{
    id: string;
    text: string;
    prompt: string;
    emoji?: string;
    category: string;
  }>;
}

export interface AssistantContextActions {
  // User interaction tracking
  trackInteraction: () => void;
  markHelpRequested: () => void;
  markSlideCompleted: () => void;

  // Proactive prompts
  dismissPrompt: (promptId: string) => void;
  triggerQuickAction: (actionId: string) => string; // Returns the prompt to send

  // Assistant control
  openAssistant: (mode?: AssistantMode) => void;
  closeAssistant: () => void;

  // Context helpers
  getHelpSuggestion: () => string;
  getWorkshopGuidance: () => string | null;
}

/**
 * Hook that provides context-aware assistant functionality
 * Automatically tracks slide visits and provides contextual help
 */
export const useAssistantContext = (): [AssistantContextData, AssistantContextActions] => {
  const { currentSlideIndex, slides } = usePresentationStore();
  const {
    trackSlideVisit,
    trackInteraction,
    markHelpRequested,
    markSlideCompleted,
    checkForProactivePrompts,
    dismissPrompt,
    openAssistant,
    closeAssistant,
    currentSlideActivity,
    contextualActions
  } = useAssistantStore();

  const currentSlide = slides[currentSlideIndex];
  const currentSlideId = currentSlide?.id || 0;
  const currentSlideType = currentSlide?.type || SlideType.CONTENT;

  // Track slide visits automatically
  useEffect(() => {
    if (currentSlide) {
      trackSlideVisit(currentSlideId, currentSlideType);
      startSlideTimeTracking(currentSlideId);

      return () => {
        stopSlideTimeTracking();
      };
    }
  }, [currentSlideId, currentSlideType, trackSlideVisit]);

  // Generate proactive prompts
  const availablePrompts = checkForProactivePrompts(currentSlideId, currentSlideType);

  // Context data
  const contextData: AssistantContextData = {
    currentSlideId,
    currentSlideType,
    isWorkshopSlide: currentSlideType === SlideType.WORKSHOP,
    timeOnCurrentSlide: currentSlideActivity?.timeSpent || 0,
    hasRequestedHelp: currentSlideActivity?.helpRequested || false,
    interactionCount: currentSlideActivity?.interactionCount || 0,
    shouldShowProactivePrompt: availablePrompts.length > 0,
    availablePrompts: availablePrompts.map(p => ({
      id: p.id,
      message: p.message,
      actionText: p.actionText
    })),
    contextualActions
  };

  // Helper functions
  const getHelpSuggestion = useCallback((): string => {
    switch (currentSlideType) {
      case SlideType.WORKSHOP:
        return "I can help you with this workshop! I can show examples, provide hints, or check your work.";
      case SlideType.CONTENT:
        return "I can explain the concepts on this slide, provide real-world examples, or clarify anything confusing.";
      case SlideType.QA:
        return "I can suggest good questions to think about or summarize the key takeaways from this section.";
      case SlideType.TITLE:
        return "Welcome! I'm here to help you understand AI concepts throughout this workshop.";
      default:
        return "I'm here to help! Ask me about any concepts, examples, or clarifications you need.";
    }
  }, [currentSlideType]);

  const getWorkshopGuidance = useCallback((): string | null => {
    if (currentSlideType !== SlideType.WORKSHOP) {
      return null;
    }

    const workshopGuides: Record<string, string> = {
      'Workshop 1': "This workshop focuses on framing problems effectively. I can help you structure your Five-Line Prompt Template.",
      'Workshop 2': "This workshop is about demanding structured output. I can help validate your JSON schema and provide examples.",
      'Workshop 3': "This workshop helps you create a development plan. I can guide you through the experiment planning template."
    };

    const slideTitle = currentSlide?.title || '';
    for (const [workshop, guidance] of Object.entries(workshopGuides)) {
      if (slideTitle.includes(workshop)) {
        return guidance;
      }
    }

    return "This is a hands-on workshop slide. I can provide guidance, examples, or help check your work.";
  }, [currentSlideType, currentSlide]);

  const triggerQuickAction = useCallback((actionId: string): string => {
    const action = contextualActions.find(a => a.id === actionId);
    if (action) {
      trackInteraction(currentSlideId);
      markHelpRequested(currentSlideId);
      return action.prompt;
    }
    return "I'm here to help! What would you like to know?";
  }, [contextualActions, trackInteraction, markHelpRequested, currentSlideId]);

  // Context actions
  const contextActions: AssistantContextActions = {
    trackInteraction: () => trackInteraction(currentSlideId),
    markHelpRequested: () => markHelpRequested(currentSlideId),
    markSlideCompleted: () => markSlideCompleted(currentSlideId),
    dismissPrompt,
    triggerQuickAction,
    openAssistant,
    closeAssistant,
    getHelpSuggestion,
    getWorkshopGuidance
  };

  return [contextData, contextActions];
};

/**
 * Hook for components that want to trigger proactive assistance
 */
export const useProactiveAssistance = () => {
  const [contextData, contextActions] = useAssistantContext();

  useEffect(() => {
    // Auto-show assistant for workshop slides if user hasn't interacted
    if (contextData.isWorkshopSlide &&
        contextData.timeOnCurrentSlide > 5000 && // 5 seconds
        contextData.interactionCount === 0 &&
        !contextData.hasRequestedHelp) {

      // Show a gentle prompt instead of auto-opening
      const guidance = contextActions.getWorkshopGuidance();
      if (guidance) {
        console.log('Proactive guidance available:', guidance);
      }
    }
  }, [contextData, contextActions]);

  return {
    shouldOfferHelp: contextData.shouldShowProactivePrompt,
    availablePrompts: contextData.availablePrompts,
    dismissPrompt: contextActions.dismissPrompt,
    openWithGuidance: () => {
      contextActions.openAssistant(AssistantMode.COMPACT);
      return contextActions.getWorkshopGuidance() || contextActions.getHelpSuggestion();
    }
  };
};

/**
 * Hook for workshop-specific assistance features
 */
export const useWorkshopAssistance = () => {
  const [contextData, contextActions] = useAssistantContext();

  const isWorkshop = contextData.isWorkshopSlide;
  const workshopGuidance = contextActions.getWorkshopGuidance();

  return {
    isWorkshop,
    workshopGuidance,
    hasStarted: contextData.interactionCount > 0,
    timeSpent: contextData.timeOnCurrentSlide,
    quickActions: contextData.contextualActions.filter(action =>
      action.category === 'workshop'
    ),
    startWorkshop: () => {
      contextActions.trackInteraction();
      if (workshopGuidance) {
        contextActions.openAssistant(AssistantMode.COMPACT);
        return workshopGuidance;
      }
      return null;
    },
    getExamplePrompt: () => contextActions.triggerQuickAction('workshop-example'),
    getHint: () => contextActions.triggerQuickAction('workshop-hint'),
    requestReview: () => contextActions.triggerQuickAction('check-work')
  };
};