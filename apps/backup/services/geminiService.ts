import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateReconnectionMessage = async (
  recipientName: string,
  batchYear: string,
  sharedMemory: string,
  tone: 'nostalgic' | 'professional' | 'casual'
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  const prompt = `
    You are an AI assistant for the Raiganj High School Alumni Association. 
    Help an alumnus write a message to reconnect with an old batchmate.
    
    Recipient Name: ${recipientName}
    Batch Year: ${batchYear}
    Shared Memory/Context: ${sharedMemory}
    Tone: ${tone}

    The message should be warm, mentioning Raiganj (the town) or school life briefly to evoke nostalgia. 
    Keep it under 100 words. Return only the message body.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Could not generate a message.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate a message at this time. Please try again later.";
  }
};

export const suggestEventIdeas = async (season: string): Promise<string[]> => {
    if (!apiKey) return ["Please set API Key"];
    
    const prompt = `Suggest 3 unique, modern alumni reunion event ideas for a school in Raiganj, West Bengal, taking place in ${season}. 
    Consider the local culture (e.g., Kulik Bird Sanctuary, Durga Puja, local food). 
    Return the result as a JSON array of strings only.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });
        const text = response.text;
        if (!text) return [];
        return JSON.parse(text) as string[];
    } catch (e) {
        console.error(e);
        return ["Tea Party at the Clock Tower", "Winter Picnic at Kulik", "Nostalgia Walk"];
    }
}

export const polishStory = async (draft: string): Promise<string> => {
    if (!apiKey) return draft;

    const prompt = `
      You are a professional editor for an alumni magazine. 
      Refine the following story draft to be more engaging, nostalgic, and grammatically correct, while preserving the original meaning and personal voice.
      It is about school memories in Raiganj.
      
      Draft: "${draft}"
      
      Return only the polished text.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text || draft;
    } catch (e) {
        console.error(e);
        return draft;
    }
}