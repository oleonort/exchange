export const roundToFixed = (value, roundTo) => {
  if (isNaN(+value)) return value;
  return Number.isInteger(value) ? value.toFixed(roundTo || 2) : (+value).toFixed(roundTo || 2);
};

export const extractStringWithNumber = value => {
  const includesPlusOrMinus = value.includes('+') || value.includes('-');
  const valueToArray = () => value.includes('+') ? value.split('+') : value.split('-');
  const valueToUse = includesPlusOrMinus ? valueToArray()[1] : value;

  return !isNaN(valueToUse) ? valueToUse : false;
};
