import { UPDATE_USER_BALANCE } from '../constants/types';

const userBalance = (state = {}, action) => {
  switch(action.type) {
    case UPDATE_USER_BALANCE:
      return action.userBalance;

    default:
      return state;
  }
};

export default userBalance;
