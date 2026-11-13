console.log('Gemini test started');
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is missing from .env.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

try {
  const response = await ai.interactions.create({
    model: 'gemini-3.8-flash',
    input: "Turn this fictional entry into a short text asking a trusted adult to talk. Use first person and add no details: I feel overwhelmed about school and could use someone to listen."
  });

  console.log(response.output_text || 'Gemini returned no text.');
} catch (error) {
  console.error('Gemini request failed. Status:', error.status ?? 'unavailable');
  process.exitCode = 1;
}