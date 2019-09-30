import * as React from 'react';
import { Card as C } from 'antd';

type Props = { title: string }

export const Card: React.FC<Props> = ({ children, title }) => {
  return (
    <C
      title={ title }
      size={ 'small' }
    >
      { children }
    </C>
  );
};
