import { YearInvoice } from './year-invoince';

export interface Client {
  client: string;
  invoices: YearInvoice[];
}
