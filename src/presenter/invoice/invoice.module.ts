import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { RegisterInvoice } from '../../application/usecase/register-invoice';
import { ListInvoice } from '../../application/usecase/list_invoice';
import { Repository } from '../../data/repository';
import { PrismaClient } from '../../infra/http-client/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { InvoiceController } from './invoice.controller';

@Module({
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    {
      provide: 'prisma-client',
      useClass: PrismaService,
    },
    {
      provide: 'httpclient',
      useClass: PrismaClient,
    },
    {
      provide: 'repository',
      useFactory: httpclient => new Repository(httpclient),
      inject: ['httpclient'],
    },
    {
      provide: 'register',
      useFactory: repository => new RegisterInvoice(repository),
      inject: ['repository'],
    },
    {
      provide: 'list',
      useFactory: repository => new ListInvoice(repository),
      inject: ['repository'],
    },
  ],
  exports: [InvoiceService],
})
export class InvoiceModule {}
