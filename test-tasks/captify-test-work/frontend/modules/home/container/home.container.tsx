import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadTasksEffect } from '../@store/home.effects';
import CreateTask from '../components/create-task/create-task.component';
import { TasksList } from '../components/tasks-list/tasks-list.component';
import { Block } from '../components/block/block.component';
import { errorSelector } from '../@store/home.selectors';
import { Error } from '../components/error/error.component';

export const HomeContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);

  useEffect(() => {
    dispatch(loadTasksEffect());
  }, []);

  return (
    <>
      <Block>
        <CreateTask />
      </Block>
      <Block>
        <Error message={ error } />
        <TasksList />
      </Block>
    </>
  );
};
