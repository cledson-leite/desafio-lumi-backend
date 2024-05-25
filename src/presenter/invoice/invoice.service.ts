import { Inject, Injectable } from '@nestjs/common';
import { IRegisterInvoiceUsecase } from '../../application/interface/register-invoice-usecase.interface';
import { IListInvoicesUseCase } from '../../application/interface/list-invoices.interface';
import {
  InvoiceDto,
  ListInvoiceDTO,
  RegisterInvoiceDTO,
  Result,
} from '../../shared/dto';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('register')
    private readonly register: IRegisterInvoiceUsecase,
    @Inject('list')
    private readonly list: IListInvoicesUseCase,
  ) {}

  async handleRegister(params: RegisterInvoiceDTO): Promise<Result<void>> {
    const result = await this.register.execute(params);
    return result;
  }

  async handleList(params: ListInvoiceDTO): Promise<Result<InvoiceDto[]>> {
    const result = await this.list.execute(params);
    return result;
  }
}
