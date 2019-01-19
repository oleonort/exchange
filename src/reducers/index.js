import { combineReducers } from 'redux';
import amountFrom from './amountFrom';
import amountTo from './amountTo';
import currencyPair from './currencyPair';
import currencyListById from './currencyListById';
import rates from './rates';
import isValidTransaction from './isValidTransaction';
import userBalance from './userBalance';

const exchangeApp = combineReducers({
  amountFrom,
  amountTo,
  currencyPair,
  currencyListById,
  rates,
  isValidTransaction,
  userBalance
});

export default exchangeApp;
