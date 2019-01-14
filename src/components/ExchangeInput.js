import Input from './Input';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const ExchangeInput = ({ exchangeContext, currencyAmount, updateFromCurrencyAmount, updateToCurrencyAmount }) => {
  const onChange = (amount) => {
    updateFromCurrencyAmount(amount);
    updateToCurrencyAmount();
  };
  const isFromContext = exchangeContext === 'from';

  return (
    <Input
      name="amount"
      autoFocus={isFromContext}
      disabled={!isFromContext}
      value={currencyAmount}
      onChange={onChange}
    />
  );
};

const mapStateToProps = ({ amountFrom, amountTo }, ownProps) => {
  return {
    currencyAmount: ownProps.exchangeContext === 'from' ? amountFrom : amountTo
  };
};

export default connect(mapStateToProps, actions)(ExchangeInput);
