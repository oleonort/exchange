export const roundToFixed = (value, roundTo) => {
  if (isNaN(+value)) return value;
  return Number.isInteger(value) ? value.toFixed(roundTo || 2) : (+value).toFixed(roundTo || 2);
};

export const removeZerosFromStart = value => {
  if (value[0] !== '0') {
    return value;
  }

  if (value[0] === '0' && (value[1] === '.' || value[1] === undefined)) {
    return value;
  }

  return (+value).toString();
};

export const moreThanTwoAfterDecimal = value => {
  if (!value) {
    return false;
  }

  const valueToCheck = typeof value === 'string' ? value : value.toString();

  if (!valueToCheck.includes('.')) {
    return false;
  }

  return valueToCheck.split('.')[1].length > 2;
};

export const extractStringWithNumber = value => {
  const includesPlusOrMinus = value.includes('+') || value.includes('-');
  const valueToArray = () => value.includes('+') ? value.split('+') : value.split('-');
  const valueToUse = includesPlusOrMinus ? valueToArray()[1] : value;

  return isNaN(valueToUse) || moreThanTwoAfterDecimal(valueToUse) ? false : removeZerosFromStart(valueToUse);
};

export const notDefinedOrEmpty = value => value === '' || value === undefined || value === null;
