/**
 * Central API configuration.
 *
 * Set VITE_API_BASE_URL in your .env file (copy from .env.example) to point
 * this at your backend once it is available. All API calls in the app
 * should be built from this base URL so the backend team can plug in their
 * endpoint by changing a single environment variable.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function apiFetch<T = unknown>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}
