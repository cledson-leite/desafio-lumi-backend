import { faker } from '@faker-js/faker';
import { RandonMonth } from '../../../shared/util/random-month';
import { Invoice } from '../../domain/invoice';
import { InvalidParams } from '../../error';
import { Month } from '../../enum/month';
import { InvoiceBuilder } from '.';

describe('Invoice Buuilder', () => {
  const sut = new InvoiceBuilder();

  it('should return invalid parameter error if the month is not valid', () => {
    const value = faker.string.alpha(3);
    expect(() => sut.monthRef(value)).toThrow(
      new InvalidParams('Month reference not found'),
    );
  });

  it('should return invalid parameter error if electrical quantity is not provided', () => {
    expect(() => sut.quantEletric(0)).toThrow(
      new InvalidParams('Quantity Eletric not found'),
    );
  });

  it('should return invalid parameter error if electrical value is not provided', () => {
    expect(() => sut.valueEletric(0)).toThrow(
      new InvalidParams('Value Eletric not found'),
    );
  });

  it('should return invalid parameter error if Public value is not provided', () => {
    expect(() => sut.valuePublic(0)).toThrow(
      new InvalidParams('Value Public not found'),
    );
  });

  it('should return a completed invoice', () => {
    const value = RandonMonth();
    const fakerInvoice = {
      monthRef: Month[value.toUpperCase()],
      quantEletric: faker.number.int({ min: 1 }),
      valueEletric: faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100,
      quantSCEEE: faker.number.int({ min: 1 }),
      valueSCEEE: faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100,
      quantPlywood: faker.number.int({ min: 1 }),
      valuePlywood: faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100,
      valuePublic: faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100,
    };

    const output = sut
      .monthRef(value)
      .quantEletric(fakerInvoice.quantEletric)
      .valueEletric(fakerInvoice.valueEletric)
      .quantSCEEE(fakerInvoice.quantSCEEE)
      .valueSCEEE(fakerInvoice.valueSCEEE)
      .quantPlywood(fakerInvoice.quantPlywood)
      .valuePlywood(fakerInvoice.valuePlywood)
      .valuePublic(fakerInvoice.valuePublic)
      .build();
    expect(output).toEqual<Invoice>(fakerInvoice);
  });
});
