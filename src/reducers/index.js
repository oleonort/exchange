import { combineReducers } from 'redux';
import currencyPair from './currencyPair';
import currencyListById from './currencyListById';
import rates from './rates';

const exchangeApp = combineReducers({
  currencyPair,
  currencyListById,
  rates
});

export default exchangeApp;
