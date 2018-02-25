import {
  USER_FETCH,
  CLEAR_USER,
} from './../types/user.types';

export const fetchUser = () => ({ type: USER_FETCH });
export const clearUser = () => ({ type: CLEAR_USER });
