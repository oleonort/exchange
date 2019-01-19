import React from 'react';
import PairRateValues from './PairRateValues';
import ExchangeButton from './ExchangeButton';

import '../styles/exchange-pair-rates-controls.scss';

const ExchangePairRatesControls = () => (
  <div className="exchange-pair-rates">
    <button className="btn">Cancel</button>
    <PairRateValues classNameProp="with-border"/>
    <ExchangeButton />
  </div>
);

export default ExchangePairRatesControls;
