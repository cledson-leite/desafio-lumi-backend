import { InvoiceBuilder } from '../../core/builder/invoice';
import { YearInvoiceBuilder } from '../../core/builder/year-invoice';
import { ClientBuilder } from '../../core/builder/client';
import { fakeInvoice } from './faker-invoice';

export const fakeClient = (yearRef?: string) => {
  const dto = fakeInvoice();
  const invoice = new InvoiceBuilder()
    .monthRef(dto.monthRef)
    .quantEletric(dto.quantEletric)
    .valueEletric(dto.valueEletric)
    .quantSCEEE(dto.quantSCEEE)
    .valueSCEEE(dto.valueSCEEE)
    .quantPlywood(dto.quantPlywood)
    .valuePlywood(dto.valuePlywood)
    .valuePublic(dto.valuePublic)
    .build();

  const year = new YearInvoiceBuilder()
    .yearRef(yearRef || dto.yearRef)
    .invoices([invoice])
    .build();

  return new ClientBuilder().client(dto.client).invoices([year]).build();
};
