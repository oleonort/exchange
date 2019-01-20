import React from 'react';
import { connect } from 'react-redux';

export const ExchangeButton = ({ isValidTransaction }) => (
  <button className="btn" disabled={!isValidTransaction}>Exchange</button>
);

const mapStateToProps = ({ isValidTransaction }) => ({ isValidTransaction });

export default connect(mapStateToProps)(ExchangeButton);
