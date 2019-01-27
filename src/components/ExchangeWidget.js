import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ExchangePairRatesControls from './ExchangePairRatesControls';
import ExchangePair from './ExchangePair';

import '../styles/exchange-widget.scss';

class ExchangeWidget extends Component {
  componentDidMount() {
    this.props.fetchCurrencyPair();
    this.props.fetchCurrencies();
    this.props.fetchLatestRates();
    this.props.fetchUserBalance();
    // commenting out regular fetches since only 150 left till 14.02.19
    // this.fetchLatestRatesInterval = setInterval(() => this.props.fetchLatestRates(), 10000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.fetchLatestRatesInterval);
  // }

  render() {
    return (
      <div className="exchange-widget">
        <ExchangePairRatesControls />
        <ExchangePair />
      </div>
    );
  }
}

export default connect(null, actions)(ExchangeWidget);
