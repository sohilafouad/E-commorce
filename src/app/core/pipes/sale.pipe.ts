import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true
})
export class SalePipe implements PipeTransform {
  //pipe ===> class ===>by3ml implemntation l interface asmo PipeTransform

  transform(value : string) :string {
    return `onSale ${value}`;
  }

}
