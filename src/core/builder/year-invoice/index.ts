import { Validator } from '../../validattion';
import { Invoice } from '../../domain/invoice';
import { InvalidParams } from '../../error';
import { YearInvoice } from '../../domain/year-invoince';

export class YearInvoiceBuilder {
  private year: YearInvoice = {
    yearRef: undefined,
    invoices: undefined,
  };

  yearRef(value: string): this {
    const isValid = Validator.year(value);
    if (!isValid) throw new InvalidParams('Year reference not found');
    this.year.yearRef = value;
    return this;
  }

  invoices(value: Invoice[]): this {
    if (value.length <= 0) throw new InvalidParams('Invoices not found');
    this.year.invoices = value;
    return this;
  }

  build() {
    return this.year;
  }
}
