import axios from 'axios';

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
