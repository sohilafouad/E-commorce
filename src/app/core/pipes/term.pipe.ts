import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'term',
  standalone: true
})
export class TermPipe implements PipeTransform {

  transform(text:string,limit:number):string {
    return  text.split(" ",limit).join(" ")                               //text.split(" ",2).join(" ");//kda hya static h5leha dynamic 
  }

}
