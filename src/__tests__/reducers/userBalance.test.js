import { UPDATE_USER_BALANCE } from '../../constants/types';
import { userBalance } from '../../constants/mocks';
import reducer from '../../reducers/userBalance';


describe('userBalance reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it ('should handle UPDATE_USER_BALANCE', () => {
    expect(reducer({}, {
      type: UPDATE_USER_BALANCE,
      userBalance
    })).toEqual({...userBalance});
  });
});
