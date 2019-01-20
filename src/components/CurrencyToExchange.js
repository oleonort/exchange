import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Balance from './Balance';
import ExchangeInput from './ExchangeInput';
import CurrencySwitcher from './CurrencySwitcher';
import PairRateValues from './PairRateValues';
import { notDefined } from '../common/utils';

import '../styles/currency-to-exchange.scss';

export const CurrencyToExchange = ({ exchangeContext, currency, amountFrom, amount, isValidTransaction }) => {
  const isFromContext = exchangeContext === 'from';

  const computedStyles = {
    backgroundColor: isFromContext ? 'transparent' : '#1851B4'
  };

  const error = !!amountFrom && isFromContext && !isValidTransaction;

  return (
    <div className="currency-to-exchange" style={computedStyles}>
      <div className="wrapper">
        <div className="currency-balance-wrapper">
          <div className="selected-currency">{currency.name}</div>
          {!notDefined(amount) && <Balance amount={amount} currencySymbol={currency.symbol} error={error}/>}
        </div>
        <div className="currency-amount">
          <ExchangeInput exchangeContext={exchangeContext} />
          {exchangeContext === 'to' && <PairRateValues reverse classNameProp='float-right' />}
        </div>
      </div>
      <CurrencySwitcher exchangeContext={exchangeContext} />
    </div>
  );
};

const mapStateToProps = ({ currencyPair, userBalance, amountFrom, isValidTransaction }, ownProps) => {
  return {
    amountFrom,
    amount: userBalance[currencyPair[ownProps.exchangeContext].id],
    currency: currencyPair[ownProps.exchangeContext],
    isValidTransaction
  };
};

CurrencyToExchange.propTypes = {
  exchangeContext: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(CurrencyToExchange);
