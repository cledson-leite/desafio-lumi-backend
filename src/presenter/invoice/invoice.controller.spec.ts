import { Test, TestingModule } from '@nestjs/testing';
import { Result } from '../../shared/dto';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { fakeInvoice } from './mock/faker-invoice';
import { fakeListDTO } from './mock/faker-dto';
import { fakeClient } from './mock/fake-client';

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: {
            handleRegister: jest.fn(),
            handleList: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    service = module.get<InvoiceService>(InvoiceService);
  });

  describe('Create', () => {
    it('should call the handleRegister method with correct parameters', async () => {
      const params = fakeInvoice();
      await controller.create(params);
      expect(service.handleRegister).toHaveBeenCalledWith(params);
    });

    it('should throw an error if the services handleRegister method fails', async () => {
      jest
        .spyOn(service, 'handleRegister')
        .mockResolvedValueOnce(Result.Failure('Error'));
      const params = fakeInvoice();
      expect(() => controller.create(params)).rejects.toThrow(
        new Error('Error'),
      );
    });
  });
  describe('List', () => {
    it('should call the handleList method with correct parameters', async () => {
      const params = fakeListDTO();
      await controller.list(params);
      expect(service.handleList).toHaveBeenCalledWith(params);
    });

    it('should throw an error if the services handleList method fails', async () => {
      jest
        .spyOn(service, 'handleList')
        .mockResolvedValueOnce(Result.Failure('Error'));
      const params = fakeListDTO();
      expect(() => controller.list(params)).rejects.toThrow(new Error('Error'));
    });

    it('should return an invoice list if the services handleList method is successful', async () => {
      const fakeInvoice = [fakeClient()];
      jest
        .spyOn(service, 'handleList')
        .mockResolvedValueOnce(Result.Success(fakeInvoice));
      const params = fakeListDTO();
      const output = await controller.list(params);
      expect(output).toEqual(fakeInvoice);
    });
  });
});
