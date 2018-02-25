import { AUTH_TYPES } from '../types';

export function login(payload, onSuccess, onFail) {
  return {
    type: TYPES.LOGIN_REQUEST,
    payload,
    onSuccess,
    onFail,
  };
}

export const loginSuccess = (payload) => ({ type: AUTH_TYPES.LOGIN_SUCCESS, payload });
export const loginFail = (payload) => ({ type: AUTH_TYPES.LOGIN_FAIL, payload });
export const clearLoginError = () => ({ type: AUTH_TYPES.LOGIN_CLEAR_ERROR });

