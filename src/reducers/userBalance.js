import { EXCHANGE_CURRENCIES, UPDATE_USER_BALANCE } from '../constants/types';

const updateUserBalance = (state, action) => {
  const { isValidTransaction, currencyFrom, currencyTo, amountFrom, amountTo } = action;

  if (!isValidTransaction) {
    return state;
  }

  const deductFrom = currencyFrom.id;
  const addTo = currencyTo.id;

  return {
    ...state,
    [deductFrom]: +(+state[deductFrom] - (+amountFrom)).toFixed(2),
    [addTo]: +(+state[addTo] + (+amountTo)).toFixed(2)
  };
};

const userBalance = (state = {}, action) => {
  switch(action.type) {
    case UPDATE_USER_BALANCE:
      return { ...action.userBalance };

    case EXCHANGE_CURRENCIES:
      return updateUserBalance(state, action);

    default:
      return state;
  }
};

export default userBalance;
