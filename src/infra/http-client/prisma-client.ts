import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../presenter/prisma/prisma.service';
import { ClientDto, RegisterInvoiceDTO } from '../../shared/dto';
import { InvoiceModel } from '../../shared/model/index';
import { IHttpClient } from 'src/data/datasource/http-client';
import { Month } from '../../core/enum/month';

@Injectable()
export class PrismaClient implements IHttpClient {
  constructor(
    @Inject('prisma-client')
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: RegisterInvoiceDTO): Promise<void> {
    const existedClient = await this.prisma.client.findFirst({
      where: { client: dto.client },
    });
    let existedYear;

    if (existedClient) {
      existedYear = await this.prisma.yearInvoices.findFirst({
        where: { clientId: existedClient.id, yearRef: dto.yearRef },
      });
      if (existedYear) {
        await this.prisma.invoices.create({
          data: {
            yearId: existedYear.id,
            monthRef: Month[dto.monthRef],
            quantEletric: dto.quantEletric,
            valueEletric: dto.valueEletric,
            quantSCEEE: dto.quantSCEEE,
            valueSCEEE: dto.valueSCEEE,
            quantPlywood: dto.quantPlywood,
            valuePlywood: dto.valuePlywood,
            valuePublic: dto.valuePublic,
          },
        });
        return;
      }
      await this.prisma.yearInvoices.create({
        data: {
          yearRef: dto.yearRef,
          clientId: existedClient.id,
          invoices: {
            create: [
              {
                monthRef: Month[dto.monthRef],
                quantEletric: dto.quantEletric,
                valueEletric: dto.valueEletric,
                quantSCEEE: dto.quantSCEEE,
                valueSCEEE: dto.valueSCEEE,
                quantPlywood: dto.quantPlywood,
                valuePlywood: dto.valuePlywood,
                valuePublic: dto.valuePublic,
              },
            ],
          },
        },
      });
      return;
    }

    await this.prisma.client.create({
      data: {
        client: dto.client,
        invoices: {
          create: [
            {
              yearRef: dto.yearRef,
              invoices: {
                create: [
                  {
                    monthRef: Month[dto.monthRef],
                    quantEletric: dto.quantEletric,
                    valueEletric: dto.valueEletric,
                    quantSCEEE: dto.quantSCEEE,
                    valueSCEEE: dto.valueSCEEE,
                    quantPlywood: dto.quantPlywood,
                    valuePlywood: dto.valuePlywood,
                    valuePublic: dto.valuePublic,
                  },
                ],
              },
            },
          ],
        },
      },
    });
  }

  async findByClient(client: string): Promise<ClientDto> {
    const result = await this.prisma.client.findFirst({
      where: { client },
      relationLoadStrategy: 'join' as never,
      include: {
        invoices: {
          include: {
            invoices: true,
          },
        },
      },
    });
    return InvoiceModel.fromEntity(result);
  }
}
