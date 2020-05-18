import axios from 'axios';
import { API_URL, API_MOCK_URL, API_MOCK_USER, API_MOCK_PASS } from 'config';

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

const API_MOCK = axios.create({
  baseURL: API_MOCK_URL,
  timeout: 10000,
  auth: {
    username: API_MOCK_USER,
    password: API_MOCK_PASS
  }
});

export { API, API_MOCK };
