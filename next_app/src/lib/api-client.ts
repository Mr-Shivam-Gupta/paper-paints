/**
 * API client for fetching CMS data.
 * Replaces Wix BaseCrudService - calls our own /api routes.
 */

import type { Products, Applications, TeamMembers } from "@/entities";

const API = "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(await res.text().catch(() => res.statusText));
  }
  return res.json();
}

export async function getProducts(featured?: boolean): Promise<{ items: Products[] }> {
  const url = featured ? `${API}/products?featured=true` : `${API}/products`;
  const res = await fetch(url);
  return handleResponse<{ items: Products[] }>(res);
}

export async function getProductById(id: string): Promise<Products | null> {
  const res = await fetch(`${API}/products/${id}`);
  if (res.status === 404) return null;
  return handleResponse<Products | null>(res);
}

export async function getApplications(): Promise<{ items: Applications[] }> {
  const res = await fetch(`${API}/applications`);
  return handleResponse<{ items: Applications[] }>(res);
}

export async function getTeam(): Promise<{ items: TeamMembers[] }> {
  const res = await fetch(`${API}/team`);
  return handleResponse<{ items: TeamMembers[] }>(res);
}
