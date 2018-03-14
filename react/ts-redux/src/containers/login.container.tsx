import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Layout, Button } from 'antd';
import { connect } from './../utils';
import { loginActions } from './../actions';
import { Dispatch } from './../reducers';

@connect(
  null,
  (dispatch: Dispatch) =>
    bindActionCreators({ login: loginActions.loginRequest }, dispatch)
)
export class LoginContainer extends React.Component<{ login: any }, {}> {

  render() {
    console.log(this.props.login);
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
