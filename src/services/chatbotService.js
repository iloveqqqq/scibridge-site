import { API_BASE_URL } from './authService';

async function handleResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || 'Unable to reach the AI tutor.');
  }
  return payload;
}

export async function askScienceBot(prompt) {
  const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  const payload = await handleResponse(response);
  return payload.reply;
}
