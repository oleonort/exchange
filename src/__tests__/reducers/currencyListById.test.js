import { UPDATE_CURRENCIES } from '../../constants/types';
import { currencyListById } from '../../constants/mocks';
import reducer from '../../reducers/currencyListById';

describe('currencyListById reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle UPDATE_CURRENCIES', () => {
    expect(reducer('', {
      type: UPDATE_CURRENCIES,
      currencyListById
    })).toEqual(JSON.parse(JSON.stringify(currencyListById)));
  });
});
