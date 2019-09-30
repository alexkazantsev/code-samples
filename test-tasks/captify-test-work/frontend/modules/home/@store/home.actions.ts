import { createAsyncAction } from 'typesafe-actions';
import { Task } from 'utils/models';
import {
  CREATE_TASKS_FAIL,
  CREATE_TASKS_REQUEST,
  CREATE_TASKS_SUCCESS, DELETE_TASKS_FAIL, DELETE_TASKS_REQUEST, DELETE_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
} from './home.constants';

export const loadTasks = createAsyncAction(
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
)<undefined, Task[], string>();

export const createTask = createAsyncAction(
  CREATE_TASKS_REQUEST,
  CREATE_TASKS_SUCCESS,
  CREATE_TASKS_FAIL,
)<undefined, Task, string>();

export const deleteTask = createAsyncAction(
  DELETE_TASKS_REQUEST,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_FAIL,
)<undefined, string, string>();
