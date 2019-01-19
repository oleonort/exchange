import { UPDATE_CURRENCIES } from '../constants/types';

const currencyListById = (state = {}, action) => {
  switch(action.type) {
    case UPDATE_CURRENCIES:
      return action.currencyListById;

    default:
      return state;
  }
};

export default currencyListById;
