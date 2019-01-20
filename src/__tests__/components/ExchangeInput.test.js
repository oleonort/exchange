import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ExchangeInput } from '../../components/ExchangeInput';

Enzyme.configure({ adapter: new Adapter() });

function setup(exchangeContext = 'from') {
  const props = {
    currencyAmount: '10',
    exchangeContext,
    updateFromCurrencyAmount: () => {},
    updateToCurrencyAmount: () => {}
  };

  const enzymeWrapper = shallow(<ExchangeInput {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('ExchangeInput component', () => {
  it('should render self and input', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Input').exists()).toBe(true);
  });

  it('should be disabled if exchangeContext is to', () => {
    const { enzymeWrapper } = setup('to');
    expect(enzymeWrapper.find('Input').props().disabled).toBe(true);
  });

  it('should has autofocus if exchangeContext is from', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Input').props().autoFocus).toBe(true);
  });

  it('value passed to Input should contain "-" if exchangeContext is from', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Input').props().value.includes('-')).toBe(true);
  });

  it('value passed to Input should contain "+" if exchangeContext is from', () => {
    const { enzymeWrapper } = setup('to');
    expect(enzymeWrapper.find('Input').props().value.includes('+')).toBe(true);
  });

  it('should call onChange on each change event', () => {
    const { enzymeWrapper } = setup('to');
    const spy = jest.spyOn(enzymeWrapper.instance(), 'onChange');
    enzymeWrapper.instance().forceUpdate();
    enzymeWrapper.find('Input').simulate('change', '11');
    expect(spy).toBeCalledWith('11');
  });
});
