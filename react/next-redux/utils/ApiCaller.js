import axios from 'axios';// eslint-disable-line
import config from '../config/api.config';
import store from 'store';

const ApiCaller = axios.create({
  baseURL: config.API_URL,
});


ApiCaller.interceptors.request.use(config => {
  const token = store.get('token') || config.headers['Authorization'];
  config.headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  return config;
});

ApiCaller.interceptors.response.use(
  (response) => {
    return Promise.resolve({ response: response.data })
  },
  (error) => {
    const { response: { data } } = error;
    return Promise.reject(data);
  }
);

export { ApiCaller };
