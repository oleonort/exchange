import React  from 'react';
import CurrencyToExchange from "./CurrencyToExchange";

import '../styles/exchange-pair.scss';

const ExchangePair = () => (
  <div className="exchange-pair">
    <CurrencyToExchange exchangeContext="from" />
    <CurrencyToExchange exchangeContext="to" />
  </div>
);

export default ExchangePair;
