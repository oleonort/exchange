import {
  UPDATE_FROM_CURRENCY_AMOUNT,
  UPDATE_FROM_CURRENCY,
  UPDATE_USER_BALANCE,
  UPDATE_TO_CURRENCY,
  EXCHANGE_CURRENCIES
} from '../constants/types';
import { minExchangeAmount } from '../constants/constants';

const validate = (state, action) => {
  const { amountFrom, currencyFrom, currencyTo, userBalance } = action;

  return amountFrom &&
    !isNaN(+amountFrom) &&
    amountFrom > 0 &&
    currencyFrom.id !== currencyTo.id &&
    +amountFrom >= minExchangeAmount &&
    +amountFrom < +userBalance[currencyFrom.id];
};

const isValidTransaction = (state = false, action) => {
  switch(action.type) {
    case UPDATE_FROM_CURRENCY:
      return validate(state, action);

    case UPDATE_TO_CURRENCY:
      return validate(state, action);

    case UPDATE_FROM_CURRENCY_AMOUNT:
      return validate(state, action);

    case UPDATE_USER_BALANCE:
      return validate(state, action);

    case EXCHANGE_CURRENCIES:
      return action.isValidTransaction ? false : state;

    default:
      return state;
  }
};

export default isValidTransaction;
