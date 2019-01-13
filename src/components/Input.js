import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/input.scss';

class Input extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    const value = event.target.value;

    this.props.onChange(value);
  }

  render () {
    const {
      autoFocus,
      classNameProp,
      disabled,
      name,
      maxLength,
      value
    } = this.props;

    return (
      <input
        className={`input ${classNameProp}`}
        type="text"
        name={name}
        maxLength={maxLength}
        autoFocus={autoFocus}
        onChange={this.onChange}
        disabled={disabled}
        value={value}
      />
    )
  }
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  autoFocus: PropTypes.bool,
  classNameProp: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  name: PropTypes.string,
};

Input.defaultProps = {
  autoFocus: false,
  classNameProp: '',
  disabled: false,
  name: '',
  maxLength: 10,
};

export default Input
