import {
  SIGNUP,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR,
  LOGIN,
  LOGIN_ERROR,
  CLEAR_LOGIN_ERROR,
  LOGOUT,
} from './../types/auth.types';

export const signup = (payload, onSuccess) => ({ type: SIGNUP, payload, onSuccess });
export const clearSignupError = () => ({ type: CLEAR_SIGNUP_ERROR });
export const signupError = payload => ({ type: SIGNUP_ERROR, payload });

export const login = (payload, onSuccess) => ({ type: LOGIN, payload, onSuccess });
export const clearLoginError = () => ({ type: CLEAR_LOGIN_ERROR });
export const loginError = payload => ({ type: LOGIN_ERROR, payload });
export const logout = onSuccess => ({ type: LOGOUT, onSuccess });
