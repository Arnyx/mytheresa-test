const BASE_URL = process.env.TMDB_BASE_URL;
const TOKEN = process.env.TMDB_ACCESS_TOKEN;

if (!BASE_URL || !TOKEN) {
  throw new Error('Please check all TMDB environments variables are correctly set in .env file');
}

export async function tmdbFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`TMDb API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
