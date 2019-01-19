import Input from './Input';
import React from 'react';
import { connect } from 'react-redux';
import { extractStringWithNumber } from '../common/utils';
import * as actions from '../actions';

const ExchangeInput = ({ exchangeContext, currencyAmount, updateFromCurrencyAmount, updateToCurrencyAmount }) => {
  const onChange = (amount) => {
    const amountToStore = extractStringWithNumber(amount);
    if (amountToStore) {
      updateFromCurrencyAmount(amountToStore);
      updateToCurrencyAmount();
    } else if (amount === '-' || amount === '+') {
      updateFromCurrencyAmount('');
      updateToCurrencyAmount();
    }
  };
  const isFromContext = exchangeContext === 'from';
  const value = currencyAmount ? (isFromContext ? `-${currencyAmount}` : `+${currencyAmount}`) : currencyAmount;

  return (
    <Input
      name="amount"
      autoFocus={isFromContext}
      disabled={!isFromContext}
      value={value}
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
