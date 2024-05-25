import { ListInvoiceDTO, Result } from '../../../shared/dto';
import { Invoice } from '../../../core/domain/invoice';
import { IInvoiceRepository } from '../../interface/invoice-repository.interface';
import { IListInvoicesUseCase } from '../../interface/list-invoices.interface';

export class ListInvoice implements IListInvoicesUseCase {
  constructor(private readonly repository: IInvoiceRepository) {}
  async execute(dto: ListInvoiceDTO): Promise<Result<Invoice[]>> {
    if (!dto) return Result.Failure(Result.ParamsNotFound);
    const client = await this.repository.findByClient(dto.client);

    if (!client?.client) return Result.Failure(Result.ClientNotFound);
    const year = client.invoices.filter(item => item.yearRef === dto.yearRef);

    if (!year.length) return Result.Failure(Result.YearNotFound);

    return Result.Success(year[0].invoices);
  }
}
