import App from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { GlobalStyles, Content } from '../global.styles';
import { configureStore } from '../utils/configure-store';
import { AnyAction, Store } from 'redux';
import { Layout } from 'antd';

class Frontend extends App<{ store: Store<any, AnyAction> }> {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Head>
          <title>Captify Frontend</title>
        </Head>
        <GlobalStyles />
        <Provider store={ store }>
          <Layout>
            <Content>
              <Component { ...pageProps } />
            </Content>
          </Layout>
        </Provider>
      </>
    );
  }
}

export default withRedux(configureStore)(Frontend);
