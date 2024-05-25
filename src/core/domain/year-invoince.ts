import { Invoice } from './invoice';

export interface YearInvoice {
  yearRef: string;
  invoices: Invoice[];
}
