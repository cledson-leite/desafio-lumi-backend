import { InvalidParams } from '../../error';
import { YearInvoice } from '../../domain/year-invoince';
import { Client } from '../../domain/client';

export class ClientBuilder {
  private clientInvoke: Client = {
    client: undefined,
    invoices: undefined,
  };

  client(value: string): this {
    if (!value) throw new InvalidParams('Client not found');
    this.clientInvoke.client = value;
    return this;
  }

  invoices(value: YearInvoice[]): this {
    if (value.length <= 0) throw new InvalidParams('Year Invoice not found');
    this.clientInvoke.invoices = value;
    return this;
  }

  build() {
    return this.clientInvoke;
  }
}
