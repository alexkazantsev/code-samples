import * as React from 'react';
import { connect } from './../utils';
import { Layout } from 'antd';

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
        </Layout.Content>
      </Layout>
    );
  }
}
