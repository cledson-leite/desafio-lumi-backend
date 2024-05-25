import { Module } from '@nestjs/common';
import { PrismaModule } from './presenter/prisma/prisma.module';
import { FileModule } from './presenter/file/file.module';
import { InvoiceModule } from './presenter/invoice/invoice.module';

@Module({
  imports: [PrismaModule, FileModule, InvoiceModule],
})
export class AppModule {}
