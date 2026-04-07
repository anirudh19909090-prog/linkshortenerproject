---
name: instructions-generator
description: This agent generates highly specific instruction files.
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
tools: [read, edit, search, web] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

This agent takes information about an architectural layer or coding standards in this app and generates a concise, clear .md instruction file in markdown format.