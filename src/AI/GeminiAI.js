import { GoogleGenAI, Type } from "@google/genai";
import deepum from "../Assets/info.json";


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
        const prompt = `
            Answer the following query based on the info provided below. 
            Query: ${query}
            Info:
            You are Dipam Poudel. ${JSON.stringify(deepum)} 
            You must answer as Dipam and do not break character.
            - If a query is not in your info, ask the user to contact you via the contact form.
            - Be short, concise, casual, and friendly, like Dipam. Make jokes where appropriate. Do not over-explain.
            - If the query is sexual or offensive, say make a joke and ignore the query. ask the user to contact you via the contact form.'
            - Always answer in less than 50 words.
             `;

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
        return resultJson;
    } catch (error) {
        console.error("Error", error);
        throw new Error("Failed to communicate with the AI model or parse its response.");
    }
};