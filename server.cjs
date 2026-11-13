const express = require('express');
const app = express();

app.use(express.static('public'));
const OpenAI = require('openai');

app.use(express.json({ limit: '16kb' }));

app.post('/api/draft', async (req, res) => {
  const entry = req.body?.entry;

  if (typeof entry !== 'string' || !entry.trim() || entry.length > 2000) {
    return res.status(400).json({ error: 'Enter 1–2,000 characters.' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI drafting is unavailable.' });
  }

  try {
    const groq = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
      timeout: 20_000,
      maxRetries: 0
    });

    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: 'Rewrite the entry as a short first-person text asking a trusted adult for support. Preserve the meaning and urgency. Add no facts, diagnoses, or advice. Return only the draft.'
        },
        { role: 'user', content: entry.trim() }
      ]
    });

    const message = response.choices[0]?.message?.content?.trim();
    if (!message) {
      return res.status(502).json({ error: 'AI returned an empty draft.' });
    }

    res.json({ message });
  } catch {
    res.status(502).json({ error: 'AI drafting is temporarily unavailable.' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`SafeSpace is running on port ${port}`);
});