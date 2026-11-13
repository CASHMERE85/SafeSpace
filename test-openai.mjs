import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY is missing from .env.');
  process.exit(1);
}

const client = new OpenAI({ apiKey, timeout: 30_000, maxRetries: 0 });

console.log('Sending test request to OpenAI...');

try {
  const response = await client.responses.create({
    model: 'gpt-5-mini',
    store: false,
    input: `Rewrite this fictional entry as a short text asking a trusted adult
to talk. Use first person and add no details.
Entry: I feel overwhelmed about school and could use someone to listen.`
  });

  console.log(response.output_text || 'OpenAI returned no text.');
} catch (error) {
  console.error('OpenAI request failed:', error.status ?? 'no HTTP status',
    error.code ?? error.name);
  process.exitCode = 1;
}