import { Month } from '../../core/enum/month';
import { ClientBuilder } from '../../core/builder/client';
import { InvoiceBuilder } from '../../core/builder/invoice';
import { YearInvoiceBuilder } from '../../core/builder/year-invoice';
import { Client } from '../../core/domain/client';
import { RegisterInvoiceDTO } from '../dto';

export class InvoiceModel {
  static fromDto(dto: RegisterInvoiceDTO): Client {
    const invoice = new InvoiceBuilder()
      .monthRef(dto.monthRef)
      .quantEletric(dto.quantEletric)
      .valueEletric(dto.valueEletric)
      .quantSCEEE(dto.quantSCEEE)
      .valueSCEEE(dto.valueSCEEE)
      .quantPlywood(dto.quantPlywood)
      .valuePlywood(dto.valuePlywood)
      .valuePublic(dto.valuePublic)
      .build();

    const year = new YearInvoiceBuilder()
      .yearRef(dto.yearRef)
      .invoices([invoice])
      .build();

    return new ClientBuilder().client(dto.client).invoices([year]).build();
  }

  static toDto(client: Client): RegisterInvoiceDTO {
    const dto = client.invoices[0].invoices[0];

    return {
      client: client.client,
      yearRef: client.invoices[0].yearRef,
      monthRef: Month[dto.monthRef],
      quantEletric: dto.quantEletric,
      valueEletric: dto.valueEletric,
      quantSCEEE: dto.quantSCEEE,
      valueSCEEE: dto.valueSCEEE,
      quantPlywood: dto.quantPlywood,
      valuePlywood: dto.valuePlywood,
      valuePublic: dto.valuePublic,
    };
  }

  private static mapInvoices(invoices) {
    return invoices.map(item => {
      return new InvoiceBuilder()
        .monthRef(item.monthRef)
        .quantEletric(item.quantEletric)
        .valueEletric(item.valueEletric)
        .quantSCEEE(item.quantSCEEE)
        .valueSCEEE(item.valueSCEEE)
        .quantPlywood(item.quantPlywood)
        .valuePlywood(item.valuePlywood)
        .valuePublic(item.valuePublic)
        .build();
    });
  }

  private static mapYear(invoices) {
    return invoices.map(item =>
      new YearInvoiceBuilder()
        .yearRef(item.yearRef)
        .invoices(this.mapInvoices(item.invoices))
        .build(),
    );
  }

  static fromEntity(entity: any): Client {
    return new ClientBuilder()
      .client(entity.client)
      .invoices(this.mapYear(entity.invoices))
      .build();
  }
}
