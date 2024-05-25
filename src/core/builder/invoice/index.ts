import { Validator } from '../../validattion';
import { Invoice } from '../../domain/invoice';
import { InvalidParams } from '../../error';
import { Month } from '../../enum/month';

export class InvoiceBuilder {
  private invoice: Invoice = {
    monthRef: undefined,
    quantEletric: undefined,
    valueEletric: undefined,
    quantSCEEE: undefined,
    valueSCEEE: undefined,
    quantPlywood: undefined,
    valuePlywood: undefined,
    valuePublic: undefined,
  };

  monthRef(value: string | number): this {
    const enumIndex = typeof value === 'string' ? value.toUpperCase() : value;
    const month: Month = Month[enumIndex];
    const isValid = Validator.month(month);
    if (!isValid) throw new InvalidParams('Month reference not found');
    this.invoice.monthRef = month;
    return this;
  }

  quantEletric(value: number): this {
    if (!value) throw new InvalidParams('Quantity Eletric not found');
    this.invoice.quantEletric = value;
    return this;
  }

  valueEletric(value: number): this {
    if (!value) throw new InvalidParams('Value Eletric not found');
    this.invoice.valueEletric = value;
    return this;
  }

  quantSCEEE(value: number): this {
    this.invoice.quantSCEEE = value;
    return this;
  }

  valueSCEEE(value: number): this {
    this.invoice.valueSCEEE = value;
    return this;
  }

  quantPlywood(value: number): this {
    this.invoice.quantPlywood = value;
    return this;
  }

  valuePlywood(value: number): this {
    this.invoice.valuePlywood = value;
    return this;
  }

  valuePublic(value: number): this {
    if (!value) throw new InvalidParams('Value Public not found');
    this.invoice.valuePublic = value;
    return this;
  }

  build() {
    return this.invoice;
  }
}
