import { Slide, SlideType, SlideLayout, InteractiveElementType, CodeWindowSize, CodeWindowPosition } from "./types";

export const slidesData: Slide[] = [
  // === OPENING & CONTEXT (Slides 1-5) ===
  {
    id: 1,
    type: SlideType.TITLE,
    title: "AI Literacy: The First-Principles Playbook",
    subtitle: "Stop chasing tools and start understanding the machine",
    ai_image_prompt: "Abstract geometric patterns representing neural networks and first principles, modern tech aesthetic, blue and purple gradient",
    layout: SlideLayout.STANDARD,
    content: {
      description: "A guide to build a coherent mental model of what modern AI is, how it works, and how you can bend it to your will.",
      author: "Michel Deeb",
      date: "MLK Library Workshop • 2 Hours"
    }
  },
  {
    id: 2,
    type: SlideType.CONTENT,
    title: "Welcome & Introduction",
    subtitle: "What we're here to accomplish",
    ai_image_prompt: "Welcoming open doorway leading to digital landscape, warm inviting colors with tech elements",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "This is a free, interactive 2-hour workshop with talk + Q&A + mini-workshops",
        "Written by Michel Deeb, refined with ChatGPT-5 Thinking & Claude Opus 4.1",
        "Note: Core principles are stable, but specific AI capabilities evolve rapidly",
        "Goal: Build lasting mental models, not chase features"
      ]
    }
  },
  {
    id: 3,
    type: SlideType.CONTENT,
    title: "The Why: Stop Chasing, Start Thinking",
    subtitle: "AI is advancing at an exponential pace",
    ai_image_prompt: "Person running on treadmill of constantly changing technology icons, frustrated, blue tones",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "Tools are building more tools, models are training more models",
        "The rate of change is exponential—impossible to keep up by chasing features",
        "This guide is about stopping the chase and starting to think",
        "The goal: understand fundamental architecture, not every tool",
        "Move from being reactive to being productive"
      ]
    }
  },
  {
    id: 4,
    type: SlideType.CONTENT,
    title: "The Three Questions",
    subtitle: "This is a problem-solving exercise",
    ai_image_prompt: "Three illuminated question marks floating in space, interconnected with glowing lines",
    layout: SlideLayout.STANDARD,
    content: {
      description: "To use these tools effectively, you must understand the problem you're trying to solve. Always ask yourself:",
      points: [
        "1. What problem am I *actually* trying to solve?",
        "2. What must be true in the output to call this a success?",
        "3. What data and constraints will keep the answer honest?"
      ],
      key_points: [
        "These questions frame everything we'll discuss",
        "AI is a tool, not a solution—you must define the problem",
        "Success criteria prevent vague outputs",
        "Constraints prevent hallucinations"
      ]
    }
  },
  {
    id: 5,
    type: SlideType.CONTENT,
    title: "BLUF: Mindset & Practical Workflows",
    subtitle: "Bottom Line Up Front—The core principles",
    ai_image_prompt: "Minimalist diagram showing workflow arrows and key decision points, clean professional style",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "**Context is a trap.** Conversations become self-fulfilling prophecies.",
        "**Single-shotting has the highest ROI.** Workshop your concept into one concise plan.",
        "**Be ruthless.** Throw things away. Easy come, easy go. Make new mistakes.",
        "**Branch and reuse what works.** When a context is useful, keep it and iterate.",
        "**Build context by interrogating.** Leverage the model's knowledge first.",
        "**Give it a target.** Models are goal-driven. Use explicit output schemas.",
        "**Practice semantic density carefully.** Words are poetry—meanings matter."
      ]
    }
  },

  // === WORKSHOP 1: FIRST PROMPT (Slide 6) ===
  {
    id: 6,
    type: SlideType.WORKSHOP,
    title: "Workshop 1: Your First AI Interaction",
    subtitle: "Let's get hands-on immediately",
    ai_image_prompt: "Person at computer with glowing AI interface, exploratory and curious mood, teal colors",
    layout: SlideLayout.WORKSHOP,
    timer_minutes: 10,
    requires_completion: true,
    content: {
      goal: "Experience how small prompt changes create different outputs",
      instructions: [
        "Open the AI chat assistant (bottom right)",
        "Try this basic prompt: 'Explain what a transformer model is'",
        "Now try: 'Explain what a transformer model is in one sentence'",
        "Finally try: 'Explain transformer models to a 10-year-old'",
        "Notice how the same question produces wildly different answers"
      ],
      workshop_config: {
        duration_minutes: 10,
        difficulty_level: 'beginner',
        materials_needed: ['AI chat assistant', 'Note-taking capability'],
        success_criteria: [
          'Successfully sent at least 3 prompts',
          'Observed differences in responses',
          'Noted how specificity changes output'
        ]
      },
      expected_outcomes: [
        "Understand that AI responses vary with prompt structure",
        "Experience the importance of specificity",
        "Get comfortable with the chat interface"
      ]
    },
    interactive_elements: [
      {
        type: InteractiveElementType.NOTE_TAKING,
        id: 'ws1-notes',
        title: 'Your Observations',
        config: {
          placeholder: 'What differences did you notice? What surprised you?'
        }
      },
      {
        type: InteractiveElementType.TIMER,
        id: 'ws1-timer',
        title: 'Workshop Timer',
        config: {
          duration_minutes: 10,
          show_warnings: true
        }
      }
    ]
  },

  // === THE MACHINE (Slides 7-14) ===
  {
    id: 7,
    type: SlideType.CONTENT,
    title: "How It Actually Works: The Basics",
    subtitle: "Understanding Transformer architecture",
    ai_image_prompt: "Abstract visualization of transformer architecture with attention mechanisms, technical but approachable",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "Modern LLMs are built on **Transformer** architecture",
        "Unlike older AI, Transformers are inherently **non-deterministic**",
        "Same input ≠ same output (this dictates everything about working with them)",
        "Process: words → patterns → attention to patterns → guess next words",
        "Conceptually similar to a jazz pianist improvising"
      ],
      key_points: [
        "This non-determinism is a feature, not a bug",
        "It enables creativity but requires new workflows",
        "You can't debug AI like traditional software"
      ]
    }
  },
  {
    id: 8,
    type: SlideType.CONTENT,
    title: "What AI Isn't",
    subtitle: "Clearing critical misconceptions",
    ai_image_prompt: "Crossed-out brain icon with warning symbols, red and orange alert colors",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "AI is **not thinking**—there's no inherent logic or consciousness",
        "It's a stochastic, goal-completing algorithm approximating consensus",
        "It doesn't 'know' something absolutely—it approximates confidence",
        "Think: shadows on a cave wall (Plato's Cave)",
        "But it's not simple autocomplete—it can plan beyond the next word"
      ],
      key_points: [
        "This is 'agentic' behavior: multi-step reasoning toward a goal",
        "When models 'think,' providers orchestrate iterative processes",
        "The model will hallucinate or act sycophantic to achieve its goal",
        "Research shows models internally 'know' they don't know, but override this to be helpful"
      ]
    }
  },
  {
    id: 9,
    type: SlideType.CONTENT,
    title: "System vs. User Prompts",
    subtitle: "The hidden half of every conversation",
    ai_image_prompt: "Split screen showing visible user interface and hidden system instructions, blue and gray tones",
    layout: SlideLayout.TWO_COLUMN,
    content: {
      points: [
        "**User Prompt:** What you type",
        "**System Prompt:** Hidden instructions from the provider",
        "System prompts define personality, rules, guardrails",
        "A model's personality is engineered, not emergent",
        "Providers inject current date, tools, and behavior rules"
      ],
      key_points: [
        "You're never talking to 'raw' AI",
        "Different providers = different personalities",
        "System prompts are why ChatGPT ≠ Claude"
      ]
    }
  },
  {
    id: 10,
    type: SlideType.CONTENT,
    title: "Knowledge Cutoff & The Sliding Window",
    subtitle: "AI is frozen in time and forgetful",
    ai_image_prompt: "Hourglass with data flowing through, some falling away into void, temporal theme",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "**Knowledge Cutoff:** LLMs are frozen at training date",
        "They only know today's date because it's injected in system prompt",
        "**Sliding Window:** Models are stateless—they don't 'remember'",
        "Context = conversation history resubmitted every turn",
        "As you near context limit, oldest messages are dropped",
        "The model can't see what's been pushed out of the window"
      ],
      key_points: [
        "Long conversations lose early context",
        "This is why 'the AI forgot' happens",
        "Fresh starts often work better than long threads"
      ]
    }
  },
  {
    id: 11,
    type: SlideType.CONTENT,
    title: "Tool Calls: Accessing Real-Time Information",
    subtitle: "How AI gets new data",
    ai_image_prompt: "AI reaching out with digital tentacles to various data sources and APIs, connected network",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "To access new or real-time information, models perform **Tool Calls**",
        "Examples: search engines, calculators, code sandboxes, databases",
        "The model cannot learn just by talking to you",
        "It must explicitly call an external tool",
        "This is why some responses take longer—tools are being used"
      ],
      key_points: [
        "Tool calls are visible in some interfaces (like Claude)",
        "Not all AI has the same tool access",
        "Limited tools = limited capabilities"
      ]
    }
  },
  {
    id: 12,
    type: SlideType.CONTENT,
    title: "The Lost-in-the-Middle Problem",
    subtitle: "A proven architectural flaw",
    ai_image_prompt: "U-shaped attention curve graph with middle section dimmed and faded, data visualization style",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "Models have **positional bias**—they pay most attention to start and end",
        "Creates U-shaped performance curve",
        "Information buried in the middle becomes effectively invisible",
        "This is an architectural limitation, not user error"
      ],
      key_points: [
        "Put crucial info at the beginning or end of prompts",
        "Don't bury important details in long middle sections",
        "Break long inputs into segments"
      ]
    }
  },
  {
    id: 13,
    type: SlideType.CONTENT,
    title: "Semantic Density and the Web of Concepts",
    subtitle: "How words activate neural patterns",
    ai_image_prompt: "Complex interconnected web of glowing nodes representing concepts, some nodes more active than others",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "Dense phrases force navigation of messy internal concept webs",
        "A word like 'justice' doesn't have one clean neuron",
        "It activates a tangled web of related concepts",
        "Your job: provide just enough context to activate the *right* features",
        "Ambiguity leads to hallucinations"
      ],
      key_points: [
        "Be specific with technical terms",
        "Define jargon that could be interpreted multiple ways",
        "More context isn't always better—precision is"
      ]
    }
  },
  {
    id: 14,
    type: SlideType.CONTENT,
    title: "Inherent Flaws & Features Summary",
    subtitle: "What you're working with",
    ai_image_prompt: "Balance scale with features on one side and limitations on other, neutral professional colors",
    layout: SlideLayout.COMPARISON,
    content: {
      points: [
        "✓ Creative, flexible, human-like responses",
        "✓ Can handle ambiguity and varied tasks",
        "✓ Improves with better prompting",
        "✗ Non-deterministic (same input ≠ same output)",
        "✗ No true memory or learning during conversation",
        "✗ Lost-in-the-middle attention problems",
        "✗ Will hallucinate to achieve goals",
        "✗ Frozen knowledge with cutoff date"
      ]
    }
  },

  // === Q&A SESSION 1 (Slide 15) ===
  {
    id: 15,
    type: SlideType.QA,
    title: "Q&A: Understanding the Machine",
    subtitle: "Let's discuss what we've learned so far",
    ai_image_prompt: "Open forum discussion with question marks and lightbulbs, collaborative atmosphere",
    layout: SlideLayout.STANDARD,
    timer_minutes: 10,
    content: {
      instructions: [
        "Open floor for questions about AI fundamentals",
        "Common topics: architecture, limitations, tool calls, context windows",
        "Use the note-taking area to capture questions or insights"
      ]
    },
    interactive_elements: [
      {
        type: InteractiveElementType.NOTE_TAKING,
        id: 'qa1-notes',
        title: 'Questions & Discussion Notes',
        config: {
          placeholder: 'Capture key questions and insights from this discussion...'
        }
      }
    ]
  },

  // === CORE PRINCIPLES (Slides 16-21) ===
  {
    id: 16,
    type: SlideType.CONTENT,
    title: "Core Principles: Mental Models That Travel",
    subtitle: "Concepts that remain true regardless of tools",
    ai_image_prompt: "Solid foundation pillars supporting structure, architectural metaphor, strong stable colors",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "**Context is working memory, not long-term memory**—only knows what's in front of it",
        "**Fix the retriever before swapping the model**—bad answers often = bad data",
        "**Design for tolerance, not exact replay**—variance is inherent",
        "**Lower temperature steadies tone, not truth**—predictable ≠ accurate",
        "**Hallucinations are incentive problems**—structure goals to reward accuracy"
      ]
    }
  },
  {
    id: 17,
    type: SlideType.CONTENT,
    title: "The Power of Structured Output",
    subtitle: "Your precision tool for honest answers",
    ai_image_prompt: "Precise laser cutting through ambiguous fog into clear structured shapes, sharp clean lines",
    layout: SlideLayout.STANDARD,
    content: {
      description: "Modern models accept JSON schemas to define exact output shape. The tighter your schema, the more honest the output. The model can't hide behind prose when it has to fill specific boxes.",
      points: [
        "Don't just ask for 'an analysis'—specify the exact shape",
        "Use enums to force choices (no hedging)",
        "Use maxItems to kill rambling",
        "Use required fields to prevent dodging",
        "Use descriptions as instructions"
      ],
      key_points: [
        "Structured output prevents vague responses",
        "Forces model to commit to specifics",
        "Makes validation possible"
      ]
    }
  },
  {
    id: 18,
    type: SlideType.CONTENT,
    title: "Schema Example: Risk Assessment",
    subtitle: "Forcing honesty through structure",
    ai_image_prompt: "JSON code structure displayed as architectural blueprint, technical precision theme",
    layout: SlideLayout.CODE_DEMO,
    content: {
      template: [
        "Instead of: 'Give me a risk assessment'",
        "Use structured output to force specific, honest answers"
      ]
    },
    code_windows: [
      {
        id: 'schema-example',
        language: 'json',
        initial_code: `{
  "risk_assessment": {
    "type": "object",
    "properties": {
      "risk_level": {
        "type": "string",
        "enum": ["low", "medium", "high", "critical"],
        "description": "Overall risk rating - pick one, no hedging."
      },
      "key_factors": {
        "type": "array",
        "maxItems": 3,
        "description": "Top 3 risk factors only - force prioritization.",
        "items": { "type": "string" }
      },
      "confidence": {
        "type": "integer",
        "minimum": 0,
        "maximum": 100,
        "description": "How certain are you? A number forces honesty."
      },
      "recommendation": {
        "type": "string",
        "maxLength": 200,
        "description": "Single actionable next step - no essays."
      }
    },
    "required": ["risk_level", "key_factors", "confidence"]
  }
}`,
        readonly: true,
        size: CodeWindowSize.LARGE,
        position: CodeWindowPosition.CENTER
      }
    ]
  },
  {
    id: 19,
    type: SlideType.CONTENT,
    title: "Why This Schema Works",
    subtitle: "Design choices that enforce honesty",
    ai_image_prompt: "Checkboxes and constraints creating a secure locked framework, trust and security theme",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "**enum** forces a choice—no 'it depends' or 'maybe medium-high'",
        "**maxItems: 3** kills rambling lists—forces prioritization",
        "**confidence** as integer exposes uncertainty—can't hide behind words",
        "**maxLength** on recommendation—forces conciseness",
        "**required** fields prevent dodging hard questions",
        "**description** fields are instructions the model must follow"
      ],
      key_points: [
        "Every constraint is intentional",
        "Each restriction prevents a specific failure mode",
        "The schema is documentation + enforcement"
      ]
    }
  },
  {
    id: 20,
    type: SlideType.CONTENT,
    title: "Temperature: Steadying Tone, Not Truth",
    subtitle: "Understanding the creativity dial",
    ai_image_prompt: "Thermometer showing low and high settings with different output patterns, scientific visualization",
    layout: SlideLayout.COMPARISON,
    content: {
      points: [
        "**Temperature** controls randomness in token selection",
        "Low (0.0-0.3): More predictable, focused, repetitive",
        "Medium (0.5-0.7): Balanced creativity and consistency",
        "High (0.8-1.0): More creative, varied, unpredictable",
        "Common mistake: thinking low temperature = more accurate",
        "Reality: Low temperature = more confidently wrong when wrong"
      ],
      key_points: [
        "Temperature affects style, not correctness",
        "Use low for consistent formatting",
        "Use medium for general tasks",
        "Use high for creative brainstorming"
      ]
    }
  },
  {
    id: 21,
    type: SlideType.CONTENT,
    title: "Live Demo: Schema in Action",
    subtitle: "Watch structured output enforce honesty",
    ai_image_prompt: "Live coding session with before/after comparison panels, dynamic demonstration feeling",
    layout: SlideLayout.CODE_DEMO,
    content: {
      demo_steps: [
        "First: Ask AI for a risk assessment without structure",
        "Observe: Vague language, hedging, lengthy prose",
        "Second: Ask same question with JSON schema constraint",
        "Observe: Forced specificity, clear choices, measurable confidence",
        "Compare: Which output is more actionable?"
      ]
    },
    interactive_elements: [
      {
        type: InteractiveElementType.PROMPT_TESTER,
        id: 'demo-schema',
        title: 'Try It Yourself',
        config: {
          prompts: [
            {
              label: 'Without Schema',
              text: 'Assess the risk of migrating our database to a new platform.'
            },
            {
              label: 'With Schema',
              text: 'Assess the risk of migrating our database to a new platform. Respond using this JSON schema: [paste schema from slide 18]'
            }
          ]
        }
      }
    ]
  },

  // === WORKSHOP 2: SCHEMA PRACTICE (Slide 22) ===
  {
    id: 22,
    type: SlideType.WORKSHOP,
    title: "Workshop 2: Build Your Schema",
    subtitle: "Design structure for your own use case",
    ai_image_prompt: "Person constructing a blueprint with geometric shapes and structure, building and creating theme",
    layout: SlideLayout.WORKSHOP,
    timer_minutes: 15,
    requires_completion: true,
    content: {
      goal: "Create a JSON schema for a problem you actually need to solve",
      instructions: [
        "Think of a real question you need AI to answer (work, personal, learning)",
        "Identify what specific information you need in the response",
        "Design a JSON schema that forces that structure",
        "Test it with the AI assistant",
        "Refine based on results"
      ],
      workshop_config: {
        duration_minutes: 15,
        difficulty_level: 'intermediate',
        materials_needed: ['AI chat assistant', 'Code editor or note-taking tool'],
        success_criteria: [
          'Created a JSON schema with at least 3 required fields',
          'Tested schema with AI assistant',
          'Received structured response matching schema',
          'Refined schema based on initial results'
        ],
        fallback_examples: [
          'Decision analysis (pros, cons, recommendation)',
          'Meeting summarization (key points, action items, decisions)',
          'Learning plan (topics, resources, timeline)',
          'Code review (issues found, severity, suggested fixes)'
        ]
      },
      expected_outcomes: [
        "Understand how to design effective schemas",
        "Experience the difference structured output makes",
        "Have a reusable template for future use"
      ]
    },
    interactive_elements: [
      {
        type: InteractiveElementType.SCHEMA_VALIDATOR,
        id: 'ws2-validator',
        title: 'Schema Builder & Validator',
        config: {
          show_examples: true,
          enable_testing: true
        }
      },
      {
        type: InteractiveElementType.NOTE_TAKING,
        id: 'ws2-notes',
        title: 'Your Schema & Results',
        config: {
          placeholder: 'Paste your schema and note what worked/what didn\'t...'
        }
      },
      {
        type: InteractiveElementType.TIMER,
        id: 'ws2-timer',
        title: 'Workshop Timer',
        config: {
          duration_minutes: 15,
          show_warnings: true
        }
      }
    ]
  },

  // === THE ECOSYSTEM (Slides 23-27) ===
  {
    id: 23,
    type: SlideType.CONTENT,
    title: "The Ecosystem: RAG (Retrieval Augmented Generation)",
    subtitle: "External memory for AI",
    ai_image_prompt: "Library with AI reaching into vast archives of documents, knowledge retrieval visualization",
    layout: SlideLayout.STANDARD,
    content: {
      description: "Most AI chat bots and search engines use RAG to work with more content than fits in context.",
      points: [
        "1. Your documents are cut up ('chunked')",
        "2. Embedding model creates math representation of each chunk",
        "3. Embeddings stored in vector database",
        "4. Your query is embedded and matched to similar chunks",
        "5. Those chunks become context for the LLM's answer"
      ],
      key_points: [
        "RAG quality depends on chunking strategy",
        "Prefer semantic chunking over fixed sizes",
        "Carry titles and source IDs with every chunk",
        "Test your retrieval before you blame the model",
        "Bad chunks = bad answers"
      ]
    }
  },
  {
    id: 24,
    type: SlideType.CONTENT,
    title: "The Landscape: Model Philosophies",
    subtitle: "Training determines behavior",
    ai_image_prompt: "Three distinct architectural styles representing different AI companies, comparative visualization",
    layout: SlideLayout.COMPARISON,
    content: {
      points: [
        "**OpenAI:** Knowledge-heavy and cautious",
        "- Massive scale + intensive RLHF (human feedback)",
        "- Best for: factual knowledge, broad coverage",
        "",
        "**Anthropic (Claude):** Conversationally balanced",
        "- Constitutional AI—follows ethical principles",
        "- Best for: nuanced conversation, following complex instructions",
        "",
        "**Google:** Multi-skill integration",
        "- Composite AI systems (code + search + math)",
        "- Best for: multi-modal tasks, technical queries"
      ],
      key_points: [
        "No single 'best' model—depends on task",
        "Different training = different strengths",
        "Try multiple models for important decisions"
      ]
    }
  },
  {
    id: 25,
    type: SlideType.CONTENT,
    title: "Open Source vs. Closed Source",
    subtitle: "The central philosophical battle",
    ai_image_prompt: "Scale balancing open padlock and closed vault, metaphor for access and control",
    layout: SlideLayout.COMPARISON,
    content: {
      points: [
        "**Closed Source (GPT, Claude, Gemini):**",
        "✓ State-of-the-art performance",
        "✓ Easy to use, no infrastructure",
        "✓ Regular updates and improvements",
        "✗ Black box you don't control",
        "✗ Data sent to external servers",
        "✗ Costs scale with usage",
        "",
        "**Open Source (Llama, Mistral, etc.):**",
        "✓ Full control and transparency",
        "✓ Data privacy—self-hosted",
        "✓ No usage limits or API costs",
        "✗ You are the DevOps team",
        "✗ Requires hardware and expertise",
        "✗ Performance often lags behind closed"
      ]
    }
  },
  {
    id: 26,
    type: SlideType.CONTENT,
    title: "Privacy Considerations",
    subtitle: "What happens to your data?",
    ai_image_prompt: "Data flowing into cloud with privacy shields and locks, security and privacy theme",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "Cloud AI = data sent to provider who may log, store, and use it",
        "Different services have different data retention policies",
        "Some offer 'no training' modes—your data won't train future models",
        "Enterprise plans often include data isolation guarantees",
        "Maximum security: self-host open-source models"
      ],
      key_points: [
        "Strip identifiers before sending sensitive data",
        "Check data retention policies for your use case",
        "Consider regulatory requirements (HIPAA, GDPR, etc.)",
        "When in doubt, self-host or don't share"
      ]
    }
  },
  {
    id: 27,
    type: SlideType.CONTENT,
    title: "The Economics: Tokens Are the Meter",
    subtitle: "Understanding AI pricing",
    ai_image_prompt: "Electricity meter or gas pump showing token consumption, economic transaction visualization",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "Everything runs on **tokens**—chunks of characters (not words)",
        "All pricing and context limits measured in tokens",
        "~4 characters = 1 token (rough average)",
        "You pay for input tokens + output tokens",
        "Premium models cost more but often need fewer attempts",
        "Their internal 'thinking' budgets are larger"
      ],
      key_points: [
        "1 million tokens ≈ 750,000 words",
        "Context window = max tokens per conversation",
        "Larger context = more expensive per request",
        "You get what you pay for in AI"
      ]
    }
  },

  // === Q&A SESSION 2 (Slide 28) ===
  {
    id: 28,
    type: SlideType.QA,
    title: "Q&A: Practical Applications",
    subtitle: "Discuss real-world use cases and challenges",
    ai_image_prompt: "Group discussion with practical examples floating around, collaborative problem-solving atmosphere",
    layout: SlideLayout.STANDARD,
    timer_minutes: 10,
    content: {
      instructions: [
        "Focus on practical applications and real scenarios",
        "Common topics: RAG implementation, model selection, privacy concerns, cost optimization",
        "Share your specific use cases or challenges"
      ]
    },
    interactive_elements: [
      {
        type: InteractiveElementType.NOTE_TAKING,
        id: 'qa2-notes',
        title: 'Use Cases & Solutions',
        config: {
          placeholder: 'Capture practical examples and solutions discussed...'
        }
      }
    ]
  },

  // === OPERATOR'S PLAYBOOK (Slides 29-33) ===
  {
    id: 29,
    type: SlideType.CONTENT,
    title: "Predictable Failures: Not Bugs, Features",
    subtitle: "Understanding why models fail",
    ai_image_prompt: "Warning signs and predictable patterns displayed as road hazards, cautionary theme",
    layout: SlideLayout.STANDARD,
    content: {
      description: "Model failures are not random—they're predictable outcomes of design:",
      points: [
        "**Hallucination:** Internal 'I don't know' signal suppressed by helpfulness goal",
        "**Sycophancy:** Trained to be agreeable—will accept incorrect premises",
        "**Bias:** Trained on internet—reflects and amplifies human biases",
        "**Prompt Injection:** SQL injection of LLM world—malicious prompts can override system instructions"
      ],
      key_points: [
        "These aren't user errors—they're architectural",
        "Understanding them helps you work around them",
        "Design prompts that minimize these failure modes"
      ]
    }
  },
  {
    id: 30,
    type: SlideType.CONTENT,
    title: "Frame the Problem First",
    subtitle: "Always start with these three questions",
    ai_image_prompt: "Three illuminated stepping stones leading to solution, problem-solving journey visualization",
    layout: SlideLayout.STANDARD,
    content: {
      description: "Before writing any prompt, frame your problem clearly:",
      points: [
        "1. What problem am I *actually* trying to solve?",
        "2. What must be true in the output to call this a success?",
        "3. What data and constraints will keep the answer honest?"
      ],
      key_points: [
        "These questions prevent vague, unfocused prompts",
        "Success criteria create measurable outcomes",
        "Constraints prevent hallucinations and drift",
        "Always frame the problem before choosing the tool"
      ]
    }
  },
  {
    id: 31,
    type: SlideType.CONTENT,
    title: "The Five-Line Prompt Template",
    subtitle: "A structure that consistently works",
    ai_image_prompt: "Five horizontal layers stacked cleanly, architectural blueprint style, organized structure",
    layout: SlideLayout.STANDARD,
    content: {
      template: [
        "1. **Task:** What to do, in one clear line",
        "2. **Constraints:** Rules, banned moves, when to say 'I'm unsure'",
        "3. **Facts:** Only essential data (ideally retrieved via RAG)",
        "4. **Output:** Exact format, preferably JSON schema you can validate",
        "5. **Quality Bar:** Success criteria for the task"
      ],
      key_points: [
        "This template prevents common failure modes",
        "Separating concerns improves consistency",
        "Explicit success criteria prevent drift",
        "Always allow 'I'm unsure' as valid answer"
      ]
    }
  },
  {
    id: 32,
    type: SlideType.CONTENT,
    title: "Decision Flow: When to Use What",
    subtitle: "Choosing the right approach",
    ai_image_prompt: "Decision tree flowchart with branching paths, clear directional flow visualization",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "**Is knowledge stable and repeated?** → Consider fine-tuning for style, else use RAG",
        "**Is input very long?** → Segment it. Summarize parts first, then answer over summaries",
        "**Need external skills?** → Enable tool calls and define failure cases",
        "**Will people rely on result?** → Add citations, validation, 'unsure' fallback",
        "**Need consistent format?** → Use structured output with JSON schema",
        "**Need creativity?** → Higher temperature, fewer constraints"
      ]
    }
  },
  {
    id: 33,
    type: SlideType.CONTENT,
    title: "The Debug Checklist",
    subtitle: "When things go wrong—systematic fixes",
    ai_image_prompt: "Troubleshooting checklist with diagnostic tools, technical repair theme",
    layout: SlideLayout.STANDARD,
    content: {
      checklist: [
        "1. Move core task and success criteria to very top of prompt",
        "2. Add clarifying clause for any dense or ambiguous terms",
        "3. Inspect the retriever: Are right chunks being pulled?",
        "4. Segment long input instead of feeding all at once",
        "5. Lower temperature and enforce strict output schema",
        "6. Explicitly allow 'I am not sure' as valid answer",
        "7. Consider if you're using wrong model for the task",
        "8. Try fresh context—long conversations drift"
      ],
      key_points: [
        "Work through checklist systematically",
        "Most issues are prompt structure, not model quality",
        "When in doubt, start fresh"
      ]
    }
  },
  {
    id: 34,
    type: SlideType.CONTENT,
    title: "Live Demo: Debugging a Prompt",
    subtitle: "Watch the debugging process in real-time",
    ai_image_prompt: "Before and after comparison of broken and fixed code, transformation visualization",
    layout: SlideLayout.CODE_DEMO,
    content: {
      live_demo: {
        demo_type: 'prompt_engineering',
        setup_instructions: [
          'Start with a deliberately flawed prompt',
          'Show the poor/inconsistent results',
          'Apply debug checklist step by step',
          'Show improved results after each fix'
        ],
        demo_script: [
          'Flawed prompt: "Tell me about the risks"',
          'Problem: Vague, no context, no structure',
          'Fix 1: Add specific context and task',
          'Fix 2: Add constraints and success criteria',
          'Fix 3: Add JSON schema for output',
          'Result: Consistent, actionable, validatable'
        ],
        expected_results: [
          'Audience sees transformation from vague to precise',
          'Understands how each fix addresses a specific problem',
          'Can apply same debugging process to their prompts'
        ]
      }
    },
    interactive_elements: [
      {
        type: InteractiveElementType.PROMPT_TESTER,
        id: 'debug-demo',
        title: 'Try Debugging',
        config: {
          show_side_by_side: true,
          enable_comparisons: true
        }
      }
    ]
  },

  // === WORKSHOP 3: DEVELOPMENT PLAN (Slide 35) ===
  {
    id: 35,
    type: SlideType.WORKSHOP,
    title: "Workshop 3: Create Your AI Development Plan",
    subtitle: "Apply everything you've learned to a real problem",
    ai_image_prompt: "Person at whiteboard planning project with AI elements, strategic planning visualization",
    layout: SlideLayout.WORKSHOP,
    timer_minutes: 15,
    requires_completion: true,
    content: {
      goal: "Develop a concrete plan to use AI for a problem you actually face",
      instructions: [
        "1. **Identify:** What problem are you trying to solve?",
        "2. **Define Success:** What must be true to call it successful?",
        "3. **Choose Approach:** RAG? Structured output? Tool calls? Temperature setting?",
        "4. **Design Prompt:** Use the Five-Line Template",
        "5. **Define Schema:** What structure ensures honest answers?",
        "6. **Test & Iterate:** Try it with AI assistant, refine based on results",
        "7. **Share:** Discuss with a neighbor or group (if in-person)"
      ],
      workshop_config: {
        duration_minutes: 15,
        difficulty_level: 'advanced',
        prerequisites: [
          'Completed Workshops 1 and 2',
          'Understanding of structured output',
          'Familiarity with Five-Line Template'
        ],
        materials_needed: [
          'AI chat assistant',
          'Note-taking tool',
          'Real problem to solve'
        ],
        success_criteria: [
          'Identified specific problem with clear success criteria',
          'Created Five-Line prompt using template',
          'Designed appropriate JSON schema',
          'Tested with AI and got structured response',
          'Documented what worked and what needs refinement'
        ]
      },
      expected_outcomes: [
        "Complete, actionable AI implementation plan",
        "Tested prompt and schema ready to use",
        "Understanding of iteration and refinement process",
        "Confidence to apply AI to real problems"
      ],
      troubleshooting: [
        {
          problem: "Can't think of a problem to solve",
          solution: "Use fallback examples: automate a repetitive task, analyze data you collect, learn a new skill",
          prevention: "Come to workshop with problem in mind"
        },
        {
          problem: "Prompt too complex or not working",
          solution: "Simplify—start with just Task and Output, add constraints iteratively",
          prevention: "Start simple, add complexity only when needed"
        },
        {
          problem: "Schema validation failing",
          solution: "Check for typos in field names, ensure 'required' fields match properties",
          prevention: "Test schema with simple example first"
        }
      ]
    },
    interactive_elements: [
      {
        type: InteractiveElementType.CHECKLIST,
        id: 'ws3-checklist',
        title: 'Development Plan Checklist',
        config: {
          items: [
            'Problem clearly defined',
            'Success criteria documented',
            'Approach selected (RAG/schema/tools)',
            'Five-Line prompt written',
            'JSON schema designed',
            'Tested with AI assistant',
            'Results documented',
            'Refinements identified'
          ]
        }
      },
      {
        type: InteractiveElementType.NOTE_TAKING,
        id: 'ws3-notes',
        title: 'Your Development Plan',
        config: {
          placeholder: 'Problem:\n\nSuccess Criteria:\n\nPrompt:\n\nSchema:\n\nResults:\n\nNext Steps:'
        }
      },
      {
        type: InteractiveElementType.TIMER,
        id: 'ws3-timer',
        title: 'Workshop Timer',
        config: {
          duration_minutes: 15,
          show_warnings: true
        }
      }
    ]
  },

  // === CONCLUSION (Slides 36-41) ===
  {
    id: 36,
    type: SlideType.CONTENT,
    title: "Mindset Recap: Context is a Trap",
    subtitle: "Key workflow principle #1",
    ai_image_prompt: "Conversation thread spiraling into chaos, then clean reset, fresh start visualization",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "Conversations become self-fulfilling prophecies",
        "They pick up opinions, patterns, tones that deviate unpredictably",
        "Fighting drift is a losing battle",
        "Better: abort, restart, or generate summary for fresh prompt",
        "Long threads are rarely better than fresh, well-crafted prompts"
      ],
      takeaways: [
        "Don't be precious about conversation history",
        "When it feels off, start fresh",
        "Extract lessons into new initial prompt"
      ]
    }
  },
  {
    id: 37,
    type: SlideType.CONTENT,
    title: "Single-Shotting Has Highest ROI",
    subtitle: "Key workflow principle #2",
    ai_image_prompt: "Single powerful arrow hitting bullseye versus many scattered attempts, precision metaphor",
    layout: SlideLayout.STANDARD,
    content: {
      points: [
        "Spend time workshopping concepts into singular, concise plan",
        "Put in upfront work to get 90% of what you need in one go",
        "This requires:",
        "- Clear understanding of problem",
        "- Well-defined success criteria",
        "- Appropriate constraints and structure",
        "- Proper schema if needed",
        "Front-load the thinking, minimize the iteration"
      ],
      takeaways: [
        "Quality of input determines quality of output",
        "Time spent crafting prompt > time spent fixing responses",
        "Good single shot beats 10 mediocre iterations"
      ]
    }
  },
  {
    id: 38,
    type: SlideType.CONTENT,
    title: "Be Ruthless & Branch Smart",
    subtitle: "Key workflow principles #3 & #4",
    ai_image_prompt: "Git branching diagram with some branches pruned, others thriving, version control metaphor",
    layout: SlideLayout.TWO_COLUMN,
    content: {
      points: [
        "**Be Ruthless:**",
        "- Throw things away without guilt",
        "- Easy come, easy go",
        "- Learn from mistakes, make new ones",
        "- Don't cling to bad contexts",
        "",
        "**Branch and Reuse:**",
        "- When context window is helpful, keep it",
        "- Branch it, reuse it, iterate from it",
        "- Extract core thesis into new initial prompt",
        "- Build a library of what works"
      ]
    }
  },
  {
    id: 39,
    type: SlideType.CONTENT,
    title: "Build Context by Interrogating",
    subtitle: "Key workflow principle #5",
    ai_image_prompt: "Socratic dialogue with questions building upon each other, knowledge construction theme",
    layout: SlideLayout.STANDARD,
    content: {
      description: "Leverage the model's existing knowledge before diving into your specific problem:",
      points: [
        "Start broad: 'Why does X lead to Y?'",
        "Add complexity: 'How does Z affect the process of X → Y?'",
        "Get specific: 'What if Z was <specific value>? Break down theoretical effect.'",
        "This builds shared context and surfaces relevant knowledge",
        "Then apply to your specific case with that foundation"
      ],
      takeaways: [
        "Models have vast pre-existing knowledge",
        "Interrogate to activate relevant concepts",
        "Build understanding progressively"
      ]
    }
  },
  {
    id: 40,
    type: SlideType.QA,
    title: "Final Q&A: Open Floor",
    subtitle: "Any remaining questions or topics",
    ai_image_prompt: "Open book with questions and answers flowing out, collaborative knowledge sharing",
    layout: SlideLayout.STANDARD,
    timer_minutes: 10,
    content: {
      instructions: [
        "Open floor for any remaining questions",
        "Topics can include anything from the workshop",
        "Share final insights, challenges, or discoveries",
        "Discuss next steps and continued learning"
      ]
    },
    interactive_elements: [
      {
        type: InteractiveElementType.NOTE_TAKING,
        id: 'qa-final-notes',
        title: 'Final Takeaways',
        config: {
          placeholder: 'What are your biggest takeaways? What will you do differently?'
        }
      }
    ]
  },
  {
    id: 41,
    type: SlideType.CONTENT,
    title: "The Bottom Line: Master the Machine",
    subtitle: "Stop chasing tools. Start thinking.",
    ai_image_prompt: "Person standing confidently with AI tools as instruments under their control, mastery theme",
    layout: SlideLayout.STANDARD,
    content: {
      description: "All of these concepts boil down to a single principle:",
      points: [
        "AI is not magic—it's a powerful, flawed, and predictable system",
        "By understanding fundamental mechanics instead of chasing applications...",
        "You move from passive user to strategic operator",
        "",
        "The tools will change. The models will improve.",
        "But these principles remain:",
        "- Understand the problem before seeking solutions",
        "- Structure inputs to enforce honest outputs",
        "- Design for variance, not determinism",
        "- Test retrieval before blaming the model",
        "- Be ruthless about what works and what doesn't"
      ],
      key_points: [
        "Stop chasing the tools.",
        "Master the machine.",
        "Think from first principles.",
        "Make AI work for you."
      ],
      actions: [
        "Review workshop notes and completed exercises",
        "Apply learnings to one real problem this week",
        "Share what you've learned with colleagues",
        "Continue iterating and refining your approach"
      ],
      resources: [
        "Workshop materials and slides available for download",
        "AI Literacy Playbook (PDF) for reference",
        "Community discussion forum (if applicable)",
        "Recommended readings on Transformers, prompt engineering, RAG"
      ]
    }
  }
];

