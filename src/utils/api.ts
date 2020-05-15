import axios from 'axios';
import { API_URL, API_URL_MOCK } from 'config';

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

const API_MOCK = axios.create({
  baseURL: API_URL_MOCK,
  timeout: 10000
});

export { API, API_MOCK };
