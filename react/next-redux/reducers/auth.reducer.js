import { AUTH_TYPES as TYPES } from './../types';

const INITIAL_STATE = {
  errorMessage: null,
  processing: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.LOGIN_REQUEST:
      return { ...state, processing: true };
    case TYPES.LOGIN_SUCCESS:
      return { ...state, processing: false };
    case TYPES.LOGIN_FAIL:
      return { ...state, errorMessage: payload, processing: false };
    case TYPES.LOGIN_CLEAR_ERROR:
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};
