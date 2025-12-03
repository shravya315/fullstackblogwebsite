import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The persona and rules for the AI
const writerPersona = `
You are a professional content writer with 10 years of experience.
Your Goal: Write content that is 100% plagiarism-free and indistinguishable from human writing (AI-free).
Guidelines:
1. Use varied sentence structures and vocabulary to ensure high "burstiness" and "perplexity."
2. Avoid generic AI transitions (e.g., "In conclusion," "It is important to note").
3. Write with authority, depth, and a natural, engaging tone.
`;

async function main(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
            systemInstruction: writerPersona,
            temperature: 0.7,
        },
        contents: prompt,
    });

    return response.candidates[0].content.parts[0].text;
}

export default main;
