import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObject:any[],text:string): any[]{
    //text:de el klma el hn3ml beha search,item byshel el data ele 3leha eldor fe el loop
    return arrayOfObject.filter((item)=>item.title.toLowerCase().includes(text.toLowerCase()))//toLowerCase() 34an lma y3ml search w el7rof captial or small

   ;//filter bt return eldata b3d ma 7sl filtration
  }
  // if (!text) {
  //   return arrayOfObject;
  // }

  // // فلترة المصفوفة بناءً على النص الذي تم إدخاله
  // const filteredArray = arrayOfObject.filter((item) =>
  //   item.title.toLowerCase().includes(text.toLowerCase())
  // );

  // // إذا لم يتم العثور على أي عناصر، أرجع رسالة "not found"
  // if (filteredArray.length === 0) {
  //   return [{ title: 'Not found' }];
  // }

  // // إرجاع المصفوفة المفلترة
  // return filteredArray;
}


