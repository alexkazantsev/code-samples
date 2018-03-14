import { createAction } from 'typesafe-actions';
import { $call } from 'utility-types';
import { LOGIN_TYPES } from './../types';

export const loginActions = {
  loginRequest: createAction(LOGIN_TYPES.LOGIN_REQUEST),
};

const returnsOfActions = Object.values(loginActions).map($call);
export type TLoginActions = typeof returnsOfActions[number];
