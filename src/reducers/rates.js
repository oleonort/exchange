import { combineReducers } from 'redux';
import { UPDATE_RATES, FETCHING_RATES, FETCHING_RATES_FINISHED } from '../constants/types';

export const rates = (state = {}, action) => {
  switch(action.type) {
    case UPDATE_RATES:
      return {...action.rates};

    default:
      return state;
  }
};

export const isFetching = (state = false, action) => {
  switch(action.type) {
    case FETCHING_RATES:
      return true;

    case FETCHING_RATES_FINISHED:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  rates,
  isFetching
});
