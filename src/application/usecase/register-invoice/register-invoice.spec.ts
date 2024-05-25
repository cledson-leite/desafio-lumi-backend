import { InvoiceModel } from '../../../shared/model';
import { fakeInvoice } from '../../mock';
import { IInvoiceRepository } from '../../interface/invoice-repository.interface';
import { RegisterInvoice } from '.';

describe('Register Invoice', () => {
  const repository: IInvoiceRepository = {
    register: jest.fn(),
    findByClient: jest.fn(),
  };
  const sut = new RegisterInvoice(repository);
  it('should return message Parameters not found if it is not provided', async () => {
    const output = await sut.execute(undefined);
    expect(output.success).toBeNull();
    expect(output.failure).toBe('Parameters not found');
  });

  it('should return an error message received from the domain', async () => {
    const invoiceUndefined = {
      client: undefined,
      yearRef: '12345',
      monthRef: 'errado',
      quantEletric: undefined,
      valueEletric: undefined,
      quantSCEEE: undefined,
      valueSCEEE: undefined,
      quantPlywood: undefined,
      valuePlywood: undefined,
      valuePublic: undefined,
    };
    const output = await sut.execute(invoiceUndefined);
    expect(output.success).toBeNull();
    expect(output.failure).toBeDefined();
  });

  it('should call repository with correct parameters', async () => {
    const fakeinvoice = fakeInvoice();
    const fakeClient = InvoiceModel.fromDto(fakeinvoice);
    await sut.execute(fakeinvoice);
    expect(repository.register).toHaveBeenCalledWith(fakeClient);
  });

  it('should return an error message received from the repsitory', async () => {
    const fakeinvoice = fakeInvoice();
    jest
      .spyOn(repository, 'register')
      .mockRejectedValueOnce(new Error('any message'));
    const output = await sut.execute(fakeinvoice);
    expect(output.success).toBeNull();
    expect(output.failure).toBe('any message');
  });

  it('should return null success and null failure on success', async () => {
    const fakeinvoice = fakeInvoice();
    jest.spyOn(repository, 'register').mockResolvedValueOnce();
    const output = await sut.execute(fakeinvoice);
    expect(output.failure).toBeNull();
    expect(output.success).toBeNull();
  });
});
