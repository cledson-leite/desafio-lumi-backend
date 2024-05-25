import { Client } from '../../core/domain/client';
import { InvoiceModel } from '../../shared/model';
import { IHttpClient } from '../datasource/http-client';
import { fakeClient } from './mock/fake-client';
import { Repository } from '.';

describe('Repository', () => {
  const datasource: IHttpClient = {
    create: jest.fn(),
    findByClient: jest.fn(),
  };
  const sut = new Repository(datasource);
  it('should call the create method with correct parameters', async () => {
    const fakeParams = fakeClient();
    const fakeDto = InvoiceModel.toDto(fakeParams);
    await sut.register(fakeParams);
    expect(datasource.create).toHaveBeenCalledWith(fakeDto);
  });

  it('should throw the error received by the datasource', async () => {
    jest.spyOn(datasource, 'create').mockRejectedValueOnce(new Error());
    const fakeParams = fakeClient();
    expect(sut.register(fakeParams)).rejects.toThrow();
  });

  it('should call the findByClient method with correct parameters', async () => {
    const fakeParams = fakeClient();
    await sut.findByClient(fakeParams.client);
    expect(datasource.findByClient).toHaveBeenCalledWith(fakeParams.client);
  });

  it('should return empty if received like this from the datasource', async () => {
    jest.spyOn(datasource, 'findByClient').mockResolvedValueOnce({} as Client);
    const fakeParams = fakeClient();
    const output = await sut.findByClient(fakeParams.client);
    expect(output).toEqual({});
  });

  it('should return the client received by the datasource', async () => {
    const client = fakeClient();
    jest.spyOn(datasource, 'findByClient').mockResolvedValueOnce(client);
    const fakeParams = fakeClient();
    const output = await sut.findByClient(fakeParams.client);
    expect(output).toEqual(client);
  });
});
