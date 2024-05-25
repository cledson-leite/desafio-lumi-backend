import { InvoiceBuilder } from '../../../core/builder/invoice';
import { fakeInvoice } from './faker-invoice';

export const fakeClient = () => {
  const dto = fakeInvoice();
  return new InvoiceBuilder()
    .monthRef(dto.monthRef)
    .quantEletric(dto.quantEletric)
    .valueEletric(dto.valueEletric)
    .quantSCEEE(dto.quantSCEEE)
    .valueSCEEE(dto.valueSCEEE)
    .quantPlywood(dto.quantPlywood)
    .valuePlywood(dto.valuePlywood)
    .valuePublic(dto.valuePublic)
    .build();
};
