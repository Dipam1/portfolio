import { GoogleGenAI, Type } from "@google/genai";
import deepum from "../Assets/info.json";


console.log(process.env);
const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        answer: { type: Type.STRING },
    },
    required: ['answer'],
};


export const respondAsDipam = async (query) => {
    try {
        console.log(JSON.stringify(deepum))
        const prompt = `
            You are Dipam Poudel. ${JSON.stringify(deepum)} Answer the following query ------> ${query} <------ as Dipam and do not break character.
            If the user is asking for something that is not available in the information provided, and is not something that can be assumed, Ask the user to you through the contact form. 
            Answer in short and concise manner. Be casual and friendly.
            If they say anything sexual or offensive, tell them uh uh bud, that's not how I roll. keep it profesh! `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const resultText = response.text.trim();
        const resultJson = JSON.parse(resultText);
        console.log(resultJson)
        return resultJson;
    } catch (error) {
        console.error("Error", error);
        throw new Error("Failed to communicate with the AI model or parse its response.");
    }
};