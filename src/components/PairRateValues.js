import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { roundToFixed } from '../common/utils';

import '../styles/pair-rate-values.scss';

const PairRateValues = ({ currencyFrom, currencyTo, rate, reverse, classNameProp }) => {
  const firstSymbol = reverse ? currencyTo.symbol : currencyFrom.symbol;
  const secondSymbol = reverse ? currencyFrom.symbol : currencyTo.symbol;

  return (
    <div className={`pair-rate-values ${classNameProp}`}>
      {firstSymbol} 1 = {secondSymbol} {roundToFixed(rate, reverse ? 2 : 4)}
    </div>
  );
};

const mapStateToProps = ({ currencyPair, rates }, ownProps) => {
  let rate = rates.rates[currencyPair.to.id] || '...';

  if (ownProps.reverse && !isNaN(+rate)) {
    rate = 1/rate;
  }

  return {
    currencyFrom: currencyPair.from,
    currencyTo: currencyPair.to,
    rate
  }
};

PairRateValues.propTypes = {
  classNameProp: PropTypes.string,
  reverse: PropTypes.bool
};

PairRateValues.defaultProps = {
  classNameProp: '',
  reverse: false
};

export default connect(mapStateToProps)(PairRateValues);
