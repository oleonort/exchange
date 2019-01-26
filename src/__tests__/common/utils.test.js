import {
  roundToFixed, removeZerosFromStart, extractStringWithNumber, notDefinedOrEmpty, moreThanTwoAfterDecimal
} from '../../common/utils';

describe('common utils', () => {
  describe('roundToFixed', () => {
    it('should return value if its NaN', () => {
      expect(roundToFixed('im NaN')).toEqual('im NaN');
    });

    it('should return rounded to 2 by default', () => {
      expect(roundToFixed(10.3124)).toEqual('10.31');
    });

    it('should return rounded to param sent as second argument', () => {
      expect(roundToFixed(10.3124954, 4)).toEqual('10.3125');
    });
  });

  describe('removeZerosFromStart', () => {
    it('should return value if it starts not from 00', () => {
      expect(removeZerosFromStart('10')).toEqual('10');
    });

    it('should return value without zeros if it starts from zeros', () => {
      expect(removeZerosFromStart('0000010')).toEqual('10');
    });

    it('should return one zero empty string if the value contains only multiple zeros', () => {
      expect(removeZerosFromStart('000000')).toEqual('0');
    });

    it('should return value as is', () => {
      expect(removeZerosFromStart('0')).toEqual('0');
    });

    it('should return value as is', () => {
      expect(removeZerosFromStart('0.')).toEqual('0.');
    });

    it('should return value as is', () => {
      expect(removeZerosFromStart('0.1')).toEqual('0.1');
    });

    it('should return 0.1', () => {
      expect(removeZerosFromStart('0000.1')).toEqual('0.1');
    });
  });

  describe('moreThanTwoAfterDecimal', () => {
    it('should return false if no value', () => {
      expect(moreThanTwoAfterDecimal()).toEqual(false);
    });

    it('should return false if less or equal than 2 digits after decimal', () => {
      expect(moreThanTwoAfterDecimal('10.1')).toEqual(false);
      expect(moreThanTwoAfterDecimal('10.11')).toEqual(false);
    });

    it('should return true if more than 2 digits after decimal', () => {
      expect(moreThanTwoAfterDecimal('10.011')).toEqual(true);
    });
  });

  describe('extractStringWithNumber', () => {
    it('should return value without +', () => {
      expect(extractStringWithNumber('+10')).toEqual('10');
      expect(extractStringWithNumber('+0.10')).toEqual('0.10');
    });

    it('should return value without -', () => {
      expect(extractStringWithNumber('-10')).toEqual('10');
      expect(extractStringWithNumber('-0.11')).toEqual('0.11');
    });

    it('should return value without zeros', () => {
      expect(extractStringWithNumber('-000000.01')).toEqual('0.01');
      expect(extractStringWithNumber('+000000.01')).toEqual('0.01');
    });

    it('should return false if value has more than 2 digits after decimal', () => {
      expect(extractStringWithNumber('-000000.0123123')).toEqual(false);
    });
  });

  describe('notDefined', () => {
    it('should return false', () => {
      expect(notDefinedOrEmpty('+10')).toEqual(false);
      expect(notDefinedOrEmpty(1)).toEqual(false);
      expect(notDefinedOrEmpty(0)).toEqual(false);
    });

    it('should return true', () => {
      expect(notDefinedOrEmpty()).toEqual(true);
      expect(notDefinedOrEmpty(null)).toEqual(true);
      expect(notDefinedOrEmpty(undefined)).toEqual(true);
      expect(notDefinedOrEmpty('')).toEqual(true);
    });
  });
});
