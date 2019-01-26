import {UPDATE_TO_CURRENCY_AMOUNT, UPDATE_RATES, EXCHANGE_CURRENCIES} from '../../constants/types';
import { currencyPair, rates } from '../../constants/mocks';
import reducer from '../../reducers/amountTo';

describe('amountTo reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual('');
  });

  it('should handle UPDATE_TO_CURRENCY_AMOUNT', () => {
    expect(reducer('', {
      type: UPDATE_TO_CURRENCY_AMOUNT,
      amountFrom: '10',
      currencyRate: rates[currencyPair.to.id] // 0.8797
    })).toEqual((10*rates[currencyPair.to.id]).toFixed(2)); // '8.80'
  });

  it('should handle UPDATE_RATES', () => {
    expect(reducer('', {
      type: UPDATE_RATES,
      amountFrom: '10',
      currencyRate: 0.9 // assuming rates has changed
    })).toEqual((10*0.9).toFixed(2)); // '9.00'
  });

  it ('should handle EXCHANGE_CURRENCIES', () => {
    expect(reducer('10', {
      type: EXCHANGE_CURRENCIES,
      isValidTransaction: true,
    })).toEqual('');

    expect(reducer('10', {
      type: EXCHANGE_CURRENCIES,
      isValidTransaction: false,
    })).toEqual('10');
  });
});
