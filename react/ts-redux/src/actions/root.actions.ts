import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { $call } from 'utility-types';

import { HomeActions } from './';

const returnsOfActions = [
  ...Object.values(HomeActions),
].map($call);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
