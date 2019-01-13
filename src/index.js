import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import exchangeApp from './reducers';

import './styles/index.scss';

const initialState = {
  currencyPair: {
    from: {
      id: 'USD',
      name: 'USD',
      amount: '0'
    },
    to: {
      id: 'EUR',
      name: 'EUR',
      amount: '0'
    }
  },
  currencyListById: {},
  rates: {},
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(exchangeApp, initialState, composeEnhancers(
  applyMiddleware(reduxThunk)
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
