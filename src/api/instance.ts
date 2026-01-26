import axios from 'axios';

export const api = axios.create({
  baseURL:
    'https://prod.akhmy.space/webhook/cefbbb75-c1e4-4cbf-a512-6e5a4da74a1f',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
