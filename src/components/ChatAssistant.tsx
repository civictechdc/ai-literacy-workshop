import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  InputToolbox
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  RotateCcw,
  Save,
  X as CloseIcon,
  Key,
  Lightbulb,
  Zap,
  Play,
  Clock
} from 'lucide-react';
import { aiService, ChatMessage as AIChatMessage } from '../services/aiService';
import { usePresentationStore } from '../stores/presentationStore';
import { useAssistantStore, AssistantMode, AssistantPosition } from '../stores/assistantStore';
import { useAssistantContext } from '../hooks/useAssistantContext';
import { Slide } from '../types';

type ChatMessage = {
  id: string;
  text: string;
  direction: 'incoming' | 'outgoing';
  sender: 'assistant' | 'user';
};

const ChatAssistant: React.FC = () => {
  const {
    isOpen,
    mode,
    position,
    isMinimized,
    showApiKeyPrompt,
    openAssistant,
    closeAssistant,
    setMode,
    toggleMinimized,
    showApiKeySetup,
    hideApiKeySetup,
    validateApiKey
  } = useAssistantStore();

  const [contextData, contextActions] = useAssistantContext();

  // Local state for chat functionality
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'welcome',
    text: contextData.isWorkshopSlide ?
      "Hi! I see you're on a workshop slide. I can help with examples, hints, or checking your work." :
      "Hi! I'm your learning companion. Ask me about AI concepts, examples, or anything confusing.",
    direction: 'incoming',
    sender: 'assistant'
  }]);
  const [conversationHistory, setConversationHistory] = useState<AIChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(aiService.hasApiKey());
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [systemPrompt, setSystemPrompt] = useState<string>(aiService.getSystemPrompt());
  const [tempApiKey, setTempApiKey] = useState<string>('');
  const [initialMessage, setInitialMessage] = useState<string>("Hi! I'm your learning companion. Ask me about AI concepts, examples, or anything confusing.");

  // Update welcome message based on context
  useEffect(() => {
    if (contextData.isWorkshopSlide && messages.length === 1) {
      const workshopGreeting = "🎯 **Workshop time!** Let's work on this hands-on exercise together. I can:\n\n• Show you examples to get started\n• Give hints when you're stuck\n• Check your work and provide feedback\n• Explain concepts if needed\n\nJust ask me anything or use the quick actions below!";

      setMessages([{
        id: 'welcome',
        text: workshopGreeting,
        direction: 'incoming',
        sender: 'assistant'
      }]);
    }
  }, [contextData.isWorkshopSlide, contextActions]);

  useEffect(() => {
    if (isOpen) {
      setHasApiKey(aiService.hasApiKey());
    }
  }, [isOpen]);

  // Helper functions for positioning and sizing
  const getPositionClasses = () => {
    const baseClasses = 'fixed z-50 transition-all duration-300';

    if (isMinimized) {
      return `${baseClasses} ${getPositionForMinimized()}`;
    }

    switch (position) {
      case AssistantPosition.BOTTOM_RIGHT:
        return `${baseClasses} bottom-16 right-4`;
      case AssistantPosition.BOTTOM_LEFT:
        return `${baseClasses} bottom-16 left-4`;
      case AssistantPosition.TOP_RIGHT:
        return `${baseClasses} top-20 right-4`;
      case AssistantPosition.TOP_LEFT:
        return `${baseClasses} top-20 left-4`;
      default:
        return `${baseClasses} bottom-16 right-4`;
    }
  };

  const getPositionForMinimized = () => {
    switch (position) {
      case AssistantPosition.BOTTOM_RIGHT:
        return 'bottom-16 right-4';
      case AssistantPosition.BOTTOM_LEFT:
        return 'bottom-16 left-4';
      case AssistantPosition.TOP_RIGHT:
        return 'top-20 right-4';
      case AssistantPosition.TOP_LEFT:
        return 'top-20 left-4';
      default:
        return 'bottom-16 right-4';
    }
  };

  const getSizeClasses = () => {
    if (isMinimized) {
      return 'w-12 h-12';
    }

    switch (mode) {
      case AssistantMode.MINI:
        return 'w-80 h-96';
      case AssistantMode.COMPACT:
        return 'w-96 h-[520px]';
      case AssistantMode.FULL:
        return 'w-[500px] h-[600px]';
      default:
        return 'w-96 h-[520px]';
    }
  };

  const handleApplyConfig = useCallback(() => {
    aiService.setSystemPrompt(systemPrompt);
    setShowConfig(false);
  }, [systemPrompt]);

  const handleReset = useCallback(() => {
    const welcomeText = contextData.isWorkshopSlide ?
      "🎯 **Workshop time!** Let's work on this hands-on exercise together. I can:\n\n• Show you examples to get started\n• Give hints when you're stuck\n• Check your work and provide feedback\n• Explain concepts if needed\n\nJust ask me anything or use the quick actions below!" :
      "Hi! I'm your learning companion. Ask me about AI concepts, examples, or anything confusing.";

    setMessages([{
      id: 'welcome',
      text: welcomeText,
      direction: 'incoming',
      sender: 'assistant'
    }]);
    setConversationHistory([]);
    setIsTyping(false);
  }, [contextData.isWorkshopSlide, contextActions]);

  const handleApiKeySave = useCallback(() => {
    if (tempApiKey.trim()) {
      aiService.saveApiKey(tempApiKey.trim());
      setHasApiKey(true);
      validateApiKey();
      setTempApiKey('');
    }
  }, [tempApiKey, validateApiKey]);

  const handleQuickAction = useCallback((actionId: string) => {
    if (!hasApiKey) {
      showApiKeySetup();
      return;
    }

    const prompt = contextActions.triggerQuickAction(actionId);
    handleSend(prompt);
  }, [contextActions, hasApiKey, showApiKeySetup]);

  const handleSend = useCallback(async (input: string) => {
    if (!input.trim()) return;

    // Don't allow sending without API key
    if (!hasApiKey) {
      showApiKeySetup();
      return;
    }

    // Track that user is requesting help
    contextActions.markHelpRequested();

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      text: input,
      direction: 'outgoing',
      sender: 'user'
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Get fresh slide data at call time (not render time)
      const currentState = usePresentationStore.getState();
      const freshSlides = currentState.slides;
      const freshSlideIndex = currentState.currentSlideIndex;

      // Validate slide data before sending to AI service
      let validSlide: Slide | null = null;
      let validSlideIndex = freshSlideIndex;

      if (freshSlides.length > 0 && freshSlideIndex >= 0 && freshSlideIndex < freshSlides.length) {
        validSlide = freshSlides[freshSlideIndex];
        validSlideIndex = freshSlideIndex;
      } else {
        // Fallback to first slide if current index is invalid
        console.warn(`Invalid slide index ${freshSlideIndex}, using slide 0`);
        validSlide = freshSlides[0] || null;
        validSlideIndex = 0;
      }

      const response = await aiService.sendChatMessage(input, conversationHistory, validSlideIndex, validSlide, { temperature: 0.4, maxTokens: 6000 });

      const content = response.content || response.error || 'No response.';
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        text: content,
        direction: 'incoming',
        sender: 'assistant'
      };

      // Update conversation history with both user and assistant messages
      const newHistory: AIChatMessage[] = [
        ...conversationHistory,
        { role: 'user', content: input },
        { role: 'assistant', content: content }
      ];

      setConversationHistory(newHistory);
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg = 'Sorry, there was an error. Please try again.';
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        text: errorMsg,
        direction: 'incoming',
        sender: 'assistant'
      };

      // Still add to conversation history even on error
      const newHistory: AIChatMessage[] = [
        ...conversationHistory,
        { role: 'user', content: input },
        { role: 'assistant', content: errorMsg }
      ];

      setConversationHistory(newHistory);
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
      setHasApiKey(aiService.hasApiKey());
    }
  }, [conversationHistory, contextActions]);

  const headerNote = useMemo(() => {
    return hasApiKey ? 'Connected to Gemini' : 'Demo mode (set API key for real responses)';
  }, [hasApiKey]);

  return (
    <div>
      {/* Minimized Assistant Button - Always Show When Not in Full Chat */}
      {(!isOpen || (isOpen && isMinimized)) && (
        <button
          aria-label={isOpen ? "Expand assistant" : "Open assistant"}
          className={`fixed bottom-16 right-4 z-50 w-12 h-12 rounded-full ${
            contextData.isWorkshopSlide
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-ai-blue hover:bg-blue-700'
          } text-white shadow-lg flex items-center justify-center transition-all duration-300`}
          onClick={() => isOpen ? toggleMinimized() : openAssistant()}
        >
          {contextData.isWorkshopSlide ? (
            <Play className="h-5 w-5" />
          ) : (
            <Zap className="h-5 w-5" />
          )}
          {contextData.shouldShowProactivePrompt && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
          )}
        </button>
      )}

      {/* Main Chat Panel */}
      {isOpen && !isMinimized && (
        <div className={`${getPositionClasses()} ${getSizeClasses()} bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden flex flex-col`}>
          {/* Enhanced Header */}
          <div className="flex-shrink-0 h-12 flex items-center justify-between px-3 border-b border-gray-200 bg-white/90">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-ai-blue" />
              <div className="text-sm font-semibold text-gray-800">Learning Assistant</div>
              {contextData.isWorkshopSlide && (
                <div className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  Workshop
                </div>
              )}
            </div>

            <div className="flex items-center space-x-1">
              {/* Mode selector */}
              <div className="flex rounded border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setMode(AssistantMode.MINI)}
                  className={`px-2 py-1 text-xs ${mode === AssistantMode.MINI ? 'bg-ai-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  title="Mini mode"
                >
                  S
                </button>
                <button
                  onClick={() => setMode(AssistantMode.COMPACT)}
                  className={`px-2 py-1 text-xs ${mode === AssistantMode.COMPACT ? 'bg-ai-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  title="Compact mode"
                >
                  M
                </button>
                <button
                  onClick={() => setMode(AssistantMode.FULL)}
                  className={`px-2 py-1 text-xs ${mode === AssistantMode.FULL ? 'bg-ai-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  title="Full mode"
                >
                  L
                </button>
              </div>

              <button
                aria-label="Reset chat"
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                onClick={handleReset}
                title="Reset conversation"
              >
                <RotateCcw className="h-3 w-3" />
              </button>

              {!hasApiKey && (
                <button
                  aria-label="Setup API key"
                  className="text-orange-500 hover:text-orange-700 transition-colors p-1"
                  onClick={showApiKeySetup}
                  title="Setup API key"
                >
                  <Key className="h-3 w-3" />
                </button>
              )}


              <button
                aria-label="Close assistant"
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                onClick={closeAssistant}
                title="Close"
              >
                <CloseIcon className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex-shrink-0 px-3 py-1 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{headerNote}</span>
              {contextData.timeOnCurrentSlide > 0 && (
                <span>⏱ {Math.round(contextData.timeOnCurrentSlide / 1000)}s on slide</span>
              )}
            </div>
          </div>


          {/* Chat UI */}
          <div className="flex-1 flex flex-col min-h-0">
            <MainContainer className="flex-1 flex flex-col">
              <ChatContainer className="flex-1 flex flex-col">
                <MessageList
                  className="flex-1 overflow-y-auto min-h-0"
                  typingIndicator={isTyping ? <TypingIndicator content="Assistant is typing…" /> : null}
                >
                  {messages.map(m => (
                    <Message
                      key={m.id}
                      model={{
                        message: m.sender === 'assistant' ? 'RENDERED_MARKDOWN' : m.text,
                        direction: m.direction,
                        position: 'normal',
                        sender: m.sender === 'assistant' ? 'Assistant' : 'You'
                      }}
                    >
                      {m.sender === 'assistant' && (
                        <Message.CustomContent>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => <p className="mb-2 text-gray-800 leading-relaxed">{children}</p>,
                              strong: ({ children }) => <span className="font-bold text-gray-900 bg-yellow-100 px-0.5 rounded" style={{ fontWeight: 'bold' }}>{children}</span>,
                              em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                              code: ({ children }) => <code className="bg-blue-50 text-blue-600 px-1 py-0.5 rounded text-sm font-mono border">{children}</code>,
                              pre: ({ children }) => <pre className="bg-gray-50 border rounded p-2 text-sm overflow-x-auto my-2">{children}</pre>,
                              blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-700 my-2">{children}</blockquote>,
                              ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 ml-4">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 ml-4">{children}</ol>,
                              li: ({ children }) => <li className="text-gray-800">{children}</li>,
                              h1: ({ children }) => <h1 className="text-lg font-bold text-gray-900 mb-2 mt-3">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-base font-bold text-gray-900 mb-2 mt-3">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-sm font-bold text-gray-900 mb-1 mt-2">{children}</h3>,
                            }}
                          >
                            {m.text}
                          </ReactMarkdown>
                        </Message.CustomContent>
                      )}
                    </Message>
                  ))}
                </MessageList>
                {/* Dynamic Quick Actions */}
                <InputToolbox className="border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-wrap gap-1 p-1">
                    {contextData.contextualActions.slice(0, 4).map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        disabled={isTyping}
                        className="inline-flex items-center space-x-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title={action.prompt}
                      >
                        {action.emoji && <span>{action.emoji}</span>}
                        <span>{action.text}</span>
                      </button>
                    ))}
                  </div>
                </InputToolbox>
                <MessageInput
                  className="flex-shrink-0"
                  placeholder={
                    !hasApiKey
                      ? "Set up your API key first..."
                      : "Type a message..."
                  }
                  onSend={handleSend}
                  attachButton={false}
                  disabled={isTyping}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>
      )}

      {/* API Key Setup Panel */}
      {showApiKeyPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-ai-blue" />
                <h2 className="text-lg font-semibold text-gray-900">Setup Gemini API Key</h2>
              </div>
              <button
                onClick={hideApiKeySetup}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ai-blue focus:border-transparent"
                />
              </div>

              <div className="text-sm text-gray-600">
                <p className="mb-2">
                  Get your API key from{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ai-blue hover:underline"
                  >
                    Google AI Studio
                  </a>
                </p>
                <p>Your API key is stored locally in your browser and never sent to our servers.</p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={hideApiKeySetup}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApiKeySave}
                  disabled={!tempApiKey.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-ai-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Key</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChatAssistant;


