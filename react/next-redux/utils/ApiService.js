import axios from 'axios';
import { call, put, take } from 'redux-saga/effects';
import moment from 'moment';

import { UPDATE_TOKEN, UPDATE_TOKEN_SUCCESS } from './../types/auth.types';
import { API_URL, TOKEN_KEY, TOKEN_EXPIRED_TIME } from './../config';
import { CookieService } from './';

const JWT_TOKEN = Symbol('token');
const INSTANCE = Symbol('instance');
const FN__APPLY_MIDDLEWARE = Symbol('FN__APPLY_MIDDLEWARE');
const FN__PROTECTED_CALL = Symbol('FN__PROTECTED_CALL');

export class ApiService {

  static [INSTANCE] = null;
  static get instance() { return ApiService[INSTANCE] ? ApiService[INSTANCE] : new ApiService(); };

  caller = null;
  [JWT_TOKEN] = null;

  constructor(request) {
    if (ApiService[INSTANCE] instanceof ApiService) return ApiService[INSTANCE]; /* API SHOULD BE AS SINGLETONE */

    if (!process.browser && request) {
      this[JWT_TOKEN] = CookieService.getFromServerCookie(request, 'jwt');
    } else {
      this[JWT_TOKEN] = CookieService.getFromLocalCookie('jwt');
    }
    this.caller = axios.create({ baseURL: API_URL });
    this[FN__APPLY_MIDDLEWARE]();
    ApiService[INSTANCE] = this;
  }

  [FN__APPLY_MIDDLEWARE]() {
    this.caller.interceptors.request.use(config => {
      const tokenHeader = this[JWT_TOKEN] ? { 'Authorization': `Bearer ${this[JWT_TOKEN]}` } : {};
      config.headers = {
        'Content-Type': 'application/json',
        ...tokenHeader
      };
      return config;
    });

    this.caller.interceptors.response.use(
      (response) => Promise.resolve({ response: response.data, headers: response.headers }),
      (error) => Promise.reject(error.response.data),
    );
  }

  /**
   * Check token expiration before each `call` and update it if necessary.
   */
  [FN__PROTECTED_CALL] = function* (...args) {
    const { refresh_token_expired } = CookieService.all();
    if (moment().diff(
      parseInt(refresh_token_expired, 10), 'seconds') >= TOKEN_EXPIRED_TIME) {
      yield put({ type: UPDATE_TOKEN });
      yield take(UPDATE_TOKEN_SUCCESS);
    }
    return yield call(...args);
  }

  /**
   * Just use these wrapped functions in your sagas to be calm that the token isn't expired.
   */
  get(...args) { return this[FN__PROTECTED_CALL].bind(this, this.caller.get, ...args); };
  post(...args) { return this[FN__PROTECTED_CALL].bind(this, this.caller.post, ...args); };
  put(...args) { return this[FN__PROTECTED_CALL].bind(this, this.caller.put, ...args); };
  delete(...args) { return this[FN__PROTECTED_CALL].bind(this, this.caller.delete, ...args); };

}
