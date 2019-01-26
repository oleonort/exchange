import React from 'react';
import PairRateValues from './PairRateValues';
import ExchangeButton from './ExchangeButton';

import '../styles/exchange-pair-rates-controls.scss';

const ExchangePairRatesControls = () => (
  <div className="exchange-pair-rates">
    <div className="exchange-pair-wrapper">
      <PairRateValues classNameProp="with-border"/>
    </div>
    <ExchangeButton />
  </div>
);

export default ExchangePairRatesControls;
