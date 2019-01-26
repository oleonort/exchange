import { UPDATE_CURRENCY_PAIR, UPDATE_FROM_CURRENCY, UPDATE_TO_CURRENCY } from '../../constants/types';
import {currencyListById, currencyPair} from '../../constants/mocks';
import reducer from '../../reducers/currencyPair';

describe('currencyListById reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      from: {},
      to: {}
    });
  });

  it('should handle UPDATE_CURRENCY_PAIR', () => {
    expect(reducer('', {
      type: UPDATE_CURRENCY_PAIR,
      currencyPair
    })).toEqual(JSON.parse(JSON.stringify(currencyPair)));
  });

  it('should handle UPDATE_FROM_CURRENCY', () => {
    expect(reducer({
      from: currencyListById.USD,
      to: currencyListById.EUR,
    }, {
      type: UPDATE_FROM_CURRENCY,
      currencyFrom: { id: 'GBP', name: 'GBP', symbol: '£' }
    })).toEqual({
      from: { id: 'GBP', name: 'GBP', symbol: '£' },
      to: { ...currencyListById.EUR }
    });
  });

  it('should handle UPDATE_TO_CURRENCY', () => {
    expect(reducer({
      from: currencyListById.USD,
      to: currencyListById.EUR,
    }, {
      type: UPDATE_TO_CURRENCY,
      currencyTo: { id: 'GBP', name: 'GBP', symbol: '£' }
    })).toEqual({
      from: { ...currencyListById.USD },
      to: { id: 'GBP', name: 'GBP', symbol: '£' }
    });
  });
});
