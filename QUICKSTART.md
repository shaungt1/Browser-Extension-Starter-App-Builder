# Quick start

## Agent route

Read `AGENT_START.md`, then run:

```bash
bash start.sh new --framework wxt --target ../my-extension --name "My Extension"
cd ../my-extension
bash start.sh setup
bash start.sh verify
```

Do not start `dev` unless the user requests an interactive browser/watch process.

## Manual route

```bash
bash start.sh
```

Choose WXT or Plasmo, enter a target outside this repository, and follow the printed next steps.

Non-interactive options:

```text
--framework wxt|plasmo
--target PATH
--name "Display Name"
--package-manager npm|pnpm|yarn|bun
--profile standard|minimal
--dry-run
```

`standard` includes API, AI, and WebSocket service scaffolding. `minimal` keeps the extension shell, UI, messaging, storage, tests, and documentation but omits those service files.
