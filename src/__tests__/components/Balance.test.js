import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Balance from '../../components/Balance';

Enzyme.configure({ adapter: new Adapter() });

function setup(error) {
  const props = {
    currencySymbol: '$',
    amount: 10,
    error: error || false
  };

  const enzymeWrapper = shallow(<Balance {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Balance component', () => {
  it('should render without error className', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('.balance').hasClass('error')).toBe(false);
    expect(enzymeWrapper.find('.balance').text()).toBe('You have $10');
  });

  it('should render with error className', () => {
    const { enzymeWrapper } = setup(true);

    expect(enzymeWrapper.find('.balance').hasClass('error')).toBe(true);
    expect(enzymeWrapper.find('.balance').text()).toBe('You have $10');
  });
});
