import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { InvoiceService } from '../invoice/invoice.service';
import { extractor } from '../../shared/util/extractor';

@Controller('file')
export class FileController {
  constructor(private readonly db: InvoiceService) {}

  @UseInterceptors(FileInterceptor('invoice'))
  @Post()
  async upload(@UploadedFile() file: Express.Multer.File) {
    await extractor(file.buffer, this.db);
  }

  @Get(':client/:year/:month')
  download(@Res() res: Response, @Param() params) {
    res.download(
      join(
        __dirname,
        '..',
        '..',
        '..',
        '/upload',
        `${params?.client}.${params?.year}.${params?.month}.pdf`,
      ),
    );
  }
}
