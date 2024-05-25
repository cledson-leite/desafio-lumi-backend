import { writeFile } from 'fs/promises';
import { RegisterInvoiceDTO } from '../dto';
import { join } from 'path';
import { InvoiceService } from '../../presenter/invoice/invoice.service';

export const extractor = async (file: Buffer, db: InvoiceService) => {
  const texto = [];
  let lines: RegisterInvoiceDTO;
  const { PdfReader } = await import('pdfreader');
  let counter = 0;
  new PdfReader(null).parseBuffer(file, async (err, item) => {
    if (err) console.error('error:', err);
    else if (!item) console.warn('end of file');
    else if (item.text) {
      counter++;

      const rawLine = item.text
        .trim()
        .split(' ')
        .filter(it => it.trim());

      texto.push(rawLine);
    }
    for (let i = 0; i < texto.length; i++) {
      if (texto[i].includes('CLIENTE') && texto[i + 1]) {
        lines = {
          ...lines,
          client: texto[i + 1][0],
        };
      }
      if (texto[i].includes('Referente') && texto[i + 2]) {
        const referencia = texto[i + 2][0].split('/');
        lines = {
          ...lines,
          monthRef: referencia[0],
          yearRef: referencia[1],
        };
      }

      if (
        texto[i].includes('Energia') &&
        texto[i].includes('Elétrica') &&
        !texto[i].includes('-')
      ) {
        if (texto[i + 2] && texto[i + 4]) {
          lines = {
            ...lines,
            quantEletric: Number(texto[i + 2][0].replaceAll('.', '')),
            valueEletric: Number(texto[i + 4][0].replace(',', '.')),
          };
        }
      }

      if (texto[i].includes('SCEE')) {
        if (texto[i + 2] && texto[i + 4]) {
          lines = {
            ...lines,
            quantSCEEE: Number(texto[i + 2][0].replaceAll('.', '')),
            valueSCEEE: Number(texto[i + 4][0].replace(',', '.')),
          };
        }
      }

      if (texto[i].includes('compensada')) {
        if (texto[i + 2] && texto[i + 4]) {
          lines = {
            ...lines,
            quantPlywood: Number(texto[i + 2][0].replaceAll('.', '')),
            valuePlywood: Number(texto[i + 4][0].replace(',', '.')),
          };
        }
      }

      if (texto[i].includes('Ilum')) {
        if (texto[i + 1]) {
          lines = {
            ...lines,
            valuePublic: Number(texto[i + 1][0].replace(',', '.')),
          };
        }
      }
    }
    if (counter === 129) {
      await db.handleRegister(lines);
      await writeFile(
        join(
          __dirname,
          '..',
          '..',
          '..',
          '/upload',
          `${lines?.client}.${lines?.yearRef}.${lines?.monthRef}.pdf`,
        ),
        file,
      );
    }
  });
};
