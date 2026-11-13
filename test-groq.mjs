import OpenAI from 'openai';

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error('GROQ_API_KEY is missing from .env.');
  process.exit(1);
}

const groq = new OpenAI({
  apiKey,
  baseURL: 'https://api.groq.com/openai/v1',
  timeout: 30_000,
  maxRetries: 0
});

console.log('Sending test request to Groq...');

try {
  const response = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [{
      role: 'user',
      content: 'Turn this fictional entry into a short text asking a trusted adult to talk. Use first person and add no details. Entry: I feel overwhelmed about school and could use someone to listen.'
    }]
  });

  const message = response.choices[0]?.message?.content?.trim();
  console.log(message || 'Groq returned no text.');
} catch (error) {
  console.error('Groq request failed:', error.status ?? 'no HTTP status',
    error.code ?? error.name);
  process.exitCode = 1;
}