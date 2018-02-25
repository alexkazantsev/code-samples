import { AUTH_TYPES as TYPES } from './../types';

const initialState = {
  signupError: null,
  loginError: null,
  isAuth: false,
  processing: false,
};

export const AuthReducer = function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.CLEAR_ERROR:
      return { ...state, signupError: null };
    case TYPES.SIGNUP_ERROR:
      return { ...state, signupError: payload };
    case TYPES.CHANGE_USER_AUTH:
      return { ...state, isAuth: payload };
    case TYPES.LOGIN:
    case TYPES.SIGNUP:
      return { ...state, processing: true };
    case TYPES.LOGIN_SUCCESS:
    case TYPES.SIGNUP_SUCCESS:
      return { ...state, processing: false };
    case TYPES.LOGIN_ERROR:
      return { ...state, loginError: payload, processing: false };
    case TYPES.CLEAR_LOGIN_ERROR:
      return { ...state, loginError: null };
    default: return state;
  }
}
