import React from 'react';
import { connect } from 'react-redux';
import { roundToFixed } from '../common/utils';

import '../styles/pair-rate-values.scss';

const PairRateValues = ({ currencyFrom, currencyTo, rate }) => (
    <div className="pair-rate-values">
      {currencyFrom.symbol} 1 = {currencyTo.symbol} {roundToFixed(rate, 4)}
    </div>
);

const mapStateToProps = ({ currencyPair, rates }) => {
  return {
    currencyFrom: currencyPair.from,
    currencyTo: currencyPair.to,
    rate: rates.rates[currencyPair.to.id] || '...'
  }
};

export default connect(mapStateToProps)(PairRateValues);
