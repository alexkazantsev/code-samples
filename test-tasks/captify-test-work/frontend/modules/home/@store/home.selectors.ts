import { RootState } from 'typesafe-actions';
import { Task } from 'utils/models';

export const tasksSelector = (state: RootState): Task[] => state.home.tasks;
export const loadingSelector = (state: RootState): boolean => state.home.loading;
export const errorSelector = (state: RootState): string | null => state.home.error;
