import {
  UPDATE_FROM_CURRENCY,
  UPDATE_TO_CURRENCY,
  UPDATE_FROM_CURRENCY_AMOUNT,
  UPDATE_USER_BALANCE,
  EXCHANGE_CURRENCIES
} from '../../constants/types';
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
      currencyFrom: { id: 'GBP', name: 'GBP', symbol: '£' },
      currencyTo: { id: 'USD', name: 'USD', symbol: '$' }
    })).toEqual(true);
  });

  it('should handle UPDATE_FROM_CURRENCY as invalid if currencies are the same', () => {
    expect(reducer({}, {
      type: UPDATE_FROM_CURRENCY,
      amountFrom: '10',
      userBalance,
      currencyFrom: { id: 'USD', name: 'USD', symbol: '$' },
      currencyTo: { id: 'USD', name: 'USD', symbol: '$' }
    })).toEqual(false);
  });

  it('should handle UPDATE_TO_CURRENCY', () => {
    expect(reducer({}, {
      type: UPDATE_TO_CURRENCY,
      amountFrom: '10',
      userBalance,
      currencyFrom: { id: 'GBP', name: 'GBP', symbol: '£' },
      currencyTo: { id: 'USD', name: 'USD', symbol: '$' }
    })).toEqual(true);
  });

  it('should handle UPDATE_TO_CURRENCY as invalid if currencies are the same', () => {
    expect(reducer({}, {
      type: UPDATE_TO_CURRENCY,
      amountFrom: '10',
      userBalance,
      currencyFrom: { id: 'USD', name: 'USD', symbol: '$' },
      currencyTo: { id: 'USD', name: 'USD', symbol: '$' }
    })).toEqual(false);
  });

  it('should handle UPDATE_FROM_CURRENCY_AMOUNT', () => {
    expect(reducer({}, {
      type: UPDATE_FROM_CURRENCY_AMOUNT,
      amountFrom: '10',
      userBalance,
      currencyFrom: { id: 'GBP', name: 'GBP', symbol: '£' },
      currencyTo: { id: 'USD', name: 'USD', symbol: '$' }
    })).toEqual(true);
  });

  it('should handle UPDATE_FROM_CURRENCY_AMOUNT as invalid if from amount is larger than userBalance', () => {
    expect(reducer({}, {
      type: UPDATE_FROM_CURRENCY_AMOUNT,
      amountFrom: userBalance.GBP + 1,
      userBalance,
      currencyFrom: { id: 'GBP', name: 'GBP', symbol: '£' },
      currencyTo: { id: 'USD', name: 'USD', symbol: '$' }
    })).toEqual(false);
  });

  it('should handle UPDATE_USER_BALANCE', () => {
    expect(reducer({}, {
      type: UPDATE_USER_BALANCE,
      amountFrom: '10',
      userBalance,
      currencyFrom: { id: 'GBP', name: 'GBP', symbol: '£' },
      currencyTo: { id: 'USD', name: 'USD', symbol: '$' }
    })).toEqual(true);
  });

  it('should handle EXCHANGE_CURRENCIES', () => {
    expect(reducer({}, {
      type: EXCHANGE_CURRENCIES,
      amountFrom: '10',
      currencyFrom: { id: 'GBP', name: 'GBP', symbol: '£' },
      currencyTo: { id: 'GBP', name: 'GBP', symbol: '£' },
      isValidTransaction: true
    })).toEqual(false);
  });
});
