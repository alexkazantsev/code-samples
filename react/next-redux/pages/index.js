import React, { Component } from 'react'; // eslint-disable-line
import Link from 'next/link';// eslint-disable-line
import Router from 'next/router';// eslint-disable-line

import { RequireAuth, DefaultPage } from '../utils';

@DefaultPage()
@RequireAuth()
export default class Index extends Component {

  render() {
    return <div>Protected page</div>
  }
}
