import * as React from 'react';
import { Col, Row } from 'antd';

export const Block: React.FC<{}> = ({ children }) => {
  return (
    <Row type={ 'flex' } justify={ 'center' }>
      <Col span={ 12 }>
        { children }
      </Col>
    </Row>
  );
};
