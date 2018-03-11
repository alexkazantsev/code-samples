import * as React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router';
import { hot } from 'react-hot-loader';
import { HomeContainer } from './containers';
import { configureStore } from './utils';

const history = createBrowserHistory();
const store = configureStore(history);

const routes = (
  <Route path="/" component={HomeContainer} />
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
