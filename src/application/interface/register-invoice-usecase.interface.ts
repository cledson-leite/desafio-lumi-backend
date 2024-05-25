import { RegisterInvoiceDTO, Result } from '../../shared/dto';

export interface IRegisterInvoiceUsecase {
  execute: (params: RegisterInvoiceDTO) => Promise<Result<void>>;
}
