import axios from 'axios';

const API = axios.create({
  baseURL: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks',
  timeout: 10000
});

const APIBeta = axios.create({
  baseURL: 'http://api.mocked.panthr-music.com',
  timeout: 10000
});

export { API, APIBeta };
