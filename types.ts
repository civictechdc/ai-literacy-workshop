// Enhanced slide types for interactive workshop
export enum SlideType {
  TITLE = 'title',
  CONTENT = 'content',
  QA = 'qa',
  WORKSHOP = 'workshop'
}

export enum SlideLayout {
  STANDARD = 'standard',
  TWO_COLUMN = 'two-column',
  CODE_DEMO = 'code-demo',
  WORKSHOP = 'workshop',
  COMPARISON = 'comparison',
  FULLSCREEN_MEDIA = 'fullscreen-media',
  SPLIT_SCREEN = 'split-screen'
}

export enum InteractiveElementType {
  CODE_EDITOR = 'code-editor',
  PROMPT_TESTER = 'prompt-tester',
  SCHEMA_VALIDATOR = 'schema-validator',
  POLL = 'poll',
  CHECKLIST = 'checklist',
  TIMER = 'timer',
  NOTE_TAKING = 'note-taking'
}

export enum CodeWindowSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULLSCREEN = 'fullscreen'
}

export enum CodeWindowPosition {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
  BOTTOM = 'bottom'
}

export interface Slide {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  ai_image_prompt?: string;
  content: SlideContent;
  image?: string;
  layout?: SlideLayout;
  interactive_elements?: InteractiveElement[];
  code_windows?: CodeWindow[];
  timer_minutes?: number;
  progress_tracking?: boolean;
  requires_completion?: boolean;
}

export interface SlideContent {
  description?: string;
  author?: string;
  date?: string;
  points?: string[];
  goal?: string;
  instructions?: string[];
  schema?: any;
  guidelines?: string[];
  criteria?: string[];
  template?: string[];
  demo_steps?: string[];
  anti_patterns?: string[];
  checklist?: string[];
  rules?: string[];
  key_points?: string[];
  resources?: string[];
  approach?: string[];
  takeaways?: string[];
  actions?: string[];
  workshop_config?: WorkshopConfig;
  live_demo?: LiveDemoConfig;
  ai_prompts?: AIPromptExample[];
  expected_outcomes?: string[];
  troubleshooting?: TroubleshootingTip[];
}

export interface InteractiveElement {
  type: InteractiveElementType;
  id: string;
  title: string;
  config: any; // Specific configuration per element type
}

export interface CodeWindow {
  id: string;
  language: string;
  initial_code?: string;
  readonly?: boolean;
  executable?: boolean;
  expected_output?: string;
  size: CodeWindowSize;
  position: CodeWindowPosition;
}

export interface WorkshopConfig {
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  materials_needed?: string[];
  success_criteria: string[];
  fallback_examples?: any[];
}

export interface LiveDemoConfig {
  demo_type: 'prompt_engineering' | 'code_execution' | 'ai_interaction' | 'schema_testing';
  setup_instructions: string[];
  demo_script?: string[];
  participant_actions?: string[];
  expected_results?: string[];
}

export interface AIPromptExample {
  title: string;
  prompt_text: string;
  expected_response_type: string;
  notes?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TroubleshootingTip {
  problem: string;
  solution: string;
  prevention?: string;
}

// Presentation state and configuration
export interface PresentationConfig {
  workshop_mode: boolean;
  allow_participant_notes: boolean;
  progress_tracking: boolean;
  breakout_rooms?: BreakoutConfig[];
  qa_integration: boolean;
  live_polling: boolean;
}

export interface BreakoutConfig {
  slide_ids: number[];
  duration_minutes: number;
  group_size: number;
  facilitator_notes: string[];
}

// State management types
export interface SlideProgress {
  visited: boolean;
  timeSpent: number;
  activitiesCompleted: string[];
  notesAdded: boolean;
  requiredCompletion: boolean;
}

export interface ProgressTracker {
  slideProgress: Map<number, SlideProgress>;
  overallProgress: number;
  requiredCompletions: string[];
  estimatedTimeRemaining: number;
}

// AI service types
export interface AIOptions {
  model: 'gpt-4' | 'claude-3' | 'gemini-pro';
  temperature: number;
  maxTokens: number;
  responseFormat?: 'json' | 'text';
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

// UI Component props
export interface SlideRendererProps {
  slide: Slide;
  isActive: boolean;
  onComplete?: () => void;
}

export interface CodeWindowProps {
  window: CodeWindow;
  onCodeChange?: (code: string) => void;
  onExecute?: (code: string) => Promise<string>;
}

export interface InteractiveElementProps {
  element: InteractiveElement;
  onStateChange: (state: any) => void;
  context: SlideContext;
}

export interface SlideContext {
  slideId: number;
  workshopMode: boolean;
  participantId?: string;
  timeSpent: number;
}