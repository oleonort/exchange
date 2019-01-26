import React from 'react';
import { connect } from 'react-redux';
import { exchangeCurrencies } from '../actions';

export const ExchangeButton = ({ isValidTransaction, exchangeCurrencies }) => (
  <button
    className="btn"
    disabled={!isValidTransaction}
    onClick={() => isValidTransaction && exchangeCurrencies()}
  >
    Exchange
  </button>
);

const mapStateToProps = ({ isValidTransaction }) => ({ isValidTransaction });

export default connect(mapStateToProps, { exchangeCurrencies })(ExchangeButton);
