import * as React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router';
import { hot } from 'react-hot-loader';
import * as containers from './containers';
import { configureStore } from './utils';

import 'antd/dist/antd.css';

const history = createBrowserHistory();
const store = configureStore(history);

const routes = (
  <div>
    <Route path="/" exact={true} component={containers.HomeContainer} />
    <Route path="/login" component={containers.LoginContainer} />
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
