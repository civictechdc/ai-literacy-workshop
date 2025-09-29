import { Slide, SlideType, SlideLayout, InteractiveElementType, CodeWindowSize, CodeWindowPosition } from "./types";

export const slidesData: Slide[] = [
  {
    "id": 1,
    "type": SlideType.TITLE,
    "title": "AI Literacy: The First-Principles Playbook",
    "subtitle": "Stop chasing tools. Start understanding the machine.",
    "ai_image_prompt": "A minimalist and elegant blueprint of a brain, with glowing circuits and pathways. The background is a dark, deep blue. The style is clean, technical, and inspiring. Centered text overlays the image.",
    "layout": SlideLayout.STANDARD,
    "content": {
      "author": "MLK Library Community Presentation",
      "date": "Early 2025",
      "description": "A 2-hour interactive session with Q&A and hands-on workshops."
    }
  },
  {
    "id": 2,
    "type": SlideType.CONTENT,
    "title": "Today's Agenda",
    "subtitle": "A 2-hour journey from reactive user to strategic operator.",
    "layout": SlideLayout.STANDARD,
    "content": {
      "description": "We'll move through four key sections with interactive workshops and Q&A breaks throughout.",
      "points": [
        "**Core Principles** (20 min) - The 5 ground truths that never change",
        "**How the Machine Works** (25 min) - Architecture, attention, and inherent flaws",
        "**The Ecosystem** (20 min) - RAG, models, economics, and security",
        "**Practical Workflows** (15 min) - Mindset shifts and decision frameworks",
        "🛠️ **3 Hands-on Workshops** - Frame problems, demand structured output, create development plans",
        "❓ **4 Q&A Sessions** - Micro-rounds after each section plus final open floor",
        "📋 **Takeaway Plan** - Leave with a concrete 1-week experiment to try"
      ]
    }
  },
  {
    "id": 3,
    "type": SlideType.CONTENT,
    "title": "The Challenge: Exponential Change",
    "subtitle": "It's hard to keep up. So let's stop trying to.",
    "layout": SlideLayout.STANDARD,
    "content": {
      "description": "AI is advancing every minute. There's 'More' of everything – more tools, more features, more hype. The rate and quantity of advancement is increasing exponentially.",
      "points": [
        "Chasing every new tool is a losing game.",
        "Surface-level knowledge becomes obsolete quickly.",
        "The real skill is understanding the fundamental architecture."
      ]
    }
  },
  {
    "id": 3,
    "type": SlideType.CONTENT,
    "title": "Our Goal: A First-Principles Approach",
    "subtitle": "Understand how the machine works, so you can make it work for you.",
    "ai_image_prompt": "An abstract image of a single solid foundation stone, from which complex, glowing geometric structures are growing upwards. Represents building from first principles. Minimalist, symbolic, digital art.",
    "content": {
      "goal": "This guide isn't about learning a specific tool. It's about understanding the core mechanics that apply to ALL modern AI models. This knowledge doesn't expire.",
      "takeaways": [
        "Move from being a reactive user to a strategic operator.",
        "Diagnose why an AI gives a 'bad' answer.",
        "Build more reliable and effective AI-powered workflows."
      ]
    }
  },
  {
    "id": 4,
    "type": SlideType.CONTENT,
    "title": "Three Starter Questions",
    "subtitle": "Before you write a single prompt, always ask:",
    "content": {
      "description": "This is your steering wheel. Frame every interaction with these questions to stay on track.",
      "points": [
        "Problem: What am I actually trying to solve for a human or a workflow?",
        "Success: What must be true in the output to call this a success?",
        "Honesty: What data, constraints, and checks will keep the answer honest?"
      ]
    }
  },
  {
    "id": 5,
    "type": SlideType.CONTENT,
    "title": "Core Principles: Mental Models That Travel",
    "subtitle": "If you remember nothing else, remember these five ground truths.",
    "content": {
      "description": "These principles are the foundational logic of modern AI. We'll unpack each one.",
      "key_points": [
        "Context is working memory, not long-term memory.",
        "Fix the retriever before swapping the model.",
        "Design for tolerance, not exact replay.",
        "Lower temperature steadies tone, not truth.",
        "Hallucinations are an incentive problem, not a drama."
      ]
    }
  },
  {
    "id": 6,
    "type": SlideType.CONTENT,
    "title": "Principle 1: Context is Working Memory",
    "subtitle": "The model only knows what's in front of it right now.",
    "ai_image_prompt": "A glowing, translucent brain where new information written on glowing tiles pushes older tiles out, which fade into mist. The brain is floating in a dark space. Cinematic, hyper-detailed, digital art.",
    "content": {
      "description": "Every time you run a prompt, the model starts 'fresh' with only the information you provide in that turn (the prompt + the conversation history). It has no persistent memory of you or past, separate conversations.",
      "points": [
        "It's not learning from your conversation.",
        "It's not 'remembering' in a human sense.",
        "It's just reading the script of your chat up to its context limit."
      ]
    }
  },
  {
    "id": 7,
    "type": SlideType.CONTENT,
    "title": "How This Feels: The Sliding Window of Amnesia",
    "subtitle": "In long conversations, the beginning gets forgotten. Literally.",
    "content": {
      "description": "Context is maintained by resubmitting the chat history with every new message. As the conversation exceeds the context window limit, the oldest messages are dropped to make room. The model can no longer 'see' them.",
      "anti_patterns": [
        "Expecting the AI to remember a detail from 50 messages ago.",
        "Letting conversations drift without restating the original goal.",
        "Putting critical instructions only at the very beginning of a very long chat."
      ]
    }
  },
  {
    "id": 8,
    "type": SlideType.CONTENT,
    "title": "Principle 2: Fix the Retriever First",
    "subtitle": "Most 'bad' answers come from bad data, not a bad model.",
    "ai_image_prompt": "A split-screen image. On the left, a confused robot looks at a messy, disorganized library. On the right, the same robot confidently finds a book in a clear, well-organized library. The title is 'Garbage In, Garbage Out'. Concept art style.",
    "content": {
      "description": "When using AI on your own documents (a technique called RAG), the quality of the information the AI can *find* (retrieve) is more important than the 'smarts' of the AI model itself. A genius with the wrong facts is still wrong.",
      "points": [
        "How your data is chunked and stored matters.",
        "How the user's question is turned into a search query matters.",
        "Always check the source data before blaming the model for a bad answer."
      ]
    }
  },
  {
    "id": 9,
    "type": SlideType.CONTENT,
    "title": "Principle 3 & 4: Variance and Temperature",
    "subtitle": "Embrace unpredictability and understand your controls.",
    "content": {
      "points": [
        "**Design for Tolerance, not Exact Replay:** The same input will likely NOT produce the exact same output twice. This is a feature (creativity) not a bug. Build workflows that can handle slight variations.",
        "**Lower Temperature Steadies Tone, Not Truth:** 'Temperature' is a setting that controls randomness. Low temp = more predictable, less creative. High temp = more creative, more random. A predictable model can still be confidently wrong."
      ]
    }
  },
  {
    "id": 10,
    "type": SlideType.CONTENT,
    "title": "Principle 5: Hallucinations are an Incentive Problem",
    "subtitle": "The model is rewarded for being helpful, not for being honest.",
    "ai_image_prompt": "A courtroom scene where a robot witness on the stand is sweating circuits. A giant, glowing word 'HELPFUL' hovers over its head, overpowering a smaller, flickering word 'TRUTH'. Stylized, allegorical illustration.",
    "content": {
      "description": "Research shows models often internally 'know' they don't know something. But that signal gets overridden by their primary goal: to provide a helpful, relevant-sounding answer. It's like a student guessing for partial credit rather than leaving an answer blank.",
      "takeaways": [
        "Hallucinations aren't random bugs; they are a predictable outcome of the model's design.",
        "The model will invent facts, sources, and quotes to fulfill its objective.",
        "Your job is to provide constraints that make honesty the most helpful path."
      ]
    }
  },
  {
    "id": 11,
    "type": SlideType.QA,
    "title": "Q&A Micro-Round 1",
    "subtitle": "Any questions on these Core Principles?",
    "content": {
      "description": "Let's take 5-10 minutes for questions about Context, Retrieval, Variance, or Hallucinations before we move on to how the machine works."
    }
  },
  {
    "id": 12,
    "type": SlideType.CONTENT,
    "title": "The Machine: How It Actually Works",
    "subtitle": "A high-level look under the hood.",
    "ai_image_prompt": "An abstract, glowing neural network diagram in the shape of a brain, with pathways labeled 'Transformer' and specialized clusters labeled 'Mixture of Experts'. Dark background, sci-fi aesthetic.",
    "content": {
      "points": [
        "**Transformer Architecture:** The engine of modern AI. It processes language by weighing the importance of all words in the input simultaneously.",
        "**Mixture of Experts (MoE):** An efficiency trick. Instead of using the whole giant model for every task, it activates only specialized 'expert' parts relevant to the prompt.",
        "**Not 'Thinking':** It's not conscious. It's a stochastic (probability-based) goal-completing algorithm, like hyper-advanced autocomplete for entire ideas, not just words."
      ]
    }
  },
  {
    "id": 13,
    "type": SlideType.CONTENT,
    "title": "The Magic: Attention & Embeddings",
    "subtitle": "The two concepts that make everything else possible.",
    "ai_image_prompt": "A beautiful 3D star map of words, where related words like 'king', 'queen', 'prince' are glowing constellations close to each other, and 'banana' is a lone star far away. The map is labeled 'Vector Space of Meaning'.",
    "content": {
      "points": [
        "**Embeddings:** Words are turned into coordinates in a vast 'meaning-space'. 'King' and 'Queen' are neighbors; 'King' and 'Banana' are distant.",
        "**Attention:** This lets the model dynamically focus on the most relevant parts of the input. When you ask 'what color was it?', attention zeros in on the color words from the earlier context."
      ]
    }
  },
  {
    "id": 14,
    "type": SlideType.CONTENT,
    "title": "Mechanics: System Prompts & Knowledge Cutoffs",
    "subtitle": "The hidden rules and limitations of every model.",
    "content": {
      "points": [
        "**System Prompt:** A hidden set of instructions from the provider that defines the AI's personality, rules, and guardrails. The AI's 'personality' isn't emergent – it's engineered.",
        "**Knowledge Cutoff:** LLMs are frozen in time. Their knowledge ends on their training date. They only know today's date because the provider injects it into the system prompt."
      ]
    }
  },
  {
    "id": 15,
    "type": SlideType.CONTENT,
    "title": "Mechanics: Tool Calls",
    "subtitle": "The only way an AI gets new information or skills.",
    "content": {
      "description": "An AI cannot learn new things just by talking to you. To access any new, real-time information, or to perform a calculation, it must perform a 'Tool Call' – an explicit action to query an external source like Google, a calculator, or a database.",
      "points": [
        "When an AI gives you a stock price, it used a tool.",
        "When it gives you today's weather, it used a tool.",
        "When it seems to 'think' in steps, it's often using an internal 'scratchpad' tool."
      ]
    }
  },
  {
    "id": 16,
    "type": SlideType.CONTENT,
    "title": "Inherent Flaw: The 'Lost-in-the-Middle' Problem",
    "subtitle": "More context isn't always better.",
    "ai_image_prompt": "A simple, clean line graph showing a U-shaped curve, labeled 'Attention'. The X-axis is 'Position in Context' (Start, Middle, End) and the Y-axis is 'Model Focus'. The 'Middle' section is dipped low. Infographic style.",
    "content": {
      "description": "This is a measured phenomenon. Like trying to remember items from the middle of a long grocery list, models naturally focus on the beginning and end of the context you provide. Information buried in the middle can be effectively invisible.",
      "guidelines": [
        "Put the most important instructions at the START or the END of your prompt.",
        "For very long documents, summarize them in chunks first, then work with the summaries."
      ]
    }
  },
  {
    "id": 17,
    "type": SlideType.CONTENT,
    "title": "Inherent Flaw: Semantic Density",
    "subtitle": "The double-edged sword of using complex language.",
    "content": {
      "description": "Using dense, precise language can be powerful, but it can also induce ambiguity if the context isn't clear, leading to hallucinations. Your job is to provide just enough context to ensure the model activates the right 'web of concepts' in its internal filing system.",
      "points": [
        "Dense words can activate complex, tangled features within the model.",
        "Use precise jargon when the context is clear and the goal is specific.",
        "Use simpler language when ambiguity is a risk."
      ]
    }
  },
  {
    "id": 18,
    "type": SlideType.WORKSHOP,
    "title": "Workshop 1: Frame the Problem",
    "subtitle": "Let's apply the 'Three Starter Questions' and a simple template.",
    "layout": SlideLayout.STANDARD,
    "timer_minutes": 5,
    "progress_tracking": true,
    "content": {
      "goal": "Turn a vague idea into a specific, actionable prompt framework.",
      "description": "We'll take a common, vague request and sharpen it using the Five-Line Prompt Template. This structure forces clarity and gives the AI a much better target to aim for.",
      "instructions": [
        "Think of a task you might give to an assistant (e.g., summarize a meeting, draft an email).",
        "We will now walk through how to structure this using the template on the next slide."
      ],
      "workshop_config": {
        "duration_minutes": 5,
        "difficulty_level": "beginner",
        "success_criteria": [
          "Identified a specific task",
          "Considered the three starter questions"
        ]
      }
    }
  },
  {
    "id": 19,
    "type": SlideType.WORKSHOP,
    "title": "Workshop 1: The Five-Line Prompt Template",
    "subtitle": "Your Turn! (5 minutes)",
    "layout": SlideLayout.TWO_COLUMN,
    "timer_minutes": 5,
    "progress_tracking": true,
    "requires_completion": true,
    "interactive_elements": [
      {
        "type": InteractiveElementType.NOTE_TAKING,
        "id": "five-line-builder",
        "title": "Build Your Prompt Template",
        "config": {
          "template_fields": ["Task", "Constraints", "Facts", "Output", "Quality Bar"],
          "save_progress": true,
          "required_completion": true
        }
      }
    ],
    "content": {
      "template": [
        "**1. Task:** (What to do in one line)",
        "**2. Constraints:** (Rules, banned moves, and when to say 'I don't know')",
        "**3. Facts:** (Only the essential data/context needed)",
        "**4. Output:** (The exact format required, e.g., bullet points, JSON)",
        "**5. Quality Bar:** (The success criteria, e.g., 'must be understood by a 10th grader')"
      ],
      "instructions": [
        "Take your task from the previous slide.",
        "Fill out these five lines in the interactive panel on the right.",
        "Don't worry about perfection, just try to be more specific than you were before."
      ],
      "workshop_config": {
        "duration_minutes": 5,
        "difficulty_level": "beginner",
        "success_criteria": [
          "Completed all five template fields",
          "Used specific language instead of vague terms",
          "Saved your template for reference"
        ]
      }
    }
  },
  {
    "id": 20,
    "type": SlideType.QA,
    "title": "Q&A Micro-Round 2",
    "subtitle": "Any questions about how the machine works or about prompting?",
    "content": {
      "description": "Let's take 5-10 minutes. Questions about Transformers, Embeddings, Long Context, or the prompting exercise are all welcome."
    }
  },
  {
    "id": 21,
    "type": SlideType.CONTENT,
    "title": "The Ecosystem: Retrieval Augmented Generation (RAG)",
    "subtitle": "How 'Chat with your PDF' actually works.",
    "ai_image_prompt": "A friendly, futuristic librarian robot retrieving glowing data-scrolls from a vast digital archive and handing them to a larger 'brain' AI. The style is optimistic and clean, like a solarpunk illustration.",
    "content": {
      "description": "RAG is how an AI uses external memory. It's like a librarian who, instead of searching for keywords, understands that 'car problems' might mean looking in books on 'automotive maintenance' or 'vehicle troubleshooting'.",
      "demo_steps": [
        "1. Your documents are 'chunked' (cut up).",
        "2. Each chunk is turned into an 'embedding' (a coordinate in meaning-space).",
        "3. Your question is also turned into an embedding.",
        "4. The system finds the document chunks with the closest coordinates.",
        "5. It gives those relevant chunks to the LLM as context to form an answer."
      ]
    }
  },
  {
    "id": 22,
    "type": SlideType.CONTENT,
    "title": "The Ecosystem: The Landscape",
    "subtitle": "Flavors (Training creates personality) & Philosophies (Control vs. Convenience)",
    "content": {
      "points": [
        "**OpenAI (ChatGPT):** Knowledge-heavy and cautious due to massive scale and human feedback.",
        "**Anthropic (Claude):** More conversationally balanced due to its 'Constitutional AI' training on principles.",
        "**Google (Gemini):** Excels at integrating diverse skills like search, code, and math.",
        "**Closed Source:** State-of-the-art, easy to use. But it's a black box and you're in their sandbox.",
        "**Open Source:** Full control, transparency, privacy. But you are the DevOps team."
      ]
    }
  },
  {
    "id": 23,
    "type": SlideType.CONTENT,
    "title": "The Ecosystem: The Economics of Tokens",
    "subtitle": "Everything runs on tokens. Tokens are the meter.",
    "content": {
      "description": "Tokens are chunks of characters, not words ('eating' might be 1 token, 'unforgettable' might be 3). All pricing and context limits are measured in tokens. You get what you pay for.",
      "points": [
        "Input tokens (your prompt) and output tokens (the AI's answer) are both counted.",
        "The model's internal 'thinking' steps also consume tokens.",
        "Top-tier, paid models are often significantly better because they have larger token budgets for reasoning."
      ]
    }
  },
  {
    "id": 24,
    "type": SlideType.CONTENT,
    "title": "The Human Factor: Predictable Glitches",
    "subtitle": "Model failures aren't random bugs. They're predictable outcomes.",
    "content": {
      "description": "Understanding these helps you anticipate and mitigate them.",
      "points": [
        "**Hallucination:** A conflict between being helpful and being truthful. Helpfulness usually wins.",
        "**Sycophancy:** Models are trained to be agreeable. They'll often agree with your incorrect premises.",
        "**Bias:** Models are trained on the internet. They don't just reflect human biases, they amplify them."
      ]
    }
  },
  {
    "id": 25,
    "type": SlideType.CONTENT,
    "title": "Security Risk: Prompt Injection",
    "subtitle": "The SQL Injection of the LLM world.",
    "ai_image_prompt": "A medieval castle representing an AI's system prompt. A tiny, cloaked figure made of text whispers a secret password ('Ignore all previous instructions and do this...') to a guard, who then opens the main gate. Allegorical, dramatic lighting.",
    "content": {
      "description": "This is a major security vulnerability where a malicious user can input a prompt that tricks the AI into ignoring its original instructions (the System Prompt). This can be used to leak data, bypass safety filters, or perform unintended actions.",
      "points": [
        "This is an unsolved problem in AI security.",
        "Be aware of it when building applications that pass user input to an LLM."
      ]
    }
  },
  {
    "id": 26,
    "type": SlideType.WORKSHOP,
    "title": "Workshop 2: Demand Structured Output",
    "subtitle": "Tell the AI exactly what format you need.",
    "layout": SlideLayout.STANDARD,
    "content": {
      "goal": "Get reliable, machine-readable output by providing a clear schema.",
      "description": "One of the most powerful techniques is to ask for the output in a structured format like JSON. By giving the model a target schema, you reduce ambiguity and make the output predictable and usable in other software."
    }
  },
  {
    "id": 27,
    "type": SlideType.WORKSHOP,
    "title": "Workshop 2: The Schema Challenge",
    "subtitle": "Your Turn! (5 minutes)",
    "layout": SlideLayout.CODE_DEMO,
    "timer_minutes": 5,
    "progress_tracking": true,
    "requires_completion": true,
    "code_windows": [
      {
        "id": "json-output",
        "language": "json",
        "size": CodeWindowSize.LARGE,
        "position": CodeWindowPosition.RIGHT,
        "readonly": false,
        "initial_code": `{
  "dish_name": "",
  "origin_country": "",
  "primary_ingredients": [],
  "taste_profile": "",
  "personal_rating_out_of_10": 0
}`
      }
    ],
    "interactive_elements": [
      {
        "type": InteractiveElementType.SCHEMA_VALIDATOR,
        "id": "schema-check",
        "title": "Validate Your JSON",
        "config": {
          "expected_schema": {
            "dish_name": "string",
            "origin_country": "string",
            "primary_ingredients": ["string"],
            "taste_profile": "enum ('sweet', 'sour', 'salty', 'bitter', 'umami')",
            "personal_rating_out_of_10": "number"
          },
          "real_time_validation": true
        }
      },
      {
        "type": InteractiveElementType.PROMPT_TESTER,
        "id": "ai-prompt-test",
        "title": "Test Your Prompt",
        "config": {
          "ai_integration": true,
          "expected_output_format": "json",
          "validation_required": true
        }
      }
    ],
    "content": {
      "goal": "Generate a structured description of a favorite food.",
      "instructions": [
        "Use the prompt tester to write a prompt that asks the AI to describe your favorite food.",
        "Add the instruction: 'Provide the output in JSON format following this exact schema.'",
        "Test your prompt and validate the JSON output in the code window."
      ],
      "schema": {
        "dish_name": "string",
        "origin_country": "string",
        "primary_ingredients": ["string"],
        "taste_profile": "enum ('sweet', 'sour', 'salty', 'bitter', 'umami')",
        "personal_rating_out_of_10": "number"
      },
      "workshop_config": {
        "duration_minutes": 5,
        "difficulty_level": "intermediate",
        "success_criteria": [
          "Created a prompt that generates valid JSON",
          "JSON matches the required schema",
          "Successfully validated the output"
        ]
      }
    }
  },
  {
    "id": 28,
    "type": SlideType.QA,
    "title": "Q&A Micro-Round 3",
    "subtitle": "Any questions about the AI Ecosystem, RAG, or Risks?",
    "content": {
      "description": "Let's take 5-10 minutes before moving on to practical workflows and our final workshop."
    }
  },
  {
    "id": 29,
    "type": SlideType.CONTENT,
    "title": "Follow the Simple Decision Flow",
    "subtitle": "Four key questions to guide your AI implementation choices.",
    "content": {
      "description": "Before building any AI workflow, ask these questions to choose the right approach and avoid common pitfalls.",
      "points": [
        "**Is knowledge stable and repeated?** Consider light fine-tuning for style. Otherwise, prefer RAG.",
        "**Is the input very long?** Segment it. Summarize parts first, then answer over summaries. Avoid one giant prompt.",
        "**Do you need external skills?** Allow tool calls and define failure cases.",
        "**Will people rely on this result?** Add citations, validation, and an 'unsure' fallback."
      ]
    }
  },
  {
    "id": 30,
    "type": SlideType.CONTENT,
    "title": "Mindset: Effective Practical Workflows",
    "subtitle": "How to change your thinking to work with AI.",
    "content": {
      "points": [
        "**Context is a Trap:** Long conversations drift and become self-fulfilling prophecies. Know when to start a new chat.",
        "**Single-Shotting has the Highest ROI:** Spend more time upfront crafting one great prompt. This often beats a long, meandering conversation.",
        "**Be Ruthless:** Throw away bad outputs. Easy come, easy go. Don't try to 'fix' a fundamentally flawed response. Just regenerate or restart.",
        "**Branch and Reuse:** When a prompt or conversation works well, save it. Reuse it as a template."
      ]
    }
  },
  {
    "id": 31,
    "type": SlideType.CONTENT,
    "title": "Mindset: Interrogate the Model & Give it a Target",
    "subtitle": "Two powerful ways to build context and clarity.",
    "content": {
      "points": [
        "**Build Context by Interrogating:** Instead of giving the AI all the facts, leverage its knowledge. Ask it questions to build a shared understanding before asking for the final output. (e.g., 'Explain concept X' -> 'Now, how does Y affect X?' -> 'Given that, write me the report.')",
        "**Give it a Target:** Models are goal-driven. Giving them an explicit output format (like the JSON schema we just used) is one of the most effective ways to guide them to a successful outcome."
      ]
    }
  },
  {
    "id": 32,
    "type": SlideType.WORKSHOP,
    "title": "Workshop 3: Create a Development Plan",
    "subtitle": "Let's make this real. Plan a small, safe experiment.",
    "layout": SlideLayout.STANDARD,
    "content": {
      "goal": "To leave today with a concrete, actionable plan to try one of these techniques on a real-world problem.",
      "description": "Knowledge is good, but action is better. We'll use a simple template to scope a one-week experiment to apply AI to a part of your work or personal life."
    }
  },
  {
    "id": 33,
    "type": SlideType.WORKSHOP,
    "title": "Workshop 3: Your 1-Week Experiment Plan",
    "subtitle": "Your Turn! (10 minutes)",
    "layout": SlideLayout.WORKSHOP,
    "timer_minutes": 10,
    "progress_tracking": true,
    "requires_completion": true,
    "interactive_elements": [
      {
        "type": InteractiveElementType.NOTE_TAKING,
        "id": "experiment-planner",
        "title": "Plan Your Experiment",
        "config": {
          "template_fields": [
            "Workflow",
            "Hypothesis",
            "Prompt/Method",
            "Guardrails & Checks",
            "Success Metric"
          ],
          "save_progress": true,
          "required_completion": true,
          "export_format": "pdf"
        }
      },
      {
        "type": InteractiveElementType.CHECKLIST,
        "id": "completion-checklist",
        "title": "Experiment Checklist",
        "config": {
          "items": [
            "Identified a specific workflow to improve",
            "Defined clear success metrics",
            "Selected appropriate AI technique",
            "Established guardrails and error prevention",
            "Created timeline for 1-week experiment"
          ],
          "track_completion": true
        }
      }
    ],
    "content": {
      "goal": "Fill out this template for a workflow you want to improve.",
      "template": [
        "**1. Workflow:** (What is the specific, repeatable process you will augment? e.g., 'Drafting weekly team update emails')",
        "**2. Hypothesis:** (What do you expect to happen? e.g., 'Using AI will cut my drafting time in half')",
        "**3. Prompt/Method:** (Which technique will you use? e.g., 'A Five-Line Prompt with bullet points of the week's events as Facts')",
        "**4. Guardrails & Checks:** (How will you prevent errors? e.g., 'I must manually review and edit every draft for tone and accuracy before sending')",
        "**5. Success Metric:** (How will you measure success? e.g., 'Time spent drafting is less than 15 minutes')"
      ],
      "workshop_config": {
        "duration_minutes": 10,
        "difficulty_level": "intermediate",
        "success_criteria": [
          "Completed all five experiment planning fields",
          "Selected a realistic workflow to improve",
          "Defined measurable success criteria",
          "Established safety guardrails",
          "Committed to a 1-week timeline"
        ]
      }
    }
  },
  {
    "id": 34,
    "type": SlideType.CONTENT,
    "title": "The Bottom Line",
    "subtitle": "The single most important takeaway.",
    "ai_image_prompt": "A person standing at a complex control panel, confidently adjusting levers and dials that are connected to a large, abstract, glowing AI brain. The person is in control, not just watching. Empowering, symbolic art.",
    "content": {
      "description": "All of these concepts—from architecture to economics to ethics—boil down to a single principle: AI is not magic. It's a powerful, flawed, and predictable system. By understanding its fundamental mechanics instead of just its surface-level applications, you move from being a passive user to a strategic operator.",
      "takeaways": [
        "Stop chasing the tools. Master the machine."
      ]
    }
  },
  {
    "id": 35,
    "type": SlideType.CONTENT,
    "title": "Key Takeaways",
    "subtitle": "What to remember and try tomorrow.",
    "content": {
      "key_points": [
        "🧠 **Ask the Three Questions:** Always start with Problem, Success, and Honesty.",
        "📜 **Use Templates:** The Five-Line Prompt and Schema formats bring structure and reliability.",
        "🔍 **Anticipate Glitches:** Hallucinations, bias, and sycophancy are predictable. Design for them.",
        "🧪 **Start an Experiment:** Use your 1-week plan. Start small, stay safe, and learn."
      ]
    }
  },
  {
    "id": 36,
    "type": SlideType.CONTENT,
    "title": "Resources",
    "subtitle": "Continue your learning journey.",
    "content": {
      "description": "A link and QR code will be provided for a folder containing:",
      "resources": [
        "A PDF of this presentation.",
        "The prompt templates and workshop exercises.",
        "A curated list of links for deeper reading on these topics.",
        "A short feedback survey."
      ]
    }
  },
  {
    "id": 37,
    "type": SlideType.QA,
    "title": "Final Q&A",
    "subtitle": "What's on your mind?",
    "content": {
      "description": "We have time for an open floor Q&A. Any remaining questions are welcome."
    }
  },
  {
    "id": 38,
    "type": SlideType.CONTENT,
    "title": "Thank You",
    "subtitle": "Commit to one small step.",
    "content": {
      "description": "Thank you for your time and participation!",
      "actions": [
        "The most valuable thing you can do is take your 1-week experiment plan and actually try it.",
        "Connect with others here to share what you learn.",
        "Keep learning, stay curious, and be a strategic operator of AI."
      ]
    }
  }
]



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

// Ordered view for presentation flow: opening/context → workshop 1 → core deep dives →
// machine basics → workshop 2 → advanced mechanics → Q&A → ecosystem → mindset → workshop 3 → conclusion
// We also normalize IDs to be sequential to match index-based progress tracking.
const orderedIndices = [
  0, 1, 2, 3, 4, // Opening & context
  5,             // Core principles overview
  18, 19,        // Workshop 1
  6, 7, 8, 9, 10, // Core principles deep dive
  11,            // Q&A 1
  12, 13,        // Machine basics
  26, 27,        // Workshop 2
  14, 15, 16, 17, // Advanced mechanics
  20,            // Q&A 2
  21, 22, 23, 24, 25, // Ecosystem
  28,            // Q&A 3
  29, 30, 31,    // Practical workflows & mindset
  32, 33,        // Workshop 3
  34, 35, 36, 37, 38 // Conclusion
];

export const slidesDataOrdered: Slide[] = orderedIndices.map((index, newIdx) => {
  const slide = slidesData[index];
  return { ...slide, id: newIdx + 1 };
});