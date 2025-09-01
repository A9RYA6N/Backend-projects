import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const main = async(content: string)=>{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
        config: {
            systemInstruction: `${process.env.SYSTEM_INSTRUCTION}`,
        },
    });
    return response.text;
}

export default main;