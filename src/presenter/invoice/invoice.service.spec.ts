import { Test, TestingModule } from '@nestjs/testing';
import { IRegisterInvoiceUsecase } from '../../application/interface/register-invoice-usecase.interface';
import { IListInvoicesUseCase } from '../../application/interface/list-invoices.interface';
import { Result } from '../../shared/dto';
import { InvoiceService } from './invoice.service';
import { fakeInvoice } from './mock/faker-invoice';
import { fakeClient } from './mock/fake-client';
import { fakeListDTO } from './mock/faker-dto';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let register: IRegisterInvoiceUsecase;
  let list: IListInvoicesUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: 'register',
          useValue: { execute: jest.fn() },
        },
        {
          provide: 'list',
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    register = module.get<IRegisterInvoiceUsecase>('register');
    list = module.get<IListInvoicesUseCase>('list');
  });

  describe('Register', () => {
    it('should call execute method from registry with correct parameter', async () => {
      const params = fakeInvoice();
      await service.handleRegister(params);
      expect(register.execute).toHaveBeenCalledWith(params);
    });

    it('should return the failure received by register', async () => {
      jest
        .spyOn(register, 'execute')
        .mockResolvedValueOnce(Result.Failure('Error'));
      const params = fakeInvoice();
      const output = await service.handleRegister(params);
      expect(output.success).toBeNull();
      expect(output.failure).toBe('Error');
    });

    it('should return success received by register', async () => {
      jest
        .spyOn(register, 'execute')
        .mockResolvedValueOnce(Result.Success(null));
      const params = fakeInvoice();
      const output = await service.handleRegister(params);
      expect(output.failure).toBeNull();
      expect(output.success).toBeNull();
    });
  });

  describe('List Invoices', () => {
    it('should call execute method from list invoices with correct parameter', async () => {
      const params = fakeListDTO();
      await service.handleList(params);
      expect(list.execute).toHaveBeenCalledWith(params);
    });

    it('should return the failure received by list', async () => {
      jest
        .spyOn(list, 'execute')
        .mockResolvedValueOnce(Result.Failure('Error'));
      const params = fakeListDTO();
      const output = await service.handleList(params);
      expect(output.success).toBeNull();
      expect(output.failure).toBe('Error');
    });

    it('should return success received by list', async () => {
      const fakeInvoice = [fakeClient()];
      jest
        .spyOn(list, 'execute')
        .mockResolvedValueOnce(Result.Success(fakeInvoice));
      const params = fakeListDTO();
      const output = await service.handleList(params);
      expect(output.failure).toBeNull();
      expect(output.success).toEqual(fakeInvoice);
    });
  });
});
