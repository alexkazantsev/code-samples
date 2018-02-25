import axios from 'axios';
import API_CONFIG from './../config/api.config';
import { TOKEN_KEY } from './../config/app.config';
import { getTokenFromServerCookie, getTokenFromLocalCookie } from './CookieService';

export class ApiService {

  caller = null;
  token = null;

  static axios = axios.create({ baseURL: API_CONFIG.API_URL });

  constructor(request) {
    if (!process.browser && request) {
      this.token = getTokenFromServerCookie(request);
    } else {
      this.token = getTokenFromLocalCookie();
    }
    this.caller = axios.create({ baseURL: API_CONFIG.API_URL });
    this.applyMiddleware();
  }

  applyMiddleware() {
    this.caller.interceptors.request.use(config => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      }
      config.headers = headers;
      return config;
    });

    this.caller.interceptors.request.use(config => {
      return config;
    });

    this.caller.interceptors.response.use(
      (response) => Promise.resolve({ response: response.data, headers: response.headers }),
      (error) => Promise.reject(error.response.data),
    );
  }
}
