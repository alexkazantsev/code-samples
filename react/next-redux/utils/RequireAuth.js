import React from 'react'; // eslint-disable-line
import Router from 'next/router';// eslint-disable-line

import { ApiService } from './';
import { TOKEN_KEY } from './../config';
import { removeToken } from './CommonUtils';

export const RequireAuth = () => (Page) => {

  class AuthPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    static async getInitialProps(ctx) {
      try {
        await ApiService.instance.caller.get('/me');
        const pageProps = Page.getInitialProps && await Page.getInitialProps(ctx);
        return { ...pageProps };
      } catch (e) {
        if (!process.browser) {
          ctx.res.writeHead(302, { Location: '/login' });
          ctx.res.end();
        } else {
          Router.replace('/login');
          return {};
        }
      }
    }

    componentWillMount() {
      if (process.browser) {
        window.addEventListener('storage', this.handleChangeLs, false);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.handleChangeLs, false);
    }

    componentDidMount() {
      this.setState({ isLoading: false });
    }

    handleChangeLs = (e) => {
      if (e.key === TOKEN_KEY && _.isNil(e.newValue)) {
        Router.push('/login');
        removeToken();
      }
    }

    render() {
      const { isLoading } = this.state;

      if (isLoading) return <div>Loading...</div>;
      return (
        <Page {...this.props} />
      );
    }
  }

  return AuthPage;
};
