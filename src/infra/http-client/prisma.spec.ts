import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from './prisma-client';
import { PrismaService } from '../../presenter/prisma/prisma.service';
import { fakeInvoice } from './mock/faker-invoice';
import { fakeClientDTO, fakeClientEntity } from './mock/fake-client-dto';

describe('Prisma Cliente', () => {
  let sut: PrismaClient;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaClient,
        {
          provide: 'prisma-client',
          useValue: {
            client: { create: jest.fn(), findFirst: jest.fn() },
            yearInvoices: { create: jest.fn(), findFirst: jest.fn() },
            invoices: { create: jest.fn(), findFirst: jest.fn() },
          },
        },
      ],
    }).compile();

    sut = module.get<PrismaClient>(PrismaClient);
    prisma = module.get<PrismaService>('prisma-client');
  });

  it('should call cleints find first method ', async () => {
    const fakeDto = fakeInvoice();
    await sut.create(fakeDto);
    expect(prisma.client.create).toHaveBeenCalled();
  });

  it('should call yearInvoices findfirst method if you already have a client', async () => {
    const fakeEntity = fakeClientEntity();
    jest.spyOn(prisma.client, 'findFirst').mockResolvedValueOnce({
      id: fakeEntity.id,
      client: fakeEntity.client,
    });
    const fakeDto = fakeInvoice();
    await sut.create(fakeDto);
    expect(prisma.yearInvoices.findFirst).toHaveBeenCalled();
  });

  it('should call the created method invoice if it already has a year', async () => {
    const fakeEntity = fakeClientEntity();
    jest.spyOn(prisma.client, 'findFirst').mockResolvedValueOnce({
      id: fakeEntity.id,
      client: fakeEntity.client,
    });
    jest.spyOn(prisma.yearInvoices, 'findFirst').mockResolvedValueOnce({
      id: fakeEntity.invoices[0].id,
      clientId: fakeEntity.invoices[0].clientId,
      yearRef: fakeEntity.invoices[0].yearRef,
    });
    const fakeDto = fakeInvoice();
    await sut.create(fakeDto);
    expect(prisma.invoices.create).toHaveBeenCalled();
  });

  it('should call the yearInvoice create method if you do not have a year', async () => {
    const fakeEntity = fakeClientEntity();
    jest.spyOn(prisma.client, 'findFirst').mockResolvedValueOnce({
      id: fakeEntity.id,
      client: fakeEntity.client,
    });
    jest.spyOn(prisma.yearInvoices, 'findFirst').mockResolvedValueOnce(null);
    const fakeDto = fakeInvoice();
    await sut.create(fakeDto);
    expect(prisma.yearInvoices.create).toHaveBeenCalled();
  });

  it('should call the clients create method if you do not have a client', async () => {
    jest.spyOn(prisma.client, 'findFirst').mockResolvedValueOnce(null);
    const fakeDto = fakeInvoice();
    await sut.create(fakeDto);
    expect(prisma.client.create).toHaveBeenCalled();
  });

  it('should throw error received by prismas create method', async () => {
    jest.spyOn(prisma.client, 'create').mockRejectedValueOnce(new Error());
    const fakeDto = fakeInvoice();
    expect(sut.create(fakeDto)).rejects.toThrow();
  });

  it('should throw error received by prismas find first method', async () => {
    jest.spyOn(prisma.client, 'findFirst').mockRejectedValueOnce(new Error());
    const fakeDto = fakeInvoice();
    expect(sut.findByClient(fakeDto.client)).rejects.toThrow();
  });

  it('should return a client dto in case of success', async () => {
    const fakeClient = fakeClientDTO();
    const fakeEntity = fakeClientEntity();
    jest.spyOn(prisma.client, 'findFirst').mockResolvedValueOnce(fakeEntity);
    const fakeDto = fakeInvoice();
    const output = await sut.findByClient(fakeDto.client);
    expect(output).toEqual(fakeClient);
  });
});
