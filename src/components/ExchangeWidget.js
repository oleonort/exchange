import React, { Component } from 'react';
import ExchangePairRatesControls from './ExchangePairRatesControls';
import ExchangePair from './ExchangePair';

import '../styles/exchange-widget.scss';

class ExchangeWidget extends Component {
  render() {
    return (
      <div className="exchange-widget">
        <ExchangePairRatesControls />
        <ExchangePair />
      </div>
    );
  }
}

export default ExchangeWidget;
