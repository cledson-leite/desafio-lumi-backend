import { faker } from '@faker-js/faker';
import { Month } from '../../../core/enum/month';
import { fakeInvoice } from './faker-invoice';

const dto = fakeInvoice();
export const fakeClientDTO = () => {
  return {
    client: dto.client,
    invoices: [
      {
        yearRef: dto.yearRef,
        invoices: [
          {
            monthRef: dto.monthRef.toUpperCase(),
            quantEletric: dto.quantEletric,
            valueEletric: dto.valueEletric,
            quantSCEEE: dto.quantSCEEE,
            valueSCEEE: dto.valueSCEEE,
            quantPlywood: dto.quantPlywood,
            valuePlywood: dto.valuePlywood,
            valuePublic: dto.valuePublic,
          },
        ],
      },
    ],
  };
};

export const fakeClientEntity = () => {
  return {
    id: faker.number.int(),
    client: dto.client,
    invoices: [
      {
        id: faker.number.int(),
        clientId: faker.number.int(),
        yearRef: dto.yearRef,
        invoices: [
          {
            yearId: faker.number.int(),
            monthRef: Month[dto.monthRef.toUpperCase()],
            quantEletric: dto.quantEletric,
            valueEletric: dto.valueEletric,
            quantSCEEE: dto.quantSCEEE,
            valueSCEEE: dto.valueSCEEE,
            quantPlywood: dto.quantPlywood,
            valuePlywood: dto.valuePlywood,
            valuePublic: dto.valuePublic,
          },
        ],
      },
    ],
  };
};
