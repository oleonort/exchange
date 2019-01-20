import Input from './Input';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { extractStringWithNumber } from '../common/utils';
import * as actions from '../actions';

export class ExchangeInput extends Component {
  constructor(props) {
    super(props);

    this.isFromContext = props.exchangeContext === 'from';
    this.onChange = this.onChange.bind(this);
  }

  onChange(amount) {
    const { updateFromCurrencyAmount, updateToCurrencyAmount } = this.props;
    const amountToStore = extractStringWithNumber(amount);

    if (amountToStore) {
      updateFromCurrencyAmount(amountToStore);
      updateToCurrencyAmount();
    } else if (amount === '-' || amount === '+') {
      updateFromCurrencyAmount('');
      updateToCurrencyAmount();
    }
  }

  render() {
    const { currencyAmount } = this.props;
    const value = currencyAmount ? (
      this.isFromContext ? `-${currencyAmount}` : `+${currencyAmount}`
    ) : currencyAmount;

    return (
      <Input
        name="amount"
        autoFocus={this.isFromContext}
        disabled={!this.isFromContext}
        value={value}
        onChange={this.onChange}
      />
    )
  }
}

const mapStateToProps = ({ amountFrom, amountTo }, ownProps) => {
  return {
    currencyAmount: ownProps.exchangeContext === 'from' ? amountFrom : amountTo
  };
};

export default connect(mapStateToProps, actions)(ExchangeInput);
