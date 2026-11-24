# Security rules

- An extension package is inspectable by its users. Never embed OpenAI, Anthropic, database service-role, signing, or other privileged secrets.
- Public build variables are configuration, not secrets. Exchange authenticated user sessions for narrow, short-lived server tokens.
- Validate messages and API responses. Treat page DOM, URLs, and `window.postMessage` payloads as hostile input.
- Keep `permissions`, `optional_permissions`, and host permissions minimal. Prefer optional runtime grants for features that are not core.
- Avoid remote scripts, `eval`, and dynamic code. Manifest V3 requires packaged executable code.
- Sanitize any HTML and keep extension UI isolated from page CSS.
- Store the minimum personal data required, document retention, and provide deletion/opt-out paths.
- Review store privacy disclosures and dependency licenses before publishing.
