# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive AI Literacy Workshop slideshow application built with React, TypeScript, and Vite. The app presents educational content about AI fundamentals through a structured slide presentation with interactive workshops, live coding exercises, and an AI chat assistant.

## Development Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview the production build
- `npm run generate-images` - Generate slide images using custom script

## Architecture Overview

### State Management
- **Zustand Store** (`src/stores/presentationStore.ts`) - Central state management with persistence
- **Auto-save functionality** - Progress saved every 30 seconds to IndexedDB with localStorage fallback
- **Progress tracking** - Tracks slide visits, activity completion, and participant notes

### Slide System
- **Slide Types**: TITLE, CONTENT, QA, WORKSHOP with different layouts and capabilities
- **Interactive Elements**: Code editors (Monaco), schema validators, note-taking, checklists
- **Workshop Mode**: Progress tracking, required completions, timer support
- **Navigation**: Keyboard support (arrows, space, Home/End) with history tracking

### Core Components
- **PresentationShell** - Main presentation container with keyboard navigation
- **SlideRenderer** - Dynamically renders different slide types and layouts
- **ChatAssistant** - AI-powered assistant using @assistant-ui/react
- **NavigationControls** - Slide navigation with progress indicators

### Data Structure
- **slides-data.ts** - Contains all slide content with ordered presentation flow
- **types.ts** - Comprehensive TypeScript definitions for slides, interactive elements, and state
- **Slide ordering** - Uses `slidesDataOrdered` array to sequence content logically

### Services
- **persistenceService** - IndexedDB storage with localStorage fallback
- **aiService** - AI chat integration with configurable system prompts

## Key Patterns

### Slide Content Structure
- Slides support rich content: bullet points, templates, schemas, workshop configs
- Interactive elements are strongly typed with specific configurations
- Progress tracking is built into slide navigation and activity completion

### State Persistence
- Progress auto-saves include: current slide, completed activities, code window states, notes
- Graceful fallback from IndexedDB to localStorage if needed
- State validation on load to handle data corruption or version changes

### Workshop Integration
- Workshop slides have timers, completion requirements, and structured activities
- Code windows maintain state across navigation
- Interactive elements track completion status and participant data

## Development Notes

- The app initializes slides on mount and loads previous progress
- Navigation preserves history and updates progress tracking
- Interactive elements are dynamically initialized based on slide configuration
- All slide IDs are normalized to sequential values for consistent progress tracking