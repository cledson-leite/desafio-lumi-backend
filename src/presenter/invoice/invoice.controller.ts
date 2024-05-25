import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterInvoiceDTO } from '../../shared/dto';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}
  @Post()
  async create(@Body() params: RegisterInvoiceDTO) {
    const result = await this.service.handleRegister(params);
    if (result?.failure) throw new Error(result.failure);
  }
  @Get(':client/:yearRef')
  async list(@Param() params) {
    const result = await this.service.handleList({ ...params });
    if (result?.failure) throw new Error(result.failure);
    return result?.success;
  }
}
