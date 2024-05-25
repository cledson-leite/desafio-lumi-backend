import { Client } from '../../../core/domain/client';
import { IInvoiceRepository } from '../../interface/invoice-repository.interface';
import { fakeClient, fakeDTO } from '../../mock';
import { ListInvoice } from '.';

describe('List Invoice', () => {
  const repository: IInvoiceRepository = {
    register: jest.fn(),
    findByClient: jest.fn(),
  };
  const sut = new ListInvoice(repository);
  it('should return message Parameters not found if it is not provided', async () => {
    const output = await sut.execute(undefined);
    expect(output.success).toBeNull();
    expect(output.failure).toBe('Parameters not found');
  });

  it('should call the method search for customer with correct parameter', async () => {
    const fakeDto = fakeDTO();
    await sut.execute(fakeDto);
    expect(repository.findByClient).toHaveBeenCalledWith(fakeDto.client);
  });

  it('should return failure Client not found if the repository is empty', async () => {
    jest.spyOn(repository, 'findByClient').mockResolvedValueOnce({} as Client);
    const fakeDto = fakeDTO();
    const output = await sut.execute(fakeDto);
    expect(output.success).toBeNull();
    expect(output.failure).toBe('Client not found');
  });

  it('should return failure This year reference is not listed if it cannot be found', async () => {
    const fakeDto = fakeDTO();
    const client = fakeClient();
    jest.spyOn(repository, 'findByClient').mockResolvedValueOnce(client);
    const output = await sut.execute(fakeDto);
    expect(output.success).toBeNull();
    expect(output.failure).toBe('This year reference is not listed');
  });

  it('should return success with a list of invoices', async () => {
    const fakeDto = fakeDTO();
    const client = fakeClient(fakeDto.yearRef);
    jest.spyOn(repository, 'findByClient').mockResolvedValueOnce(client);
    const output = await sut.execute(fakeDto);
    expect(output.failure).toBeNull();
    expect(output.success).toEqual(client.invoices[0].invoices);
  });
});
