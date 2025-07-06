# Kettlebells App

A React-based workout tracking application for kettlebell training, built with Vite and Supabase.

## Overview

This frontend application connects to the shared `bowers-backend` Supabase instance, providing:

- Workout tracking and logging
- Movement library and exercise selection
- Progress tracking and history
- Real-time updates and offline support

## Backend Integration

This project uses a shared backend (`bowers-backend`) that serves multiple frontend applications. Types are fetched from the backend repository rather than generated locally.

### Type Management

Instead of generating Supabase types locally, this project fetches them from the backend:

```bash
# Fetch latest types from backend
npm run fetch-types

# Preview what would be fetched (dry run)
npm run fetch-types:dry-run
```

See `scripts/README.md` for detailed documentation on the types fetching workflow.
