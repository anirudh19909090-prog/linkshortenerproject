---
description: Read this file before working on any authentication-related code in this project. It outlines the rules and standards for using Clerk as the authentication provider.
---

# Auth Rules (Clerk Only)

Use these rules for all authentication and route protection work in this project.

## Source of Truth

- Clerk is the only authentication provider in this app.
- Do not add or use any other auth method, library, session system, or custom auth flow.

## Route Access

- `/dashboard` is a protected route and must require a logged-in user.
- If a user is not authenticated, they must not be able to access `/dashboard`.

## Redirect Behavior

- If a user is already logged in and visits `/`, redirect them to `/dashboard`.

## Sign In / Sign Up UX

- Sign in and sign up must always launch through Clerk modals.
- Do not implement standalone custom sign-in/sign-up pages or forms unless explicitly requested and approved.

## Implementation Notes

- Enforce access and redirects using Clerk server-side helpers where possible.
- Keep auth checks centralized and consistent across routes and components.
