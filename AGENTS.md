# Agent Instructions — Link Shortener Project

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Overview

This is a URL shortening service built with Next.js 16, React 19, TypeScript, Clerk auth, Neon PostgreSQL, Drizzle ORM, and shadcn/ui. Before writing or modifying any code, read and follow the standards defined in the docs below.

## Key Reminders

- **Do not use `middleware.ts` in this project**: In this Next.js 16 codebase, `middleware.ts` is deprecated and must never be used. Always use `proxy.ts` instead.

- **Next.js 16**: `middleware.ts` is renamed to `proxy.ts`. `params` and `searchParams` are Promises — always `await` them.
- **Server Components first**: Do not add `'use client'` unless the component requires client-side interactivity.
- **No `any`**: Use proper types or `unknown` with narrowing.
- **Use `@/*` imports**: Never use deep relative paths.
- **shadcn/ui CLI**: Add UI components with `npx shadcn@latest add`, do not create them manually in `components/ui/`.
- **Validate at boundaries**: All user input must be validated before reaching the database or being rendered.
- **Auth server-side**: Always verify authentication with Clerk's server helpers before mutations or sensitive data access.
