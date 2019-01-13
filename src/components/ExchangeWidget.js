import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ExchangePairRatesControls from './ExchangePairRatesControls';
import ExchangePair from './ExchangePair';

import '../styles/exchange-widget.scss';

class ExchangeWidget extends Component {
  componentDidMount() {
    this.props.fetchLatestRates();
    this.fetchLatestRatesInterval = setInterval(() => this.props.fetchLatestRates(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchLatestRatesInterval);
  }

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
