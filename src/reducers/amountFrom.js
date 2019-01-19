const amountFrom = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_FROM_CURRENCY_AMOUNT':
      return action.amountFrom;

    default:
      return state;
  }
};

export default amountFrom;
