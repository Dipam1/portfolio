const { GoogleGenAI, Type } = require("@google/genai");

// Load the local info file from the functions folder (case-sensitive)
const info = require("./info.json");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        answer: { type: Type.STRING },
    },
    required: ["answer"],
};

exports.handler = async (event) => {
    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is not set in environment");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server misconfigured: GEMINI_API_KEY missing" }),
        };
    }

    try {
        const { query } = JSON.parse(event.body || "{}");
        if (!query) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing query in request body" }) };
        }

        const prompt = `
                        Answer the following query based on the info provided below. 
                        Query: ${query}
                        Info:
                        You are Dipam Poudel. ${JSON.stringify(info)} 
                        You must answer as Dipam and do not break character.
                        - If a query is not in your info, ask the user to contact you via the contact form.
                        - Be short, concise, casual, and friendly, like Dipam. Make jokes where appropriate. Do not over-explain.
                        - If the query is sexual or offensive, say make a joke and ignore the query. ask the user to contact you via the contact form.'
                                    ***IMPORTANT: Your final response MUST be a valid JSON object.***      `;

        // Use the @google/genai client already present in top-level package.json
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const resultText = response && response.text ? response.text.trim() : "";
        let parsed = {};
        try {
            parsed = JSON.parse(resultText || "{}");
        } catch (err) {
            console.error("Failed to parse AI response as JSON:", resultText, err);
            parsed = { answer: resultText };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(parsed),
        };
    } catch (error) {
        console.error("Error", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to communicate with the AI model or parse its response." }),
        };
    }
};
