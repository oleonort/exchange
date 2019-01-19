import { getCurrency, getRates } from './api-helper';

export const getNextFromCurrencyUpdateRates = () => async (dispatch, getState) => {
  const { currencyPair, currencyListById, amountFrom, userBalance } = getState();
  const currency = getCurrency(currencyPair.from.id, currencyListById, 'next');
  const rates = await getRates(currency);

  dispatch({
    type: 'UPDATE_RATES',
    currencyRate: rates[currencyPair.to.id],
    amountFrom,
    rates
  });

  dispatch({
    type: 'UPDATE_FROM_CURRENCY',
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
    type: 'UPDATE_RATES',
    currencyRate: rates[currencyPair.to.id],
    amountFrom,
    rates
  });

  dispatch({
    type: 'UPDATE_FROM_CURRENCY',
    amountFrom,
    currency,
    userBalance
  });
};

export const getNextToCurrency = () => (dispatch, getState) => {
  const { currencyPair, currencyListById, amountFrom, rates } = getState();
  const currency = getCurrency(currencyPair.to.id, currencyListById, 'next');

  dispatch({
    type: 'UPDATE_TO_CURRENCY',
    currency
  });

  dispatch({
    type: 'UPDATE_TO_CURRENCY_AMOUNT',
    amountFrom,
    currencyRate: rates.rates[currency.id]
  });
};

export const getPrevToCurrency = () => (dispatch, getState) => {
  const { currencyPair, currencyListById, amountFrom, rates } = getState();
  const currency = getCurrency(currencyPair.to.id, currencyListById, 'prev');

  dispatch({
    type: 'UPDATE_TO_CURRENCY',
    currency
  });

  dispatch({
    type: 'UPDATE_TO_CURRENCY_AMOUNT',
    amountFrom,
    currencyRate: rates.rates[currency.id]
  });
};

export const updateFromCurrencyAmount = amountFrom => (dispatch, getState) => {
  const { currencyPair, userBalance } = getState();
  dispatch({
    type: 'UPDATE_FROM_CURRENCY_AMOUNT',
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
    type: 'UPDATE_TO_CURRENCY_AMOUNT',
    amountFrom,
    currencyRate: ratesToSend[currencyPair.to.id]
  });
};

export const fetchLatestRates = () => async (dispatch, getState) => {
  dispatch({ type: 'FETCHING_RATES' });

  const { currencyPair, amountFrom } = getState();

  const rates = await getRates(currencyPair.from);

  dispatch({
    type: 'UPDATE_RATES',
    currencyRate: rates[currencyPair.to.id],
    amountFrom,
    rates
  });

  dispatch({ type: 'FETCHING_RATES_FINISHED' });
};

export const fetchCurrencies = () => dispatch => {
  // Should be fetched from some endpoint in real app
  // Mocked here to speed up
  dispatch({
    type: 'UPDATE_CURRENCIES',
    currencyListById: {
      USD: {
        id: 'USD',
        name: 'USD',
        symbol: '$',
      },
      EUR: {
        id: 'EUR',
        name: 'EUR',
        symbol: '€',
      },
      GBP: {
        id: 'GBP',
        name: 'GBP',
        symbol: '£',
      }
    }
  });
};

export const fetchCurrencyPair = () => dispatch => {
  // Should be fetched from some endpoint in real app
  // Mocked here to speed up
  dispatch({
    type: 'UPDATE_CURRENCY_PAIR',
    currencyPair: {
      from: {
        id: 'USD',
        name: 'USD',
        symbol: '$',
      },
      to: {
        id: 'EUR',
        name: 'EUR',
        symbol: '€',
      }
    }
  });
};

export const fetchUserBalance = () => (dispatch, getSate) => {
  const { amountFrom, currencyPair } = getSate();
  // Should be fetched from some endpoint in real app
  // Mocked here to speed up
  dispatch({
    type: 'UPDATE_USER_BALANCE',
    amountFrom,
    currency: currencyPair.from,
    userBalance: {
      USD: 337.84,
      EUR: 89.03,
      GBP: 450.34
    }
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
