import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateShortsScript = async (productName: string, productDescription: string, additionalContext: string = "") => {
  const prompt = `
You are an expert Product Shorts Script Maker. 
Follow the instructions in the "Product Shorts Maker Skill" strictly. 

Product Name: ${productName}
Product Description: ${productDescription}
Additional Context/Questions Answered: ${additionalContext}

Your Task:
1. First, analyze the product and select an "Emotional Archetype" (e.g., Hero's Relief, Status Flex, etc.) as defined in Section 1B of the skill.
2. If information is missing (like core benefit or specific audience), ask 2-3 targeted questions to refine the archetype.
3. Once ready, generate a 60-second script using the "Viral Script Blueprint" structure (Sections 3 and 5).

Format for each Scene:
SCENE [Number]: [Timing]
ARCHETYPE FOCUS: [What part of the strategy is this?]
VISUAL: [Action-oriented description]
IMAGE PROMPT: [Follow section 2, step 2 formula: Subject + Action + Setting + Lighting + Camera + Style --ar 9:16]
VOICEOVER (Hindi/Hinglish): [Natural, rhythmic scripts targeting the heart]

Final CTA:
- Professional CTA encouraging comments like "LINK" or checking the pinned comment.
- Suggest a "Pinned Comment Hack" to increase conversion.

Respond in Hindi/Hinglish for the script VO, but keep technical prompts and scene analysis in English.
  `.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
