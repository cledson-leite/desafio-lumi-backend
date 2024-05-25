import { faker } from '@faker-js/faker';
import { RandonMonth } from '../../shared/util/random-month';

export const fakeInvoice = () => {
  const value = RandonMonth();
  return {
    client: faker.number.int({ min: 1000000 }).toString(),
    yearRef: faker.number.int({ min: 1900, max: 2500 }).toString(),
    monthRef: value,
    quantEletric: faker.number.int({ min: 1 }),
    valueEletric: faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100,
    quantSCEEE: faker.number.int({ min: 1 }),
    valueSCEEE: faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100,
    quantPlywood: faker.number.int({ min: 1 }),
    valuePlywood: faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100,
    valuePublic: faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100,
  };
};
