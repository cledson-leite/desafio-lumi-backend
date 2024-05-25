import { RegisterInvoiceDTO, Result } from '../../../shared/dto';
import { InvoiceModel } from '../../../shared/model';
import { IRegisterInvoiceUsecase } from '../../interface/register-invoice-usecase.interface';
import { IInvoiceRepository } from '../../interface/invoice-repository.interface';

export class RegisterInvoice implements IRegisterInvoiceUsecase {
  constructor(private readonly repository: IInvoiceRepository) {}
  async execute(params: RegisterInvoiceDTO): Promise<Result<void>> {
    if (!params) return Result.Failure(Result.ParamsNotFound);
    try {
      const client = InvoiceModel.fromDto(params);
      await this.repository.register(client);
    } catch (error) {
      return Result.Failure(error.message);
    }
    return Result.Success(null);
  }
}
