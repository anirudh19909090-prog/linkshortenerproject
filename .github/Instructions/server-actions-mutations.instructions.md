---
description: Use these rules when implementing any create, update, or delete flow so mutations stay in server actions with strict typing, validation, auth checks, and data-layer boundaries.
---

# Server Actions Mutation Rules

Use these rules for every create, update, and delete operation in this project.

- All data mutations must be implemented via Server Actions.
- Server Actions must be called from Client Components.
- Server Action files must be named `actions.ts` and co-located with the component directory that calls them.
- All action inputs must use explicit TypeScript types. Do not use the `FormData` type.
- Validate all action input with Zod inside the Server Action before any database work.
- Every Server Action must verify an authenticated user before continuing.
- Server Actions must not throw errors. Return a typed result object with either a `success` or `error` property.
- Server Actions must not execute Drizzle queries directly.
- All database operations must go through helper functions in `/data`, and those helpers are where Drizzle queries run.
