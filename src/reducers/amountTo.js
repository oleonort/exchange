import { roundToFixed } from '../common/utils';
import {UPDATE_TO_CURRENCY_AMOUNT, UPDATE_RATES, EXCHANGE_CURRENCIES} from '../constants/types';
import { minExchangeAmount } from '../constants/constants';

const updateToCurrencyAmount = (state, action) => {
  let roundTo = 2;
  const { amountFrom } = action;

  if (+amountFrom < minExchangeAmount) {
    roundTo = 4;
  }

  return action.amountFrom === '' ? (
    ''
  ) : roundToFixed(action.currencyRate * +amountFrom, roundTo);
};

const amountTo = (state = '', action) => {
  switch(action.type) {
    case UPDATE_TO_CURRENCY_AMOUNT:
      return updateToCurrencyAmount(null, action);

    case UPDATE_RATES:
      return updateToCurrencyAmount(null, action);

    case EXCHANGE_CURRENCIES:
      return action.isValidTransaction ? '' : state;

    default:
      return state;
  }
};

export default amountTo;
