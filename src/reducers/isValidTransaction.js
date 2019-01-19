const validate = (state, action) => {
  const { amountFrom, currency, userBalance } = action;

  return amountFrom && !isNaN(+amountFrom) && amountFrom > 0 && +amountFrom < +userBalance[currency.id];
};

const isValidTransaction = (state = false, action) => {
  switch(action.type) {
    case 'UPDATE_FROM_CURRENCY':
      return validate(state, action);

    case 'UPDATE_FROM_CURRENCY_AMOUNT':
      return validate(state, action);

    case 'UPDATE_USER_BALANCE':
      return validate(state, action);

    default:
      return state;
  }
};

export default isValidTransaction;
