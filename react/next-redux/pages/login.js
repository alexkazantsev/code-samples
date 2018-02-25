import React, { Component } from 'react'; // eslint-disable-line
import Link from 'next/link';// eslint-disable-line
import Router from 'next/router';// eslint-disable-line
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';

import { DefaultPage } from './../utils';
import { login } from './../actions';

@DefaultPage()
@reduxForm({ form: 'login' })
@connect()
export default class Login extends Component {

  render() {
    return (
      <h1>Login page</h1>
    );
  }
}
