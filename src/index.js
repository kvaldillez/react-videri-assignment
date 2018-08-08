/* eslint-disable no-underscore-dangle */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import reducer from './store/reducers';
import rootSaga from './store/sagas';
import registerServiceWorker from './registerServiceWorker';

const logger = store => next => action => {
  // eslint-disable-next-line no-console
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  // eslint-disable-next-line no-console
  console.log('[Middleware] Next state', store.getState());
  return result;
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);

  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
