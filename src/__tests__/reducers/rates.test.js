import { FETCHING_RATES, FETCHING_RATES_FINISHED, UPDATE_RATES } from '../../constants/types';
import { rates } from '../../constants/mocks';
import { rates as ratesReducer, isFetching as isFetchingReducer } from '../../reducers/rates';


describe('ratesReducer reducer', () => {
  it('should return the initial state', () => {
    expect(ratesReducer(undefined, {})).toEqual({});
  });

  it ('should handle UPDATE_RATES', () => {
    expect(ratesReducer({}, {
      type: UPDATE_RATES,
      rates
    })).toEqual({...rates});
  });
});

describe('isFetchingReducer reducer', () => {
  it('should return the initial state', () => {
    expect(isFetchingReducer(undefined, {})).toEqual(false);
  });

  it ('should handle FETCHING_RATES', () => {
    expect(isFetchingReducer({}, {
      type: FETCHING_RATES
    })).toEqual(true);
  });

  it ('should handle FETCHING_RATES_FINISHED', () => {
    expect(isFetchingReducer({}, {
      type: FETCHING_RATES_FINISHED
    })).toEqual(false);
  });
});
