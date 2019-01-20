import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CurrencyToExchange } from '../../components/CurrencyToExchange';
import ExchangeInput  from '../../components/ExchangeInput';
import CurrencySwitcher  from '../../components/CurrencySwitcher';
import PairRateValues  from '../../components/PairRateValues';
import { currencyPair } from '../../constants/mocks';

Enzyme.configure({ adapter: new Adapter() });

function setup(exchangeContext = 'from', amount ) {
  const props = {
    currency: currencyPair[exchangeContext],
    amount,
    amountFrom: '10',
    isValidTransaction: true,
    exchangeContext
  };

  const enzymeWrapper = shallow(<CurrencyToExchange {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('CurrencyToExchange component', () => {
  it('should render self and subcomponents ', () => {
    const { enzymeWrapper } = setup('from', 20);
    expect(enzymeWrapper.find('.currency-to-exchange').hasClass('currency-to-exchange')).toBe(true);
    expect(enzymeWrapper.find('.selected-currency').text()).toBe(currencyPair['from'].name);

    expect(enzymeWrapper.find('Balance').exists()).toBe(true);
    expect(enzymeWrapper.find(ExchangeInput).exists()).toBe(true);
    expect(enzymeWrapper.find(CurrencySwitcher).exists()).toBe(true);
    expect(enzymeWrapper.find(PairRateValues).exists()).toBe(false);
  });

  it('should show PairRateValues and change currency if exchangeContext is to', () => {
    const { enzymeWrapper } = setup('to', 20);
    expect(enzymeWrapper.find('.currency-to-exchange').hasClass('currency-to-exchange')).toBe(true);
    expect(enzymeWrapper.find('.selected-currency').text()).toBe(currencyPair['to'].name);

    expect(enzymeWrapper.find('Balance').exists()).toBe(true);
    expect(enzymeWrapper.find(ExchangeInput).exists()).toBe(true);
    expect(enzymeWrapper.find(CurrencySwitcher).exists()).toBe(true);
    expect(enzymeWrapper.find(PairRateValues).exists()).toBe(true);
  });

  it('should be transparent if exchangeContext is from', () => {
    const { enzymeWrapper } = setup('from', 20);
    expect(enzymeWrapper.props().style).toEqual({backgroundColor: 'transparent'});
  });

  it('should has #1851B4 backgroundColor if exchangeContext is to', () => {
    const { enzymeWrapper } = setup('to', 20);
    expect(enzymeWrapper.props().style).toEqual({backgroundColor: '#1851B4'});
  });

  it('should not render Balance component if user has no balance prop', () => {
    const { enzymeWrapper } = setup('from', null);
    expect(enzymeWrapper.find('Balance').exists()).toBe(false);
  });
});
