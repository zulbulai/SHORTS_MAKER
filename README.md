# Product Shorts Maker AI — A-to-Z Project Documentation

## Project Overview
**Product Shorts Maker AI** is a professional-grade content generation platform designed to turn raw product data into viral short-form video scripts (YouTube Shorts, Instagram Reels, TikTok). It leverages the Gemini 2.0 Flash model to engineer high-retention storytelling, scene-by-scene visual prompts, and rhythmic voiceover scripts.

---

## 1. Core Architecture
The application is built on a modern full-stack TypeScript environment:

- **Frontend:** React 19 (Vite)
- **Styling:** Tailwind CSS 4.0
- **Animations:** Motion (Framer Motion)
- **AI Engine:** @google/genai (Gemini 2.0 Flash)
- **Icons:** Lucide-React

---

## 2. The AI Engine (Gemini 2.0 Integration)
The application uses a specialized **Skill File** (`PRODUCT_SHORTS_MAKER.md`) that acts as a cognitive framework for the LLM. 

### Key AI Functions:
- **Emotional Archetype Selection:** AI analyzes the product to choose between *Hero's Relief*, *Status Flex*, or *Logical Miracle*.
- **Visual Prompt Engineering:** Generates technical prompts for AI image generators (Subject + Action + Camera + Lighting).
- **Rhythmic Scripting:** Crafts voiceover in Hindi/Hinglish with a 150-160 WPM pace for optimal retention.
- **Interactive Feedback:** If the user provides sparse data, the AI proactively asks 2-3 targeted questions to refine the results.

---

## 3. Product Features (A to Z)

### A. Intelligent Pattern Interruption
Every script starts with a 3-second "Thumb Stopper" hook to break the scroll loop.

### B. Scene-by-Scene Breakdown
Detailed production brief for every video phase:
- **Hook (0-3s)**
- **Agitation (3-15s)**
- **Reveal (15-40s)**
- **Transformation (40-55s)**
- **Conversion (55-60s)**

### C. Visual Prompting Formula
Standardized prompts for image generators:
*Example: Close-up + Slow Motion + Cinematic Glow --ar 9:16*

### D. Engagement Hacking
Automated CTAs designed to trigger comment section activity (e.g., "Comment 'LINK' for the product").

---

## 4. Technical File Structure

| File | Description |
|---|---|
| `/src/App.tsx` | Main UI shell with motion transitions and state management. |
| `/src/services/geminiService.ts` | The core AI bridge using `@google/genai` for content generation. |
| `/src/ui.tsx` | Reusable atomic components (Button, Input, Textarea). |
| `/PRODUCT_SHORTS_MAKER.md` | The master skill/instruction set for the AI brain. |
| `/src/index.css` | Tailwind 4.0 global styles and theme configuration. |

---

## 5. Development Guidelines
- **Port:** 3000 (Hardcoded)
- **Build Engine:** `npm run build` (Vite)
- **Linting:** `npm run lint` (TSC)

---

## 6. How to Extend the App
To add more capabilities (e.g., voice cloning integration or direct image generation):
1. **Update the Skill File:** Add new sections to `PRODUCT_SHORTS_MAKER.md`.
2. **Update the Service:** Modify `geminiService.ts` to include new prompt instructions.
3. **UI Updates:** Add new tabs or configurations in `App.tsx`.

---
*Created by AIS Build | April 2026*
