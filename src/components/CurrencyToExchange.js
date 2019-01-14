import React from 'react';
import { connect } from 'react-redux';
import ExchangeInput from './ExchangeInput';
import CurrencySwitcher from './CurrencySwitcher';

import '../styles/currency-to-exchange.scss';

const CurrencyToExchange = ({ exchangeContext, currency }) =>  {
  const isFromContext = exchangeContext === 'from';

  const computedStyles = {
    backgroundColor: isFromContext ? 'transparent' : '#1851B4'
  };

  return (
    <div className="currency-to-exchange" style={computedStyles}>
      <div className="wrapper">
        <div className="selected-currency">{currency}</div>
        <div className='currency-amount'>
          <ExchangeInput exchangeContext={exchangeContext} />
        </div>
      </div>
      <CurrencySwitcher exchangeContext={exchangeContext} />
    </div>
  );
};

const mapStateToProps = ({ currencyPair }, ownProps) => {
  return {
    currency: currencyPair[ownProps.exchangeContext].name
  };
};

export default connect(mapStateToProps)(CurrencyToExchange);
