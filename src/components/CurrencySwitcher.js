import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../styles/currency-switcher.scss';

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.onPrevClickHandler = this.onPrevClickHandler.bind(this);
    this.onNextClickHandler = this.onNextClickHandler.bind(this);
  }

  onPrevClickHandler() {
    if (this.props.exchangeContext === 'from') {
      this.props.getPrevFromCurrencyUpdateRates();
    } else {
      this.props.getPrevToCurrency();
    }
  }

  onNextClickHandler() {
    if (this.props.exchangeContext === 'from') {
      this.props.getNextFromCurrencyUpdateRates();
    } else {
      this.props.getNextToCurrency();
    }
  }

  render() {
    return (
      <div className="currency-switcher">
        <div className="prev-currency" onClick={this.onPrevClickHandler}>{`<`}</div>
        <div className="next-currency" onClick={this.onNextClickHandler}>{`>`}</div>
      </div>
    );
  }
}

export default connect(null, actions)(CurrencySwitcher);
