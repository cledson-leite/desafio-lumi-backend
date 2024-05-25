import { ClientDto, RegisterInvoiceDTO } from '../../shared/dto';

export interface IHttpClient {
  create: (dto: RegisterInvoiceDTO) => Promise<void>;
  findByClient: (client: string) => Promise<ClientDto>;
}
