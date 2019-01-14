import { combineReducers } from 'redux';
import amountFrom from './amountFrom';
import amountTo from './amountTo';
import currencyPair from './currencyPair';
import currencyListById from './currencyListById';
import rates from './rates';

const exchangeApp = combineReducers({
  amountFrom,
  amountTo,
  currencyPair,
  currencyListById,
  rates
});

export default exchangeApp;
