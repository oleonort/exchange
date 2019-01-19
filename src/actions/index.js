import { getCurrency, getRates } from './api-helper';
import * as types from '../constants/types';
import { currencyListById, currencyPair, userBalance } from '../constants/mocks';

export const getNextFromCurrencyUpdateRates = () => async (dispatch, getState) => {
  const { currencyPair, currencyListById, amountFrom, userBalance } = getState();
  const currency = getCurrency(currencyPair.from.id, currencyListById, 'next');
  const rates = await getRates(currency);

  dispatch({
    type: types.UPDATE_RATES,
    currencyRate: rates[currencyPair.to.id],
    amountFrom,
    rates
  });

  dispatch({
    type: types.UPDATE_FROM_CURRENCY,
    amountFrom,
    currency,
    userBalance
  });
};

export const getPrevFromCurrencyUpdateRates = () => async (dispatch, getState) => {
  const { currencyPair, currencyListById, amountFrom, userBalance } = getState();
  const currency = getCurrency(currencyPair.from.id, currencyListById, 'prev');
  const rates = await getRates(currency);

  dispatch({
    type: types.UPDATE_RATES,
    currencyRate: rates[currencyPair.to.id],
    amountFrom,
    rates
  });

  dispatch({
    type: types.UPDATE_FROM_CURRENCY,
    amountFrom,
    currency,
    userBalance
  });
};

export const getNextToCurrency = () => (dispatch, getState) => {
  const { currencyPair, currencyListById, amountFrom, rates } = getState();
  const currency = getCurrency(currencyPair.to.id, currencyListById, 'next');

  dispatch({
    type: types.UPDATE_TO_CURRENCY,
    currency
  });

  dispatch({
    type: types.UPDATE_TO_CURRENCY_AMOUNT,
    amountFrom,
    currencyRate: rates.rates[currency.id]
  });
};

export const getPrevToCurrency = () => (dispatch, getState) => {
  const { currencyPair, currencyListById, amountFrom, rates } = getState();
  const currency = getCurrency(currencyPair.to.id, currencyListById, 'prev');

  dispatch({
    type: types.UPDATE_TO_CURRENCY,
    currency
  });

  dispatch({
    type: types.UPDATE_TO_CURRENCY_AMOUNT,
    amountFrom,
    currencyRate: rates.rates[currency.id]
  });
};

export const updateFromCurrencyAmount = amountFrom => (dispatch, getState) => {
  const { currencyPair, userBalance } = getState();
  dispatch({
    type: types.UPDATE_FROM_CURRENCY_AMOUNT,
    amountFrom,
    currency: currencyPair.from,
    userBalance
  });
};

export const updateToCurrencyAmount = () => async (dispatch, getState) => {
  const { rates, currencyPair, amountFrom } = getState();
  const hasNoRates = rates.isFetching && Object.keys(rates.rates).length === 0;

  let ratesToSend = { ...getState().rates.rates };

  if (hasNoRates) {
    ratesToSend = await getRates(currencyPair.from);
  }

  dispatch({
    type: types.UPDATE_TO_CURRENCY_AMOUNT,
    amountFrom,
    currencyRate: ratesToSend[currencyPair.to.id]
  });
};

export const fetchLatestRates = () => async (dispatch, getState) => {
  dispatch({ type: types.FETCHING_RATES });

  const { currencyPair, amountFrom } = getState();

  const rates = await getRates(currencyPair.from);

  dispatch({
    type: types.UPDATE_RATES,
    currencyRate: rates[currencyPair.to.id],
    amountFrom,
    rates
  });

  dispatch({ type: types.FETCHING_RATES_FINISHED });
};

export const fetchCurrencies = () => dispatch => {
  // currencyListById should be fetched from some endpoint in real app
  // Referenced the mock here to speed up
  dispatch({
    type: types.UPDATE_CURRENCIES,
    currencyListById
  });
};

export const fetchCurrencyPair = () => dispatch => {
  // currencyPair should be fetched from some endpoint in real app
  // Referenced the mock here to speed up
  dispatch({
    type: types.UPDATE_CURRENCY_PAIR,
    currencyPair
  });
};

export const fetchUserBalance = () => (dispatch, getSate) => {
  const { amountFrom, currencyPair } = getSate();
  // userBalance should be fetched from some endpoint in real app
  // Referenced the mock here to speed up
  dispatch({
    type: types.UPDATE_USER_BALANCE,
    amountFrom,
    currency: currencyPair.from,
    userBalance
  });
};

export default {
  fetchCurrencies,
  fetchCurrencyPair,
  fetchLatestRates,
  fetchUserBalance,
  getNextFromCurrencyUpdateRates,
  getPrevFromCurrencyUpdateRates,
  getNextToCurrency,
  getPrevToCurrency,
  updateFromCurrencyAmount,
  updateToCurrencyAmount
}
