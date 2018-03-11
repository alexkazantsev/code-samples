import * as React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

import { HomeContainer } from './containers';
import { configureStore } from './utils';

const history: History = createBrowserHistory();
const store = configureStore(history);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact={true} component={HomeContainer} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}
