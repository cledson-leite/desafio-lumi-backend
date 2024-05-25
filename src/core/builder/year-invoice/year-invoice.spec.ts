import { faker } from '@faker-js/faker';
import { RandonMonth } from '../../../shared/util/random-month';
import { InvalidParams } from '../../error';
import { InvoiceBuilder } from '../invoice';
import { YearInvoiceBuilder } from '.';
import { YearInvoice } from 'src/core/domain/year-invoince';

describe('Year Invoice Builder', () => {
  const sut = new YearInvoiceBuilder();
  const invoiceBuild = new InvoiceBuilder();
  it('should throw InvalidParams error if year is not provided', () => {
    expect(() => sut.yearRef('')).toThrow(
      new InvalidParams('Year reference not found'),
    );
  });

  it('should throw InvalidParams error if invoices is not provided', () => {
    expect(() => sut.invoices([])).toThrow(
      new InvalidParams('Invoices not found'),
    );
  });

  it('should return a completed year invoice', () => {
    const fakerInvoices = [
      invoiceBuild
        .monthRef(RandonMonth())
        .quantEletric(faker.number.int({ min: 1 }))
        .valueEletric(faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100)
        .quantSCEEE(faker.number.int({ min: 1 }))
        .valueSCEEE(faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100)
        .quantPlywood(faker.number.int({ min: 1 }))
        .valuePlywood(faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100)
        .valuePublic(faker.number.float({ min: 0.1, fractionDigits: 2 }) * 100)
        .build(),
    ];
    const fakerYear = faker.number.int({ min: 1900, max: 2500 }).toString();
    const output = sut.yearRef(fakerYear).invoices(fakerInvoices).build();
    expect(output).toEqual<YearInvoice>({
      yearRef: fakerYear,
      invoices: fakerInvoices,
    });
  });
});
