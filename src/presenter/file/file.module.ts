import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [InvoiceModule],
  controllers: [FileController],
})
export class FileModule {}
