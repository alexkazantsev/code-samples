import { ActionType, StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type RootAction = ActionType<typeof import('./utils/root-actions')>;
  export type RootState = StateType<typeof import('./utils/root-reducer').default>;

  interface Types {
    RootAction: RootAction;
  }
}
