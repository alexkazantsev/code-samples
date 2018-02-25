import React from 'react';
import Router from 'next/router';

import { WithReduxSaga, ApiService } from './';
import './../styles/global';

export const DefaultPage = () => (Page) => {

  @WithReduxSaga()
  class DefaultPageHOC extends React.Component {

    static async getInitialProps(ctx) {
      if (!process.browser) new ApiService(ctx.req); /* INITIALIZE API SERVICE ON THE SERVER */
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
