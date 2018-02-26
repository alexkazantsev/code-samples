import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { badRequest, badImplementation, unauthorized } from 'boom';
import {
  WALLET_API_URL,
  WALLET_API_PORT,
} from './../config';

const request = axios.create({
  baseURL: `${WALLET_API_URL}:${WALLET_API_PORT}`,
});

request.interceptors.request.use((axiosRequest: AxiosRequestConfig): AxiosRequestConfig => {
  const { method, url, params } = axiosRequest;
  axiosRequest.params = {
    ...params,
    _api_key: BASE_API_KEY,
  };
  console.info('Sending %s request to: %s\nWith params: %s', method, url, JSON.stringify(axiosRequest.params));
  return axiosRequest;
});

request.interceptors.response.use((r: any): AxiosPromise => {
  const { data, data: { _code, _msg } } = r;

  if (_code !== 200) { console.error('Request error: %s', JSON.stringify(r.data)); }

  switch (_code) {
    case 500:
      return Promise.reject(badRequest(_msg));
    case 400:
      return Promise.reject(badImplementation());
    case 401:
      return Promise.reject(unauthorized(_msg));
  }
  return Promise.resolve(r.data);
}, (r: any): AxiosPromise => {
  return Promise.reject(badImplementation());
});

export { request };
