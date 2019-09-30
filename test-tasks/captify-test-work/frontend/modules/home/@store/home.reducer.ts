import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { createTask, deleteTask, loadTasks } from './home.actions';
import { Task } from 'utils/models';

const loading = createReducer(false as boolean)
  .handleAction([ loadTasks.success, loadTasks.failure ], () => false)
  .handleAction(loadTasks.request, () => true);

const tasks = createReducer([] as Task[])
  .handleAction(loadTasks.success, (_, { payload }) => payload)
  .handleAction(createTask.success, (state, { payload }) => [ ...state, payload ])
  .handleAction(deleteTask.success, (state, { payload }) =>
    state.filter(({ id }) => id !== payload));

const error = createReducer(null as null | string)
  .handleAction(loadTasks.request, () => null)
  .handleAction(loadTasks.failure, (_, { payload }) => payload);

export const homeReducer = combineReducers({
  loading,
  tasks,
  error,
});
