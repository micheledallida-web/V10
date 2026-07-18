# V10

## Emergent scaffold overview

This repository now contains a production-oriented Next.js App Router scaffold aligned to the requested Emergent.sh architecture:

- `src/app/` hosts the public marketing pages, auth routes, dashboard shell, and dynamic project editor routes.
- `src/components/marketing/` contains landing and pricing presentation blocks.
- `src/components/dashboard/` contains the sidebar shell, project cards, and project creation modal scaffold.
- `src/components/editor/` contains the editor topbar, AI panel, canvas iframe, inspector panel, and workspace composition.
- `src/context/editor-context.tsx` centralizes generated code/html, stream state, and active selection.
- `src/hooks/` provides AI streaming and undo/redo history abstractions.
- `src/lib/` contains typed adapters for Supabase, n8n, and Vercel integrations.

## Key flow

The editor flow is scaffolded as:

1. `panel-ai` captures prompts.
2. `use-ai-stream` manages chunked responses.
3. `editor-context` stores generated code/html and stream state.
4. `canvas` renders the latest HTML through a sandboxed iframe preview.

Environment variables are documented in `/home/runner/work/V10/V10/.env.local.example`.
