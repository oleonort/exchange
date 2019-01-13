import ExchangeInput from './ExchangeInput';
import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

import '../styles/currency-to-exchange.scss';

class CurrencyToExchange extends Component {
  render() {
    const { exchangeContext, currency } = this.props;
    const isFromContext = exchangeContext === 'from';

    const computedStyles = {
      backgroundColor: isFromContext ? 'transparent' : '#1851B4'
    };

    return (
      <div className="currency-to-exchange" style={computedStyles}>
        <div className="selected-currency">{currency}</div>
        <div className='currency-amount'>
          <ExchangeInput exchangeContext={exchangeContext} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currencyPair }, ownProps) => {
  return {
    currency: currencyPair[ownProps.exchangeContext].name
  };
};

export default connect(mapStateToProps)(CurrencyToExchange);
