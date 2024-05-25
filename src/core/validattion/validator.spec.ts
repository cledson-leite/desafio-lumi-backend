import { faker } from '@faker-js/faker';

import { Validator } from '.';

describe('Validator', () => {
  describe('Month', () => {
    it('should return true if everything is correct', () => {
      const value = faker.number.int({ min: 1, max: 12 });
      expect(Validator.month(value)).toBeTruthy();
    });
  });

  describe('Year', () => {
    it('should return false if value is not provided', () => {
      expect(Validator.year('')).toBeFalsy();
    });

    it('should return false if the value size is less than 4 digits', () => {
      const value = faker.number.int({ max: 999 }).toString();
      expect(Validator.year(value)).toBeFalsy();
    });

    it('should return false if the value is random text', () => {
      const value = faker.string.alpha(4);
      expect(Validator.year(value)).toBeFalsy();
    });

    it('should return false if value is less than 1900', () => {
      const value = faker.number.int({ max: 1899 }).toString();
      expect(Validator.year(value)).toBeFalsy();
    });

    it('should return false if value is greater than 2500', () => {
      const value = faker.number.int({ min: 2501, max: 9999 }).toString();
      expect(Validator.year(value)).toBeFalsy();
    });

    it('should return true if everything is correct', () => {
      const value = faker.number.int({ min: 1900, max: 2500 }).toString();
      expect(Validator.year(value)).toBeTruthy();
    });
  });
});
