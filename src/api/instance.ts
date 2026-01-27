import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://prod.akhmy.space/webhook-test/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
