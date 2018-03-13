import * as React from 'react';
import { connect } from './../utils';
import { Layout, Button } from 'antd';

@connect()
export class LoginContainer extends React.Component<{}, {}> {

  render() {
    return (
      <Layout>
        <Layout.Header>
          some foo
        </Layout.Header>
        <Layout.Content>
          <p>fooo</p>
          <Button>ok</Button>
        </Layout.Content>
      </Layout>
    );
  }
}
