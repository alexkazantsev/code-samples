import { createAction } from 'typesafe-actions';
import { HOME_TYPES } from './../types';

export const HomeActions = {
  test: createAction(HOME_TYPES.TEST_TYPE),
};
