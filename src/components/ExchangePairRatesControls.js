import React from 'react';
import PairRateValues from './PairRateValues';

import '../styles/exchange-pair-rates-controls.scss';

const ExchangePairRatesControls = () => (
  <div className="exchange-pair-rates">
    <button className="btn">Cancel</button>
    <PairRateValues />
    <button className="btn">Exchange</button>
  </div>
);

export default ExchangePairRatesControls;
