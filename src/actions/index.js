import axios from 'axios';
import { latestRatesURL } from '../constants';

export const nextCurrency = (exchangeContext) => (dispatch) => {
  dispatch({
    type: 'NEXT_CURRENCY',
    exchangeContext
  });
};

export const prevCurrency = (exchangeContext) => (dispatch) => {
  dispatch({
    type: 'PREV_CURRENCY',
    exchangeContext
  });
};

export const updateFromCurrencyAmount = (amount) => (dispatch) => {
  dispatch({
    type: 'UPDATE_FROM_CURRENCY_AMOUNT',
    amount
  });
};

export const updateToCurrencyAmount = () => async (dispatch, getState) => {
  const hasNoRates = getState().rates.isFetching && Object.keys(getState().rates.rates).length === 0;
  let rates = { ...getState().rates.rates };

  if (hasNoRates) {
    const response = await axios.get(`${latestRatesURL}&base=${getState().currencyPair.from.id}`);
    rates = response.data.rates;
  }
  dispatch({
    type: 'UPDATE_TO_CURRENCY_AMOUNT',
    rates
  });
};

export const fetchLatestRates = () => async (dispatch, getState) => {
  dispatch({ type: 'FETCHING_RATES' });

  const response = await axios.get(`${latestRatesURL}&base=${getState().currencyPair.from.id}`);

  dispatch({
    type: 'UPDATE_RATES',
    rates: response.data.rates
  });

  dispatch({ type: 'FETCHING_RATES_FINISHED' });
};

export default {
  nextCurrency,
  prevCurrency,
  updateFromCurrencyAmount,
  updateToCurrencyAmount,
  fetchLatestRates
}
