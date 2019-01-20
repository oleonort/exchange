import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ExchangeButton } from '../../components/ExchangeButton';

Enzyme.configure({ adapter: new Adapter() });

function setup(isValidTransaction) {
  const props = {
    isValidTransaction,
  };

  const enzymeWrapper = shallow(<ExchangeButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('ExchangeButton component', () => {
  it('should be enabled if isValidTransaction equals true', () => {
    const { enzymeWrapper } = setup(true);
    expect(enzymeWrapper.find('.btn').props().disabled).toBe(false);
  });

  it('should be disabled if isValidTransaction equals false', () => {
    const { enzymeWrapper } = setup(false);
    expect(enzymeWrapper.find('.btn').props().disabled).toBe(true);
  });
});
