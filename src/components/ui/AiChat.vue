<script setup lang="ts">
import { marked } from 'marked';
import OpenAI from 'openai';
import { computed, ref } from 'vue';

const userInput = ref('');
const response = ref('');
const message = ref('');
const prevQuestion = ref('');
const loading = ref(false);

const sendMessage = async () => {
  if (!userInput.value.trim()) return;
  loading.value = true;
  response.value = '';
  try {
    const client = new OpenAI({
      baseURL: 'https://models.github.ai/inference',
      apiKey: import.meta.env.VITE_GITHUB_TOKEN,
      dangerouslyAllowBrowser: true,
    });

    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: '' },
        { role: 'user', content: userInput.value },
      ],
      model: 'openai/gpt-4o',
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    });
    prevQuestion.value = userInput.value;
    userInput.value = '';
    console.log(response.choices[0].message.content);
    message.value = response.choices[0].message.content ?? '';
  } catch (err) {
    console.error(err);
    response.value = 'Error talking to AI';
  } finally {
    loading.value = false;
  }
};
const handleEnter = (e: KeyboardEvent) => {
  if (e.shiftKey) return; // allow newline on Shift+Enter
  if (userInput.value.trim()) {
    sendMessage();
  }
};
const richHtml = computed(() => marked.parse(message.value));
</script>
<template>
  <div class="p-4 max-w-xl mx-auto">
    <textarea
      v-model="userInput"
      class="p-2 w-full border"
      rows="3"
      placeholder="Ask me anything..."
      @keydown.enter.prevent="handleEnter"
    ></textarea>
    <button
      @click="sendMessage"
      type="button"
      title="Send"
      :disabled="loading"
      aria-label="Send"
      class="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
    >
      {{ loading ? 'Sending...' : 'Send' }}
    </button>
    <h2 class="mt-4 text-lg border-l-4 border-blue-600 pl-2">{{ prevQuestion }}</h2>
    <div
      class="mt-2 prose"
      v-html="richHtml"
    ></div>
    <div
      v-if="response"
      class="mt-4 p-4 bg-gray-100 rounded"
    >
      <strong>AI:</strong>
      {{ response }}
    </div>
  </div>
</template>
