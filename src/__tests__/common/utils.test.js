import { roundToFixed, removeZerosFromStart, extractStringWithNumber, notDefinedOrEmpty } from '../../common/utils';

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

  describe('extractStringWithNumber', () => {
    it('should return value without +', () => {
      expect(extractStringWithNumber('+10')).toEqual('10');
      expect(extractStringWithNumber('+0.101')).toEqual('0.101');
    });

    it('should return value without -', () => {
      expect(extractStringWithNumber('-10')).toEqual('10');
      expect(extractStringWithNumber('-0.110')).toEqual('0.110');
    });

    it('should return value without zeros', () => {
      expect(extractStringWithNumber('-000000.0101')).toEqual('0.0101');
      expect(extractStringWithNumber('+000000.0101')).toEqual('0.0101');
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
