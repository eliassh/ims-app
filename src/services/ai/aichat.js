// install via `npm i openai`
import { OpenAI } from 'openai'

const client = new OpenAI({
  baseURL: 'https://models.github.ai/inference',
  apiKey: import.meta.env.VITE_GITHUB_TOKEN,
})

export async function askGPT4o(message) {
  const response = await client.chat.completions.create({
    model: 'openai/gpt-4o',
    messages: [
      { role: 'system', content: '' },
      { role: 'user', content: message },
    ],
    temperature: 1,
    max_tokens: 1024,
  })

  return response.choices[0].message.content
}
