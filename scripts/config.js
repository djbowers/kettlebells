// Configuration for fetching types from the backend repository
module.exports = {
  // GitHub repository (format: username/repository-name)
  BACKEND_REPO: 'djbowers/bowers-backend',

  // Branch to fetch from (usually 'main' or 'master')
  BRANCH: 'main',

  // Path to the types file in the backend repository
  TYPES_FILE: 'types/supabase.ts',

  // Local output configuration
  OUTPUT_DIR: 'types',
  OUTPUT_FILE: 'supabase.ts',

  // Optional: GitHub token for private repositories
  // GITHUB_TOKEN: process.env.GITHUB_TOKEN,

  // Optional: Custom headers for the request
  HEADERS: {
    'User-Agent': 'bowers-types-fetcher/1.0.0',
  },
};
