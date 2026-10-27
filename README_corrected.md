# Kooksy AI

**Intelligence with a Spark.**

Kooksy AI is a Flask-based AI assistant starter application that uses SQLite for local data storage and Groq's OpenAI-compatible API for AI responses.

## Features

- **Account management:** Sign up, log in, and log out with Werkzeug password hashing.
- **Multilingual AI chat:** 15 language choices, with Normal User and Developer modes.
- **Chat history:** Save conversations per user and delete individual history entries.
- **Voice features:** Browser-based speech recognition for voice input and browser speech synthesis for spoken AI replies. Availability depends on browser support and permissions.
- **File analysis:** Support for CSV, TXT, MD, PDF, DOCX, JSON, PY, HTML, CSS, JS, and LOG files, subject to the app's configured upload and parsing limits.
- **Agent Goal:** Generate a plan from a goal. The generated plan is not automatically executed.
- **Website Creator:** Generate frontend/backend project files and deployment instructions, preview supported output, and download a ZIP. Generated code is not automatically run or deployed.
- **Feedback:** Submit feedback ratings, with an optional admin summary if configured.
- **Responsive interface:** Dark dashboard designed for desktop and mobile layouts.

> Features and supported formats depend on the implementation in the project files. Review and test the app before relying on any feature.

## Requirements

- Windows with Python installed (use a Python version supported by the packages in `requirements.txt`).
- A Groq API key.
- Internet access for requests to the Groq API.

## Run on Windows

1. Extract the project ZIP, then open the project folder in VS Code or PowerShell.
2. Create a virtual environment:

   ```powershell
   py -m venv .venv
   ```

3. Activate the virtual environment:

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

4. Install the dependencies:

   ```powershell
   python -m pip install --upgrade pip
   pip install -r requirements.txt
   ```

5. Create a local environment file by copying the example:

   ```powershell
   Copy-Item .env.example .env
   ```

6. Open `.env` and replace `your_groq_api_key_here` with your own Groq API key. Set a strong, random `FLASK_SECRET_KEY` if the application supports it. **Never share your API key or commit `.env` to GitHub.** Keep `.env` listed in `.gitignore`.

7. Start the app:

   ```powershell
   python app.py
   ```

8. Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser and create an account.

### If PowerShell blocks virtual-environment activation

You can run the virtual environment's Python directly without activating it:

```powershell
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

## Groq model configuration

The starter configuration uses `openai/gpt-oss-20b` as the default model. Model availability can change and may depend on your Groq account. If this model is unavailable to you, set `GROQ_MODEL` in `.env` to a model currently listed in your Groq console. Follow Groq's current documentation for API and model availability.

## Website Creator notes

- The Website Creator generates project files and deployment instructions; it does not run or deploy the generated project.
- AI-generated output may be incomplete, insecure, or incompatible. Review, test, and secure all generated files before using them.
- The interface may accept up to 1,000,000 characters, but the backend sends no more than 24,000 characters to the model in this starter. Confirm these limits against the current implementation before changing them.
- The starter's generated-project endpoint uses an unguessable project ID and requires login, but generated-project ownership is not stored in the database. Add and enforce per-user ownership checks before making the application publicly accessible.

## Security and production checklist

This project is intended as a **local-development starter**, not a production-ready public service. Before deploying it:

- Set a strong, random `FLASK_SECRET_KEY`; never use a sample or default secret.
- Disable Flask debug mode in production.
- Serve the application over HTTPS and configure secure session cookies appropriately.
- Add CSRF protection, rate limiting, login throttling, and a secure password-reset process.
- Use persistent, backed-up storage for hosted data; consider PostgreSQL instead of local SQLite for a multi-user deployment.
- Enforce per-user authorization for chat history, generated projects, downloads, and all other private resources.
- Restrict and validate file uploads, enforce size limits, and safely parse untrusted documents. Consider malware scanning where appropriate.
- Protect admin-only pages and endpoints with explicit authorization checks.
- Review error handling, logging, dependency versions, API quotas, request limits, and generated code.
- Set `SESSION_COOKIE_SECURE=True` only when the application is served over HTTPS.
- Keep API keys and other secrets out of source code, logs, screenshots, and version control.

## Current limitations

- Google OAuth is not configured.
- Speech recognition relies on browser support and microphone permissions. Spoken replies use browser speech synthesis, not a dedicated Groq text-to-speech model.
- Primary navigation labels are translated for the 15 language choices, but some secondary UI labels may remain in English. AI replies are instructed to use the selected language; output quality can vary by language.
- Agent Goal creates a plan only; it does not independently open applications, send emails, or perform external actions.
- AI-generated code is not guaranteed to be error-free or secure.

## Before publishing to GitHub

- Confirm `.env`, API keys, passwords, local databases, user uploads, and generated private files are excluded from the repository.
- Include `.env.example` with placeholder values only; never put a real API key in it.
- Review `.gitignore` and remove any secrets accidentally committed in earlier commits. Deleting a secret from the latest version alone does not remove it from Git history; rotate exposed credentials.
- Add a license file if you intend to specify how others may use the project.

## License

No license is specified in this repository yet. Add a `LICENSE` file if you want to define reuse and distribution permissions.
