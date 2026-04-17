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

Format your response exactly like "Section 6: Complete Content Package" in the skill file.

It MUST include:
- Viral Title (for YouTube/Reels)
- Video Description (SEO friendly)
- Social Media Caption (with relevant hashtags)
- Scene-by-scene breakdown (Timing, Archetype Focus, Visual, Image Prompt, Voiceover)

Final CTA:
- Professional CTA encouraging comments like "LINK" or checking the pinned comment.
- Suggest a "Pinned Comment Hack" to increase conversion.

CRITICAL: The Voiceover (VO) part MUST be in Hindi (Hinglish/Latin script script is fine, but standard Hindi/Devanagari is also encouraged). The Title, Description, and Caption should be in English (or Hindi if requested, but default to English for Title/Desc for reach).
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
