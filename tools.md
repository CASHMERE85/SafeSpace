# SafeSpace Tool Definitions

## Draft support message

- Type: App endpoint
- Method and path: POST /api/draft
- Input: A JSON object with an `entry` string of 1–2,000 characters.
- Output: A JSON object with a `message` string containing the draft.
- Trigger: The user clicks Draft with AI.
- Behavior: The server sends the entry and system prompt to Groq.
  The app displays the returned draft for the user to review and edit.
- Fallback: If AI drafting is unavailable, the user can choose Use a template.

## Other app actions

- Use a template: Opens a built-in editable draft without an AI request.
- Copy message: Copies the current edited draft to the clipboard.
- Get Help: Opens support information without an AI request.