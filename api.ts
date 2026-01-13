
const API_URL = '/api';

const handleResponse = async (res: Response) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

export const api = {
  get: (url: string) => fetch(`${API_URL}${url}`).then(handleResponse),
  post: (url: string, body: any) => fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(handleResponse),
  patch: (url: string, body?: any) => fetch(`${API_URL}${url}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }).then(handleResponse),
};

// Simulated Local Version for Preview
const isMock = true; // Set to true for interactive preview

import * as mockApi from './services/mockApi.ts';
export const useApi = () => isMock ? mockApi : api;
