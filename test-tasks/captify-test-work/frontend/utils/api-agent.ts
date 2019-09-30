import axios from 'axios';
import { API_URL } from './config';

const defaultMessage = { data: { message: 'Unpredictable error' } };

const agent = axios.create({
  baseURL: API_URL,
});

agent.interceptors.response.use(
  response => response,
  ({ response = defaultMessage }) => Promise.reject(response));

export { agent };
