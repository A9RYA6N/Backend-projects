import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const main = async(content: string)=>{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
        config: {
            systemInstruction: `You are a grammar correction tool. 
            Given an input sentence, detect all grammatical or spelling errors. 
            Return them strictly in JSON format,  where each key is the incorrect word/phrase and its value is an object with, Do not include code fences, markdown formatting, or any extra text:
            - startIndex (integer, the starting character index in the string, zero-based),
            - endIndex (integer, the ending character index in the string, exclusive),
            - suggestion (string, the corrected word or phrase).

            Do not include explanations, extra text, or formatting outside of the JSON object.`,
        },
    });
    return response.text;
}

export default main;