import { Message, MessageRole, SourceReference } from "../types";

export const sendMessageToGemini = async (
  prompt: string,
  history: Message[]
): Promise<{ text: string; sources: SourceReference[] }> => {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, history }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from backend');
    }

    const data = await response.json();
    return {
      text: data.text || "No response received.",
      sources: data.sources || []
    };
  } catch (error) {
    console.error("Backend API Error:", error);
    throw error;
  }
};

