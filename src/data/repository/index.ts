import { Client } from '../../core/domain/client';
import { IInvoiceRepository } from '../../application/interface/invoice-repository.interface';
import { InvoiceModel } from '../../shared/model';
import { IHttpClient } from '../datasource/http-client';

export class Repository implements IInvoiceRepository {
  constructor(private readonly datasource: IHttpClient) {}

  async register(params: Client): Promise<void> {
    const dto = InvoiceModel.toDto(params);

    await this.datasource.create(dto);
  }

  async findByClient(client: string): Promise<Client> {
    const result = await this.datasource.findByClient(client);
    return result;
  }
}
