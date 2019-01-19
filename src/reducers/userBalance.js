const userBalance = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_USER_BALANCE':
      return action.userBalance;

    default:
      return state;
  }
};

export default userBalance;
