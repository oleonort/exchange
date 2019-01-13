import React from 'react';

import '../styles/exchange-pair-rates-controls.scss';

const ExchangePairRatesControls = ({ currencyListById, currencyFrom, currencyTo }) => (
  <div className="exchange-pair-rates">
    <button className="btn">Cancel</button>
    <div className="pair-values">{currencyFrom} 1 = {currencyTo} 1 </div>
    <button className="btn">Exchange</button>
  </div>
);

export default ExchangePairRatesControls;
