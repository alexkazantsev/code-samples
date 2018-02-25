import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Link from 'next/link';
import Router from 'next/router';

import { DefaultPage } from './../utils';
import { authActions } from './../actions';
import {
  MainFormWrapper,
  InputWrapper,
  Button,
  InlineRow,
  NavLink,
  TextDescription,
  AuthContainer,
  FormTitle,
} from './../styles/defaultPageStyles';

@DefaultPage()
@reduxForm({ form: 'signup' })
@connect(
  state => ({}),
  dispatch => ({ actions: bindActionCreators({ signup: authActions.signup }, dispatch) }),
)
export default class Signup extends React.Component {

  onSuccess = () => Router.push('/');
  onSubmit = values => this.props.actions.signup(values, this.onSuccess);

  render() {
    const { handleSubmit } = this.props;
    return (
      <AuthContainer>
        <MainFormWrapper onSubmit={handleSubmit(this.onSubmit)}>
          <FormTitle>Sign Up</FormTitle>
          <InputWrapper>
            <Field name="name" component="input" type="name" placeholder="Name" />
          </InputWrapper>
          <InputWrapper>
            <Field name="email" component="input" type="email" placeholder="Email" />
          </InputWrapper>
          <InputWrapper>
            <Field name="password" component="input" type="password" placeholder="Password" />
          </InputWrapper>
          <InlineRow>
            <Button type="submit">Sign up</Button>
            <TextDescription>
              Already have an account?
              <Link prefetch href={'/login'}>
                <NavLink>Log in</NavLink>
              </Link>
            </TextDescription>
          </InlineRow>
        </MainFormWrapper>
      </AuthContainer>
    );
  }
}
