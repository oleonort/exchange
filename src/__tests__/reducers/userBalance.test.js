import { UPDATE_USER_BALANCE, EXCHANGE_CURRENCIES } from '../../constants/types';
import { userBalance, currencyPair } from '../../constants/mocks';
import reducer from '../../reducers/userBalance';

describe('userBalance reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it ('should handle UPDATE_USER_BALANCE', () => {
    expect(reducer({}, {
      type: UPDATE_USER_BALANCE,
      userBalance
    })).toEqual({...userBalance});
  });

  it ('should handle EXCHANGE_CURRENCIES', () => {
    expect(reducer(userBalance, {
      type: EXCHANGE_CURRENCIES,
      isValidTransaction: true,
      currencyFrom: currencyPair.from,
      currencyTo: currencyPair.to,
      amountFrom: '10.83',
      amountTo: '9.49'
    })).toEqual({
      ...userBalance,
      USD: +((userBalance.USD - 10.83).toFixed(2)),
      EUR: +((userBalance.EUR + 9.49).toFixed(2)),
    });

    expect(reducer(userBalance, {
      type: EXCHANGE_CURRENCIES,
      isValidTransaction: false,
      currencyFrom: currencyPair.from,
      currencyTo: currencyPair.to,
      amountFrom: '10.83',
      amountTo: '9.49'
    })).toEqual({...userBalance});
  });
});
