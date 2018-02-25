import { USER_TYPES as TYPES } from './../types';

const initialState = {
  email: '',
  name: '',
  avatar_url: '',
  fetching: false,
  fetchingError: null,
};

export const UserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.USER_FETCH:
      return { ...state, fetching: true };
    case TYPES.USER_FETCH_SUCCESS:
      return { ...state, ...payload, fetching: false };
    case TYPES.USER_FETCH_ERROR:
      return { ...state, fetchingError: payload, fetching: false };
    case TYPES.CLEAR_USER:
      return { ...state, ...initialState };
    default: return state;
  }
}
