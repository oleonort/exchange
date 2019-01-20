import { UPDATE_FROM_CURRENCY_AMOUNT } from '../../constants/types';
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
});
