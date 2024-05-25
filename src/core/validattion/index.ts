import { Month } from '../enum/month';

export class Validator {
  static month(value: Month): boolean {
    if (!value) {
      return false;
    }

    return true;
  }

  static year(value: string): boolean {
    if (!value) {
      return false;
    }

    if (value.length !== 4) {
      return false;
    }

    if (isNaN(Number(value))) {
      return false;
    }

    if (Number(value) < 1900 || Number(value) > 2500) {
      return false;
    }
    return true;
  }
}
