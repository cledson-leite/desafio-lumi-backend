import { InvoiceDto, ListInvoiceDTO, Result } from '../../shared/dto';

export interface IListInvoicesUseCase {
  execute: (dto: ListInvoiceDTO) => Promise<Result<InvoiceDto[]>>;
}
