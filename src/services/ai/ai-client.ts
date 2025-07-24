// install via `npm i openai`
import { OpenAI } from 'openai';

const client = new OpenAI({
  baseURL: import.meta.env.VITE_GITHUB_AI_URL,
  apiKey: import.meta.env.VITE_GITHUB_TOKEN,
});

export async function askGPT4o(message: string) {
  const response = await client.chat.completions.create({
    model: 'openai/gpt-4o',
    messages: [
      { role: 'system', content: '' },
      { role: 'user', content: message },
    ],
    temperature: 1,
    max_tokens: 1024,
  });

  return response.choices[0].message.content;
}
