/**
 * Fetch wrapper for admin API calls. Sends cookies (credentials).
 */
export async function fetchAdmin(
  url: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers as Record<string, string> | undefined),
    },
  });
}

export async function fetchAdminJson<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetchAdmin(url, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || res.statusText);
  return data as T;
}
