# Agent Instructions — Link Shortener Project

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Overview

This is a URL shortening service built with Next.js 16, React 19, TypeScript, Clerk auth, Neon PostgreSQL, Drizzle ORM, and shadcn/ui. Before writing or modifying any code, read and follow the standards defined in the docs below.

## Instruction Files

> ⚠️ **CRITICAL — NON-NEGOTIABLE RULE** ⚠️
>
> You **MUST** read the relevant `/docs/` instruction file **in full** using the `read_file` tool **BEFORE writing or modifying any code** in that area. This is not optional. Do not rely on memory, prior context, or assumptions. Every code change requires a fresh read of the relevant doc first.
>
> **Skipping this step is never acceptable, regardless of how simple the task appears.**

All coding standards are documented in `/docs/`. The files are:

- `/docs/auth-clerk.md` — Clerk-only auth policy, protected routes, auth redirects, and modal-only sign in/sign up behavior.
- `/docs/ui-shadcn.md` — Mandatory shadcn/ui-only policy for all UI elements; no custom UI components.

Before touching any auth-related code → read `/docs/auth-clerk.md`.
Before touching any UI code → read `/docs/ui-shadcn.md`.
When in doubt, read both.

## Key Reminders

- **Next.js 16**: `middleware.ts` is renamed to `proxy.ts`. `params` and `searchParams` are Promises — always `await` them.
- **Server Components first**: Do not add `'use client'` unless the component requires client-side interactivity.
- **No `any`**: Use proper types or `unknown` with narrowing.
- **Use `@/*` imports**: Never use deep relative paths.
- **shadcn/ui CLI**: Add UI components with `npx shadcn@latest add`, do not create them manually in `components/ui/`.
- **Validate at boundaries**: All user input must be validated before reaching the database or being rendered.
- **Auth server-side**: Always verify authentication with Clerk's server helpers before mutations or sensitive data access.
