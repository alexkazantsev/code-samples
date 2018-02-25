import { COMMON_TYPES } from './../types';

const INITIAL_STATE = {
  sidebar: false,
  snackbar: false,
  snackbarMessage: ''
};

export const commonReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMON_TYPES.TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar };
    case COMMON_TYPES.OPEN_SNACKBAR:
      return { ...state, snackbar: true, snackbarMessage: payload };
    case COMMON_TYPES.CLOSE_SNACKBAR:
      return { ...state, snackbar: false };
    default:
      return state;
  }
};
