import { UPDATE_FROM_CURRENCY, UPDATE_FROM_CURRENCY_AMOUNT, UPDATE_USER_BALANCE } from '../../constants/types';
import {userBalance} from '../../constants/mocks';
import reducer from '../../reducers/isValidTransaction';

describe('isValidTransaction reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(false);
  });

  it('should handle UPDATE_FROM_CURRENCY', () => {
    expect(reducer({}, {
      type: UPDATE_FROM_CURRENCY,
      amountFrom: '10',
      userBalance,
      currency: { id: 'GBP', name: 'GBP', symbol: '£' }
    })).toEqual(true);
  });

  it('should handle UPDATE_FROM_CURRENCY_AMOUNT', () => {
    expect(reducer({}, {
      type: UPDATE_FROM_CURRENCY_AMOUNT,
      amountFrom: '10',
      userBalance,
      currency: { id: 'GBP', name: 'GBP', symbol: '£' }
    })).toEqual(true);
  });

  it('should handle UPDATE_FROM_CURRENCY_AMOUNT as invalid if from amount is larger than userBalance', () => {
    expect(reducer({}, {
      type: UPDATE_FROM_CURRENCY_AMOUNT,
      amountFrom: userBalance.GBP + 1,
      userBalance,
      currency: { id: 'GBP', name: 'GBP', symbol: '£' }
    })).toEqual(false);
  });

  it('should handle UPDATE_USER_BALANCE', () => {
    expect(reducer({}, {
      type: UPDATE_USER_BALANCE,
      amountFrom: '10',
      userBalance,
      currency: { id: 'GBP', name: 'GBP', symbol: '£' }
    })).toEqual(true);
  });
});
