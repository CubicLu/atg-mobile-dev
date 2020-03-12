import axios from 'axios';

const API = axios.create({
  baseURL: 'https://3145863e-c712-4e6a-bff8-8f2d10ca50b5.mock.pstmn.io/'
});

export { API };
