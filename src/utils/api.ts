import axios from 'axios';

const API = axios.create({
  baseURL: 'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/'
});

export { API };
