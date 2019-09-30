import * as React from 'react';
import { Alert } from 'antd';

type Props = { message: string | null }

export const Error: React.FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }
  return <Alert message={ message } type={ 'error' } />
};
