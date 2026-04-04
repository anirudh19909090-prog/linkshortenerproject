# shadcn/ui-Only UI Policy

## Purpose

Ensure all UI in this app is built with shadcn/ui components and patterns.

## Required Rules

- Use shadcn/ui components for all visible UI elements.
- Do not create custom UI components for buttons, inputs, cards, dialogs, toasts, dropdowns, tabs, tables, badges, alerts, forms, or navigation.
- If a needed UI element does not exist yet, add it via shadcn CLI:
  - `npx shadcn@latest add <component-name>`
- Prefer composing existing shadcn/ui building blocks over creating new design-system wrappers.

## Styling and Composition

- Keep styling consistent with shadcn conventions and utility classes.
- Reuse variants and props exposed by shadcn components instead of duplicating behavior in custom wrappers.
- If layout-level wrappers are needed, they must remain non-UI structural containers and must not replace shadcn primitives.

## PR / Code Change Checklist

- Every new UI surface uses shadcn/ui components.
- No newly introduced custom UI primitives.
- Any missing component was added through shadcn CLI, not hand-written in `components/ui/`.
