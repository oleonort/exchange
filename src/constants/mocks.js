export const currencyListById = {
  USD: {
    id: 'USD',
    name: 'USD',
    symbol: '$',
  },
  EUR: {
    id: 'EUR',
    name: 'EUR',
    symbol: '€',
  },
  GBP: {
    id: 'GBP',
    name: 'GBP',
    symbol: '£',
  }
};

export const currencyPair = {
  from: {
    id: 'USD',
    name: 'USD',
    symbol: '$',
  },
  to: {
    id: 'EUR',
    name: 'EUR',
    symbol: '€',
  }
};

export const userBalance = {
  USD: 337.84,
  EUR: 89.03,
  GBP: 450.34
};

// this is used for tests only
export const rates = {
  USD: 1,
  EUR: 0.8797,
  GBP: 0.77658
};

export default {
  currencyListById,
  currencyPair,
  rates,
  userBalance
};
