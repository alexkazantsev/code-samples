import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { $call } from 'utility-types';

import { homeActions } from './home.actions';
import { loginActions } from './login.actions';

const returnsOfActions = [
  ...Object.values(homeActions),
  ...Object.values(loginActions),
].map($call);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
