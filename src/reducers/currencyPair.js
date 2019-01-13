const initialState = {
  from: {},
  to: {}
};

const updateToCurrencyAmount = (state, action) => {
    return {
      ...state.to,
      amount: state.from.amount === '' ? (
        ''
      ) : `+${(action.rates[state.to.id] * +(state.from.amount)).toFixed(2)}`
    };
};

const currencyPair = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_FROM_CURRENCY_AMOUNT':
      return {
        to: {...state.to},
        from: {
          ...state.from,
          amount: action.amount === '' ? '' : +action.amount
        }
      };

    case 'UPDATE_TO_CURRENCY_AMOUNT':
      return {
        to: updateToCurrencyAmount(state, action),
        from: {...state.from,}
      };

    case 'UPDATE_RATES':
      return {
        to: updateToCurrencyAmount(state, action),
        from: {...state.from,}
      };

    default:
      return state;
  }
};

export default currencyPair;
