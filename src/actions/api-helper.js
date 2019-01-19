import axios from 'axios';
import { latestRatesURL } from '../constants/exchangeRates';

export const getCurrency = (currentCurrency, currencyListById, switchDirection) => {
  const currencyArray = Object.keys(currencyListById);
  const currentCurrencyIndex = currencyArray.indexOf(currentCurrency);
  let newCurrencyIndex;

  if (switchDirection === 'next') {
    newCurrencyIndex = currentCurrencyIndex === currencyArray.length -1 ? 0 : currentCurrencyIndex + 1
  }
  if (switchDirection === 'prev') {
    newCurrencyIndex = currentCurrencyIndex === 0 ? currencyArray.length -1 : currentCurrencyIndex - 1
  }

  return {...currencyListById[currencyArray[newCurrencyIndex]]};
};

export const getRates = async (currentCurrency) => {
  // free subscription doesn't provide possibility to change base
  // so I will calculate them
  const response = await axios.get(latestRatesURL);
  const ratesUSDBase = response.data.rates;

  if (currentCurrency.id === 'USD') {
    return ratesUSDBase;
  }

  const {EUR, GBP} = ratesUSDBase;

  const ratesEURBase = {
    EUR: 1,
    USD: 1/EUR,
    GBP: GBP/EUR
  };

  if (currentCurrency.id === 'EUR') {
    return ratesEURBase;
  }

  const ratesGBPBase = {
    GBP: 1,
    USD: 1/GBP,
    EUR: EUR/GBP
  };

  if (currentCurrency.id === 'GBP') {
    return ratesGBPBase;
  }
};
