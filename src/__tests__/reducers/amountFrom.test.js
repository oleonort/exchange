import {EXCHANGE_CURRENCIES, UPDATE_FROM_CURRENCY_AMOUNT} from '../../constants/types';
import reducer from '../../reducers/amountFrom';

describe('amountFrom reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual('');
  });

  it('should handle UPDATE_FROM_CURRENCY_AMOUNT', () => {
    expect(reducer('', {
      type: UPDATE_FROM_CURRENCY_AMOUNT,
      amountFrom: '10'
    })).toEqual('10');
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
