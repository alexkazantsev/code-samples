import { Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { createTask, deleteTask, loadTasks } from './home.actions';
import { Task } from 'utils/models';

export const loadTasksEffect = () =>
  async (dispatch: Dispatch, _, agent: AxiosInstance) => {
    dispatch(loadTasks.request());
    try {
      const { data } = await agent.get<Task[]>('/task');
      dispatch(loadTasks.success(data));
    } catch ({ data: { message } }) {
      dispatch(loadTasks.failure(message));
      return await Promise.reject(message);
    }
  };

export const createTaskEffect = (task: Partial<Task>) =>
  async (dispatch: Dispatch, _, agent: AxiosInstance) => {
    dispatch(createTask.request());
    try {
      const { data } = await agent.post<Task>('/task', task);
      dispatch(createTask.success(data));
    } catch ({ data: { message } }) {
      dispatch(createTask.failure(message));
      return await Promise.reject(message);
    }
  };

export const deleteTaskEffect = (id: string) =>
  async (dispatch: Dispatch, _, agent: AxiosInstance) => {
    dispatch(deleteTask.request());
    try {
      await agent.delete<undefined>(`/task/${ id }`);
      dispatch(deleteTask.success(id));
    } catch ({ data: { message } }) {
      dispatch(deleteTask.failure(message));
      return await Promise.reject(message);
    }
  };
