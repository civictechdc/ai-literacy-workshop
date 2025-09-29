#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { slidesData } from '../slides-data.js';
import { NodeAIService } from './node-ai-service.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY!;
console.log('API Key:', apiKey);
const aiService = new NodeAIService(apiKey);
const getImageFilename = (prompt: string) => {
    // Simple hash function to generate consistent filename from prompt
    let hash = 0;
    for (let i = 0; i < prompt.length; i++) {
      const char = prompt.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  };
async function generateImages() {
    const outputDir = path.join(__dirname, '..', 'generated-images');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const slidesWithPrompts = slidesData.filter(s => s.ai_image_prompt !== undefined);

    for (const slide of slidesWithPrompts) {
        try {
            console.log('Slide:', slide);
            console.log(`Generating image for slide ${slide.id}...`);
            const imageData = await aiService.generateImage(slide.ai_image_prompt!);
            console.log('Image data:', imageData);
            const filePath = path.join(outputDir, `${getImageFilename(slide.ai_image_prompt!)}.png`);
            if (imageData) {
                fs.writeFileSync(filePath, imageData);
                console.log(`✓ Saved ${filePath}`);

            }
            else {
                console.log('No image data generated');
            }
        } catch (error) {
            console.log(`✗ Failed slide ${slide.id}:`, error);
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

generateImages();
