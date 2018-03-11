import { createAction } from 'typesafe-actions';
import { $call } from 'utility-types';
import { HOME_TYPES } from './../types';

export const homeActions = {
  test: createAction(HOME_TYPES.TEST_TYPE),
};

const returnsOfActions = Object.values(homeActions).map($call);
export type THomeActions = typeof returnsOfActions[number];
