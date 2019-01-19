import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import mockAxios from 'axios';
import { currencyListById, currencyPair, userBalance, rates } from '../../constants/mocks';
import { getCurrency, getRates } from '../../actions/api-helper';
import * as actions from '../../actions';
import * as types from '../../constants/types';

const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  currencyListById,
  currencyPair,
  userBalance,
  amountFrom: ''
});

describe('actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mockAxios.get.mockReset();
  });

  it('should create actions to update rates and switch to next from currency', async () => {
    mockAxios.get.mockImplementation(() => Promise.resolve({ data: { rates } }));

    const nextCurrency = getCurrency(currencyPair.from.id, currencyListById, 'next');
    // currencyListById.EUR should be the next currency counting from mocked currencyListById, since now we are on USD
    expect(nextCurrency).toEqual(currencyListById.EUR);

    const newRates = await getRates(currencyListById.EUR);
    expect(newRates).not.toEqual(rates);

    const expectedActions = [{
      type: types.UPDATE_RATES,
      currencyRate: newRates[currencyPair.to.id],
      amountFrom: '',
      rates: newRates
    }, {
      type: types.UPDATE_FROM_CURRENCY,
      amountFrom: '',
      currency: nextCurrency,
      userBalance
    }];

    return store.dispatch(actions.getNextFromCurrencyUpdateRates()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
