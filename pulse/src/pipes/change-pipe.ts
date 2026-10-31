import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'change',
})
export class ChangePipe implements PipeTransform {
  transform(value: number, previousClose: number): string {
    const result = value / previousClose;
    const formattedNumber = (Math.round(result * 100) / 100).toFixed(2);
    if (value > 0) {
      return '+' + formattedNumber.toString() + '%';
    } else if (value < 0) {
      return '-' + formattedNumber.toString() + '%';
    }

    return '+100%';
  }
}
