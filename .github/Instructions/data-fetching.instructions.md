---
description: Read this file to understand how to fetch data in this project.
---
# Data Fetching Instructions
This document outlines the best practices and standards for fetching data in this project. Adhering to these guidelines will ensure consistency, maintainability, and optimal performance across the codebase.

## 1. Use Server Components for Data Fetching
In Next.js 16, ALWAYS use Server Components for data fetching. NEVER use client components to fetch data. 

##2. DAta Fetching Methods
ALWAYS use the helper funtions in the /data directory to fetch data. NEVER fetch data directly in the components. 

ALL helper functions in the /data directory should use Drizzle ORM to interact with the database. NEVER use raw SQL queries or other database libraries.