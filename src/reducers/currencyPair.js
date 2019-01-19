import { UPDATE_CURRENCY_PAIR, UPDATE_FROM_CURRENCY, UPDATE_TO_CURRENCY } from '../constants/types';

const initialState = {
  from: {},
  to: {}
};

const currencyPair = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_CURRENCY_PAIR:
      return action.currencyPair;

    case UPDATE_FROM_CURRENCY:
      return {
        to: {...state.to},
        from: {...action.currency}
      };

    case UPDATE_TO_CURRENCY:
      return {
        to: {...action.currency},
        from: {...state.from}
      };

    default:
      return state;
  }
};

export default currencyPair;
