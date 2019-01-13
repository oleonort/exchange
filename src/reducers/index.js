import { combineReducers } from 'redux';
import currencyPair from './currencyPair';
import currencyListById from './currencyListById';

const exchangeApp = combineReducers({
  currencyPair,
  currencyListById
});

export default exchangeApp;
