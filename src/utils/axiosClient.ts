import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com';

// https://github.com/axios/axios#request-config
const client = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

client.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export default client;
