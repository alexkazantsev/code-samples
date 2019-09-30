import * as React from 'react';
import { Icon, Table } from 'antd';
import { ColumnProps } from 'antd/es/table/interface';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Task } from 'utils/models';
import { loadingSelector, tasksSelector } from '../../@store/home.selectors';
import { deleteTaskEffect } from '../../@store/home.effects';
import { Card } from '../card/card.component';

export const TasksList: React.FC<{}> = () => {
  const tasks = useSelector(tasksSelector, shallowEqual);
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();

  const columns: ColumnProps<Task>[] = [
    {
      title: '#',
      key: 'no',
      width: '5%',
      render: (_, __, i) => i + 1,
    },
    {
      title: 'Task Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      width: '10%',
      align: 'center',
      render: (_, record) => <Icon
        type={ 'delete' }
        onClick={ () => dispatch(deleteTaskEffect(record.id)) }
      />,
    },
  ];

  return (
    <Card title={ 'Tasks list' }>
      <Table
        columns={ columns }
        dataSource={ tasks }
        rowKey={ 'id' }
        loading={ loading }
        size={ 'small' }
        pagination={ false }
        bordered={ true }
      />
    </Card>
  );
};
