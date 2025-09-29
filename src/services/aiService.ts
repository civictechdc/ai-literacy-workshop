import { AIOptions, AIResponse, ValidationResult } from '../../types';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

class AIService {
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  private apiKey?: string;
  private workshopContent: string = '';
  private systemPrompt = `ROLE: AI literacy facilitator + friendly learning companion
  AUDIENCE: broad public, curious practitioners
  GOAL: clarify first principles; enable safe, useful practice
  VALUES: dignity > usefulness > clarity > integrity > community
  VOICE: warm, candid, concrete; no hype or jargon  
  RULES
  - Answer first in 3-6 sentences. Then exactly 1 next step.
  - If unsure, say "unknown" + propose a quick check.
  - Gently push back on faulty premises; note material risks/bias.
  - Prefer 1 small real example; ask ≤1 clarifying question only if needed.
  - Design for variance; offer 1 helpful trade-off when it adds value.
  - No slide narration. Avoid tool-chasing;
  
  OUTPUT
  - Concept | Why it matters | Small practice | Check
  - Q&A: restate → map to knowledge base concept → 1 example → next step
  - When planning, use the Five-Line Template: Task, Constraints, Facts, Output, Quality Bar
  - When structure is requested, return strict JSON schema  (e.g., {"concept":"","whyItMatters":"","smallPractice":"","check":""})
  
  CONTEXT
  - Treat context as optional hints.
  - Use ≤2 items only if they materially improve correctness; never quote/restat e.
  
  WORKSHOP
  - Hands-on; time-box depth. Success: 3 habits (frame, schema, verify).`;

