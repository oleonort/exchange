const initialState = {
  from: {},
  to: {}
};

const currencyPair = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_FROM_CURRENCY_AMOUNT':
      return {
        to: {...state.to},
        from: {
          ...state.from,
          amount: action.amount === '' || action.amount === '+' ? 0 : `+${+action.amount}`
        }
      };

    default:
      return state;
  }
};

export default currencyPair;
