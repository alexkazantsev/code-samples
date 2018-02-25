import React from 'react'; // eslint-disable-line
import Router from 'next/router';// eslint-disable-line

import { WithReduxSaga } from './';

export const DefaultPage = () => (Page) => {

  @WithReduxSaga()
  class DefaultPageHOC extends React.Component {

    static async getInitialProps(ctx) {
      if (Page.getInitialProps) return await Page.getInitialProps(ctx);
      return {};
    }

    render() {
      return (
        <Page {...this.props} />
      );
    }
  }

  return DefaultPageHOC;
};
