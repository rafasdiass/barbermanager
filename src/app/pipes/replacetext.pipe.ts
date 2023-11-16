import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceText',
})
export class ReplaceTextPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'Installments') {
      return 'Fiado';
    } else if (value === 'DebitCard') {
      return 'Cartão de Débito';
    } else if (value === 'CreditCard') {
      return 'Cartão de Crédito';
    } else if (value === 'Cash') {
      return 'Dinheiro';
    } else {
      return value;
    }
  }
}
