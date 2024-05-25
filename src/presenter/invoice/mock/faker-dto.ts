import { faker } from '@faker-js/faker';
import { RandonMonth } from '../../../shared/util/random-month';

export const fakeListDTO = () => {
  const value = RandonMonth();
  return {
    client: faker.number.int({ min: 1000000 }).toString(),
    yearRef: faker.number.int({ min: 1900, max: 2500 }).toString(),
    monthRef: value,
  };
};
