import { Month } from '../enum/month';

export interface Invoice {
  monthRef: Month;
  quantEletric: number;
  valueEletric: number;
  quantSCEEE: number;
  valueSCEEE: number;
  quantPlywood: number;
  valuePlywood: number;
  valuePublic: number;
}