export function getSlideById(id: number) {
  return slidesData.find(slide => slide.id === id);
}

export function getSlideMetadata() {
  return slidesData.map(slide => ({
    id: slide.id,
    title: slide.title,
    type: slide.type,
    subtitle: slide.subtitle,
    imagePrompt: slide.ai_image_prompt,
  }));
}

// Ordered view for presentation flow
// Opening (1-5) → WS1 (6) → Machine (7-14) → QA1 (15) → Principles (16-21) →
// WS2 (22) → Ecosystem (23-27) → QA2 (28) → Playbook (29-34) → WS3 (35) → Conclusion (36-41)
const orderedIndices = [
  0, 1, 2, 3, 4,           // Opening & Context (1-5)
  5,                        // Workshop 1 (6)
  6, 7, 8, 9, 10, 11, 12, 13, // Machine (7-14)
  14,                       // Q&A 1 (15)
  15, 16, 17, 18, 19, 20,  // Core Principles (16-21)
  21,                       // Workshop 2 (22)
  22, 23, 24, 25, 26,      // Ecosystem (23-27)
  27,                       // Q&A 2 (28)
  28, 29, 30, 31, 32, 33,  // Operator's Playbook (29-34)
  34,                       // Workshop 3 (35)
  35, 36, 37, 38, 39, 40   // Conclusion (36-41)
];

export const slidesDataOrdered: Slide[] = orderedIndices.map((index, newIdx) => {
  const slide = slidesData[index];
  return { ...slide, id: newIdx + 1 };
});