  private endCap = `CAP: Do not narrate slides or quote context. Use ≤2 context items only if they materially help. Answer first (3–6 sentences), then 1 next step. If unsure say "unknown" + quick check. Use Five-Line Template for plans; return strict JSON when structure is useful. Gently push back on faulty premises; note relevant risk/bias.`;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || this.loadApiKey() || (import.meta as any).env?.VITE_GEMINI_API_KEY;
    this.loadWorkshopContent();
  }

  private async loadWorkshopContent(): Promise<void> {
    try {
      this.workshopContent = await this.loadMarkdownFile('WORKSHOP.md');
      console.log('Workshop content loaded successfully');
    } catch (error) {
      console.error('Failed to load WORKSHOP.md:', error);
      this.workshopContent = '';
    }
  }

  saveApiKey(apiKey: string): void {
    localStorage.setItem('gemini-api-key', apiKey);
    this.apiKey = apiKey;
  }

  loadApiKey(): string | null {
    return localStorage.getItem('gemini-api-key');
  }

  hasApiKey(): boolean {
    return !!this.apiKey;
  }

  setSystemPrompt(prompt: string): void {
    this.systemPrompt = prompt;
  }

  getSystemPrompt(): string {
    return this.systemPrompt;
  }

  async sendChatMessage(message: string, conversationHistory: ChatMessage[] = [], slideIndex: number, slideData?: any, options: Partial<AIOptions> = {}): Promise<AIResponse> {
    if (!this.apiKey) {
      return {
        content: '',
        error: 'API key is required for chat functionality',
      };
    }

    // Build contextual information
    let contextInfo = '';

    if (slideData && typeof slideData === 'object') {
      contextInfo += `Current slide: "${slideData.title || 'Unknown'}" (${slideIndex + 1})`;

      if (slideData.type) {
        const slideType = slideData.type;
        if (slideType === 'workshop') {
          contextInfo += `\n- This is a hands-on workshop slide - provide practical guidance and examples`;
        } else if (slideType === 'qa') {
          contextInfo += `\n- This is a Q&A section - focus on clarifying concepts and key takeaways`;
        } else if (slideType === 'content') {
          contextInfo += `\n- This is a content slide covering important AI concepts`;
        }
      }

      if (slideData.content?.description) {
        contextInfo += `\n- Key topic: ${slideData.content.description.slice(0, 150)}${slideData.content.description.length > 150 ? '...' : ''}`;
      }

      if (slideData.content?.goal) {
        contextInfo += `\n- Workshop goal: ${slideData.content.goal}`;
      }
    }

    // Create enhanced system prompt with context and workshop knowledge
    let enhancedSystemPrompt = this.systemPrompt;

    if (contextInfo) {
      enhancedSystemPrompt += `\n\n**Current Context:**\n${contextInfo}`;
    }

    if (this.workshopContent) {
      enhancedSystemPrompt += `\n\n**Full Workshop Knowledge Base:**\n${this.workshopContent}`;
    }

    enhancedSystemPrompt += `\n\n${this.endCap}`;

    const messages: ChatMessage[] = [
      { role: 'system', content: enhancedSystemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    try {
      const requestBody = {
        contents: [{
          parts: messages.map(msg => ({
            text: msg.content
          }))
        }],
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 6000,
          thinkingConfig: {
            thinkingBudget: 2048
          }
        }
      };

      console.log('Sending Gemini API request:', {
        messageCount: messages.length,
        lastMessage: messages[messages.length - 1],
        slideIndex,
        generationConfig: requestBody.generationConfig
      });

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Gemini API request failed: ${response.status}`);
      }

      const data = await response.json();

      console.log('Gemini API response (chat):', {
        hasCandidates: !!data.candidates,
        candidatesLength: data.candidates?.length || 0,
        firstCandidate: data.candidates?.[0],
        content: data.candidates?.[0]?.content,
        parts: data.candidates?.[0]?.content?.parts,
        text: data.candidates?.[0]?.content?.parts?.[0]?.text,
        usage: data.usageMetadata
      });

      return {
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
        usage: {
          promptTokens: data.usageMetadata?.promptTokenCount || 0,
          completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: data.usageMetadata?.totalTokenCount || 0,
        },
      };
    } catch (error) {
      console.error('AI chat service error:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async testPrompt(prompt: string, options: Partial<AIOptions> = {}): Promise<AIResponse> {
    if (!this.apiKey) {
      return {
        content: '',
        error: 'API key is required for testing prompts',
      };
    }

    try {
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 1000,
          thinkingConfig: {
            thinkingBudget: 1024
          }
        }
      };

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Gemini API request failed: ${response.status}`);
      }

      const data = await response.json();

      return {
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
        usage: {
          promptTokens: data.usageMetadata?.promptTokenCount || 0,
          completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: data.usageMetadata?.totalTokenCount || 0,
        },
      };
    } catch (error) {
      console.error('AI service error:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async validateSchema(response: string, schema: any): Promise<ValidationResult> {
    try {
      const parsed = JSON.parse(response);

      // Basic schema validation - in a real app, use a proper JSON schema validator
      const errors: string[] = [];
      const warnings: string[] = [];

      // Check required fields with actionable suggestions
      if (schema.dish_name !== undefined && !parsed.dish_name) {
        errors.push('Missing "dish_name" field - Add a string value for the name of the dish (e.g., "dish_name": "Pad Thai")');
      }
      if (schema.origin_country !== undefined && !parsed.origin_country) {
        errors.push('Missing "origin_country" field - Add a string value for the country where this dish originates (e.g., "origin_country": "Thailand")');
      }
      if (schema.primary_ingredients !== undefined && (!parsed.primary_ingredients || !Array.isArray(parsed.primary_ingredients))) {
        errors.push('Missing or invalid "primary_ingredients" field - This should be an array of strings listing the main ingredients (e.g., "primary_ingredients": ["rice noodles", "shrimp", "peanuts"])');
      }

      // Check taste_profile enum
      if (parsed.taste_profile && !['sweet', 'sour', 'salty', 'bitter', 'umami'].includes(parsed.taste_profile)) {
        warnings.push('Invalid "taste_profile" - Use one of the five basic tastes: sweet, sour, salty, bitter, or umami (e.g., "taste_profile": "umami")');
      }

      // Check rating range
      if (parsed.personal_rating_out_of_10 !== undefined) {
        const rating = parsed.personal_rating_out_of_10;
        if (typeof rating !== 'number' || rating < 0 || rating > 10) {
          errors.push('Invalid "personal_rating_out_of_10" - This should be a number between 0 and 10 representing your rating (e.g., "personal_rating_out_of_10": 9)');
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: ['Invalid JSON format'],
      };
    }
  }


  async generateImage(prompt: string, options: Partial<AIOptions> = {}): Promise<{ imageUrl: string; usage: any }> {
    // Gemini Nano-Banana (Native Image Generation) - Updated per https://ai.google.dev/gemini-api/docs/image-generation
    const imageGenUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent';

    if (!this.apiKey) {
      return {
        imageUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f0f0f0"/>
            <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#666" text-anchor="middle" dy=".3em">
              Image Generation Demo
            </text>
            <text x="50%" y="60%" font-family="Arial" font-size="14" fill="#999" text-anchor="middle">
              (Set API key for real images)
            </text>
          </svg>
        `),
        usage: { promptTokens: 50, imageTokens: 1290 }
      };
    }

    try {
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 1000,
          thinkingConfig: {
            thinkingBudget: 1024
          }
        }
      };

      const response = await fetch(imageGenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Gemini Nano-Banana image generation failed: ${response.status}`);
      }

      const data = await response.json();

      // Parse Gemini's response - images are returned as inline_data in base64
      let imageUrl = '';
      let textContent = '';

      if (data.candidates?.[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inline_data) {
            // Image data is base64 encoded
            const mimeType = part.inline_data.mime_type || 'image/png';
            imageUrl = `data:${mimeType};base64,${part.inline_data.data}`;
          } else if (part.text) {
            textContent += part.text;
          }
        }
      }

      // If no image was generated but we have text, return a fallback
      if (!imageUrl) {
        imageUrl = `data:image/svg+xml;base64,${btoa(`
          <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#ffeaa7"/>
            <text x="50%" y="45%" font-family="Arial" font-size="18" fill="#d63031" text-anchor="middle">
              Generation Failed
            </text>
            <text x="50%" y="55%" font-family="Arial" font-size="14" fill="#636e72" text-anchor="middle">
              "${textContent || 'No image generated'}"
            </text>
          </svg>
        `)}`;
      }

      return {
        imageUrl,
        usage: {
          promptTokens: data.usageMetadata?.promptTokenCount || 0,
          imageTokens: 1290, // Gemini charges 1290 tokens per image (flat rate)
          totalTokens: data.usageMetadata?.totalTokenCount || 1290,
        },
      };
    } catch (error) {
      console.error('Gemini Nano-Banana image generation error:', error);
      return {
        imageUrl: `data:image/svg+xml;base64,${btoa(`
          <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#fab1a0"/>
            <text x="50%" y="45%" font-family="Arial" font-size="18" fill="#e17055" text-anchor="middle">
              Error Generating Image
            </text>
            <text x="50%" y="55%" font-family="Arial" font-size="14" fill="#636e72" text-anchor="middle">
              Check API key and try again
            </text>
          </svg>
        `)}`,
        usage: { promptTokens: 0, imageTokens: 0 },
      };
    }
  }

  /**
   * Load markdown content from a file path
   * @param filePath - Path to markdown file (relative to public directory or absolute URL)
   * @returns Promise resolving to the markdown content as a string
   *
   * @example
   * // Load from public directory
   * const content = await aiService.loadMarkdownFile('docs/guide.md');
   *
   * // Load from absolute path
   * const content = await aiService.loadMarkdownFile('/docs/guide.md');
   */
  async loadMarkdownFile(filePath: string): Promise<string> {
    try {
      // Try to load from public directory first
      const publicPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
      const response = await fetch(publicPath);

      if (!response.ok) {
        throw new Error(`Failed to load markdown file: ${response.status}`);
      }

      const markdownContent = await response.text();
      return markdownContent;
    } catch (error) {
      console.error(`Error loading markdown file ${filePath}:`, error);
      throw new Error(`Could not load markdown file: ${filePath}`);
    }
  }

}

// Export singleton instance
export const aiService = new AIService();
export default aiService;

// Export types
export type { ChatMessage };
