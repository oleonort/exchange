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
  rates: { rates, isFetching: false },
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

    const newRates = await getRates(nextCurrency);
    expect(newRates).not.toEqual(rates);

    const expectedActions = [{
      type: types.UPDATE_RATES,
      currencyRate: newRates[currencyPair.to.id],
      amountFrom: '',
      rates: newRates
    }, {
      type: types.UPDATE_FROM_CURRENCY,
      amountFrom: '',
      currencyFrom: nextCurrency,
      currencyTo: currencyPair.to,
      userBalance
    }];

    return store.dispatch(actions.getNextFromCurrencyUpdateRates()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create actions to update rates and switch to prev from currency', async () => {
    mockAxios.get.mockImplementation(() => Promise.resolve({ data: { rates } }));

    const prevCurrency = getCurrency(currencyPair.from.id, currencyListById, 'prev');
    // currencyListById.GBP should be the prev currency counting from mocked currencyListById, since now we are on USD
    expect(prevCurrency).toEqual(currencyListById.GBP);

    const newRates = await getRates(prevCurrency);
    expect(newRates).not.toEqual(rates);

    const expectedActions = [{
      type: types.UPDATE_RATES,
      currencyRate: newRates[currencyPair.to.id],
      amountFrom: '',
      rates: newRates
    }, {
      type: types.UPDATE_FROM_CURRENCY,
      amountFrom: '',
      currencyFrom: prevCurrency,
      currencyTo: currencyPair.to,
      userBalance
    }];

    return store.dispatch(actions.getPrevFromCurrencyUpdateRates()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create actions to update rates and switch to next to currency', () => {
    const nextCurrency = getCurrency(currencyPair.to.id, currencyListById, 'next');
    // currencyListById.GBP should be the next currency counting from mocked currencyListById, since now we are on EUR
    expect(nextCurrency).toEqual(currencyListById.GBP);

    const expectedActions = [{
      type: types.UPDATE_TO_CURRENCY,
      amountFrom: '',
      currencyFrom: currencyPair.from,
      currencyTo: nextCurrency,
      userBalance
    }, {
      type: types.UPDATE_TO_CURRENCY_AMOUNT,
      amountFrom: '',
      currencyRate: store.getState().rates.rates[nextCurrency.id]
    }];

     store.dispatch(actions.getNextToCurrency());
     return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create actions to update rates and switch to prev to currency', () => {
    const prevCurrency = getCurrency(currencyPair.to.id, currencyListById, 'prev');
    // currencyListById.USD should be the next currency counting from mocked currencyListById, since now we are on EUR
    expect(prevCurrency).toEqual(currencyListById.USD);

    const expectedActions = [{
      type: types.UPDATE_TO_CURRENCY,
      amountFrom: '',
      currencyFrom: currencyPair.from,
      currencyTo: prevCurrency,
      userBalance
    }, {
      type: types.UPDATE_TO_CURRENCY_AMOUNT,
      amountFrom: '',
      currencyRate: store.getState().rates.rates[prevCurrency.id]
    }];

    store.dispatch(actions.getPrevToCurrency());
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create action to update from currency amount', () => {
   const amountFrom = '10';

    const expectedActions = [{
      type: types.UPDATE_FROM_CURRENCY_AMOUNT,
      amountFrom,
      currencyFrom: store.getState().currencyPair.from,
      currencyTo: currencyPair.to,
      userBalance: store.getState().userBalance
    }];

    store.dispatch(actions.updateFromCurrencyAmount(amountFrom));
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create action to update to currency amount', async () => {
    const { rates, currencyPair, amountFrom } = store.getState();
    const hasNoRates = rates.isFetching && Object.keys(rates.rates).length === 0;

    expect(hasNoRates).toEqual(false);

    let ratesToSend = { ...rates.rates };

    const expectedActions = [{
      type: types.UPDATE_TO_CURRENCY_AMOUNT,
      amountFrom,
      currencyRate: ratesToSend[currencyPair.to.id]
    }];

    store.dispatch(actions.updateToCurrencyAmount());
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create actions to fetch latest rates', async () => {
    mockAxios.get.mockImplementation(() => Promise.resolve({ data: { rates } }));
    const { currencyPair, amountFrom } = store.getState();
    const ratesToSend = await getRates(currencyPair.from);

    const expectedActions = [{
      type: types.FETCHING_RATES
    }, {
      type: types.UPDATE_RATES,
      currencyRate: rates[currencyPair.to.id],
      amountFrom,
      rates: ratesToSend
    }, {
      type: types.FETCHING_RATES_FINISHED
    }];

    store.dispatch(actions.fetchLatestRates()).then(() => {
      return expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create action to fetch currencies', () => {
    const expectedActions = [{
      type: types.UPDATE_CURRENCIES,
      currencyListById
    }];

    store.dispatch(actions.fetchCurrencies());
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create action to fetch currency pairs', () => {
    const expectedActions = [{
      type: types.UPDATE_CURRENCY_PAIR,
      currencyPair
    }];

    store.dispatch(actions.fetchCurrencyPair());
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create action to fetch user balance', () => {
    const { currencyPair, amountFrom } = store.getState();

    const expectedActions = [{
      type: types.UPDATE_USER_BALANCE,
      amountFrom,
      currencyFrom: currencyPair.from,
      currencyTo: currencyPair.to,
      userBalance
    }];

    store.dispatch(actions.fetchUserBalance());
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create action to exchange currencies', () => {
    const { isValidTransaction, currencyPair, amountFrom, amountTo } = store.getState();

    const expectedActions = [{
      type: types.EXCHANGE_CURRENCIES,
      isValidTransaction,
      currencyFrom: currencyPair.from,
      currencyTo: currencyPair.to,
      amountFrom,
      amountTo
    }];

    store.dispatch(actions.exchangeCurrencies());
    return expect(store.getActions()).toEqual(expectedActions);
  });
});
