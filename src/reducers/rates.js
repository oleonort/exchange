import { combineReducers } from 'redux';

const rates = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_RATES':
      return action.rates;

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case 'FETCHING_RATES':
      return true;

    case 'FETCHING_RATES_FINISHED':
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  rates,
  isFetching
});