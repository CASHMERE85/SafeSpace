# SafeSpace

SafeSpace is a CodeSquad class prototype by Ebony Lowery. It helps teens
turn what’s on their mind into a message they can review, edit, and share
with a trusted adult.

## What you can try

- Choose a mood and write a fictional check-in.
- Draft a message with Groq or start with a built-in template.
- Edit and copy the message.
- Open Get Help at any time.

## Run locally

1. Install Node.js and open the project folder in VS Code.
2. In the VS Code terminal, run `npm.cmd install` on Windows
   (or `npm install` on macOS or Linux).
3. Create a local `.env` file in the project folder. Add
   `GROQ_API_KEY=your_key` to enable AI drafting.
4. Run `node --env-file=.env server.cjs`.
5. Open http://127.0.0.1:3000 in your browser.

To try the template without a key, start the app with `node server.cjs`.

Use fictional entries for the demo. Draft with AI sends the entry to Groq.
No one monitors entries, and the app never sends a message automatically.