export const roundToFixed = (value, roundTo) => {
  if (isNaN(+value)) return value;
  return Number.isInteger(value) ? value.toFixed(roundTo || 2) : (+value).toFixed(roundTo || 2);
};
