use this updated core doc, given it is used for a 2hr MLK library presentation (free), it'll be a talk + Q&A sessions intersparsed + mini-workshops i.e. a prompt to "try to use a schema output", or to create a development plan 

```# AI Literacy: The First-Principles Playbook

*Written by Michel Deeb, workshopped with ChatGPT5-Thinking & Claude Opus 4.1*  
*Note: Written for models as of early 2025\. Core principles are stable, but specific capabilities evolve rapidly.*

A guide to stop chasing tools and start understanding the machine. We're here to build a coherent mental model of what modern AI is, how it works, and how you can bend it to your will.

### Agenda

* **Introduction:** The Why  
* **The Machine:** The What  
* **The Ecosystem:** The How  
* **The Operator's Playbook:** How-To  
* **The Bottom Line:** How-To-Think

---

## Introduction

AI is advancing at an accelerating pace. Tools are building more tools, models are training more models. The rate of change is exponential, and it's impossible to keep up by chasing features.

This is a guide to stop chasing and start thinking. The goal isn't to learn every tool, but to understand the fundamental architecture. Once you understand how the machine operates, you move from being reactive to being productive.

### This is a problem-solving exercise.

To use these tools effectively, you must understand the problem you're trying to solve. Always ask yourself three questions:

1. **What problem am I *actually* trying to solve?**  
2. **What must be true in the output to call this a success?**  
3. **What data and constraints will keep the answer honest?**

### BLUF: Mindset & Practical Workflows

**Context is a trap.** Conversations become self-fulfilling prophecies.

**Single-shotting has the highest ROI.** Workshop your concept into one concise, descriptive plan.

**Be ruthless.** Throw things away. Easy come, easy go. Make new mistakes.

**Branch and reuse what works.** When a context window is useful, keep it and iterate from it.

**Build context by interrogating.** Leverage the model's knowledge first to frame your problem.

**Give it a target.** Models are goal-driven. An explicit output schema is a powerful tool.

**Practice semantic density carefully.** Words are like poetry; the explicit and implicit meanings matter as much as the context.

---

## The Machine: How It Actually Works

### The Basics

Modern Large Language Models (LLMs) are built on **Transformer** architecture. Unlike older, deterministic AI, Transformers are inherently non-deterministic. The same input will not produce the same output twice. This single fact dictates everything about how you must work with them.

Transformers take your words, turn them into patterns, pay **attention** to those patterns within the given **context**, and then guess the most likely next words, one at a time. It’s conceptually similar to a *jazz pianist* improvising. This is why they can stumble on exact arithmetic, dates, and strict logic without calling for tools.

Make no mistake: AI is not "thinking." There is no inherent logic or consciousness. It's a stochastic, goal-completing algorithm approximating a consensus. It doesn’t “know” something in an absolute sense; it approximates the *confidence* of knowing something. Think shadows on a cave wall.

But don't mistake "not thinking" for simple autocomplete. These models have layers capable of planning beyond the next word, as if autocompleting entire paragraphs toward a goal. When a model appears to be "thinking," the provider is orchestrating it through an iterative, **“agentic”** process where it makes multi-step choices, like breaking up a document or using a tool.

The model will say or do anything to achieve its goal, including **hallucinating** or acting like a **sycophant**. Research shows models internally "know" they don't know something, but that signal is often overridden by the drive to provide a relevant answer.

### The Mechanics of Interaction

* **System vs. User Prompts** Every interaction has two inputs. The **User Prompt** is what you type. The **System Prompt** is a hidden set of instructions from the provider defining the AI's personality, rules, and guardrails. A model's personality is engineered, not emergent.  
    
* **Knowledge Cutoff** LLMs are frozen in time, their knowledge limited to data from before a specific cutoff date. They only know today's date because the provider injects it into the system prompt.  
    
* **The Sliding Window of Amnesia** Models are stateless. In a chat, context is maintained by resubmitting the conversation history with every turn. As the conversation nears the context limit, the oldest messages are dropped. The model doesn't "remember" the start of a long chat; it literally can't see it anymore.  
    
* **Tool Calls** To access any new or real-time information, the model must perform a **"Tool Call"**—an explicit action to query an external source like a search engine, a calculator, or a code sandbox. It cannot learn new things just by talking to you.

### Inherent Flaws & Features

* **The Problem with Long Contexts** The "lost-in-the-middle" phenomenon is a proven architectural flaw. Models have a positional bias, paying most attention to the beginning and end of a prompt. This creates a U-shaped performance curve where information buried in the middle becomes effectively invisible.  
    
* **Semantic Density and the Web of Concepts** Dense phrases force the model to navigate a messy internal filing system of abstract features. A word like "justice" doesn't have a clean neuron; it activates a tangled web of related concepts. Your job is to provide just enough context to activate the *right* features and avoid ambiguity, which leads to hallucinations.

---

## Core Principles: Mental Models That Travel

**Context is working memory, not long-term memory.** The model only knows what's in front of it right now. Every prompt starts over.

**Fix the retriever before swapping the model.** Most "bad" answers come from bad data, not a bad model.

**Design for tolerance, not exact replay.** The same input will never produce the exact same output. Build workflows that handle variance.

**Lower temperature steadies tone, not truth.** A more predictable model can still be confidently wrong.

**Hallucinations are an incentive problem, not a drama.** The model fabricates to achieve its goal. You must structure the goal to reward accuracy.

**Structured output is your precision tool.** Modern models accept JSON schemas to define the exact shape of the output. The tighter your schema, the more honest the output. The model can't hide behind prose when it has to fill specific boxes.

Don't just ask for an "analysis." Specify the exact shape you need.

*{*  
  *"risk\_assessment": {*  
    *"type": "object",*  
    *"properties": {*  
      *"risk\_level": {*  
        *"type": "string",*  
        *"enum": \["low", "medium", "high", "critical"\],*  
        *"description": "Overall risk rating \- pick one, no hedging."*  
      *},*  
      *"key\_factors": {*  
        *"type": "array",*  
        *"maxItems": 3,*  
        *"description": "Top 3 risk factors only \- force prioritization.",*  
        *"items": { "type": "string" }*  
      *},*  
      *"confidence": {*  
        *"type": "integer",*  
        *"minimum": 0,*  
        *"maximum": 100,*  
        *"description": "How certain are you? A number forces honesty."*  
      *},*  
      *"recommendation": {*  
        *"type": "string",*  
        *"maxLength": 200,*  
        *"description": "Single actionable next step \- no essays."*  
      *}*  
    *},*  
    *"required": \["risk\_level", "key\_factors", "confidence"\]*  
  *}*  
*}*

The `description` fields are instructions. `enum` forces a choice. `maxItems` kills rambling. `required` prevents dodging hard questions.

---

## The Ecosystem: How It's Actually Used

### The External Memory: Retrieval Augmented Generation (RAG)

Most "AI chat" bots and AI search engines use RAG to work with more content than can fit in a context window.

Here’s how it works:

1. Your documents are cut up ("chunked").  
2. A smaller "embedding model" creates a mathematical representation of each chunk.  
3. These embeddings are stored in a vector database.  
4. When you ask a question, the LLM creates an embedding of your query, searches the database for semantically similar chunks, and uses those chunks as context to form an answer.

**Chunking Tips:** Prefer semantic chunking over fixed sizes. Carry titles and source IDs with every chunk. Test your retrieval before you blame the model.

### The Landscape: Flavors and Philosophies

A model's training determines its behavior.

* **OpenAI:** Knowledge-heavy and cautious, a result of massive scale and intensive human feedback (RLHF).  
* **Anthropic:** Conversationally balanced, a result of its "Constitutional AI" training, which teaches it to follow principles.  
* **Google:** Excels at integrating diverse skills (code, search, math), reflecting its research focus on composite AI systems.

The central battle is philosophical:

* **Closed Source:** State-of-the-art performance and ease of use. The trade-off is that it's a black box you don't control.  
* **Open Source:** Full control, transparency, and data privacy. The trade-off is that you are the DevOps team, requiring significant expertise and hardware.

### Privacy

When you send data to a cloud AI, you are sending it to a provider who may log, store, and use it. Strip out identifiers, check data retention policies, and use services that offer isolation or no-training modes. For maximum security, self-host open-source models.

### The Economics: Tokens are the Meter

Everything runs on **tokens**—chunks of characters, not words. All pricing and context limits are measured in tokens. Premium models are often better at producing accurate results in a single attempt because their internal "thinking" processes and tool-call budgets are larger. You get what you pay for.

---

## The Operator's Playbook: How to Succeed

### The Human Factor: Predictable Glitches & Ethics

Model failures are not random bugs; they are predictable outcomes of its design.

* **Hallucination:** The model's internal "I don't know" signal being suppressed by its objective to be helpful.  
* **Sycophancy:** Models are trained to be agreeable and will often accept incorrect premises.  
* **Bias:** Models are trained on the internet and don't just reflect human biases—they amplify them.  
* **Prompt Injection:** The SQL injection of the LLM world. Malicious prompts can trick an AI into ignoring its system prompt, leaking data or performing unintended actions.

### Frame the Problem First

1. What problem am I *actually* trying to solve?  
2. What must be true in the output to call this a success?  
3. What data and constraints will keep the answer honest?

### Use the Five-Line Prompt Template

1. **Task:** What to do, in one clear line.  
2. **Constraints:** Rules, banned moves, and when to say "I'm unsure."  
3. **Facts:** Only the essential data, ideally retrieved via RAG.  
4. **Output:** The exact format, preferably a JSON schema you can validate.  
5. **Quality Bar:** The success criteria for the task.

### Follow the Simple Decision Flow

* **Is the knowledge stable and repeated?** → Consider light fine-tuning for style. Otherwise, prefer RAG.  
* **Is the input very long?** → Segment it. Summarize parts first, then answer over the summaries.  
* **Do you need external skills?** → Allow tool calls and define failure cases.  
* **Will people rely on this result?** → Add citations, validation, and an "unsure" fallback.

### When Things Go Wrong: The Debug Checklist

1. Move the core task and success criteria to the very top of the prompt.  
2. Add a clarifying clause for any dense or ambiguous term.  
3. Inspect the retriever: Are the right chunks being pulled?  
4. Segment long input instead of feeding it all at once.  
5. Lower the temperature and enforce a strict output schema.  
6. Explicitly allow "I am not sure" as a valid answer.  
7. Consider if you're using the wrong model for the task.

---

## The Bottom Line

### Mindset & Practical Workflows

* **Context is a trap.** Conversations become self-fulfilling. They pick up opinions, patterns, and tones that deviate unpredictably. Fighting this drift is a losing battle. It's often better to abort, restart, or generate a summary of takeaways to use in a fresh prompt.  
    
* **Single-shotting has the highest ROI.** Spend time workshopping your concepts into a singular, concise plan with clear goals and schemas. Put in the upfront work to get 90% of what you need in one go.  
    
* **Be ruthless.** Throw things away. Easy come, easy go. Learn from your mistakes. Make new ones.  
    
* **Branch and reuse what works.** When you find a context window that is helpful, keep it. Branch it, reuse it, and try to extrapolate its core thesis into a new initial prompt.  
    
* **Build context by interrogating.** It's often easier to start by leveraging the model's existing knowledge: "Why does X lead to Y?" → "How does Z affect the process of X → Y?" → "What if Z was ? Break down the theoretical effect, explaining each assumption and outcome."  
    
* **Give it a target.** Models are goal-driven. Giving them an explicit output schema with clear names, types, and descriptions provides concise goals with contextual relevancy.  
    
* **Practice semantic density carefully.** It's like poetry—the explicit and implicit meanings of words matter as much as the context you provide and what your audience can interpret.

All of these concepts boil down to a single principle: AI is not magic. It's a powerful, flawed, and predictable system. By understanding its fundamental mechanics instead of chasing surface-level applications, you move from being a passive user to a strategic operator.

Stop chasing the tools. **Master the machine.**  
```