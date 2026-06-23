const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
const CODESPACE_NAME = typeof rawCodespaceName === 'string' && rawCodespaceName.trim().length > 0
  ? rawCodespaceName.trim()
  : undefined;

export const API_HOST = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev` : 'http://localhost:8000';

export const getApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_HOST}${normalizedPath}`;
};

export function normalizeApiResponse<T>(payload: any): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  const fallbackKeys = ['data', 'items', 'results', 'users', 'activities', 'teams', 'workouts', 'leaderboard'];
  for (const key of fallbackKeys) {
    if (Array.isArray(payload?.[key])) {
      return payload[key] as T[];
    }
  }

  return [];
}

export async function fetchApi<T = any>(path: string): Promise<T> {
  const response = await fetch(getApiUrl(path));
  if (!response.ok) {
    throw new Error(`API request failed (${response.status}): ${response.statusText}`);
  }
  return response.json();
}
