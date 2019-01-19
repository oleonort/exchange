import React from 'react';
import PropTypes from 'prop-types';

import '../styles/balance.scss';

const Balance = ({ currencySymbol, amount, error }) => (
  <div className={`balance ${error ? 'error' : ''}`}>
    You have {currencySymbol}{amount}
  </div>
);

Balance.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currencySymbol: PropTypes.string.isRequired,

  error: PropTypes.bool
};

Balance.defaultProps = {
  error: false
};

export default Balance;
