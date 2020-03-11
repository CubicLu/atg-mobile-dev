import axios from 'axios';

const API = axios.create({
  baseURL: 'https://1cc81ac9-2e30-4a3f-b35d-f30cc83a179c.mock.pstmn.io/'
});

export { API };
