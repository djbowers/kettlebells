# Types Fetching Scripts

This directory contains scripts for fetching Supabase types from the shared backend repository.

## Overview

Instead of generating types locally, these scripts fetch the latest types from the `bowers-backend` repository on GitHub. This ensures all frontend projects use the same, up-to-date type definitions.

## Files

- `fetch-types.js` - Main script to fetch types from GitHub
- `config.js` - Configuration file for repository settings
- `README.md` - This documentation

## Usage

### Fetch Types

```bash
npm run fetch-types
```

This will:

1. Fetch the latest `types/supabase.ts` from the backend repository
2. Save it to `types/supabase.ts` in this project
3. Add a header comment indicating it's auto-generated

### Dry Run

```bash
npm run fetch-types:dry-run
```

This shows what would be fetched without actually downloading or saving the file.

### Help

```bash
node scripts/fetch-types.js --help
```

## Configuration

Edit `scripts/config.js` to change:

- Repository name and branch
- File paths
- Custom headers

## Workflow

1. **Backend Changes**: When you make database changes in `bowers-backend`
2. **Generate Types**: Run `supabase gen types` in the backend project
3. **Commit & Push**: Commit the updated types to the backend repository
4. **Frontend Update**: Run `npm run fetch-types` in this project
5. **Use Types**: The updated types are now available in your frontend

## Benefits

- **Consistency**: All projects use the same type definitions
- **Automation**: No manual type copying between projects
- **Version Control**: Types are versioned with the backend
- **Single Source of Truth**: Backend is the authoritative source for types

## Troubleshooting

### 404 Error

- Check that the repository exists and is public
- Verify the branch name is correct
- Ensure the types file path is correct
- Update the `BACKEND_REPO` in `config.js`

### Network Issues

- Check your internet connection
- Verify GitHub is accessible
- Try again later if GitHub is having issues

### Permission Issues

- Ensure the script is executable: `chmod +x scripts/fetch-types.js`
- Check file permissions in the output directory
