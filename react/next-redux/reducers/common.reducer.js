import { COMMON_TYPES } from './../types';

const INITIAL_STATE = {};

export const CommonReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
