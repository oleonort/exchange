import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PairRateValues } from '../../components/PairRateValues';
import { currencyListById } from '../../constants/mocks';

Enzyme.configure({ adapter: new Adapter() });

function setup(reverse = false, classNameProp = '') {
  const props = {
    currencyFrom: currencyListById.USD,
    currencyTo: currencyListById.EUR,
    rate: 0.8797,
    reverse,
    classNameProp
  };

  const enzymeWrapper = shallow(<PairRateValues {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('PairRateValues component', () => {
  it('should render self', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('.pair-rate-values').exists()).toBe(true);
    expect(enzymeWrapper.find('.pair-rate-values').text()).toBe('$ 1 = € 0.8797');
  });

  it('should render in reverse if reverse prop is true', () => {
    const { enzymeWrapper } = setup(true);
    expect(enzymeWrapper.find('.pair-rate-values').text()).toBe('€ 1 = $ 0.88');
  });

  it('should render classNameProp if its passed', () => {
    const { enzymeWrapper } = setup(false, 'test-class-name');
    expect(enzymeWrapper.find('.pair-rate-values').exists()).toBe(true);
    expect(enzymeWrapper.find('.pair-rate-values').hasClass('test-class-name')).toBe(true);
  });
});
