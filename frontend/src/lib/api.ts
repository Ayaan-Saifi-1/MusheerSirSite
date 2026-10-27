import {
  HomePagePayload,
  Publication,
  ResearchTheme,
  NewsItem,
  ServiceItem,
} from './types';

// Support Vite import.meta.env safely across TS configs
const meta = import.meta as unknown as { env?: { VITE_API_URL?: string } };
const API_BASE = (meta && meta.env && meta.env.VITE_API_URL) || 'http://127.0.0.1:8000/api/v1';

export async function fetchHomePagePayload(): Promise<HomePagePayload> {
  const res = await fetch(`${API_BASE}/home/`);
  if (!res.ok) {
    throw new Error(`Failed to load home payload from CMS (HTTP ${res.status})`);
  }
  return res.json();
}

export async function fetchPublications(): Promise<Publication[]> {
  const res = await fetch(`${API_BASE}/publications/`);
  if (!res.ok) {
    throw new Error(`Failed to load publications from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchResearchThemes(): Promise<ResearchTheme[]> {
  const res = await fetch(`${API_BASE}/themes/`);
  if (!res.ok) {
    throw new Error(`Failed to load themes from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchNewsItems(): Promise<NewsItem[]> {
  const res = await fetch(`${API_BASE}/news/`);
  if (!res.ok) {
    throw new Error(`Failed to load news from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchServiceItems(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/service/`);
  if (!res.ok) {
    throw new Error(`Failed to load service items from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchTeamMembers(): Promise<import('./types').TeamMember[]> {
  const res = await fetch(`${API_BASE}/team/`);
  if (!res.ok) {
    throw new Error(`Failed to load team members from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function fetchResearchOpenings(): Promise<import('./types').ResearchOpening[]> {
  const res = await fetch(`${API_BASE}/openings/`);
  if (!res.ok) {
    throw new Error(`Failed to load research openings from CMS (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results || [];
}

export async function submitProspectiveApplication(
  payload: import('./types').ApplicationSubmission
): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${API_BASE}/apply/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail ||
        (errorData && Object.values(errorData).flat().join(' ')) ||
        `Application submission failed (HTTP ${res.status})`
    );
  }
  return { success: true };
}
