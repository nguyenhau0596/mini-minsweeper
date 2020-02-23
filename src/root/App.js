import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from 'redux/store/configureStore';
import { routes } from 'routes/routes';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/style.scss';

const store = configureStore();

function App() {
  return (
    <div className='container'>
      <Provider store={store}>
        <HashRouter>
          <Switch>
            {routes.map((route, idx) => <Route
              path={route.path}
              extract={route.extract}
              key={idx}
              component={route.component}
            />)}
          </Switch>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
