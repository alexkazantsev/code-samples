import React from 'react';
import Router from 'next/router';

import { WithReduxSaga, ApiService } from './';
import './../styles/global';

export const DefaultPage = () => (Page) => {

  @WithReduxSaga()
  class DefaultPageHOC extends React.Component {

    static async getInitialProps(ctx) {
      let props = {};
      if (Page.getInitialProps) props = await Page.getInitialProps(ctx);
      if (!process.browser) new ApiService(ctx.req); /* INITIALIZE API SERVICE ON THE SERVER */
      return { ...props };
    }

    render() {
      return (
        <Page {...this.props} />
      );
    }
  }

  return DefaultPageHOC;
};
