import { faker } from '@faker-js/faker';
import { RandonMonth } from '../../../shared/util/random-month';
import { InvalidParams } from '../../error';
import { InvoiceBuilder } from '../invoice';
import { YearInvoiceBuilder } from '../year-invoice';
import { Client } from '../../domain/client';
import { ClientBuilder } from '.';

describe('Client Builder', () => {
  const sut = new ClientBuilder();
  const yearInvoiceBuilder = new YearInvoiceBuilder();
  const invoiceBuild = new InvoiceBuilder();
  it('should throw InvalidParams error if client is not provided', () => {
    expect(() => sut.client('')).toThrow(new InvalidParams('Client not found'));
  });
  it('should throw InvalidParams error if invoices are not provided', () => {
    expect(() => sut.invoices([])).toThrow(
      new InvalidParams('Year Invoice not found'),
    );
  });

  it('should return a completed invoice', () => {
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
    const fakeYear = [
      yearInvoiceBuilder
        .yearRef(faker.number.int({ min: 1900, max: 2500 }).toString())
        .invoices(fakerInvoices)
        .build(),
    ];
    const value = faker.number.int({ min: 1000000 }).toString();
    const output = sut.client(value).invoices(fakeYear).build();
    expect(output).toEqual<Client>({
      client: value,
      invoices: fakeYear,
    });
  });
});
