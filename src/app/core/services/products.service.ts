import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private readonly _HttpClient=inject(HttpClient);//34an hnt3aml m3a el api
 getAllProduct():Observable<any>{//api all product
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
 }
 getSpecificProduct(id:string | null):Observable<any>{//api specifi product(product details)
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
 }











  constructor() { }
}
