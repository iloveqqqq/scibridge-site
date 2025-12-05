export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function handleResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || 'Request failed');
  }
  return payload;
}

const normalizeUsername = (value) => value?.trim().toLowerCase();

export async function registerUser({ name, username, password }) {
  const safeUsername = normalizeUsername(username);

  if (!safeUsername || !password?.trim()) {
    throw new Error('Please provide both a username and password.');
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, username: safeUsername, password })
  });

  return handleResponse(response);
}

export async function loginUser({ username, password }) {
  const safeUsername = normalizeUsername(username);

  if (!safeUsername || !password?.trim()) {
    throw new Error('Please provide both a username and password.');
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: safeUsername, password })
  });

  return handleResponse(response);
}
