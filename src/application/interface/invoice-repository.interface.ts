import { Client } from '../../core/domain/client';

export interface IInvoiceRepository {
  register: (params: Client) => Promise<void>;
  findByClient: (client: string) => Promise<Client>;
}
