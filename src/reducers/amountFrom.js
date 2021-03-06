import { UPDATE_FROM_CURRENCY_AMOUNT, EXCHANGE_CURRENCIES } from '../constants/types';

const amountFrom = (state = '', action) => {
  switch(action.type) {
    case UPDATE_FROM_CURRENCY_AMOUNT:
      return action.amountFrom;

    case EXCHANGE_CURRENCIES:
      return action.isValidTransaction ? '' : state;

    default:
      return state;
  }
};

export default amountFrom;
